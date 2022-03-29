self.addEventListener("install", (event) => {
    console.log("Installing");
    event.waitUntil(
        caches.open("test-cache").then((cache) => {
            return cache.addAll([
                "/offline",
                "/css/style.css"
            ])
        })
    )
});
