function getTestName() {
    const currentUrl = window.location.pathname;
    let lastSlashIndex = currentUrl.lastIndexOf('/');
    return currentUrl.substring(lastSlashIndex + 1);
}

function countScore(user_answers, right_answers, points) {
    let res = 0;
    let ideal_res = 0;
    let n = user_answers.length;
    for (let i = 0; i < n; i++) {
        if (user_answers[i].checked === right_answers[i]) {
            res += points[i];
        }
        if (points[i] > 0)
            ideal_res += points[i];
    }

    return [res, ideal_res];
}

async function startTest() {
    let url = "/scores/";
    let testName = decodeURI(getTestName());

    const test = await fetch(`/tests/name/${testName}`)
        .then(response => response.json())
        .then(data => {
            return data;
        })


    let score = {
        value: 0,
        testId: test.id,
        userId: 1
    }

    let user_answers= document.getElementsByClassName("points")
    let right_answers = [];
    let points = []


    test.questions.forEach(question => {
        question.answers.forEach(answer => {
            right_answers.push(answer.isRight)
            points.push(answer.points)
        })
    })

    let res = countScore(user_answers, right_answers, points)
    score.value = res[0]
    if (res[0] < 0)
        score.value = 0

    sendScore(url, score)

    window.location.href += `/results/${score.value}`;
}

function sendScore(url, score) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(score)}
    )
        .then(response => {
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
}