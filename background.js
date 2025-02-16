chrome.storage.sync.get(["bypassEnabled", "adBlockEnabled", "trackerEnabled", "stats"], (data) => {
    if (data.adBlockEnabled) {
        enableAdBlock();
    }

    if (data.trackerEnabled) {
        enableTrackerBlock();
    }

    if (data.bypassEnabled) {
        enableBypass();
    }
});

// Reklam engelleme fonksiyonu
function enableAdBlock() {
    const adServers = ["*://*.doubleclick.net/*", "*://*.ads.yahoo.com/*", "*://*.adservice.google.com/*"];

    chrome.webRequest.onBeforeRequest.addListener(
        function(details) {
            chrome.storage.sync.get("stats", (data) => {
                let stats = data.stats || { adsBlocked: 0, trackersBlocked: 0 };
                stats.adsBlocked += 1;
                chrome.storage.sync.set({ stats: stats });
            });
            return { cancel: true }; // Reklamı engelle
        },
        { urls: adServers },
        ["blocking"]
    );
    console.log("✅ Reklam Engelleme Açık!");
}

// İzleyici engelleme fonksiyonu
function enableTrackerBlock() {
    const trackers = ["*://*.google-analytics.com/*", "*://*.facebook.com/tr/*", "*://*.taboola.com/*"];

    chrome.webRequest.onBeforeRequest.addListener(
        function(details) {
            chrome.storage.sync.get("stats", (data) => {
                let stats = data.stats || { adsBlocked: 0, trackersBlocked: 0 };
                stats.trackersBlocked += 1;
                chrome.storage.sync.set({ stats: stats });
            });
            return { cancel: true }; // İzleyiciyi engelle
        },
        { urls: trackers },
        ["blocking"]
    );
    console.log("✅ İzleyici Engelleme Açık!");
}

// Bypass işlevini etkinleştir
function enableBypass() {
    chrome.webRequest.onBeforeRequest.addListener(
        function(details) {
            // Bypass işlemini burada yapabilirsiniz
            return { cancel: false }; // Bu basit örnek bypass yapılmasını engellemiyor
        },
        { urls: ["*://*/*"] }, 
        ["blocking"]
    );
    console.log("✅ Bypass İşlevi Açık!");
}
