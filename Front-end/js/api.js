const API_URL = "http://localhost:3000";

export const api = {
  getUsers: () => fetch(`${API_URL}/users`).then(r => r.json()),
  getProducts: () => fetch(`${API_URL}/products`).then(r => r.json()),
  getBrands: () => fetch(`${API_URL}/brand`).then(r => r.json()),
  getProductsUser: () => fetch(`${API_URL}/productsUser`).then(r => r.json())
};