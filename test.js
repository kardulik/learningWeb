const create_button = document.getElementById("create_button");
const creation_box = document.getElementById("creation_box");

let creating = false;


create_button.addEventListener("click", function (event) {
    if (creating)
        return;

    creating = true;
    event.preventDefault();

    const title = document.createElement("h2");
    title.textContent = "Karta";
    creation_box.appendChild(title);

    const question = document.createElement("label");
    const question_label = document.createElement("p");
    const question_input = document.createElement("input");
    question_input.type = "text";
    question_label.textContent = "Název nové otázky"
    question.appendChild(question_label);
    question.appendChild(question_input);
    creation_box.appendChild(question);

    const answers = document.createElement("label");
    const answers_label = document.createElement("p");
    const answers_input = document.createElement("input");
    answers_input.type = "text";
    answers_label.textContent = "Napište možné odpovědi"
    answers.appendChild(answers_label);
    answers.appendChild(answers_input);
    creation_box.appendChild(answers);

    const submit = document.createElement("button");
    submit.innerText = "Poslední";
    submit.addEventListener("click", function (event) {
        event.preventDefault();

        console.log(answers_input.value);
        console.log(question_input.value);
        creation_box.innerHTML = null;
        creating = false;
    })
    creation_box.appendChild(submit);

    const _continue = document.createElement("button");
    _continue.innerText = "Další karta";
    _continue.addEventListener("click", function (event) {
        event.preventDefault();

        console.log(answers_input.value);
        console.log(question_input.value);

        answers_input.value = null;
        question_input.value = null;
    })
    creation_box.appendChild(_continue);
})

