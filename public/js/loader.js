function fetchComments() {
    return new Promise(function(resolve, reject) {
        fetch('https://jsonplaceholder.typicode.com/comments')
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Ошибка при выполнении запроса');
                }
                return response.json();
            })
            .then(function(data) {
                resolve(data);
            })
            .catch(function(error) {
                reject(error);
            });
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getCom() {
    await sleep(3000)
    fetchComments()
        .then(function (comments) {
            processComments(comments)
        })
        .catch(function (error) {
            const warningElement = document.createElement('div');
            warningElement.classList.add('warning-element');
            warningElement.textContent = '⚠ Что-то пошло не так';
            var parent = document.getElementById("main__statistics")
            parent.appendChild(warningElement);
            console.error(error);
        });

    var preloader = document.getElementById('preloader');
    preloader.style.display = 'none';
}


function processComments(json) {
    const comments = json;

    const selectedComments = [];
    let comNumber = Math.floor(Math.random() * 8) + 3;
    comNumber = comNumber > comments.length ? comments.length : comNumber;
    console.log(comNumber)

    for (let i = 0; i < comNumber; i++) {
        selectedComments.push([comments[i].name, comments[i].body])
    }
    console.log(selectedComments)
    createCommentBlocks(selectedComments)
}

function createCommentBlocks(comments) {
    const container = document.createElement('div');
    container.classList.add('comments_container');
    comments.forEach(function(commentData) {
        const commentBlock = document.createElement('div');
        commentBlock.classList.add('comment-block');

        const nameElement = document.createElement('div');
        const bodyElement = document.createElement('div');

        nameElement.textContent = "name: " + commentData[0];
        nameElement.classList.add('comment-name');

        bodyElement.textContent = commentData[1];
        bodyElement.classList.add('comment-body');

        commentBlock.appendChild(nameElement);
        commentBlock.appendChild(bodyElement);

        container.appendChild(commentBlock);
    });
    var parent = document.getElementById("main__statistics")

    container.style.overflowY = "scroll"
    parent.appendChild(container);
}