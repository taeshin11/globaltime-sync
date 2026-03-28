// ads-config.js — Ad configuration & loader for GlobalTime Sync

const ADS_CONFIG = {
  adsterra: {
    enabled: true,
    bannerDesktopKey: '00b2fd9a4c9003e30c70ea3b71c984bc',  // 728x90 Banner (desktop)
    bannerMobileKey: 'ef04055a03d0685f7f385aef9b51e8dc',   // 320x50 Banner (mobile)
    nativeKey: 'ADSTERRA_NATIVE_KEY',      // Replace: Publishers > Ad Units > Native Banner
    socialBarScript: 'https://pl28998205.profitablecpmratenetwork.com/29/10/ba/2910bae02e54e2e031b93c2f4aef90bb.js'
  },
  adsense: {
    enabled: false,
    publisherId: 'ca-pub-XXXXXXXXXXXXXXXX'
  }
};

// --- Ad Loader ---
function loadAds() {
  const cfg = ADS_CONFIG.adsterra;

  // Adsterra Banner Ad (728x90 desktop / 320x50 mobile)
  if (cfg.enabled) {
    const bannerSlot = document.getElementById('adsterra-banner');
    if (bannerSlot) {
      const isMobile = window.innerWidth < 768;
      const key = isMobile ? cfg.bannerMobileKey : cfg.bannerDesktopKey;
      const width = isMobile ? 320 : 728;
      const height = isMobile ? 50 : 90;

      const optScript = document.createElement('script');
      optScript.type = 'text/javascript';
      optScript.textContent = "atOptions = { 'key': '" + key + "', 'format': 'iframe', 'height': " + height + ", 'width': " + width + ", 'params': {} };";
      bannerSlot.appendChild(optScript);

      const invokeScript = document.createElement('script');
      invokeScript.type = 'text/javascript';
      invokeScript.src = 'https://www.highperformanceformat.com/' + key + '/invoke.js';
      invokeScript.async = true;
      bannerSlot.appendChild(invokeScript);
    }
  }

  // Adsterra Native Ad (inline between dashboard and FAQ)
  if (cfg.enabled && cfg.nativeKey !== 'ADSTERRA_NATIVE_KEY') {
    const nativeSlot = document.getElementById('adsterra-native');
    if (nativeSlot) {
      const optScript = document.createElement('script');
      optScript.type = 'text/javascript';
      optScript.textContent = "atOptions = { 'key': '" + cfg.nativeKey + "', 'format': 'native', 'params': {} };";
      nativeSlot.appendChild(optScript);

      const invokeScript = document.createElement('script');
      invokeScript.type = 'text/javascript';
      invokeScript.src = 'https://www.highperformanceformat.com/' + cfg.nativeKey + '/invoke.js';
      invokeScript.async = true;
      nativeSlot.appendChild(invokeScript);
    }
  }

  // Adsterra Social Bar (fixed bottom overlay)
  if (cfg.enabled && cfg.socialBarScript) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = cfg.socialBarScript;
    script.async = true;
    document.body.appendChild(script);
  }

  // Google AdSense Footer Ad
  if (ADS_CONFIG.adsense.enabled && ADS_CONFIG.adsense.publisherId !== 'ca-pub-XXXXXXXXXXXXXXXX') {
    const footerSlot = document.getElementById('adsense-footer');
    if (footerSlot) {
      const adsenseScript = document.createElement('script');
      adsenseScript.async = true;
      adsenseScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + ADS_CONFIG.adsense.publisherId;
      adsenseScript.crossOrigin = 'anonymous';
      document.head.appendChild(adsenseScript);

      const ins = document.createElement('ins');
      ins.className = 'adsbygoogle';
      ins.style.display = 'block';
      ins.setAttribute('data-ad-client', ADS_CONFIG.adsense.publisherId);
      ins.setAttribute('data-ad-slot', 'ADSENSE_SLOT_ID');
      ins.setAttribute('data-ad-format', 'auto');
      ins.setAttribute('data-full-width-responsive', 'true');
      footerSlot.appendChild(ins);

      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
    }
  }
}

// Lazy-load ads after main content renders
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function () {
    setTimeout(loadAds, 1000);
  });
} else {
  setTimeout(loadAds, 1000);
}
