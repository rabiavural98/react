﻿import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api";
import {jwtDecode} from "jwt-decode";

export const admin_login=createAsyncThunk(
    'auth/admin_login',
    async(info,{rejectWithValue,fulfillWithValue})=>{
        console.log(info)
        try{
           const {data}=await api.post('/admin-login',info,{withCredentials:false})
            console.log(data)
         localStorage.setItem('accessToken',data.token)
            return fulfillWithValue(data)
        }catch(error){
          // console.log(error.response.data) 
            return rejectWithValue(error.response.data)
        }
    }
)

export const seller_login=createAsyncThunk(
    'auth/seller_login',
    async(info,{rejectWithValue,fulfillWithValue})=>{
        console.log(info)
        try{
            const {data}=await api.post('/seller-login',info,{withCredentials:false})
            localStorage.setItem('accessToken',data.token)
            // console.log(data)
            return fulfillWithValue(data)
        }catch(error){
            // console.log(error.response.data) 
            return rejectWithValue(error.response.data)
        }
    }
)



export const get_user_info=createAsyncThunk(
    'auth/get_user_info',
    async(_,{rejectWithValue,fulfillWithValue})=>{
        //console.log(info)
        try{
            const {data}=await api.get('/get_user',{withCredentials:false})
            //localStorage.setItem('accessToken',data.token)
            //console.log(data)
            return fulfillWithValue(data)
        }catch(error){
            // console.log(error.response.data) 
            return rejectWithValue(error.response.data)
        }
    }
)




export const profile_image_upload=createAsyncThunk(
    'auth/profile_image_upload',
    async(image,{rejectWithValue,fulfillWithValue})=>{
        //console.log(info)
        try{
            const {data}=await api.post('/profile-image-upload',image,{withCredentials:false})
            //localStorage.setItem('accessToken',data.token)
            //console.log(data)
            return fulfillWithValue(data)
        }catch(error){
            // console.log(error.response.data) 
            return rejectWithValue(error.response.data)
        }
    }
)

//end method



export const seller_register=createAsyncThunk(
    'auth/seller_register',
    async(info,{rejectWithValue,fulfillWithValue})=>{
        try{
            console.log(info)
            const {data}=await api.post('/seller-register',info,{withCredentials:false})
            //localStorage.setItem('accessToken',data.token)
            console.log(data)
            return fulfillWithValue(data)
        }catch(error){
            // console.log(error.response.data) 
            return rejectWithValue(error.response.data)
        }
    }
)

const returnRole=(token)=>{
    if(token){
        const decodeToken=jwtDecode(token)
        const expireTime=new Date(decodeToken.exp*1000)
        if(new Date()>expireTime){
            localStorage.removeItem('accessToken')
            return ''
        }else{
            return decodeToken.role
        }
        //console.log(decodeToken)
        //console.log(token)
    }else{
        return ''
    }
}



export  const authReducer=createSlice({
    name:'auth',
    initialState:{
        successMessage:'',
        errorMessage:'',
        loader:false,
        userInfo:'',
        role:returnRole(localStorage.getItem('accessToken')),
        token:localStorage.getItem('accessToken')
    },
    reducers:{
        messageClear:(state)=>{
            state.errorMessage=""
        }
    },
    extraReducers: (builder)=> {
        builder
        .addCase(admin_login.pending, (state, {payload}) => {
       state.loader=true;
        })
        .addCase(admin_login.rejected, (state, {payload}) => {
            state.loader = false;
            state.errorMessage = payload.error
        })
        .addCase(admin_login.fulfilled, (state, {payload}) => {
            state.loader = false;
            state.successMessage = payload.message
            state.token = payload.token
            state.role = returnRole(payload.token)
            
        })

            .addCase(seller_login.pending, (state, {payload}) => {
                state.loader=true;
            })
            .addCase(seller_login.rejected, (state, {payload}) => {
                state.loader = false;
                state.errorMessage = payload.error
            })
            .addCase(seller_login.fulfilled, (state, {payload}) => {
                state.loader = false;
                state.successMessage = payload.message
                state.token = payload.token
                state.role = returnRole(payload.token)
            })
            
            
            .addCase(seller_register.pending, (state, {payload}) => {
                state.loader=true;
            })
            .addCase(seller_register.rejected, (state, {payload}) => {
                state.loader = false;
                state.errorMessage = payload.error
            })
            .addCase(seller_register.fulfilled, (state, {payload}) => {
                state.loader = false;
                state.successMessage = payload.message
                state.token = payload.token
                state.role = returnRole(payload.token)
                
            })      
            .addCase(get_user_info.fulfilled, (state, {payload}) => {
                state.loader = false;
                state.userInfo = payload.userInfo
            })

            .addCase(profile_image_upload.pending, (state, {payload}) => {
                state.loader = true;
              //  state.userInfo = payload.userInfo
            })

            .addCase(profile_image_upload.fulfilled, (state, {payload}) => {
                state.loader = false;
                state.userInfo = payload.userInfo
                state.successMessage = payload.message

            })
        
        }
})
export const {messageClear}=authReducer.actions
export default authReducer.reducer

