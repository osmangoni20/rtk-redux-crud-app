
import { useState } from 'react'
import './App.css'
import ProductForm from './Features/Product/ProductForm'
import ProductView from './Features/Product/ProductView'

function App() {
  const [productEdit,setProductEdit]=useState(null)
  const onHandleEdit=(product:any)=>{
    setProductEdit(product)
  }
  return (
    <>
    <ProductForm productEdit={productEdit} setProductEdit={setProductEdit}/>
     <ProductView onHandleEdit={onHandleEdit}/>
    </>
  )
}

export default App
