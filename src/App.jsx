import { useState } from 'react'
import Title from './title'
import {List} from './list'
import Footer from './footer'
import {Login} from './login'

function header(){
  return(
    <>
    <Title />
    <div className='list'>
    <List  />
    </div>
    <Footer />

    <Login />
    </>

  )
}



export default header