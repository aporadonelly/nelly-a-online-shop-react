import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.scss'
import App from './App'
import { UserProvider } from './context/user.context'
import { ProductsProvider } from './context/products.context'
import { CartProvider } from './context/cart.context'

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProductsProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ProductsProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
