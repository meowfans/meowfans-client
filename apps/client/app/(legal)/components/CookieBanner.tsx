'use client';

import { useEffect, useState } from 'react';

export const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) setVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 max-w-xl w-full bg-neutral-800 text-white p-4 rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
      <p className="text-sm text-gray-300">
        We use cookies to enhance your experience and analyze site traffic. By continuing, you agree to our
        <a href="/privacy" className="underline text-blue-400 mx-1">
          Privacy Policy
        </a>
        .
      </p>
      <button onClick={handleAccept} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md font-semibold text-sm">
        Accept
      </button>
    </div>
  );
};
