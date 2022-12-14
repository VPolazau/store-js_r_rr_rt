import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { IconButton, Rating } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import Skeleton from '@mui/material/Skeleton'

import { addItemCart } from '../../store/reducers/storeDataSlice'

import './item.css'

const Item = ({ id, info }) => {
  const dispatch = useDispatch()
  const loadingType = useSelector(store => store.storeData.dataLoadState)
  const user = useSelector(store => store.storeData.user)
  let navigate = useNavigate()
  const { imageUrl, title, rating, price, discountPercentage } = info

  const onItemClicked = () => {
    user.isEntered
      ? navigate(`/user-${user.name}/product/${id}`)
      : navigate(`/user-guest/product/${id}`)
  }

  const addToCart = (event) => {
    event.stopPropagation()
    dispatch(addItemCart({id, img: imageUrl, title, count: 1, price}))
  }

  const onLoadView = (
    <>
      <Skeleton
        animation='wave'
        width={230}
        height={300}
        sx={{ top: '-50px', marginBottom: -40 }}
      />
      <Skeleton animation='wave' height={20} width='80%' style={{ marginBottom: 6 }} />
      <Skeleton animation='wave' height={20} width='60%' style={{ marginBottom: 6 }} />
      <Skeleton
        animation='wave'
        height={20}
        width='40%'
        style={{ marginBottom: 'auto' }}
      />
    </>
  )

  const view = (
    <>
      <div className='imageUrl'>
        <img src={`${imageUrl}`} alt='itemImage' className='image' />
      </div>
      <div className='title'>{title}</div>
      <div className='rating'>
        {rating}
        {'\xa0'}
        {'\xa0'}
        <Rating
          name='half-rating-read'
          defaultValue={rating}
          precision={0.1}
          readOnly
          size='small'
        />
      </div>
      <div className='price_n_btn'>
        <div className='price'>
          <span className='with-discount'>{price}$</span>
          <span className='without-discount'>
            {(price * discountPercentage).toFixed(0)}$
          </span>
        </div>
        <IconButton color='primary' aria-label='add to shopping cart' onClick={addToCart} disabled={user.isEntered ? false : true}>
          <AddShoppingCartIcon />
        </IconButton>
      </div>
    </>
  )

  return (
    <div className='Item' onClick={onItemClicked}>
      {loadingType === 0 && onLoadView}
      {loadingType === 1 && view}
    </div>
  )
}

export default Item
