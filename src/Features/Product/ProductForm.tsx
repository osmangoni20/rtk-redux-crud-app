import React, {useEffect, useState } from 'react';

import { nanoid } from 'nanoid';
import { useAddProductMutation , useUpdateProductMutation} from '../../services/ProductsApi';
const ProductForm = ({productEdit,setProductEdit}) => {
    const[product,setProduct]=useState({
        Name:productEdit?.Name||"",
        Category:productEdit?.Category||"",
        Price:productEdit?.Price||0,
        Stock:productEdit?.Stock||0,
        Rating:productEdit?.Rating||0,
        ReleaseDate:productEdit?.ReleaseDate||'',
        Description:productEdit?.Description||""
    })
    const [isFromOpen, setFrom]=useState(false)
    const[addProduct]=useAddProductMutation()
    const [updateProduct]=useUpdateProductMutation()
    useEffect(() => {
        setProduct(productEdit)
        if(!isFromOpen){
            setFrom(true)
        }
        }, [productEdit])
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HandleInputField=(e:any)=>{
    setProduct({
        ...product,
        [e.target.name]:e.target.value
    })
}
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const HandleSubmit= async(e:any)=>{
        e.preventDefault()
      
      try {
        if(productEdit){
            updateProduct({id:productEdit.id, product})
        }
        else{
            await addProduct({...product, id:nanoid()})
        }
        
      } catch (error) {
        console.log(error)
      }
        setProduct({
            Name:"",
            Category:"",
            Price:0,
            Stock:0,
            Rating:0,
            ReleaseDate:'',
            Description:""
        })
    }
    return (
        <div className='flex justify-center'>
            
        <div className='my-3 '>
            <button onClick={()=>{setFrom(!isFromOpen); setProductEdit(null)}}  className='btn p-4 font-semibold text-xl bg-purple-800 text-white rounded-md'>Create A Product</button>
       
           {
            isFromOpen&& <form className='p-5 my-4  border-2 border-gray-400 text-xl'>
            <div className='m-2'>
                <label id='name' className='block font-bold text-xl'>Name</label>
                <input
                className='border-2 border-gray-300 rounded-md w-[350px]'
                type='text'
                id='name'
                name='Name'
                onChange={(e)=>HandleInputField(e)}

                value={product?.Name}
                />
            </div>
            <div className='m-2'>
            <label id='category' className='block font-bold text-xl'>Category</label>
                <input
                className='border-2 border-gray-300 rounded-md w-[350px]'
                type='text'
                id='category'
                name='Category'
                onChange={(e)=>HandleInputField(e)}
                value={product?.Category}
                />
            </div>
            <div className='m-2'>
            <label id='price' className='block font-bold text-xl'>Price</label>

                <input
                className='border-2 border-gray-300 rounded-md w-[350px]'
                type='number'
                name='Price'
                id='price'
                onChange={(e)=>HandleInputField(e)}

                value={product?.Price}
                />
            </div>
            <div className='m-2'>
            <label id='stock' className='block font-bold text-xl'>Stock</label>

                <input
                className='border-2 border-gray-300 rounded-md w-[350px]'
                type='number'
                id="stock"
                name='Stock'
                onChange={(e)=>HandleInputField(e)}

                value={product?.Stock}
                />
            </div>
            <div className='m-2'>
            <label id='description' className='block font-bold text-xl'>Description</label>

                <textarea
                className='border-2 border-gray-300 rounded-md w-[350px]'
                onChange={(e)=>HandleInputField(e)}
                name='Description'
                id='description'
                value={product?.Description}
                />
            </div>
            <div className='m-2 flex justify-center'>
              <button className='btn p-3 rounded-md bg-purple-500 text-white' type='submit'
               onClick={(e)=>HandleSubmit(e)}> {productEdit?"Update Product":"Create Product"}</button>
            </div>

        </form>
           }
            </div>
        </div>
    );
};

export default ProductForm;