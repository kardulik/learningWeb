if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js", { scope: "/learningWeb/" })
        .then(() => console.log("Service Worker registered"))
        .catch(err => console.log("SW failed", err));
}
