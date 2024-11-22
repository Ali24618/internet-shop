import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Product from './components/prodid';
import Navbar from './navbar/navbar';
import Basket from './components/basket';
import AddProduct from './components/addpro';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/prodid/:id' element={<Product/>} />
          <Route path='/basket' element={<Basket />} />
          <Route path='/navbar' element={<Navbar />} />
          <Route path='/addpro' element={<AddProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;