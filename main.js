// Variables
var wood = {
    name: "wood",
    amount: 0,
    increment: 0
},
stone = {
    name: "stone",
    amount: 0,
    increment: 0
},
food = {
    name: "food",
    amount: 0,
    increment: 0
},
worker = {
    name: "worker",
    amount: 0,
    lumberjack: {
        increment: 1,
        amount: 0
    },
    miner: {
        increment: 1,
        amount: 0
    },
    hunter: {
        increment: 1,
        amount: 0
    }
}, // Buildings
tent = {
    amount: 0,
    residents: 1,
    cost: {
        wood: 30
    }
},
house = {
    amount: 0,
    residents: 4,
    cost: {
        wood: 75,
        stone: 25
    }
};

var maxPop = (tent.residents * tent.amount) + (house.residents * house.amount);
var clickIncrement = 1;

$(document).ready(function () {
    updateValues();
});

// Display the correct values.
function updateValues() {
    document.getElementById("woodAmount").innerHTML = wood.amount;
    document.getElementById("stoneAmount").innerHTML = stone.amount;
    document.getElementById("foodAmount").innerHTML = food.amount;
    document.getElementById("woodIncrement").innerHTML = wood.increment;
    document.getElementById("stoneIncrement").innerHTML = stone.increment;
    document.getElementById("foodIncrement").innerHTML = food.increment;
    document.getElementById("workerAmount").innerHTML = worker.amount;
    document.getElementById("maxPop").innerHTML = maxPop;
    document.getElementById("lumberjackAmount").innerHTML = worker.lumberjack.amount;
    document.getElementById("minerAmount").innerHTML = worker.miner.amount;
    document.getElementById("hunterAmount").innerHTML = worker.hunter.amount;
    document.getElementById("tentAmount").innerHTML = tent.amount;
    document.getElementById("tentCostWood").innerHTML = tent.cost.wood;
    document.getElementById("tentResidents").innerHTML = tent.residents;
    document.getElementById("houseAmount").innerHTML = house.amount;
    document.getElementById("houseCostWood").innerHTML = house.cost.wood;
    document.getElementById("houseCostStone").innerHTML = house.cost.stone;
    document.getElementById("houseResidents").innerHTML = house.residents;
}

// Click to Chop, Mine, Gather
$('#chopWood').click(function () {
    wood.amount = wood.amount + clickIncrement;
    updateValues();
});

$('#mineStone').click(function () {
    stone.amount = stone.amount + clickIncrement;
    updateValues();
});

$('#gatherFood').click(function () {
    food.amount = food.amount + clickIncrement;
    updateValues();
});


// Create Workers
$('#createLumberjack').click(function () {
    if (worker.amount < maxPop) {
        if (food.amount >= 10) {
            food.amount = food.amount - 10;
            worker.amount++;
            worker.lumberjack.amount++;
            updateValues();
            beginGatherWood();
        } else {
            $("#info").prepend($('<p>You need more food.</p>').fadeIn('slow'));
        }
    } else {
        $("#info").prepend($('<p>You need to build more accommodation.</p>').fadeIn('slow'));
    }
});

$('#createMiner').click(function () {
    if (worker.amount < maxPop) {
        if (food.amount >= 10) {
            food.amount = food.amount - 10;
            worker.amount++;
            worker.miner.amount++;
            updateValues();
            beginGatherStone();
        } else {
            $("#info").prepend($('<p>You need more food.</p>').fadeIn('slow'));
        }
    } else {
        $("#info").prepend($('<p>You need to build more accommodation.</p>').fadeIn('slow'));
    }
});

$('#createHunter').click(function () {
    if (worker.amount < maxPop) {
        if (food.amount >= 10) {
            food.amount = food.amount - 10;
            worker.amount++;
            worker.hunter.amount++;
            updateValues();
            beginGatherFood();
        } else {
            $("#info").prepend($('<p>You need more food.</p>').fadeIn('slow'));
        }
    } else {
        $("#info").prepend($('<p>You need to build more accommodation.</p>').fadeIn('slow'));
    }
});

