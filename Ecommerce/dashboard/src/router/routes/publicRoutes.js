import {lazy} from "react";
import { Navigate } from "react-router-dom";
const Login=lazy(()=>import( '../../views/auth/Login'))
const Register=lazy(()=>import('../../views/auth/Register'));


const publicRoutes=[
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/register',
        element:<Register/>
    },
    {
        path:'/',
        element:<Navigate to="/register" />
    }
]

export default publicRoutes