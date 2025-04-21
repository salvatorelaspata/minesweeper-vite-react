import React, { useEffect, useState } from 'react';
import './InstallPWA.css';

const InstallPWA: React.FC = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Verifica se l'app è già installata
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    const handler = (e: any) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const onInstallClick = () => {
    if (!promptInstall) return;

    promptInstall.prompt();

    promptInstall.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('Utente ha accettato l\'installazione della PWA');
        setIsInstalled(true);
      } else {
        console.log('Utente ha rifiutato l\'installazione della PWA');
      }

      setPromptInstall(null);
    });
  };

  if (!supportsPWA || isInstalled) return null;

  return (
    <div className="install-pwa-banner">
      <div className="install-pwa-content">
        <p>Installa l'app per giocare offline!</p>
        <button onClick={onInstallClick}>Installa</button>
      </div>
    </div>
  );
};

export default InstallPWA;
