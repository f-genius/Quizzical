(function () {
    const time = parseInt(document.cookie.match(/server-loading-time=(.+?)(;|$)/)[1], 10)
    window.addEventListener('load', function () {
        document.getElementById('id345').innerText += " " + time + " ms (server)";
    });
})();