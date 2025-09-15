import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/auth/Login'
import AdminLayout from './layouts/admin/AdminLayout'
import AdminProduct from './pages/admin/AdminProducts'
import AdminOrders from './pages/admin/AdminOrders'
import AdminUsers from './pages/admin/AdminUsers'

const App = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route element={<AdminLayout />}>
                    <Route path='/admin/products' element={<AdminProduct />} />
                    <Route path='/admin/orders' element={<AdminOrders/>} />
                    <Route path='/admin/users' element={<AdminUsers />} />
                </Route>
            </Routes>
        </>
    )
}

export default App