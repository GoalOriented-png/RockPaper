/*
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  Losses: 0,
  Tie: 0,
}; REFERNCE FOR SAVED DATA*/ 

/*LOADING BELOW*/

let saveFile = JSON.parse(localStorage.getItem(`activeSaveFile`));

let isPaused = JSON.parse(localStorage.getItem(`${saveFile}isPaused?`)) || true

let statArray = JSON.parse(localStorage.getItem(`${saveFile}stats`)) || {
  weight: 5,
  happiness: 5,
  health: 5,
  energy: 5,
  hunger: 5,
};

let time = JSON.parse(localStorage.getItem(`${saveFile}time`)) || {
  seconds: 59,
  minutes: 9,
};

let nameVariable = JSON.parse(localStorage.getItem(`${saveFile}name`) || '');

/* TIMER BELOW*/

setInterval(function() {
 countSecondDown('interval');
}, 1000);
setInterval(function() {
  updateTimer('interval');
 }, 1000);

function countSecondDown() {
  if (time.seconds > 0 && isPaused === false) {
    time.seconds = time.seconds - 1

    // This is the sleepy time
    if (sleepyScore > 0) {
    sleepyScore = sleepyScore - 1;
   } else if (sleepyScore === 0 && isHeSleepy === false) {
    isHeSleepy = true
    } else {
      asleep();
      } 
  //Hunger
  if (isHeHungry === true && hungerScore > 0) {
    hungerScore = hungerScore - 1;
   } else if (isHeHungry === true && hungerScore === 0) {
    isHeStarving = true
  
    document.querySelector('.js-hunger')
    .innerHTML = `I am starving!`;
    } 
  
       /// This is where we save shit
       localStorage.setItem(`${saveFile}time`, JSON.stringify(time));
} else if (time.seconds === 0 && isPaused === false) {
  time.seconds = 59;
  time.minutes = time.minutes - 1;
} 

} 

function updateTimer() {
  if (time.seconds >= 10 && isPaused === false) {
  document.querySelector('.js-timer')
    .innerHTML = `Time: ${time.minutes}.${time.seconds}`;
  } else if (time.seconds <= 9 && isPaused === false) {
    document.querySelector('.js-timer')
    .innerHTML = `Time: ${time.minutes}.0${time.seconds}`;
  }

};

/* STATS BELOW */


let sleepyScore = 25;
let hungerScore = 10;

function awaken() {
  sleepyScore = 25;
  isHeSleepy = false

  document.querySelector('.js-sleepy')
  .innerHTML = ''
}

function asleep() {
  statArray.health = statArray.health + 1;
  statArray.energy = statArray.energy + 1;
  statArray.hunger = statArray.hunger + 1/2;

  document.querySelector('.js-sleepy')
  .innerHTML = "Zzz"

  updateStats();
}

let isHeSleepy = false
let isHeHungry = false
let isHeStarving = false



