"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const GA_MEASUREMENT_ID = "G-DPJ8W0YPMK";

export default function GoogleAnalytics() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    const check = () => setConsented(localStorage.getItem("cookie-consent") === "accepted");
    check();
    window.addEventListener("cookie-consent-changed", check);
    return () => window.removeEventListener("cookie-consent-changed", check);
  }, []);

  if (!consented) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
