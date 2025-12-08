import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SellProvider } from './context/SellContext.tsx'
import { OnlineProvider } from './context/OnlineContext.tsx'
import './index.css'
import App from './App.tsx'
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
    <OnlineProvider>
      <SellProvider>
        <App />
      </SellProvider>
    </OnlineProvider>
  </StrictMode>,
)
