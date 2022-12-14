import React, { useRef, useState } from 'react'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'

import './login-page.css'
import { useDispatch } from 'react-redux'
import { addUser } from '../../store/reducers/storeDataSlice'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const inputNameRef = useRef()
  const [input, setInput] = useState('')
  const dispatch = useDispatch()
  let navigate = useNavigate()

  const handlerAddUser = () => {
    dispatch(addUser(inputNameRef.current.value))
    navigate(-1)
  }

  return (
    <div className='LoginPage'>
      <TextField
        id='outlined-basic'
        placeholder='enter name'
        size='small'
        variant='outlined'
        className='input-name'
        inputRef={inputNameRef}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button
          variant='contained'
          className='user-enter-btn'
          disabled={input === '' ? true : false}
          onClick={handlerAddUser}
        >
          Enter
        </Button>
    </div>
  )
}

export default LoginPage
