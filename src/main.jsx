import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { InitialContextProvider } from './frontend/initialContext.jsx'

console.log(window.__FASTIFY_REACT_PROPS)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <InitialContextProvider>
      <App />
    </InitialContextProvider>
  </React.StrictMode>,
)
