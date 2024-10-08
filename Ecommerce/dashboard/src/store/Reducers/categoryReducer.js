﻿import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/api";

export const categoryAdd=createAsyncThunk(
    'category/categoryAdd',
    async({name,image},{rejectWithValue,fulfillWithValue})=>{
       
        try{
            const formData = new FormData()
            formData.append('name',name)
            formData.append('image',image)
            const {data}=await api.post('/category-add',formData,{withCredentials:false})
            //withCredentials:true  (video)
            //console.log(data)
            return fulfillWithValue(data)
        }catch(error){
            // console.log(error.response.data) 
            return rejectWithValue(error.response.data)
        }
    }
)

//End Method

export const get_category=createAsyncThunk(
    'category/get_category',
    async({parPage,page,searchValue},{rejectWithValue,fulfillWithValue})=>{

        try{
            
            const {data}=await api.get(`/category-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,{withCredentials:false})
            //withCredentials:true  (video)
           // console.log(data)
            return fulfillWithValue(data)
        }catch(error){
            // console.log(error.response.data) 
            return rejectWithValue(error.response.data)
        }
    }
)


// End Method
export  const categoryReducer=createSlice({
    name:'category',
    initialState:{
        successMessage:'',
        errorMessage:'',
        loader:false,
        categorys:[],
        totalCategory:0
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

        
        })
            .addCase(categoryAdd.fulfilled, (state, {payload}) => {
                state.loader = false;
                state.successMessage = payload.message
                state.categorys = [...state.categorys, payload.category]

            })

            .addCase(get_category.fulfilled, (state, {payload}) => {
                state.totalCategory = payload.totalCategory;
                state.categorys = payload.categorys;

            })
           
    }
})
export const {messageClear}=categoryReducer.actions
export default categoryReducer.reducer



// if (payload) {
//state.errorMessage = payload.error
// } else {
//     state.errorMessage="An Error occurred"
// }


   