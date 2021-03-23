import axios from 'axios'
import {
     PRODUCT_LIST_REQUEST,
     PRODUCT_LIST_SUCCESS,
     PRODUCT_LIST_FAIL,
     PRODUCT_DETAILS_REQUEST,
     PRODUCT_DETAILS_SUCCESS,
     PRODUCT_DETAILS_FAIL,
     PRODUCT_DELETE_REQUEST,
     PRODUCT_DELETE_SUCCESS,
     PRODUCT_DELETE_FAIL,
     PRODUCT_CREATE_REQUEST,
     PRODUCT_CREATE_SUCCESS,
     PRODUCT_CREATE_FAIL
    } from '../constants/productConstants'


export const listProducts = () => async (dispatch) => {
   try {
       dispatch({type: PRODUCT_LIST_REQUEST})
       const { data } = await axios.get('/api/products')
    //    console.log(data)
       dispatch({
           type: PRODUCT_LIST_SUCCESS,
           payload: data
       })
   } catch (error) {
    dispatch({
        type: PRODUCT_LIST_FAIL,
        payload: error.response && 
        error.response.data.message ? error.response.data.message : error.message
    })
   }
}

// dispatch details depending of id or throw err
export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST})
        const { data } = await axios.get(`/api/products/${id}`)
        console.log(data)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
     dispatch({
         type: PRODUCT_DETAILS_FAIL,
         payload: error.response && 
         error.response.data.message ? error.response.data.message : error.message
     })
    }
 }


 export const  deleteProduct = (id) => async(dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })
        const { userLogin: { userInfo } } = getState()
        //for middleware 
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        // delete
        const { data } = await axios.delete(`/api/products/${id}`, config)
         dispatch({
            type: PRODUCT_DELETE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response &&
            error.response.data.message ? error.response.data.message : error.message
        })
    }
}

    //create
    export const  createProduct = () => async(dispatch, getState) => {
        try {
            dispatch({
                type: PRODUCT_CREATE_REQUEST
            })
            const { userLogin: { userInfo } } = getState()
            //for middleware 
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            // create
            const { data } = await axios.post(`/api/products`, {} , config)
   
            dispatch({
                type: PRODUCT_CREATE_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: PRODUCT_CREATE_FAIL,
                payload: error.response &&
                error.response.data.message ? error.response.data.message : error.message
            })
        }

    }