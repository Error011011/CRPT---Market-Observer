import { Route, Routes } from 'react-router'
import './App.css'
import Home from './pages/Home'
import Currency from './pages/Currency'
import Header from './components/Header'
import ScrollToTop from './components/ScrollToTop'

function App() {
 

  return (
    <>
      {/* header */}
      <Header/>
      {/* main */}
      <ScrollToTop/>
      <main>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/:id' element={<Currency/>}/>
        </Routes>
      </main>
    </>
  )
}

export default App
