import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import Title from './title'
import {List} from './list'
import Footer from './footer'
import {Login} from './login'

function header(){
  const [LoginID,setLoginID] = useState("");
  return(
    <>
        <BrowserRouter>
        <Title />
        <Routes>
          <Route path='/' element={<Login LoginID={LoginID} setLoginID={setLoginID}/>}></Route>
          <Route path='/list' element={<List LoginID={LoginID}/>}></Route>
        </Routes>
      </BrowserRouter>
    </>

  )
}



export default header