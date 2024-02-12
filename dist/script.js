"use strict";
var RPS = [
    'Rock',
    'Scissor',
    'Paper'
];
const Powers = [
    {
        name: 'Element_Boost',
        flag: false,
        description: "Temporarily strengthens a chosen element, making it win against one additional element."
    },
    {
        name: 'Double_Points',
        flag: false,
        description: "The next winning round grants double points."
    },
    {
        name: 'Shield',
        flag: false,
        description: "Negates the effect of the next loss."
    },
    {
        name: 'Prediction',
        flag: false,
        description: "Reveals the computer's next choice."
    },
    {
        name: 'Element_Swap',
        flag: false,
        description: "Allows changing the chosen element after revealing the computer’s choice."
    }
];
const pChoice = document.getElementById("playerChoice");
const cChoice = document.getElementById("computerChoice");
const pscore = document.getElementById('PlayerScore');
const cscore = document.getElementById('ComputerScore');
var rounds = document.getElementsByClassName("rounds");
const powerupchance = Math.floor(Math.random() * (6 - 2) + 2);
var computerchoice;
function noOfRounds() {
    // Get the input element by its id
    var numberInput = document.getElementById("no_of_rounds");
    // Get the value entered by the user
    let a = parseInt(numberInput.value);
    console.log(a);
    rounds[0].innerText = String(a);
    enable_buttons("Rock");
    enable_buttons("Paper");
    enable_buttons("Scissor");
}
function enable_buttons(pv) {
    const element = document.getElementById(pv);
    element === null || element === void 0 ? void 0 : element.removeAttribute("disabled");
}
function choice(ii) {
    let i = parseInt(ii);
    // console.log(Powers);
    console.log(powerupchance);
    if (Powers[3].flag !== true) {
        computerchoice = Math.floor(Math.random() * 3);
        cChoice.innerText = RPS[computerchoice];
    }
    else {
        cChoice.innerText = RPS[computerchoice];
    }
    // console.log("Chosen value:", RPS[i]);
    pChoice.innerText = String(RPS[i]);
    // console.log(RPS[computerchoice]);
    console.log("choice = " + RPS[i]);
    console.log("computerchoice = " + RPS[computerchoice]);
    if (i === 0 && computerchoice === 1) {
        if (Powers[0].element_choice !== 0) {
            if (Powers[2].flag !== true) {
                addpoint(cscore);
            }
            else {
                pop_alert("Shield has been used. Point Protected.");
                disable_buttons("Shield");
                Powers[2].flag = false;
            }
        }
        else {
            addpoint(pscore);
            Double_Points();
            Powers[0].flag = false;
        }
    }
    else if (i === 1 && computerchoice === 0) {
        addpoint(pscore);
        Double_Points();
    }
    if (i === 1 && computerchoice === 2) {
        if (Powers[0].element_choice !== 1) {
            if (Powers[2].flag !== true) {
                addpoint(cscore);
            }
            else {
                pop_alert("Shield has been used. Point Protected.");
                disable_buttons("Shield");
                Powers[2].flag = false;
            }
        }
        else {
            addpoint(pscore);
            Double_Points();
            Powers[0].flag = false;
        }
    }
    else if (i === 2 && computerchoice === 1) {
        addpoint(pscore);
        Double_Points();
    }
    if (i === 2 && computerchoice === 0) {
        if (Powers[0].element_choice !== 2) {
            if (Powers[2].flag !== true) {
                addpoint(cscore);
            }
            else {
                pop_alert("Shield has been used. Point Protected.");
                disable_buttons("Shield");
                Powers[2].flag = false;
            }
        }
        else {
            addpoint(pscore);
            Double_Points();
            Powers[0].flag = false;
        }
    }
    else if (i === 0 && computerchoice === 2) {
        addpoint(pscore);
        Double_Points();
    }
    updateround(i);
}
function updateround(i) {
    if (i !== computerchoice) {
        // rounds = document.getElementsByClassName("rounds");
        var num = Number(rounds[1].innerText) + 1;
        rounds[1].innerText = String(num);
        powerup(num);
    }
    winner_declaration(rounds);
}
function powerup(num) {
    if (num % powerupchance === 0) {
        let give_powerup = Math.floor(Math.random() * 5);
        let pv = Powers[give_powerup];
        pop_alert("You got a " + pv.name + " : " + pv.description);
        enable_buttons(pv.name);
    }
}
function pop_alert(txt) {
    var modal = document.getElementById('pop_up');
    if (modal !== null) {
        modal.style.display = 'block';
    }
    let msg = document.getElementById("message");
    if (msg !== null) {
        msg.innerText = txt;
    }
    // Automatically hide the modal after 3 seconds (adjust as needed)
    setTimeout(function () {
        if (modal !== null) {
            modal.style.display = 'none';
        }
    }, 2000);
}
function winner_declaration(rounds) {
    if (Number(rounds[0].innerText) === Number(rounds[1].innerText)) {
        console.log(pscore, cscore);
        if (pscore.innerText > cscore.innerText) {
            setTimeout(function () {
                window.location.href = "win.html";
            }, 1500);
        }
        else if (pscore.innerText < cscore.innerText) {
            setTimeout(function () {
                window.location.href = "lose.html";
            }, 1500);
        }
        else {
            setTimeout(function () {
                window.location.href = "draw.html";
            }, 1500);
        }
    }
}
function disable_buttons(pv) {
    console.log('disabled_buttons function' + pv);
    let temp = document.getElementById(pv);
    temp === null || temp === void 0 ? void 0 : temp.setAttribute("disabled", '1');
    if (pv === "Element_Boost") {
        var dropdown = document.getElementById("myDropdown1");
        if (dropdown !== null) {
            dropdown.style.display = 'none';
        }
    }
    if (pv === "Element_Swap") {
        var dropdown = document.getElementById("swap");
        if (dropdown !== null) {
            dropdown.style.display = 'none';
        }
    }
}
function toggleDropdown() {
    var dropdown = document.getElementById("myDropdown");
    if (dropdown !== null) {
        dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";
    }
}
function addpoint(element) {
    let num = Number(element.innerText) + 1;
    element.innerText = String(num);
}
function subractpoint(element) {
    let num = Number(element.innerText) - 1;
    element.innerText = String(num);
}
function Double_Points_Enable() {
    Powers[1].flag = true;
    pop_alert("Using Double Points");
}
function Double_Points() {
    if (Powers[1].flag === true) {
        addpoint(pscore);
        Powers[1].flag = false;
        pop_alert("Extra point has been added!");
        disable_buttons("Double_Points");
    }
}
function Shield() {
    Powers[2].flag = true;
    pop_alert("Shield has been activated.");
}
function Element_Boost(i) {
    Powers[0].flag = true;
    Powers[0].element_choice = Number(i);
    disable_buttons("Element_Boost");
}
function Prediction() {
    computerchoice = Math.floor(Math.random() * 3);
    pChoice.innerText = "";
    cChoice.innerText = RPS[computerchoice];
    Powers[3].flag = true;
    pop_alert("Prediction has been used.");
    disable_buttons("Prediction");
}
function Element_Swap_enable() {
    var swap = document.getElementById("swap");
    Powers[4].flag = true;
    if (swap) {
        swap.style.display = "block";
    }
}
function Element_Swap(ii) {
    let i = parseInt(ii);
    if (i === 0 && Number(computerchoice) === 1) {
        addpoint(cscore);
        subractpoint(pscore);
    }
    else if (i === 1 && computerchoice === 0) {
        addpoint(pscore);
        subractpoint(cscore);
    }
    if (i === 1 && Number(computerchoice) === 2) {
        addpoint(cscore);
        subractpoint(pscore);
    }
    else if (i === 2 && computerchoice === 1) {
        addpoint(pscore);
        subractpoint(cscore);
    }
    if (i === 2 && Number(computerchoice) === 0) {
        addpoint(cscore);
        subractpoint(pscore);
    }
    else if (i === 0 && computerchoice === 2) {
        addpoint(pscore);
        subractpoint(cscore);
    }
    pop_alert("Element Swap has been used up.");
    Powers[4].flag = false;
    disable_buttons("Element_Swap");
    var swap = document.getElementById("swap");
    // power_up_flags["Element_Swap"] = true;
    if (swap) {
        swap.style.display = "none";
    }
}
