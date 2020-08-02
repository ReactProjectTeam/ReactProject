import axios from "axios";

export async function allProductsList(params) {
    return await axios.get("http://localhost:3000/products");
  }