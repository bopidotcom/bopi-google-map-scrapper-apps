import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css';

const checkingLicense = async () => {
  await window.license.isActivated()
  // keep watch license
  window.license.watchSerialKey();
}
checkingLicense();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
