// Güncellenmiş kısa link servisleri listesi
const knownShorteners = [
    "aylink.co", "adf.ly", "bit.ly", "shorte.st", "bc.vc", "ouo.io",
    "linkvertise.com", "link.tl", "clk.sh", "cut-urls.com", "short.am",
    "shorte.com", "megaurl.in", "exe.io", "fc.lc", "psl.li",
    "ay.live", "cpmlink.co"
];

// Sayfadaki hedef linki bulma
function getTargetLink() {
    let links = document.querySelectorAll("a[href]");
    for (let link of links) {
        if (!knownShorteners.some(shortener => link.href.includes(shortener))) {
            console.log("✅ Hedef link bulundu:", link.href);
            return link.href;
        }
    }
    return null;
}

// Beyaz listeyi kontrol et
chrome.storage.sync.get("whitelist", (data) => {
    const whitelist = data.whitelist || [];
    const currentUrl = window.location.hostname;

    if (whitelist.includes(currentUrl)) {
        console.log("✅ Site beyaz listede, bypass yapılmadı:", currentUrl);
        return;
    }

    const targetLink = getTargetLink();
    if (targetLink) {
        window.location.href = targetLink;
    }
});
