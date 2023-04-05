import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userLogin=createAsyncThunk('login/userLogin',async(userCredObj,{rejectWithValue})=>{
    try{
    console.log("Object in middleware",userCredObj)
    let res=await axios.post("http://localhost:4000/user/loginUser",userCredObj)
    console.log(res)
    //store token in local/session storage
    if(res.data.message==="Login successfull"){
        sessionStorage.setItem("token",res.data.payload);
        localStorage.setItem("token",JSON.stringify(res.data.payload));
        localStorage.setItem("user",JSON.stringify(res.data.user))
        localStorage.setItem("status","success");
        return res.data
    }
    else{
            throw new Error(res.data.message);
        }
    }catch(err){
        return rejectWithValue(err);
    }
    
})
let user=localStorage.getItem("user")
console.log("User after getting from local",JSON.parse(user))
if(user){
    user=JSON.parse(user)
}
else{
    user={}
}
let status=localStorage.getItem("status")
export const loginSlice=createSlice({
    name:"login",
    initialState:{
        userObj:user,
        userLoginStatus: false,
        errorMessage: "",
        status: status
    },
    reducers:{
        clearState:(state,action)=>{
            localStorage.clear()
            state.userObj={}
            state.errorMessage=""
            state.status="idle"
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(userLogin.pending,(state,action)=>{
            state.status='pending'
        });
        builder.addCase(userLogin.fulfilled,(state,action)=>{
            state.userObj=action.payload.user;
            console.log("action object is ",action)
            state.userLoginStatus=true;
            state.errorMessage="";
            state.status='success'
        });
        builder.addCase(userLogin.rejected,(state,action)=>{
            state.errorMessage=action.payload.message;
            state.userLoginStatus=false;
            state.status='failed'
        });
    
    }
})

export const {clearState}=loginSlice.actions

export default loginSlice.reducer