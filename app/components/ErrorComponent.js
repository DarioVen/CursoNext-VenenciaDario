'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container m-auto mt-6">
      <h2 className="text-xl">¡Algo no salió bien!</h2>
      <hr className="my-6"/>
      <button 
        onClick={reset}
        className="btn-primary"
      >
        Intentar nuevamente
      </button>
    </div>
  );
}