function updateStats() {

// starving!!
      if (statArray.hunger <= 0) {
        isHeHungry = true;
        statArray.weight = statArray.weight - 1;
        statArray.happiness = statArray.happiness - 1;

        document.querySelector('.js-hunger')
    .innerHTML = `I am hungry!`;
      };
      if (isHeStarving === true) {
        statArray.weight = statArray.weight - 2;
        statArray.happiness = statArray.happiness - 2;
        statArray.health = statArray.health - 1;
        statArray.energy = statArray.energy - 1;

        document.querySelector('.js-hunger')
        .innerHTML = `I am starving!`;
      };
      if (statArray.hunger > 0) {
        hungerScore = 10;
        isHeHungry = false;
        isHeStarving = false;

        document.querySelector('.js-hunger')
        .innerHTML = ``;
      } ;
      if (statArray.hunger > 10) {
        statArray.hunger = 10;

        document.querySelector('.js-hunger')
        .innerHTML = `My tummy is full!`;
      };
/// no negative numbers!!
      if (statArray.weight < 0) {
        statArray.weight = 0
      } 
      if (statArray.happiness < 0) {
        statArray.happiness = 0
      } 
      if (statArray.health < 0) {
        statArray.health = 0
      } 
      if (statArray.energy < 0) {
        statArray.energy = 0
      } 
      if (statArray.hunger < 0) {
        statArray.hunger = 0
      } 
      /// actual shit
    document.querySelector('.js-stats')
    .innerHTML = `Weight: ${statArray.weight} Happiness: ${statArray.happiness} Health: ${statArray.health} Energy: ${statArray.energy} Hunger: ${statArray.hunger}`;

    /// This is where we save shit
    localStorage.setItem(`${saveFile}stats`, JSON.stringify(statArray));
    localStorage.setItem(`${saveFile}name`, JSON.stringify(nameVariable));


    document.querySelector(`.name-display`)
    .innerHTML = `${nameVariable}`;
  };



  function pausing() {
    if (isPaused === false) {
       isPaused = true

       document.querySelector('.Pause-button')
       .innerHTML = "Resume"
    } else if (isPaused === true) {
       isPaused = false
       document.querySelector('.Pause-button')
       .innerHTML = "Pause"
    }
   
  }
  
  updateStats();

  function naming() {
 
  const inputElement = document.querySelector('.js-name-input')
  var nameVariable = inputElement.value

  document.querySelector('.name-display')
    .innerHTML = `${nameVariable}`

    localStorage.setItem(`${saveFile}name`, JSON.stringify(nameVariable));
    }

  


 function keyDownEnterName(event) {
    if (event.key === 'Enter') {
      naming();
    }
  }

  function walk() {

    if (isPaused === false) {
    statArray.weight = statArray.weight - 1;
    statArray.happiness = statArray.happiness + 1;
    statArray.health = statArray.health + 1;
    statArray.energy = statArray.energy - 1;
    statArray.hunger = statArray.hunger - 1;

    updateStats();
    awaken();
    }
  };

  function meal() {

    if (isPaused === false) {
    statArray.weight = statArray.weight + 2;
    statArray.health = statArray.health + 1;
    statArray.energy = statArray.energy + 1;
    statArray.hunger = statArray.hunger - 1;

    awaken();
    updateStats();
    }
  }

  function play() {

    if (isPaused === false) {
    statArray.weight = statArray.weight - 2;
    statArray.happiness = statArray.happiness + 2;
    statArray.health = statArray.health + 2;
    statArray.energy = statArray.energy - 2;
    statArray.hunger = statArray.hunger - 2;

    awaken();
    updateStats();
    }
  };

  function doctor() {

    if (isPaused === false) {
    statArray.happiness = statArray.happiness - 1;
    statArray.health = statArray.health + 2;

    awaken();
    updateStats();
    }
  };

  function train() {

    if (isPaused === false) {
    statArray.happiness = statArray.happiness + 1;
    statArray.energy = statArray.energy - 1;
    statArray.hunger = statArray.hunger - 1;

    awaken();
    updateStats();
    }
  };

  function gameOverOne() {
    
    localStorage.removeItem(`${saveFile}stats`);
    localStorage.removeItem(`${saveFile}time`);
  
    
    window.location.href = `http://127.0.0.1:5500/99-Tamogatchi-END.html`
  };

  function gameOverTwo() { 
   
      document.querySelector('.js-end-display')
    .innerHTML = `${nameVariable} has died! Don't worry, they are replacable...`;


  };
  

  /* THIS IS A BUTTON PRESET
    statArray.weight = statArray.weight ;
    statArray.happiness = statArray.happiness;
    statArray.health = statArray.health
    statArray.energy = statArray.energy 
    statArray.hunger = statArray.hunger
  */
                  /* FORMATTING BAR      

function updateScoreElement() {
document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.wins}, Losses: ${score.Losses}, Ties: ${score.Tie}`;
}

                      FORMATTING BAR */



