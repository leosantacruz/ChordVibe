"use client";

import { GoogleAnalytics } from "nextjs-google-analytics";

export default function GoogleAnalyticsClient() {
  return <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GTAG || ""} />;
}
