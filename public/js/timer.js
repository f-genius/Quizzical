(
    function () {
    let startTime = new Date().getTime();
    function timer() {
        let element = document.getElementById('id345');
        element.innerHTML += 'page loaded in ' + (new Date().getTime() - startTime)  + ' ms (client) + ';
    }

    document.addEventListener("DOMContentLoaded", function() {
        timer();
    });
})();