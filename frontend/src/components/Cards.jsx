import React from "react";

function Cards({ item }) {
  return (
    <>
    <div className="mt-4 my-3 p-3">
      <div className="card w-80 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
        <figure>
          <img className=""
            src={item.image}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {item.name}
            <div className="badge badge-secondary">{item.category}</div>
          </h2>
          <p>
            {item.title}
          </p>
          <div className="card-actions flex justify-between">
            <div className="badge badge-outline p-4 cursor-pointer">${item.price}</div>
            <div className="badge badge-outline p-4 cursor-pointer hover:bg-pink-500 duration-200 ">Buy Now</div>
          </div>
        </div>
      </div>

    </div>
    </>
  );
}

export default Cards;
