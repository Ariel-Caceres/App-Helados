import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SellProvider } from './context/SellContext.tsx'
import './index.css'
import App from './App.tsx'
// register SW
import { registerSW } from 'virtual:pwa-register'

registerSW({
  immediate: true,
  onNeedRefresh() {
    console.log("Nueva versión disponible")
  },
  onOfflineReady() {
    console.log("App lista offline")
  }
})

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <SellProvider>
      <App />
    </SellProvider>
  </StrictMode>,
)
