var formfield = document.getElementById('container');
var count_question = 0;
var count_cur_answer = 0;
var count_answers = [0];

function addQuestion(){
    console.log(count_cur_answer)
    if (count_cur_answer >= 2) {
        var newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'question_container');

        var newField = document.createElement('input');
        count_question++;
        count_cur_answer = 0;
        count_answers.push(0);
        var name = 'question' + count_question;
        newField.setAttribute('type','text');
        newField.setAttribute('name', name);
        newField.setAttribute('class','question');
        newField.setAttribute('size',50);
        newField.setAttribute('placeholder','Введите текст вопроса');
        newDiv.appendChild(newField);
        formfield.appendChild(newDiv);
    }
}

function removeQuestion(){
    var input_tags= formfield.getElementsByClassName('question_container');
    if(input_tags.length > 1) {
        formfield.removeChild(input_tags[(input_tags.length) - 1]);
        var answers= formfield.getElementsByClassName('ans_container');
        var c = count_answers.pop();
        for (var i = 0; i < c; i++) {
            formfield.removeChild(answers[(answers.length) - 1]);
        }
    }
}

function addAnswer() {
    var newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'ans_container')

    count_cur_answer++;
    count_answers[count_answers.length - 1]++;
    var name = 'checkbox_question_' + count_question;
    var newField = document.createElement('input');
    newField.setAttribute('type','checkbox');
    newField.setAttribute('name', name);
    newField.setAttribute('class','is_right_answer');
    newField.setAttribute('size',25);
    newDiv.appendChild(newField);

    name = 'answer_question_' + count_question;
    newField = document.createElement('input');
    newField.setAttribute('type','text');
    newField.setAttribute('name', name);
    newField.setAttribute('class','answer');
    newField.setAttribute('size',25);
    newField.setAttribute('placeholder','Текст ответа');
    newDiv.appendChild(newField);

    name = 'answer_question_points_' + count_question;
    newField = document.createElement('input');
    newField.setAttribute('type','text');
    newField.setAttribute('name', name);
    newField.setAttribute('class','points');
    newField.setAttribute('size',50);
    newField.setAttribute('placeholder','Очки');
    newDiv.appendChild(newField);

    formfield.appendChild(newDiv);
}

function removeAnswer() {
    var input_tags= formfield.getElementsByClassName('ans_container');
    if(input_tags.length > 0 && count_answers[(count_answers.length) - 1] > 0) {
        count_answers[(count_answers.length) - 1]--;
        formfield.removeChild(input_tags[(input_tags.length) - 1]);
    }
}

function save_test() {
    event.preventDefault()
    const url = "/tests/";
    var test_name = document.getElementsByClassName("test_name");
    let questions = document.getElementsByClassName("question");
    let points = [];
    let answers = [];
    let checkboxes = [];
    let category = document.getElementsByClassName("categories");
    for (let i = 0; i < questions.length; i++) {
        answers.push(document.getElementsByName("answer_question_" + i));
        checkboxes.push(document.getElementsByName("checkbox_question_" + i));
        points.push(document.getElementsByName("answer_question_points_" + i))
    }

    let test = {
        name: test_name[0].value,
        category: category[0].value,
        questions: []
    };

    for (let i = 0; i < questions.length; i++) {
        test.questions.push(getQuestionWithAnswers(answers[i], checkboxes[i], questions[i], points[i]));
    }

    fetch(url,
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(test)
        }
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

    document.location.reload();
}

function getQuestionWithAnswers(answers_text, answers_checkbox, q_text, q_points) {
    let question = {
        text: q_text.value,
        answers: []
    }

    for (let i = 0; i < answers_text.length; i++) {
        question.answers.push(getAnswer(answers_text[i], answers_checkbox[i], q_points[i]));
    }

    return question;
}

function getAnswer(text, checkbox, points) {
    if (points.value === "")
        points.value = "-10";
    return {text: text.value, isRight: checkbox.checked, points: parseInt(points.value)};
}