const lastSeen = document.getElementById("lastSeen");
let cards;
let apiKey = "31d6cfe0d16ae931b73c59d7e0c089c0";
window.addEventListener("load", function() {
    for (var a in localStorage) {
        let temp = JSON.parse(localStorage.getItem(a))
        if (temp) {
            let box = document.createElement("button");
            box.classList.add("box");
            box.textContent = temp.name;
            box.addEventListener("click", function(){
                play(temp);
            })
            lastSeen.appendChild(box);
        }
    }
})


let returnButton = document.getElementById("return");
returnButton.addEventListener("click", function(){
    returnButton.classList.add("hidden");
    page[0].classList.remove("hidden");
    page[1].innerHTML = "";
    cardSpot.innerHTML = "";
    page[1].classList.add("hidden");
    page[2].classList.add("hidden");
})
let page = document.getElementsByClassName("main");
let cardSpot = document.createElement("div");

function play(learnInfo){
    returnButton.classList.remove("hidden");

    page[0].classList.add("hidden");
    page[1].classList.remove("hidden");

    let name = learnInfo.name;
    let pageName = document.createElement("h1");
    pageName.textContent = learnInfo.name;
    page[1].append(pageName);

    cards = learnInfo.questions;
    for (let a in cards){
        showCard(a, 0)
    }

    let editButton = document.createElement("button");
    editButton.innerText = "Upravit";
    editButton.addEventListener("click", function(){
        page[2].classList.remove("hidden");
        page[1].innerHTML = "";
        cardSpot.innerHTML = "";
        page[1].classList.add("hidden");

        let cardHeader = document.getElementById("card_header");
        cardHeader.innerText = name;
        let cardDisplay = document.getElementById("card_display");
        cardDisplay.innerHTML = "";
        for (let a in cards){
            showCard(a, 2, cardDisplay);
        }
    })

    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Smazat";
    deleteButton.addEventListener("click", function(){
        if(window.confirm(`Opravdu chcete odstranit ${name}?`)){
            localStorage.removeItem(name);
            window.location.reload();
        }
    })

    let uploadButton = document.createElement("button");
    uploadButton.innerText = "Nahrát na web";
    uploadButton.addEventListener("click", async function(){
        if(window.confirm(`Opravdu chcete ${name} nahrát pro všechny?`)){
            let information = JSON.stringify({
                "name": name,
                "type": "cards",
                "questions": learnInfo.questions
            });
            let response = await fetch(`https://mottl.delta-www.cz/api/stehlik_api.php`, {
                method: 'POST',
                headers: {
                    'X-API-Key': apiKey
                },
                body: information
            });
        }
    })

    let nextButton = document.createElement("button");
    nextButton.innerText = "Hrát";
    nextButton.addEventListener("click", function(){
        let questionIndex = Math.floor(Math.random() * cards.length);
        nextButton.innerText = "Daší";
        deleteButton.classList.add("hidden");
        editButton.classList.add("hidden");
        uploadButton.classList.add("hidden");
        showCard(questionIndex, 1);
    })

    page[1].append(cardSpot);
    page[1].append(editButton);
    page[1].append(deleteButton);
    page[1].append(uploadButton);
    page[1].append(nextButton);
}

function showCard(cardId, answerType, destination = cardSpot){
    const card = document.createElement("div");
    const question = document.createElement("h3");
    question.textContent = cards[cardId].question;
    card.append(question);

    if(answerType === 0){
        addCorrectAnswer(card, cardId);
    }
    else if (answerType === 1){
        addGuessAnswer(card, cardId);
    }
    else if(answerType === 2){
        addEdit(card, cardId);

    }
    card.classList.add("card");
    destination.append(card);
}

function addCorrectAnswer(card, cardId){
    for(const answerId in cards[cardId].answers) {
        const answer = document.createElement("p");
        answer.textContent = cards[cardId].answers[answerId];
        if(cards[cardId].correct[answerId]){
            answer.classList.add("correct_answer");
        }
        card.append(answer);
    }
}


function addGuessAnswer(card, cardId){
    cardSpot.innerHTML = "";
    let oldCorrect = cards[cardId].correct.concat();
    let oldAnswers = cards[cardId].answers.concat();

    let answers = [];
    let correct = [];

    for(let i = 0; i < 4; i++) {
        let index = Math.floor(Math.random() * oldAnswers.length);

        answers[i] = oldAnswers[index];
        correct[i] = oldCorrect[index];

        oldAnswers.splice(index, 1);
        oldCorrect.splice(index, 1);
    }

    for(let i = 0; i < 4; i++) {
        const answer = document.createElement("button");
        answer.textContent = answers[i];
        answer.addEventListener("click", function(){
            if(correct[i]){
                answer.classList.add("correct_answer");
            }
            else{
                answer.classList.add("wrong_answer");
            }
        })
        card.append(answer);
    }
}


function addEdit(card, cardId){
    for(const answerId in cards[cardId].answers) {
        const answer = document.createElement("p");
        answer.textContent = cards[cardId].answers[answerId];
        if(cards[cardId].correct[answerId]){
            answer.classList.add("correct_answer");
        }
        card.append(answer);
    }

    let newCard = cards[cardId];


    const _question = document.getElementById("question");
    const _answer = document.getElementById("answer");
    const editButton = document.createElement("button");
    editButton.textContent = "Upravit"
    editButton.addEventListener("click", function() {
        _question.value = newCard.question;
        _answer.value = newCard.answer;
        card.remove();
        cards.splice(cards.indexOf(newCard), 1);
        console.log(cards);
    })
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Odstranit"
    deleteButton.addEventListener("click", function() {
        if(window.confirm(`Opravdu chcete odstranit ${question.textContent}?`)){
            card.remove();
            cards.splice(cards.indexOf(newCard), 1);
            console.log(cards);
        }
    })

    card.append(editButton);
    card.append(deleteButton);
    //make editting work
}