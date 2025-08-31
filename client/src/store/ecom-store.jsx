import axios from "axios";
import { create } from 'zustand'
import { persist, createJSONStorage } from "zustand/middleware"; // Get data into local storage

const ecomStore = (set) => ({
  // key:value
  user: null,
  token:null,
  actionLogin: async(form) =>{
    const res = await axios.post('http://localhost:5001/api/login',form)
    // console.log(res.data.token)
    set({
      // setค่าลงใน user,token
      user:res.data.payload,
      token: res.data.token
    })
    return res
  }
})

// นำข้อมูลเข้า storage 
const usePersist = {
  name: 'ecom-store',
  Storage: createJSONStorage(()=>localStorage)
}
const useEcomStore = create(persist(ecomStore,usePersist))

export default useEcomStore