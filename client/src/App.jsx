import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Auth from './page/auth'
import Heading from './components/Heading'
import Playground from './page/Playground'
import { ToastContainer } from 'react-toastify';
import Home from './page/Home'

const App = () => {
  return (
    <div>
      <Heading/>
      <ToastContainer position='top-right' style={{paddingTop:"38px" , paddingLeft:"10px" , paddingRight:'10px' }} />
        <Routes>
          <Route path='/' element={<Home/>}  />
          <Route path='/playground' element={<Playground/>}  />
          <Route path='/auth' element={<Auth/>}  />
        </Routes>
    </div>
  )
}

export default App
