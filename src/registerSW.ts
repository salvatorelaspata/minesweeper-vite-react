import { registerSW } from 'virtual:pwa-register'

export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    const updateSW = registerSW({
      onNeedRefresh() {
        if (confirm('Nuovi contenuti disponibili. Aggiornare?')) {
          updateSW(true)
        }
      },
      onOfflineReady() {
        console.log('App pronta per funzionare offline')
        // Mostrare un messaggio all'utente
        const offlineToast = document.createElement('div')
        offlineToast.textContent = 'App pronta per funzionare offline!'
        offlineToast.style.position = 'fixed'
        offlineToast.style.bottom = '20px'
        offlineToast.style.left = '50%'
        offlineToast.style.transform = 'translateX(-50%)'
        offlineToast.style.backgroundColor = '#4caf50'
        offlineToast.style.color = 'white'
        offlineToast.style.padding = '16px'
        offlineToast.style.borderRadius = '4px'
        offlineToast.style.zIndex = '1000'
        document.body.appendChild(offlineToast)

        // Rimuovere il messaggio dopo 3 secondi
        setTimeout(() => {
          document.body.removeChild(offlineToast)
        }, 3000)
      },
      onRegisteredSW(swScriptUrl) {
        console.log('Service worker registrato con successo:', swScriptUrl)
      },
      onRegisterError(error) {
        console.error('Errore durante la registrazione del service worker:', error)
      }
    })
  }
}
