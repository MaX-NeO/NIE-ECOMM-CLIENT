
import axios from 'axios';
import { getToken } from '../configs/authconfig';

const API = "http://localhost:8080"

// const axiosInstance = axios.create({
//     baseURL: API,
// })

// axiosInstance.interceptors.request.use(
//     (config) => {
//         const token = getToken()
//         if (token) {
//             config.headers.Authorization = `${token}`
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error)
//     }
// )


const AppLogin = () => axios.post(`${API}/login`)
const AppRegister = (user) => axios.post(`${API}/register`, user)

const allProducts = () => axios.get(`${API}/products/all`)
const addProduct = (product) => axios.post(`${API}/products/add`, product)
const editProduct = (product, id) => axios.put(`${API}/products/product/edit/${id}`, product)
const deleteProduct = (id) => axios.delete(`${API}/products/product/delete/${id}`)

const allUsers = () => axios.get(`${API}/user/getAll`)
const addUser = (user) => axios.post(`${API}/user/addUser`, user)
const editUser = (user, id) => axios.put(`${API}/user/editUser/${id}`, user)
const deleteUser = (id) => axios.delete(`${API}/user/delete/${id}`)
const getUserByID = (id) => axios.get(`${API}/user/get/${id}`)

const allOrders = () => axios.get(`${API}/orders/allDetails`)
const addOrder = (user) => axios.post(`${API}/orders/save`, user)

export {
    AppLogin,
    AppRegister,
    allProducts,
    addProduct,
    editProduct,
    deleteProduct,
    allUsers,
    addUser,
    editUser,
    deleteUser,
    allOrders,
    addOrder,
    getUserByID
}