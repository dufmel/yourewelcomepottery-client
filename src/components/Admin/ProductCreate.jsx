import React, { useEffect, useId, useState }from 'react'
import { TextField, Button, Radio, FormControlLabel, FormControl, FormLabel, RadioGroup } from '@mui/material'

import axios from 'axios'
import "./ProductCreate.css"
function ProductCreate( {productCreated, setProductCreated}) {
const [ selectedFile, setSelectedFile ] = useState(null)
const [ altText, setAltText ] = useState('')
const [ productName , setProductName ] = useState('')
const [ description, setDescription ] = useState('')
const [price, setPrice ] = useState("")
const [ quantity, setQuantity ] = useState("")
const [ tag, setTag ] = useState("")

const upload = async (e) => {
    e.preventDefault()

    //Create an object of formData

    let formData = new FormData();

    //Add the file to formData
    formData.append('file', selectedFile)
    formData.append('altText', altText)
    formData.append('productName', productName)
    formData.append('description', description)
    formData.append('price', price)
    formData.append('quantity', quantity)
    formData.append('tag', tag)

    // Submit form-data
    try{
            const response = await axios.post('http://127.0.0.1:4000/products/create', 
            formData,{
            headers: {
                'Authorization':localStorage.getItem('token'),
                'Content-Type':'multipart/form-data'
            },
            })
            window.alert("Product created successfully")
            setProductCreated(!productCreated)
            setAltText("")
            setProductName("")
            setDescription("")
            setPrice("")
            setQuantity("")
            setTag("")
    }catch(err){
        if ((err.response.data.message).includes("fields") || (err.response.data.message).includes("buffer")){
            window.alert("fill in all required fields")
        }
        if ((err.response.data.message).includes("Cast")){
            window.alert("One or more of your inputs is invalid") 
    }
        
    }
}

let handleTagChange = (e) => {
    setTag(e.target.value)

}

    


    return (
    <>
        <form action="POST"
        id="form">
            <h2>Upload Product </h2>
        <input
        type="file"
        accept="image/*"
        id="file"
        onChange={e => setSelectedFile(e.target.files[0])}
        />
        <TextField
            type="altText"
            name="altText"
            id="altText"
            variant='outlined'
            size='small'
            label="Alt Text"
            value={altText}
            onChange={e => setAltText(e.target.value)}
            placeholder='Alt Text'
        />
        <TextField
            type="productName"
            name="productName"
            id="productName"
            variant='outlined'
            size='small'
            label="Product Name"
            value={productName}
            onChange={e => setProductName(e.target.value)}
            placeholder="Product Name"
        />
        <TextField
            type="price"
            name="price"
            id="price"
            accept='number'
            variant='outlined'
            size='small'
            label="Price (Numbers only)"
            value={price}
            onChange={e => setPrice(e.target.value)}
            placeholder="$0"
        />
            <TextField
            type="description"
            name="description"
            id="description"
            variant='outlined'
            size='small'
            label=" Product Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder='Product Description'
        />
            <TextField
            type="quantity"
            name="quantity"
            id="quantity"
            accept="number"
            variant='outlined'
            size='small'
            label="Quantity (Numbers only)"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            placeholder="quantity"
        />
        {/* For this item, I want to create a drop down menu */}
    <FormControl>
         <FormLabel id="Tag">Tag</FormLabel>

         <RadioGroup >
        <FormControlLabel value="Fall" onChange={handleTagChange} control={<Radio />} label="Fall" />
        <FormControlLabel value="Winter" onChange={handleTagChange} control={<Radio />} label="Winter" />
        <FormControlLabel value="Spring" onChange={handleTagChange} control={<Radio />} label="Spring" />
        <FormControlLabel value="Summer" onChange={handleTagChange} control={<Radio />} label="Summer" />
        </RadioGroup>

    </FormControl>
<Button variant='contained' type="submit" onClick={upload}>Submit</Button>

        </form>
    </>
  )
}

export default ProductCreate