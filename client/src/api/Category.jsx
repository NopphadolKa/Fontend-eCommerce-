import axios from 'axios'


export const createCategory = async(token,form) =>{
  return axios.post('http://localhost:5001/api/category',form,{
    headers:{
      Authorization:`Bearer ${token}`
    }
  })

}
// read Data to font
export const listCategory = async(token) =>{
  return axios.get('http://localhost:5001/api/category',{
    headers:{
      Authorization:`Bearer ${token}`
    }
  })

}
export const removeCategory = async(token,id) =>{
  return axios.delete('http://localhost:5001/api/category/'+id,{
    headers:{
      Authorization:`Bearer ${token}`
    }
  })

}