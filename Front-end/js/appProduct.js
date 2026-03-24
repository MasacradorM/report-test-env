
import { api } from "./api.js";

async function loadProducts() {
  try {
    const products = await api.getProducts();

    const container = document.getElementById("products");

    let html = `
      <div class="row">
        ${products.map(product => `
          <div class="col-md-4 mb-4">
            <div class="card h-100 shadow-sm">

              <!-- Imagen -->
              <img src="${product.image}" 
                   class="card-img-top"
                   style="height: 200px; object-fit: cover;"
                   onerror="this.src='https://via.placeholder.com/300'">

              <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text text-muted">
                  ${product.description.substring(0, 80)}...
                </p>
              </div>

              <div class="card-footer d-flex justify-content-between align-items-center">
                <span class="fw-bold text-success">$${product.price}</span>
                <button class="btn btn-primary btn-sm">
                  Ver
                </button>
              </div>

            </div>
          </div>
        `).join("")}
      </div>
    `;

    container.innerHTML = html;

  } catch (error) {
    console.error("Error cargando productos:", error);
  }
}

loadProducts();