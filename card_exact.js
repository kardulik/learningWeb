let cards = []

const _return = document.getElementById("return");

_return.addEventListener("click", function() {
    if (window.confirm("Jste si jistý že chcete zahodit tvorbu a odejít?"))
        window.open("main.html", "_self");
});

const pack_naming = document.getElementById("pack_naming");
const card_making = document.getElementById("card_making");

const pack_name = document.getElementById("pack_name");
const button = document.getElementById("pack_name_continue");

const card_header = document.getElementById("card_header");
button.addEventListener("click", function() {
    pack_naming.classList.add("hidden");
    pack_naming.classList.remove("visible");
    card_making.classList.add("visible");
    card_making.classList.remove("hidden");

    if (pack_name.value){
        card_header.innerHTML = pack_name.value;
        cards.push(pack_name.value)
    }
    else{
        cards.push("karty")
    }

})


const _question = document.getElementById("question");
const _answer = document.getElementById("answer");

const next_button = document.getElementById("next");
const submit = document.getElementById("submit");

const card_display = document.getElementById("card_display");



next_button.addEventListener("click", function(event) {
    event.preventDefault();
    if (_question.value === "" || _answer.value === "")
        return;

    cards.push(
        {
            question: _question.value,
            answer: _answer.value.split(","),
            correctAnswer: []
        }
    )

    _question.value = null;
    _answer.value = null;

    lastIndex = cards.length - 1;

    const card = document.createElement("div");
    const question = document.createElement("h3");
    question.textContent = cards[lastIndex].question;
    card.append(question);

    for (const answerIndex in cards[lastIndex].answer) {
        const currIndex = lastIndex;
        const answer = document.createElement("button");
        answer.textContent = cards[lastIndex].answer[answerIndex];

        answer.addEventListener("click", function () {
            if (answer.classList.contains("button_clicked")) {
                answer.classList.remove("button_clicked");
                cards[currIndex].correctAnswer[answerIndex] = false;
            }
            else {
                answer.classList.add("button_clicked");
                cards[currIndex].correctAnswer[answerIndex] = true;
            }
            console.log(cards);
        })
        card.append(answer);

        cards[currIndex].correctAnswer[answerIndex] = false;

        card_display.append(card);
    }

    card.classList.add("card");
    console.log(cards);
})

submit.addEventListener("click", function(event) {
    event.preventDefault();
    if ( _question.value !== ""|| _answer.value !== ""){
        cards.push(
            {
                question: _question.value,
                answer: _answer.value.split(","),
            }
        )
    }

    localStorage.setItem("karty", JSON.stringify(cards));
    window.open("main.html", "_self");
})