// Lumberjacks Gather Wood
function beginGatherWood() {
    nIntervId = setInterval(gatherWood, 5000);
}

function gatherWood() {
    wood.increment = worker.lumberjack.increment * worker.lumberjack.amount;
    wood.amount = wood.amount + wood.increment;
    updateValues();
}

// Miner Gather Stone
function beginGatherStone() {
    nIntervId = setInterval(gatherStone, 5000);
}

function gatherStone() {
    stone.increment = worker.miner.increment * worker.miner.amount;
    stone.amount = stone.amount + stone.increment;
    updateValues();
}

// Hunter Gather Food
function beginGatherFood() {
    nIntervId = setInterval(gatherFood, 5000);
}

function gatherFood() {
    food.increment = worker.hunter.increment * worker.hunter.amount;
    food.amount = food.amount + food.increment;
    updateValues();
}

// Build a tent
$('#buildTent').click(function () {
    if (wood.amount >= tent.cost.wood) {
        wood.amount = wood.amount - tent.cost.wood;
        tent.amount++;
        tent.cost.wood = tent.cost.wood * 1.2;
        tent.cost.wood = tent.cost.wood.toFixed(0);
        maxPop = maxPop + tent.residents;
        updateValues();
    } else {
        $("#info").prepend($('<p>You need more wood.</p>').fadeIn('slow'));
    }
});

// Build a house
$('#buildHouse').click(function () {
    if (wood.amount >= house.cost.wood && stone.amount >= house.cost.stone) {
        wood.amount = wood.amount - house.cost.wood;
        stone.amount = stone.amount - house.cost.stone;
        house.amount++;
        house.cost.wood = house.cost.wood * 1.2;
        house.cost.stone = house.cost.stone * 1.2;
        house.cost.wood = house.cost.wood.toFixed(0);
        house.cost.stone = house.cost.stone.toFixed(0);
        maxPop = maxPop + house.residents;
        updateValues();
    } else {
        $("#info").prepend($('<p>You need more building materials.</p>').fadeIn('slow'));
    }
});

// Upgrades
$('#upgradeTwoFingers').click(function () {
    if (wood.amount >= 100 && stone.amount >= 100 && food.amount >= 100) {
        wood.amount = wood.amount - 100;
        stone.amount = stone.amount - 100;
        food.amount = food.amount - 100;
        clickIncrement = clickIncrement + 1;
        $('.upgradeTwoFingers').addClass('hidden');
        updateValues();
    } else {
        $("#info").prepend($('<p>You need more resources.</p>').fadeIn('slow'));
    }
});

$('#upgradeBunkBeds').click(function () {
    if (wood.amount >= 100 && stone.amount >= 100 && food.amount >= 100) {
        wood.amount = wood.amount - 100;
        stone.amount = stone.amount - 100;
        food.amount = food.amount - 100;
        house.residents = 5;
        maxPop = maxPop + house.amount;
        $('.upgradeBunkBeds').addClass('hidden');
        updateValues();
    } else {
        $("#info").prepend($('<p>You need more resources.</p>').fadeIn('slow'));
    }
});

$('#upgradeGymWorkout').click(function () {
    if (wood.amount >= 100 && stone.amount >= 100 && food.amount >= 100) {
        wood.amount = wood.amount - 100;
        stone.amount = stone.amount - 100;
        food.amount = food.amount - 100;
        worker.lumberjack.increment = 2;
        worker.miner.increment = 2;
        worker.hunter.increment = 2;
        $('.upgradeGymWorkout').addClass('hidden');
        updateValues();
    } else {
        $("#info").prepend($('<p>You need more resources.</p>').fadeIn('slow'));
    }
});

/* TESTING VALUES
wood.amount = 500;
stone.amount = 500;
food.amount = 500;*/