'use client';

import { useEffect } from 'react';

// global-error.tsx için i18n kullanamıyoruz çünkü kök seviyesinde.
// Bu yüzden temel İngilizce/Türkçe bir fallback tasarımı yapıyoruz.

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global Error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          textAlign: 'center',
          fontFamily: 'sans-serif',
          padding: '20px',
          backgroundColor: '#f8f9fa'
        }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>Something went wrong!</h1>
          <p style={{ color: '#6c757d', marginBottom: '20px' }}>
            An unexpected error occurred in the application root.
          </p>
          <button
            onClick={() => reset()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#00bbe5',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
