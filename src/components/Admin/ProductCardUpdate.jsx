import React, {useState, useEffect, useRef} from 'react'
import { TextField, Radio, FormControlLabel, FormControl, FormLabel, RadioGroup } from '@mui/material'
import Modal from '@mui/material/Modal'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TroubleshootRounded } from '@mui/icons-material';
import axios from 'axios';
function ProductCardUpdate({ productCreated }) {
    let [products, setProducts] = useState([])
    const [ altText, setAltText ] = useState('')
    const [ productName , setProductName ] = useState('')
    const [ description, setDescription ] = useState('')
    const [price, setPrice ] = useState("")
    const [ quantity, setQuantity ] = useState("")
    const [ tag, setTag ] = useState("")
    let [idContent, setIdContent] = useState("")
    let [selectedFile, setSelectedFile] = useState(null)
    let [updateContent, setUpdateContent] = useState(false)
    let [updateImage, setUpdateImage] = useState(false)
    let [deleteProduct, setDeleteProduct] = useState(false)
    let [refresh, setRefresh] = useState(false)
    const [isModalOpen, setModalOpen] = useState(true);

    let fetchData = async () => {fetch("http://127.0.0.1:4000/products/all", {
        method: "GET",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => res.json())
        .then((data) => setProducts(data))};
       
    useEffect(() => {
        let fetchDataUpdate = async() =>{
            await fetchData()
        }
        fetchDataUpdate()

        
      }, [refresh, productCreated])



      const update = async (e) => {
        e.preventDefault()
    
    
        //Create an object of formData
    
        let formData = new FormData();
    
        //Add the file to formData
        
        formData.append('altText', altText)
        formData.append('productName', productName)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('quantity', quantity)
        formData.append('tag', tag)
    
        // Submit form-data
    
        try{
                const response = await axios.put(`http://127.0.0.1:4000/products/update/${idContent}`, 
                formData,{
                headers: {
                    'Authorization':localStorage.getItem('token'),
                    'Content-Type':'multipart/form-data'
                },
               
                })
                setRefresh(!refresh)
                handleCloseModel()
        }catch(err){
            console.log(err)

        if ((err.response.data.message).includes("Cast")){
            window.alert("One or more of your inputs is invalid") 
    }
        
        }
            
        
    }

    let updateImg = async (e) => {
        e.preventDefault()
        let formData = new FormData();
        formData.append('file', selectedFile)
    
        try{
            let response = await axios.put(`http://127.0.0.1:4000/products/updateImg/${idContent}`, 
            formData,{
            headers: {
                'Authorization':localStorage.getItem('token'),
                'Content-Type':'multipart/form-data'
            },
            })
            setRefresh(!refresh)
            handleCloseModel()
        }
    
        catch(err){
                console.log(err)
            }
    
    }


let deleteProd = async (e)=> {
    try{
    e.preventDefault()
    let response = await axios.delete(`http://127.0.0.1:4000/products/delete/${idContent}`,
    {headers: {
        'Authorization':localStorage.getItem('token'),
        'Content-Type': 'multipart/form-data'
    },

    })
    setRefresh(!refresh)
    handleCloseModel()
    }
    catch (err) {
        console.log(err)
            
    }
}

    
    let handleTagChange = (e) => {
        setTag(e.target.value)
    
    }

    let handleUpdateContent = (id) => {
        setIdContent(id)
        setUpdateContent(true)
        setUpdateImage(false)
        setDeleteProduct(false)
    }
    
    let handleUpdateImage = (id) => {
        setIdContent(id)
        setUpdateImage(true)
        setUpdateContent(false)
        setDeleteProduct(false)
    
    }

    let handleDeleteProduct = (id) => {
        setIdContent(id)
        setDeleteProduct(true)
        setUpdateContent(false)
        setUpdateImage(false)
    
    }

    let handleOpenModel = () => {
        setModalOpen(true)
    }

    let handleCloseModel = () => {
        setModalOpen(false)
    }

    



  return (
    <>
    <h2>Update Content</h2>
    {updateContent?
    <Modal id ="modal" open={isModalOpen} onClose={handleCloseModel}>
    <form action="POST" id ="formContent">
        <h2>Update Product Content </h2>
        <p>*Leave any unchanged fields empty*</p>

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
     <RadioGroup>
    <FormControlLabel value="Fall"  control={<Radio />}  onChange={handleTagChange} label="Fall" />
    <FormControlLabel value="Winter" control={<Radio />} onChange={handleTagChange} label="Winter" />
    <FormControlLabel value="Spring" control={<Radio />} onChange={handleTagChange} label="Spring" />
    <FormControlLabel value="Summer" control={<Radio />}  onChange={handleTagChange} label="Summer" />
    </RadioGroup>

</FormControl>
<Button variant='contained' type="submit" onClick={(e)=> update(e)}>Update </Button>
</form>
</Modal>
    : updateImage?  
    <Modal id ="modal" open={isModalOpen} onClose={handleCloseModel}>
        <form  action="POST" id ="formContent">
        <h2>Update Product Image </h2>
        <input
        type="file"
        accept="image/*"
        id="file"
        onChange={e => setSelectedFile(e.target.files[0])}
        />
        <Button  variant='contained' type="submit" onClick={(e)=> updateImg(e)}>Update Image </Button>
        </form>
        </Modal> 
        : deleteProduct ? 
        <Modal id="modal" open={isModalOpen} onClose={handleCloseModel}>
            <form id ="formContent" action="POST">
                <h2>Are you sure you want to delete this item?</h2>
         <Button id="button"  variant='contained' type="submit" onClick={(e)=> deleteProd(e)}>Delete Product </Button>
         </form>
         </Modal> 
        : null}
    <div id="cards">
    {
    products.map((product) => {
        return(
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia
        component="img"
        alt={product.altText}
        height="400"
        image={product.imageUrl}
      />
      <CardContent>
        <Typography gutterBottom variant="h7" component="div">
          {`Name: ${product.productName}`}
        </Typography>
        <Typography gutterBottom variant="h7" component="div">
          {`Price: $${product.price}`}
        </Typography>
        <Typography gutterBottom variant="h7" component="div">
          {`Quantity: ${product.quantity}`}
        </Typography>
        <Typography gutterBottom variant="h7" component="div">
          {`altText: ${product.altText}`}
        </Typography>
        <Typography gutterBottom variant="h7" component="div">
          {`Tag: ${product.tag}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=>{handleUpdateContent(product._id); handleOpenModel()}}>Update Content</Button>
        <Button size="small" onClick={() => {handleUpdateImage(product._id); handleOpenModel()}}>Update Image</Button>
        <Button  size="small" onClick={() =>{handleDeleteProduct(product._id); handleOpenModel()}}>Delete</Button>
      </CardActions>
    </Card>)
    
    })}
    </div>
    </>
    )



  
}

export default ProductCardUpdate