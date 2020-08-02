import axios from "axios";

export async function allBlogsList(params) {
    return await axios.get("http://localhost:3000/blogs");
}