

RPS = {
    0: 'Rock',
    1: 'Paper',
    2: 'Scissor'
}

// script.js


power_up_flags = {
    "Element_Boost": false,
    "Double_Points": false,
    "Shield": false,
    "Prediction": false,
    "Element_Swap": false
}

power_up_description = {
    "Element_Boost": "Temporarily strengthens a chosen element, making it win against one additional element.",
    "Double_Points": "The next winning round grants double points.",
    "Shield": "Negates the effect of the next loss.",
    "Prediction": "Reveals the computer's next choice.",
    "Element_Swap": "Allows changing the chosen element after revealing the computer’s choice."
}

power_ups = {
    0: "Element_Boost",
    1: "Double_Points",
    2: "Shield",
    3: "Prediction",
    4: "Element_Swap"
}



let rounds;
var pChoice = document.getElementById("playerChoice");
var cChoice = document.getElementById("computerChoice");

let pscore = document.getElementById('PlayerScore');
let cscore = document.getElementById('ComputerScore');


let powerupchance = Math.floor(Math.random() * (6 - 2) + 2);
// let powerupchance =1;
let boost = NaN;

function noOfRounds() {
    // Get the input element by its id
    var numberInput = document.getElementById("no_of_rounds");
    // Get the value entered by the user

    a = numberInput.value;
    console.log(a);
    rounds = document.getElementsByClassName("rounds")
    rounds[0].innerText = a;

    enable_buttons("Rock")
    enable_buttons("Paper")
    enable_buttons("Scissor")

    // document.getElementById("Rock").removeAttribute("disabled");
    // document.getElementById("Paper").removeAttribute("disabled");
    // document.getElementById("Scissor").removeAttribute("disabled");

    // rounds[1].innerText = 1;/
}

function choice(i) {

    console.log(power_up_flags);
    console.log(powerupchance);

    if (power_up_flags["Prediction"] !== true) {
        computerchoice = Math.floor(Math.random() * 3)
        cChoice.innerText = RPS[computerchoice];
    } else {
        cChoice.innerText = RPS[computerchoice];
    }

    // console.log("Chosen value:", RPS[i]);
    pChoice.innerText = String(RPS[i]);


    // console.log(RPS[computerchoice]);



    console.log("choice = " + RPS[i]);
    console.log("computerchoice = " + RPS[computerchoice]);
    if (Number(i) === 0 && Number(computerchoice) === 1) {
        if (Number(boost) !== 0) {
            if (power_up_flags["Shield"] !== true) {
                addpoint(cscore);
            } else {
                pop_alert("Shield has been used. Point Protected.");
                disable_buttons("Shield");
                power_up_flags["Shield"] = false;
            }
        } else {
            addpoint(pscore);
            Double_Points();
            power_up_flags["Element_Boost"] = false;
        }
    } else if (Number(i) === 1 && computerchoice === 0) {
        addpoint(pscore);
        Double_Points();
    }


    if (Number(i) === 1 && computerchoice === 2) {
        if (Number(boost) !== 1) {
            if (power_up_flags["Shield"] !== true) {
                addpoint(cscore);
            } else {
                pop_alert("Shield has been used. Point Protected.");
                disable_buttons("Shield");
                power_up_flags["Shield"] = false;
            }
        } else {
            addpoint(pscore);
            Double_Points();
            power_up_flags["Element_Boost"] = false;
        }
    } else if (Number(i) === 2 && computerchoice === 1) {
        addpoint(pscore);
        Double_Points();
    }

    if (Number(i) === 2 && computerchoice === 0) {
        if (Number(boost) !== 2) {
            if (power_up_flags["Shield"] !== true) {
                addpoint(cscore);
            } else {
                pop_alert("Shield has been used. Point Protected.");
                disable_buttons("Shield");
                power_up_flags["Shield"] = false;
            }

        } else {
            addpoint(pscore);
            Double_Points();
            power_up_flags["Element_Boost"] = false;
        }
    } else if (Number(i) === 0 && computerchoice === 2) {
        addpoint(pscore);
        Double_Points();

    }

    updateround(i);

}

function updateround(i) {
    if (Number(i) !== computerchoice) {

        rounds = document.getElementsByClassName("rounds");
        var num = Number(rounds[1].innerText) + 1;
        rounds[1].innerText = num;
        powerup(num);
    }

    winner_declaration(rounds);
}


function powerup(num) {

    if (num % powerupchance === 0) {

        let give_powerup = Math.floor(Math.random() * 5);
        pv = power_ups[give_powerup];

        pop_alert("You got a " + pv + " : " + power_up_description[pv]);

        enable_buttons(pv)
    }
}

