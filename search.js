let apiKey= "31d6cfe0d16ae931b73c59d7e0c089c0";
let searchResults = document.getElementById("searchResults");
let cardSpace = document.getElementById("cards");

window.addEventListener('load', async function() {
    console.log('loaded');
    let response = await fetch('https://mottl.delta-www.cz/api/stehlik_api.php',{
        method: 'GET',
        headers:{
            'X-API-Key': apiKey
        }
    });
    let data = await response.json();
    for (var a in data) {
        let temp = data[a];
        let b = a;
        console.log(temp.name);
        let box = document.createElement("button");
        box.classList.add("box");
        box.textContent = temp.name;
        box.addEventListener("click", function () {
            showResult(b)
        })
        cardSpace.appendChild(box);
    }
})

let returnButton = document.getElementById("return");
let destination = document.getElementById("destination");
returnButton.addEventListener("click", function(){
    returnButton.classList.add("hidden");
    searchResults.classList.remove("hidden");
    destination.innerHTML = "";
    cardSpot.innerHTML = "";
    destination.classList.add("hidden");
})

let cardSpot = document.createElement("div");


async function showResult(id) {
    let response = await fetch(`https://mottl.delta-www.cz/api/stehlik_api.php?id=${parseInt(id) + 1}`, {
        method: 'GET',
        headers: {
            'X-API-Key': apiKey
        }
    });
    let result = await response.json();


    returnButton.classList.remove("hidden");

    searchResults.classList.add("hidden");
    destination.classList.remove("hidden");

    let name = result.name;
    let pageName = document.createElement("h1");
    pageName.textContent = name;
    destination.append(pageName);

    cards = result.questions;
    for (let a in cards){
        const card = document.createElement("div");
        const question = document.createElement("h3");
        question.textContent = cards[a].question;
        card.append(question);
        cardSpot.append(card);
        card.classList.add("card");


        for(const answerId in cards[a].answers) {
            const answer = document.createElement("p");
            answer.textContent = cards[a].answers[answerId];
            if(cards[a].correct[answerId]){
                answer.classList.add("correct_answer");
            }
            card.append(answer);
        }
    }
    let download = document.createElement("button");
    download.innerText = "Stáhnout";
    download.addEventListener("click", function(){
        localStorage.setItem(name, JSON.stringify(result));
        window.location.reload();
    })

    destination.append(cardSpot);
    destination.append(download);
}