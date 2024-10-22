import ReactDOM from 'react-dom/client';
import * as Sentry from "@sentry/react";
import { Toaster } from 'react-hot-toast';
import { Suspense, StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import "./instrument"
import App from './app';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Toaster />
        <Suspense>
          <Sentry.ErrorBoundary fallback={<>Something went wrog</>}>
            <App />
          </Sentry.ErrorBoundary>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
