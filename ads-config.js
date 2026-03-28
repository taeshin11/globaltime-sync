// ads-config.js — Ad configuration & loader for GlobalTime Sync
//
// HOW TO ACTIVATE ADS:
// 1. Sign up at https://publishers.adsterra.com
// 2. Add your site URL (https://globaltime-sync.vercel.app)
// 3. Wait for approval (< 24 hours typically)
// 4. Create ad units in the dashboard and replace the keys below
// 5. For AdSense: apply at https://www.google.com/adsense, set enabled to true after approval

const ADS_CONFIG = {
  adsterra: {
    enabled: true,
    bannerKey: 'ADSTERRA_BANNER_KEY',      // Replace: Publishers > Ad Units > Banner (728x90)
    nativeKey: 'ADSTERRA_NATIVE_KEY',      // Replace: Publishers > Ad Units > Native Banner
    socialBarKey: 'ADSTERRA_SOCIAL_KEY'    // Replace: Publishers > Ad Units > Social Bar
  },
  adsense: {
    enabled: false,  // Set to true after AdSense approval
    publisherId: 'ca-pub-XXXXXXXXXXXXXXXX' // Replace with your AdSense publisher ID
  }
};

// --- Ad Loader (runs after DOM is ready) ---
function loadAds() {
  // Adsterra Banner Ad (728x90 desktop / 320x50 mobile)
  if (ADS_CONFIG.adsterra.enabled && ADS_CONFIG.adsterra.bannerKey !== 'ADSTERRA_BANNER_KEY') {
    const bannerSlot = document.getElementById('adsterra-banner');
    if (bannerSlot) {
      const isMobile = window.innerWidth < 768;
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.textContent = `
        atOptions = {
          'key' : '${ADS_CONFIG.adsterra.bannerKey}',
          'format' : 'iframe',
          'height' : ${isMobile ? 50 : 90},
          'width' : ${isMobile ? 320 : 728},
          'params' : {}
        };
      `;
      bannerSlot.appendChild(script);

      const invokeScript = document.createElement('script');
      invokeScript.type = 'text/javascript';
      invokeScript.src = `//www.highperformanceformat.com/${ADS_CONFIG.adsterra.bannerKey}/invoke.js`;
      invokeScript.async = true;
      bannerSlot.appendChild(invokeScript);
    }
  }

  // Adsterra Native/Social Bar Ad
  if (ADS_CONFIG.adsterra.enabled && ADS_CONFIG.adsterra.nativeKey !== 'ADSTERRA_NATIVE_KEY') {
    const nativeSlot = document.getElementById('adsterra-native');
    if (nativeSlot) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.textContent = `
        atOptions = {
          'key' : '${ADS_CONFIG.adsterra.nativeKey}',
          'format' : 'native',
          'params' : {}
        };
      `;
      nativeSlot.appendChild(script);

      const invokeScript = document.createElement('script');
      invokeScript.type = 'text/javascript';
      invokeScript.src = `//www.highperformanceformat.com/${ADS_CONFIG.adsterra.nativeKey}/invoke.js`;
      invokeScript.async = true;
      nativeSlot.appendChild(invokeScript);
    }
  }

  // Adsterra Social Bar (fixed bottom overlay)
  if (ADS_CONFIG.adsterra.enabled && ADS_CONFIG.adsterra.socialBarKey !== 'ADSTERRA_SOCIAL_KEY') {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `//www.highperformanceformat.com/${ADS_CONFIG.adsterra.socialBarKey}/invoke.js`;
    script.async = true;
    document.body.appendChild(script);
  }

  // Google AdSense Footer Ad
  if (ADS_CONFIG.adsense.enabled && ADS_CONFIG.adsense.publisherId !== 'ca-pub-XXXXXXXXXXXXXXXX') {
    const footerSlot = document.getElementById('adsense-footer');
    if (footerSlot) {
      // Load AdSense script
      const adsenseScript = document.createElement('script');
      adsenseScript.async = true;
      adsenseScript.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADS_CONFIG.adsense.publisherId}`;
      adsenseScript.crossOrigin = 'anonymous';
      document.head.appendChild(adsenseScript);

      // Create ad unit
      const ins = document.createElement('ins');
      ins.className = 'adsbygoogle';
      ins.style.display = 'block';
      ins.setAttribute('data-ad-client', ADS_CONFIG.adsense.publisherId);
      ins.setAttribute('data-ad-slot', 'ADSENSE_SLOT_ID'); // Replace with your slot ID
      ins.setAttribute('data-ad-format', 'auto');
      ins.setAttribute('data-full-width-responsive', 'true');
      footerSlot.appendChild(ins);

      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        // Silent fail
      }
    }
  }
}

// Lazy-load ads after main content renders
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function () {
    setTimeout(loadAds, 1000); // Delay to prioritize main content
  });
} else {
  setTimeout(loadAds, 1000);
}
