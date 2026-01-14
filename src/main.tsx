import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SellProvider } from './context/SellContext.tsx'
import { PurchasesProvider } from './context/PurchasesDbContext.tsx'
import { OnlineProvider } from './context/OnlineContext.tsx'
import { BuyProvider } from './context/BuyContext.tsx'
import './index.css'
import App from './App.tsx'
import { registerSW } from 'virtual:pwa-register'
import { SalesDbProvider } from './context/salesDbContext.tsx'

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
      <BuyProvider>
        <OnlineProvider>
          <SalesDbProvider>
            <PurchasesProvider>
              <App />
            </PurchasesProvider>
          </SalesDbProvider>
        </OnlineProvider>
      </BuyProvider>
    </SellProvider>
  </StrictMode >,
)