function enable_buttons(pv) {
    document.getElementById(pv).removeAttribute("disabled");
}

function disable_buttons(pv) {
    console.log('disabled_buttons function' + pv);
    document.getElementById(pv).setAttribute("disabled", true);

    if (pv === "Element_Boost") {

        var dropdown = document.getElementById("myDropdown1");
        dropdown.style.display = 'none';
    }

    if (pv === "Element_Swap") {
        var dropdown = document.getElementsByClassName("swap");
        dropdown.style.display = 'none';
    }
}



function winner_declaration(rounds) {


    if (Number(rounds[0].innerText) === Number(rounds[1].innerText)) {

        console.log(pscore, cscore);
        if (pscore.innerText > cscore.innerText) {
            setTimeout(function () {
                window.location.href = "win.html";
            }, 1500)

        } else if (pscore.innerText < cscore.innerText) {

            setTimeout(function () {
                window.location.href = "lose.html";
            }, 1500)
        }
        else {
            setTimeout(function () {
                window.location.href = "draw.html";
            }, 1500)
        }
    }
    // document.getElementById("no_of_rounds").value = "";
    // document.getElementById("Rock").disabled = true;
    // document.getElementById("Paper").disabled = true;
    // document.getElementById("Scissor").disabled = true;
    // cscore.innerText = "0";
    // pscore.innerText = "0";
    // rounds[0].innerText = "0";
    // rounds[1].innerText = "0";
    // cChoice.innerText = "";
    // pChoice.innerText = "";
}


function toggleDropdown(i) {
    var dropdown = document.getElementById("myDropdown" + i);
    dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";
}


function Element_Boost(i) {

    power_up_flags["Element_Boost"] = true;
    boost = i;
    disable_buttons("Element_Boost");


}

function Double_Points() {
    if (power_up_flags["Double_Points"] === true) {
        addpoint(pscore);
        power_up_flags["Double_Points"] = false;
        pop_alert("Extra point has been added!");
        disable_buttons("Double_Points");
    }
}

function Double_Points_Enable() {
    power_up_flags["Double_Points"] = true;
    pop_alert("Using Double Points");
}

function addpoint(element) {
    num = Number(element.innerText) + 1;
    element.innerText = num;
}

function subractpoint(element) {
    num = Number(element.innerText) - 1;
    element.innerText = num;
}

function Shield() {
    power_up_flags["Shield"] = true;
    pop_alert("Shield has been activated.")
}


function Prediction() {

    computerchoice = Math.floor(Math.random() * 3);

    pChoice.innerText = "";
    cChoice.innerText = RPS[computerchoice]
    power_up_flags["Prediction"] = true;

    pop_alert("Prediction has been used.");
    disable_buttons("Prediction");
}


function Element_Swap(i) {


    if (Number(i) === 0 && Number(computerchoice) === 1) {
        addpoint(cscore);
        subractpoint(pscore);
    } else if (Number(i) === 1 && computerchoice === 0) {
        addpoint(pscore);
        subractpoint(cscore);
    }


    if (Number(i) === 1 && Number(computerchoice) === 2) {
        addpoint(cscore);
        subractpoint(pscore);
    } else if (Number(i) === 2 && computerchoice === 1) {
        addpoint(pscore);
        subractpoint(cscore);
    }

    if (Number(i) === 2 && Number(computerchoice) === 0) {
        addpoint(cscore);
        subractpoint(pscore);
    } else if (Number(i) === 0 && computerchoice === 2) {
        addpoint(pscore);
        subractpoint(cscore);
    }

    pop_alert("Element Swap has been used up.");
    power_up_flags["Element_Swap"] = false;
    disable_buttons("Element_Swap");
    var swap = document.getElementById("swap");
    power_up_flags["Element_Swap"] = true;
    swap.style.display = "none";


}


// function changeCSS(id){
//     var targetElement = document.getElementById(id);
//     targetElement.classList.toggle('changed');
// }


function pop_alert(txt) {
    var modal = document.getElementById('pop_up');
    modal.style.display = 'block';

    let msg = document.getElementById("message");

    msg.innerText = txt;

    // Automatically hide the modal after 3 seconds (adjust as needed)
    setTimeout(function () {
        modal.style.display = 'none';
    }, 2000);
}

function Element_Swap_enable() {
    var swap = document.getElementById("swap");
    power_up_flags["Element_Swap"] = true;
    swap.style.display = "block";
}



