'use client';

// Ultimo recurso: atrapa lo que reviente en el root layout (los providers),
// donde app/error.js ya no llega. Tiene que renderizar su propio html/body.
export default function GlobalError({ error, reset }) {
  return (
    <html lang="en">
      <body>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            textAlign: 'center',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>
            Something went wrong
          </h2>
          <p style={{ maxWidth: '28rem', marginBottom: '24px', color: '#374151' }}>
            The app hit an unexpected error. Your saved meal counts are still on
            this device — nothing was lost. Try again, and if it keeps happening
            let IF Cares know.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              color: '#000',
              fontWeight: 700,
              backgroundColor: '#46DC8C',
              borderRadius: '13px',
              minWidth: '140px',
              minHeight: '40px',
              padding: '0 20px',
              border: 'none',
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
