let cards = [];

const main_btn = document.getElementById("play_continue_button");
const card_display = document.getElementById("card_display");

window.addEventListener("load", function() {
    cards = JSON.parse(localStorage.getItem("karty"))
    console.log(cards);
    for(const cardId in cards) {
        showCard(cardId, 0);
    }
})

main_btn.addEventListener("click", function() {
    card_display.innerHTML = null;
    main_btn.innerText = "Next";
    //main_btn.style.display = "none";

    let questionIndex = Math.floor(Math.random() * (cards.length - 1)) + 1;
    showCard(questionIndex, 1);
})


function showCard(cardId, answerType){
    if(cardId === "0"){
        const name = document.createElement("h2");
        name.textContent = cards[cardId];
        card_display.append(name);
        return;
    }

    const card = document.createElement("div");
    const question = document.createElement("h3");
    question.textContent = cards[cardId].question;
    card.append(question);

    if(answerType === 0){
        addCorrectAnswer(card, cardId);
    }
    else{
        addGuessAnswer(card, cardId);
    }


    card.classList.add("card");
    card_display.append(card);
}

function addCorrectAnswer(card, cardId){
    for(const answerId in cards[cardId].answer) {
        const answer = document.createElement("p");
        answer.textContent = cards[cardId].answer[answerId];
        if(cards[cardId].correctAnswer[answerId]){
            answer.classList.add("correct_answer");
        }
        card.append(answer);
    }
}

function addGuessAnswer(card, cardId){
    let oldCorrect = cards[cardId].correctAnswer.concat();
    let oldAnswers = cards[cardId].answer.concat();

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