import { useEffect } from "react";
import * as Sentry from "@sentry/react";
import {
  matchRoutes,
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
} from "react-router-dom";

Sentry.init({
  dsn: "https://23f5860ca89bb6378c60e9030ba6301c@o4508165063049216.ingest.us.sentry.io/4508165065670656",
  integrations: [
    // See docs for support of different versions of variation of react router
    // https://docs.sentry.io/platforms/javascript/guides/react/configuration/integrations/react-router/
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
    Sentry.replayIntegration(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for tracing.
  tracesSampleRate: 1.0,

  // Set `tracePropagationTargets` to control for which URLs trace propagation should be enabled
  tracePropagationTargets: [/^\//, /^https:\/\/yourserver\.io\/api/],

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
