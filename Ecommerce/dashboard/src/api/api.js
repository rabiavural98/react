import axios from "axios";

const api = axios.create({
    baseURL:'https://localhost:5000/api'
})
export default api