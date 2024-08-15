import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteProductMutation, useGetPokemonByNameQuery, useGetProductsQuery } from "../../services/ProductsApi";

interface TProduct {
  ID: number;
  Name: string;
  Category: string;
  Price: number;
  Stock: number;
  Rating: number;
  ReleaseDate: string;
  Description: string;
  id:string
}
const ProductView = ({onHandleEdit}) => {

    const { data, error, isLoading } = useGetProductsQuery()
    const [deleteProduct]=useDeleteProductMutation()

    const handleDelete=async(id)=>{
        await deleteProduct(id)
    }
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <section className="p-10 flex flex-wrap gap-5 items-center justify-center">
        {data&&!error&&data.map((product: TProduct) => {
          return (
            <div
              key={product.id}
              className="p-5 text-black h-[300px] hover:-translate-y-2 hover:translate-x-2 transition-all duration-300 ease-in-out  hover:shadow-lg shadow-slate-400 border-2 border-gray-400 bg-gray-100 w-[300px] rounded-md"
            >
              <h3 className="text-2xl font-bold p-2">{product.Name}</h3>
              <h6>{product.Category}</h6>
              <h6>{product.Price}</h6>
              <p>{product.Description}</p>
              <div className="flex justify-center items-center">
              <button
                onClick={() => {handleDelete(product.id)}}
                className="btn px-5 bg-red-500 text-white font-semibold rounded border-2 border-gray-300"
              >
                Delete
              </button>
              <button
                onClick={() => onHandleEdit(product)}
                className="btn px-5 bg-green-500 text-white font-semibold rounded border-2 border-gray-300"
              >
                Edit
              </button>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default ProductView;
