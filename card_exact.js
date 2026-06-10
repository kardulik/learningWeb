let questions = []
let pack = {
    name: "Karty",
    questions
}


const _return = document.getElementById("return");
const _main_page = document.getElementById("main_page_return");

_return.addEventListener("click", function() {
    if (window.confirm("Jste si jistý že chcete zahodit tvorbu a odejít?"))
        window.open("cardOptions.html", "_self");
});
_main_page.addEventListener("click", function() {
    if (window.confirm("Jste si jistý že chcete zahodit tvorbu a odejít?"))
        window.open("main.html", "_self");
});


const pack_name = document.getElementById("pack_name");
const setNameButton = document.getElementById("pack_name_continue");

const card_header = document.getElementById("card_header");
setNameButton.addEventListener("click", function() {

    if(pack_name.value){
        card_header.innerHTML = pack_name.value;
    }
    else{
        card_header.innerHTML = "Karty";
    }
    pack.name = card_header.innerHTML;
})


const _question = document.getElementById("question");
const _answer = document.getElementById("answer");

const continueButton = document.getElementById("next");
const submit = document.getElementById("submit");

const card_display = document.getElementById("card_display");



continueButton.addEventListener("click", function(event) {
    event.preventDefault();
    if (_question.value === "" || _answer.value === "")
        return;

    let newCard = {
        question: _question.value,
        answers: _answer.value.split(","),
        correct: []
    }
    questions.push(newCard)

    _question.value = null;
    _answer.value = null;


    const card = document.createElement("div");
    const question = document.createElement("h3");
    question.textContent = newCard.question;
    card.append(question);

    for (const answerIndex in newCard.answers) {
        const answer = document.createElement("button");
        answer.textContent = newCard.answers[answerIndex];

        answer.addEventListener("click", function () {
            if (answer.classList.contains("button_clicked")) {
                answer.classList.remove("button_clicked");
                newCard.correct[answerIndex] = false;
            }
            else {
                answer.classList.add("button_clicked");
                newCard.correct[answerIndex] = true;
            }
        })
        card.append(answer);

        newCard.correct[answerIndex] = false;

        card_display.append(card);
    }


    const editButton = document.createElement("button");
    editButton.textContent = "Upravit"
    editButton.addEventListener("click", function() {
        _question.value = newCard.question;
        _answer.value = newCard.answers;
        card.remove();
        questions.splice(questions.indexOf(newCard), 1);
        console.log(questions);
    })
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Odstranit"
    deleteButton.addEventListener("click", function() {
        if(window.confirm(`Opravdu chcete odstranit ${question.textContent}?`)){
            card.remove();
            questions.splice(questions.indexOf(newCard), 1);
            console.log(questions);
        }
    })

    card.append(editButton);
    card.append(deleteButton);


    card.classList.add("card");
})

submit.addEventListener("click", function(event) {
    event.preventDefault();

    localStorage.setItem(pack.name, JSON.stringify(pack));
    window.alert(`Vytvořen balíček ${pack.name}`);
    window.open("finishedCreation.html", "_self");
})

