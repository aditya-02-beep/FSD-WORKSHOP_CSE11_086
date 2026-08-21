import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './components/Home.jsx'
import About from './components/About.jsx'  

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Home/>
    <About/>
  </StrictMode>,
)
