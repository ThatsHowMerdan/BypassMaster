document.addEventListener("DOMContentLoaded", () => {
    const bypassToggle = document.getElementById("bypassToggle");
    const adBlockToggle = document.getElementById("adBlockToggle");
    const trackerToggle = document.getElementById("trackerToggle");
    const whitelistInput = document.getElementById("whitelistInput");
    const addToWhitelistButton = document.getElementById("addToWhitelist");
    const viewStatsButton = document.getElementById("viewStats");

    chrome.storage.sync.get(["bypassEnabled", "adBlockEnabled", "trackerEnabled", "whitelist", "stats"], (data) => {
        bypassToggle.checked = data.bypassEnabled ?? true;
        adBlockToggle.checked = data.adBlockEnabled ?? true;
        trackerToggle.checked = data.trackerEnabled ?? true;

        if (data.whitelist) {
            document.getElementById("whitelistInput").value = data.whitelist.join(", ");
        }

        if (!data.stats) {
            chrome.storage.sync.set({ stats: { adsBlocked: 0, trackersBlocked: 0 } });
        }
    });

    viewStatsButton.addEventListener("click", () => {
        chrome.storage.sync.get("stats", (data) => {
            const stats = data.stats || { adsBlocked: 0, trackersBlocked: 0 };
            alert(`Engellenen Reklamlar: ${stats.adsBlocked}\nEngellenen İzleyiciler: ${stats.trackersBlocked}`);
        });
    });

    addToWhitelistButton.addEventListener("click", () => {
        let newSite = whitelistInput.value.trim();
        if (newSite && newSite.length > 0) {
            chrome.storage.sync.get("whitelist", (data) => {
                let whitelist = data.whitelist || [];
                if (!whitelist.includes(newSite)) {
                    whitelist.push(newSite);
                    chrome.storage.sync.set({ whitelist: whitelist });
                    alert("Site beyaz listeye eklendi!");
                } else {
                    alert("Bu site zaten beyaz listede!");
                }
            });
        }
    });
});
