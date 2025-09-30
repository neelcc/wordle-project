import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Auth from './page/auth'
import Heading from './components/Heading'
import Playground from './page/Playground'
import { ToastContainer } from 'react-toastify';
import Home from './page/Home'
import { AppContext } from './context/AppContext'
import Modal from './components/Modal'
import Footer from './components/Footer'

const App = () => {
  const { showResultModal } = useContext(AppContext)
  return (
    <div className='relative ' >
      <Heading/>
      {
        showResultModal && <Modal/>
      }
      <ToastContainer position='top-right' style={{paddingTop:"38px" , paddingLeft:"10px" , paddingRight:'10px' }} />
        <Routes>
          <Route path='/' element={<Home/>}  />
          <Route path='/playground' element={<Playground/>}  />
          <Route path='/auth' element={<Auth/>}  />
        </Routes>
      <Footer/>
    </div>
  )
}
  
export default App
