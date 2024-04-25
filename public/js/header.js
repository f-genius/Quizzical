function logout() {
    userLogin = false;
    event.preventDefault()
    fetch("/auth/signout")
        .then(response => response.json())
        .catch(error => {
            console.error('Ошибка получения данных:', error);
        });
    window.location.href = '/'
}

function login() {
    event.preventDefault()
    let email = document.getElementById("user_email").value
    let password = document.getElementById("user_password").value

    let authData = {
        email: email,
        password: password,
        name: "kiyikmyy",
    }

    console.log(authData)

    fetch('/auth/signin', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(authData)
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');
    })
        .then(jsonResponse => {
            console.log('Ответ сервера:', jsonResponse);
        })
        .catch(error => {
            console.error('Произошла ошибка:', error);
        });

    window.location.href = '/'
}

function register() {
    event.preventDefault()
    let email = document.getElementById("user_email").value
    let password = document.getElementById("user_password").value
    let name = document.getElementById("user_name").value

    let authData = {
        email: email,
        password: password,
        name: name,
    }

    fetch('/auth/signup', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(authData)
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');
    })
        .then(jsonResponse => {
            console.log('Ответ сервера:', jsonResponse);
        })
        .catch(error => {
            console.error('Произошла ошибка:', error);
        });

    window.location.href = '/login'
}