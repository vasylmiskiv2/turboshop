import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap'
import { listProductDetails} from '../actions/productActions'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'


const ProductScreen = ({match}) => {
   const dispatch = useDispatch()
   const productDetails = useSelector( state => state.productDetails)
   const { loading, error, product } = productDetails
         useEffect(() => {
           dispatch(listProductDetails(match.params.id))
          
        }, [dispatch, match])
        console.log(productDetails)
 
    return (
    
        <div>
            <Link className= 'btn btn-dark my-3' to ='/'>
            GO BACK
            </Link>
            {loading ? <Loader/>: error ? <Message variant = "danger">{error}</Message> :
            (
                <Row>
            <Col md ={5}>
                <Image src = {product.image} alt = {product.name} fluid/>
            </Col>
            <Col md ={4}>
                <ListGroup variant = 'flush'>
                    <ListGroup.Item>
                        <h2>{product.name}</h2>
                    </ListGroup.Item>
                   <ListGroup.Item>
                       <Rating value = {product.rating}
                        text = {`${product.numReviews} reviews`}
                        color = {'#ff6863'} 
                    />
                   </ListGroup.Item>
                   <ListGroup.Item>
                     <strong>Price: </strong>  <i>${product.price}</i>
                   </ListGroup.Item>
                   <ListGroup.Item>
                     <strong>Description:</strong> <br/> {product.description}
                   </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md = {3}>
                <Card>
                    <ListGroup variant = 'flush'>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                  Price:
                                </Col>
                                <Col>
                                    <strong>
                                        ${product.price}
                                    </strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Status:
                                </Col>
                                <Col>
                                    <strong>
                                        {product.countInStock > 0 ? 'In stock' : 'Out of Stock'}
                                    </strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button className = 'btn-block' type = 'button' disabled = {product.countInStock === 0}>
                                Add to cart
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
            </Row>
            )
            }
            
        </div>
       
        )
   
}

export default ProductScreen
