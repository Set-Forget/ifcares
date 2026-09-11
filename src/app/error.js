'use client';

import { useEffect } from 'react';
import { logErrorMonitoring } from '@/utils';

// Sin este boundary, cualquier excepcion de cliente deja la pantalla en blanco
// con el "Application error: a client-side exception has occurred" de Next, que
// no le dice nada al coordinador del sitio ni le da forma de recuperarse: la
// unica salida era recargar a mano hasta que la pagina levantara.
export default function Error({ error, reset }) {
  useEffect(() => {
    logErrorMonitoring({
      function_name: 'app/error boundary',
      error: error,
      row_error: error?.stack,
    });
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      <h2 className="text-2xl font-bold mb-3">Something went wrong</h2>
      <p className="max-w-md mb-2 text-gray-700">
        The app hit an unexpected error. Your saved meal counts are still on
        this device — nothing was lost.
      </p>
      <p className="max-w-md mb-6 text-gray-700">
        Try again, and if it keeps happening let IF Cares know.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          type="button"
          onClick={() => reset()}
          className="text-black font-bold bg-[#46DC8C] rounded-[13px] min-w-[140px] min-h-[40px] px-5"
        >
          Try again
        </button>
        <a
          href="/"
          className="flex items-center justify-center text-white font-bold bg-[#5D24FF] rounded-[13px] min-w-[140px] min-h-[40px] px-5"
        >
          Back to home
        </a>
      </div>
    </div>
  );
}
