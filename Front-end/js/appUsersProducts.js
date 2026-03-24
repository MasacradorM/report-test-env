import { api } from "./api.js";

async function loadData() {
  try {
    const [users, products, brands, relations] = await Promise.all([
      api.getUsers(),
      api.getProducts(),
      api.getBrands(),
      api.getProductsUser()
    ]);

    const container = document.getElementById("users");

    // Mapas para acceso rápido
    const usersMap = Object.fromEntries(users.map(u => [u.id, u]));
    const productsMap = Object.fromEntries(products.map(p => [p.id, p]));

    // Agrupar productos por usuario
    const grouped = {};

    relations.forEach(rel => {
      const userId = rel.userId;

      if (!grouped[userId]) {
        grouped[userId] = [];
      }

      grouped[userId].push(productsMap[rel.productId]);
    });

    // Render
    let html = "";

    Object.keys(grouped).forEach(userId => {
      const user = usersMap[userId];
      const userProducts = grouped[userId];

      html += `
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">
              ${user.firstName} (${user.email})
            </h5>

            <ul class="list-group list-group-flush mt-3">
              ${userProducts.map(product => `
                <li class="list-group-item">
                  ${product.title} - $${product.price}
                </li>
              `).join("")}
            </ul>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;

  } catch (error) {
    console.error("Error cargando datos:", error);
  }
}

loadData();
