import React, { useState, useEffect } from "react";
import {
  createCategory,
  listCategory,
  removeCategory,
} from "../../api/Category";
import useEcomStore from "./../../store/ecom-store";
import { toast } from "react-toastify";

const FormCategory = () => {
  // Create category
  const token = useEcomStore((state) => state.token);
  const [name, setName] = useState("");

  // list category
  const [cateogies, setCategories] = useState([]);
  useEffect(() => {
    getCategory(token);
  }, []);

  const getCategory = async (token) => {
    try {
      const res = await listCategory(token);
      // console.log(res)
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = async (id) => {
    // console.log(id)
    try {
      const res = await removeCategory(token, id);
      console.log(res);
      toast.success(`Delete ${res.data.name} Success`);
      getCategory(token);
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(token,name)
    if (!name) {
      return toast.warning("Pls fill data");
    }
    try {
      const res = await createCategory(token, { name });
      // console.log(res.data.name);
      toast.success(`Add Category ${res.data.name} Success`);
      getCategory(token);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container mx-auto p-4 bg-white shadow-md">
      <h1>Category Management</h1>

      <form className="my-4" onSubmit={handleSubmit}>
        <input
          // inputเดียวพูกกับ input ได้เลย
          onChange={(e) => setName(e.target.value)}
          className="border"
          type="text"
        />
        <button className="bg-blue-400">Add category</button>
      </form>
      {/* <hr /> */}
      <ul className="list-none">
        {cateogies.map((item, index) => (
          <li className="flex justify-between my-2" key={index}>
            <span>{item.name}</span>
            <button
              className="bg-red-500"
              onClick={() => {
                handleRemove(item.id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormCategory;
