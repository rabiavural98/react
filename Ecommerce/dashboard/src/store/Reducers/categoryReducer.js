﻿import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api";

export const categoryAdd=createAsyncThunk(
    'category/categoryAdd',
    async({name,image},{rejectWithValue,fulfillWithValue})=>{
       
        try{
            const formData = new FormData()
            formData.append('name',name)
            formData.append('image',image)
            const {data}=await api.post('/category-add',formData,{withCredentials:true})
            //withCredentials:true  (video)
            console.log(data)
            return fulfillWithValue(data)
        }catch(error){
            // console.log(error.response.data) 
            return rejectWithValue(error.response.data)
        }
    }
)


export  const categoryReducer=createSlice({
    name:'category',
    initialState:{
        successMessage:'',
        errorMessage:'',
        loader:false,
        categorys:[]
    },
    reducers:{
        messageClear:(state)=>{
            state.errorMessage=""
        }
    },
    extraReducers: (builder)=> {
        builder
            .addCase(categoryAdd.pending, (state, {payload}) => {
                state.loader=true;
            })
            .addCase(categoryAdd.rejected, (state, {payload}) => {
                state.loader = false;
                state.errorMessage = payload.error
                
        //        if (payload) {
        //         state.errorMessage = payload.error
        //
        //    } else {
        //        state.errorMessage="An Error occurred"
        // }
        //
        
        })
            // .addCase(admin_login.fulfilled, (state, {payload}) => {
            //     state.loader = false;
            //     state.successMessage = payload.message
            //     state.token = payload.token
            //     state.role = returnRole(payload.token)
            //
            // })

    }
})
export const {messageClear}=categoryReducer.actions
export default categoryReducer.reducer



// if (payload) {
//state.errorMessage = payload.error
// } else {
//     state.errorMessage="An Error occurred"
// }