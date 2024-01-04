import axios from "axios";
import {
  LOGIN,
  REGISTER,
  CREATE_TODO,
  LIST_TODO,
  DELETE_TODO,
  UPDATE_TODO,
} from "./apiConstants.js";
export const login = async (data) => {
  return axios.post(LOGIN, data);
};
export const register = async (data) => {
  return axios.post(REGISTER, data);
};
export const create_todo = async (data) => {
  let token = gettoken();

  return axios.post(CREATE_TODO, data, {
    headers: {
      auth: token,
    },
  });
};
export const list_todo = async (data) => {
  let token = gettoken();

  return axios.get(LIST_TODO, {
    headers: {
      auth: token,
    },
  });
};
export const delete_todo = async (data) => {
  let token = gettoken();

  return axios.post(DELETE_TODO,
   data
 ,{
  
    headers: {
      auth: token,
      
    },
    
  });
  

};
export const update_todo=(data)=>{
    let token = gettoken();
  
    return axios.post(UPDATE_TODO,
     data
   ,{
    
      headers: {
        auth: token,
        
      },
      
    });
    
  
  };
export const gettoken = () => {
  let user = localStorage.getItem("user");
  if (user) {
    const userObj = JSON.parse(user);
    return userObj.token;
  }
};
