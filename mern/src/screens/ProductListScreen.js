import React, {useEffect}from 'react'
import  {LinkContainer} from 'react-router-bootstrap'
import {Table,Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from "../components/Message"
import {listProducts, deleteProduct, createProduct} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'


const ProductListScreen = ({history, match}) => {
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin   

    const productDelete = useSelector(state => state.productDelete)
    const { success: successDelete, loading: loadingDelete, error: errorDelete, product: deletedProduct } = productDelete 

    const productCreate = useSelector(state => state.productCreate)
    const { success: successCreate, loading: loadingCreate, error: errorCreate, product: createdProduct } = productCreate 

    useEffect(() => {
        dispatch({type:PRODUCT_CREATE_RESET})
        if(!userInfo.isAdmin) {
            history.push('/login')
        } 
        if(successCreate) {
            history.push(`admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts())
        }
    }, [
        dispatch,
        userInfo,
        history,
        successDelete,
        successCreate,
        createdProduct
    ])

    const deleleteHandler = (id) => {
        if(window.confirm('Do u confirm it?')){
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }

    console.log(createdProduct)
    return (
        <>
        <Row className = "align-items-center">
            <Col>
            <h1>Products</h1>
            </Col>
            <Col className = "text-right">
                <Button className = "my-3" onClick = {createProductHandler}>
                     <i className = "fas fa-plus"></i>   Create a Product
                </Button>
            </Col>
        </Row>
          <h1>Users</h1>

          {loadingDelete && loadingCreate && (<Loader/>) }
          {errorDelete && (<Message variant = "danger">{errorDelete}</Message>) }
          {successDelete && (<Message variant = "primary">{deletedProduct.message}</Message>)}

          {errorCreate && (<Message variant = "danger">{errorCreate}</Message>) }
          {successCreate && (<Message variant = "primary">{createdProduct.message}</Message>)}
          {loading ? <Loader/> : error ? <Message variant = "danger">{error}</Message>
          : (
              <Table striped bordered hover variant="dark" responsive className = "table-sm">
                  <thead>
                      <tr>
                          <th>ID</th>
                          <th>NAME</th>
                          <th>PRICE</th>
                          <th>CATEGORY</th>
                          <th>BRAND</th>
                          <th>TOOLS</th>
                      </tr>
                  </thead>
                  <tbody>
                        {products.map(product => (
                            <tr key = {product._id}>
                               <td>{product._id}</td> 
                               <td>{product.name}</td> 
                               <td>
                               ${product.price}
                               </td>
                                <td>
                                    {product.category}
                                </td>
                                <td>
                                    {product.brand}
                                </td>
                               <td>
                                   <LinkContainer to = {`/admin/product/${product._id}/edit`}>
                                       <Button variant = "light" className = "btn-sm">
                                           <i className = "fas fa-edit"></i>
                                       </Button>
                                   </LinkContainer>
                
                                    <Button variant = "danger" className = "btn-sm" onClick = {()=>{
                                            deleleteHandler(product._id)
                                        }}>
                                            <i className = "fas fa-trash"></i>
                                        </Button>
                                        
                                   
                               </td>
                            </tr>
                      ))
                    }
                  </tbody>
              </Table>
              
          )}  
  
        </>
    )
}


export default ProductListScreen