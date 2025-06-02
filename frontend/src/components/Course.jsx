import React from "react";
import Cards from "./Cards";
// import list from "../../public/list.json";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios'

// connected to backend
const Course = () => {
  const [book, setBook]=useState([])
  useEffect(()=>{
    const getBook=async()=>{
      try {
       const res=await axios.get('http://localhost:4001/book')
       console.log(res.data)
       setBook(res.data)
      } catch (error) {
        console.log("error", error)
      }
    }
    getBook();
  },[])
  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-30 items-center justify-center text-center">
          <h1 className="text-2xl  md:text-4l">
            We're delight to have you{" "}
            <span className="text-pink-500">Here!:)</span>{" "}
          </h1>
          <p className="mt-12 ">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda
            tempore quia perferendis! Porro accusantium adipisci impedit
            reprehenderit excepturi voluptatibus repellendus nisi molestias vel
            veritatis expedita soluta saepe ut temporibus et ducimus, ad
            possimus commodi dignissimos consequuntur quod minus ipsa
            perspiciatis recusandae! Nostrum dolorem incidunt libero, alias et
            ab adipisci tempora.
          </p>
          <Link to='/'>
            <button className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300 mt-6 cursor-pointer">
              Back
            </button>
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-7">
          {book.map((item) => (
            <Cards key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Course;
