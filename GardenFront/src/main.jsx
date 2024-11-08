import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { HashRouter } from 'react-router-dom'
import { SpinnerProvier } from './components/Spinner/Spinner.jsx'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'


axios.defaults.baseURL = "http://localhost:8000"
ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <HashRouter>
      <SpinnerProvier>
        <App />
      </SpinnerProvier>
    </HashRouter>
  </AuthContextProvider>
)
