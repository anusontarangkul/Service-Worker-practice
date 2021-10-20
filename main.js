if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('sw-cached_site.js')
            .then(reg => console.log('sw registered', reg))
            .catch(err => console.log(err))
    })
}