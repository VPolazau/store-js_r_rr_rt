import React from 'react'

import { IconButton, Rating, Tooltip } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import Skeleton from '@mui/material/Skeleton'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'

import './item-view.css'

const ItemView = ({ dataLoadState, info, onItemClicked, addToCart, user, isInCart }) => {
  const { imageUrl, title, rating, price, discountPercentage } = info

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
        <Tooltip
          title={
            user.isEntered ? '' : 'You must be logged in to add this product to your cart'
          }
        >
          <span>
            <IconButton
              color='primary'
              aria-label='add to shopping cart'
              onClick={addToCart}
              disabled={user.isEntered ? (isInCart ? true : false) : true}
            >
              <AddShoppingCartIcon />
            </IconButton>
          </span>
        </Tooltip>
      </div>
    </>
  )

  let classItemContent = 'content'
  let classItemIcon = 'cart-icon'
  if (isInCart && dataLoadState === 1) {
    classItemContent += ' inCart'
    classItemIcon += ' inCart'
  }

  return (
    <div className='ItemView' onClick={onItemClicked}>
      <div className={classItemContent}>
        {dataLoadState === 0 && onLoadView}
        {dataLoadState === 1 && view}
      </div>
      <div className={classItemIcon}>
        <ShoppingCartOutlinedIcon sx={{ fontSize: 100 }} />
      </div>
    </div>
  )
}

export default ItemView
