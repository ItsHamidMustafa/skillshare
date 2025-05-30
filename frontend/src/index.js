import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import { ProductsContextProvider } from "./context/ProductsContext";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
      {/* <ProductsContextProvider> */}
        <App />
      {/* </ProductsContextProvider> */}
    </AuthContextProvider>
);