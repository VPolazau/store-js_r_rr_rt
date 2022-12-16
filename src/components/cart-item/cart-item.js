import React, { useEffect, useState } from 'react'
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import DeleteIcon from '@mui/icons-material/Delete'

import './cart-item.css'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'

import { addItemCart, decItemCart, removeItemCart } from '../../store/reducers/storeDataSlice'

const CartItem = ({ info }) => {
  const dispatch = useDispatch()
  const { id, img, count, price, title } = info
  const [isDeleted, setIsDeleted] = useState(false)

  useEffect(() => {
    if(!isDeleted) return
    const timer = setTimeout(() => dispatch(removeItemCart(id)), 2000)
    return () => {
      clearTimeout(timer)
    }
  }, [isDeleted])
  

  const dec = () => {
    dispatch(decItemCart(id))
  }

  const inc = () => {
    dispatch(addItemCart({ id }))
  }

  const removeItem = () => {
    setIsDeleted(true)
  }

  let classCartItem = 'CartItem'
  if(isDeleted) classCartItem += ' isDeleted'

  return (
    <div className={classCartItem}>
      <div className='imageUrl'>
        <img src={`${img}`} alt='cartItemImage' className='image' />
      </div>
      <div className='info'>
        <div className='title'>{title}</div>
        <div className='info-btns'>
          <div className='counter'>
            <Button
              variant='text'
              className='counter-btn'
              onClick={dec}
              disabled={count === 1 ? true : false}
            >
              <RemoveOutlinedIcon />
            </Button>
            {count}
            <Button variant='text' className='counter-btn' onClick={inc}>
              <AddOutlinedIcon />
            </Button>
          </div>
          <div className='result-price'>
            Payable price: {'\xa0'}
            {price * count}$
          </div>
          <Button variant='outlined' startIcon={<DeleteIcon />} onClick={removeItem} className='btn-del-cart'>
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CartItem
