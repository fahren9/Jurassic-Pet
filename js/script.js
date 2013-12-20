$(document).ready(function () {

  $("body").queryLoader2({
      barColor:           "#ffffff",
      backgroundColor:    "#554e43",
      percentage:         true,
      barHeight:          2,
      completeAnimation:  "grow",
      minimumTime:        400
  });

  var barFatigue  = document.getElementById('BarTired'),
      barHungry   = document.getElementById('BarHungry'),
      readForm    = document.getElementById('name-form'),
      petID       = retrieve_from_localStorage(),
      interval_id;

  document.getElementById('pet-name').innerHTML = petID.petName;
  document.getElementById('level-number').innerHTML = petID.lvl;
  document.getElementById('days').innerHTML = petID.days;
  document.getElementById('money').innerHTML = petID.money;


  if(petID.petName != '') {

    document.getElementById('exist-name').innerHTML = petID.petName;
    document.getElementById('exist-lvl').innerHTML = "Niveau " + petID.lvl;
    $('#pet-existing').attr('title', 'Score: ' + petID.score + ', Argent: ' + petID.money);
    $('.white-bg, .select-pet').fadeIn('fast');

    $('#pet-existing').click(function() {
      $('.white-bg, .select-pet').fadeOut('fast');
      interval_id = window.setInterval(function() {wildlife()}, 300);
    });

    $('#new-pet').click(function() {
      localStorage.clear();
      $('.select-pet').fadeOut('fast');
      $('.white-bg, .create-pet').fadeIn('fast');
    });

  } else {

    $('.white-bg, .create-pet').fadeIn('fast');

  }

  // PowerTip

  $('#nourriture, #jouer, #laver, #dormir').powerTip({
    placement: 'n'
  });

  $('#pet-existing').powerTip({ followMouse: true });

  // Test des données du localStorage

  function retrieve_from_localStorage() {
    if(localStorage.save)
      return JSON.parse(localStorage.save);
    else
      return {
              petName:      '',
              wellfare:     0,
              lvl:          1,
              score:        0,
              faim:         50,
              fatigue:      50,
              money:        0,
              days:         1,
              sleepLimit:   0,
              gameLimit:    0,
              foodLimit:    0,
              showerLimit:  0
             };
  }

  // Sauvegarde des données du localStorage

  function save_localStorage() {
    localStorage.save = JSON.stringify(petID);
  }

  // fonction répété décrémentant les progress bars

  function wildlife() {
      // Energy
      barFatigue.value = petID.fatigue;
      petID.fatigue-=0.1;
      if(petID.fatigue <= 0) petID.fatigue = 0;

      // Score
      petID.score = (petID.days * petID.lvl);
      document.getElementById('score').innerHTML = petID.score;

      // Food
      barHungry.value = petID.faim;
      petID.faim-=0.1;
      if(petID.faim <= 0) petID.faim = 0;

      // Bien être
      petID.wellfare = (petID.faim + petID.fatigue)/2;
      if(petID.wellfare >= 100) {
        document.getElementById('wellfare').innerHTML = 100 + "%";
        $('.popup-lvl').fadeIn('fast').delay(1500).fadeOut('fast');
      } else {
        document.getElementById('wellfare').innerHTML = parseInt(petID.wellfare)+"%";
      }

      //Gain de niveaux et d'argent
      if (petID.wellfare >= 100) {
        petID.fatigue = 50;
        petID.faim = 50;
        //niveau
        petID.lvl++;
        //argent
        petID.money+=100;
        //niveau
        document.getElementById('level-number').innerHTML = petID.lvl;
        document.getElementById('level-number-big').innerHTML = petID.lvl;
        //argent
        document.getElementById('money').innerHTML = petID.money;
      }

      save_localStorage();

      //faire mourir de fatigue
      if (petID.fatigue <= 0 && petID.faim <= 0) {
        clearInterval(interval_id);
        localStorage.clear();
        document.getElementById('death-cause').innerHTML = "faim et de fatigue";
        $('.white-bg, .dead-pet').fadeIn('fast');
      };
      //faire mourir de fatigue
      if (petID.fatigue <= 0 && petID.faim >= 1) {
        clearInterval(interval_id);
        localStorage.clear();
        document.getElementById('death-cause').innerHTML = "fatigue";
        $('.white-bg, .dead-pet').fadeIn('fast');
      };
      //faire mourir de faim
      if (petID.faim <= 0 && petID.fatigue >= 1) {
        clearInterval(interval_id);
        localStorage.clear();
        document.getElementById('death-cause').innerHTML = "faim";
        $('.white-bg, .dead-pet').fadeIn('fast');
      };
  }

  //donner un nom au dino
  readForm.onsubmit = function(event) 
  {
    var readInput = document.getElementById('name-input');
    if(readInput.value != '' || readInput.value == isNaN) {
      petID.petName = readInput.value;
      document.getElementById('pet-name').innerHTML = petID.petName;
      save_localStorage();
      $('.white-bg, .create-pet').fadeOut('fast');
      window.setInterval(function() {wildlife()}, 300);
    } 
    else 
    {
      alert('erreur, des lettres uniquement !');
    }
    event.preventDefault();
  }

  //Faire manger le dino
  document.getElementById('nourriture').onclick = function()
  {
    //rendre impossible de faire manger le dino pendant qu'il dort
    if (petID.sleepLimit >= 1)
    {
      return false;
    }
    //limite le nombre de repas à 2 par jour
    if (petID.foodLimit >=2)
    {
      return false;
    }
    else
    {
      petID.foodLimit++;
      petID.faim = petID.faim + (50 / petID.lvl);
      petID.money -= 20;
    }
  }

  //Prendre une douche
  document.getElementById('laver').onclick = function()
  {
    //rendre impossible de prendre une douche pendnat que le dino dort
    if (petID.sleepLimit >=1)
    {
      return false;
    }
    //limite le nombre de douches à 1 par jour
    if (petID.showerLimit >=1)
    {
      return false;
    }
    else
    {
      $('.bottom-section').fadeOut('fast');
      $('.dark-bg, .pet-clean').fadeIn('fast');
      setTimeout(function() {
        $('.dark-bg, .pet-clean').fadeOut('fast');
        $('.bottom-section').fadeIn('fast');
        petID.showerLimit++;
        petID.fatigue = petID.fatigue + (50 / petID.lvl);
        petID.money -= 20;
      }, 4000);
    }
  }

  //Faire jouer le Dino
  document.getElementById('jouer').onclick = function()
  {
    //rendre impossible de jouer pendant que le dino dort
    if (petID.sleepLimit >=1)
    {
      return false;
    }
    //ne pouvoir jouer que 3 fois par jour
    if (petID.gameLimit >=3)
    {
      return false;
    }
    else    
    {
      $('.bottom-section').fadeOut('fast');
      $('.dark-bg, .canvas-game').fadeIn('fast');
      setTimeout(function() {
        $('.dark-bg, .canvas-game').fadeOut('fast');
        $('.bottom-section').fadeIn('fast');
        petID.gameLimit++;
        petID.fatigue  = petID.fatigue - (20 / petID.lvl);
        petID.faim     = petID.faim + (100 / petID.lvl);
        petID.money += 60;
      }, 10000);
    }
  }

  //Dormir
  document.getElementById('dormir').onclick = function(x) {
    //limite dormir
    if (petID.sleepLimit >=1 ) {
      // si on a déjà cliqué : désactive le bouton pendant 5 sec
      return false;
    } else {
      // si on a pas déjà cliqué
      $('.dark-bg, .pet-sleep').fadeIn('fast');
      $('.bottom-section').fadeOut('fast');
      setTimeout(function() {
        $('.dark-bg, .pet-sleep').fadeOut('fast');
        $('.bottom-section').fadeIn('fast');
        petID.sleepLimit++;
        //réactivation du bouton au bout de 4 secondes
        petID.sleepLimit  = 0;
        petID.gameLimit   = 0;
        petID.showerLimit = 0;
        petID.foodLimit   = 0;
        //ajout du repos qui est calculé en fonction du niveau du pet
        petID.fatigue = petID.fatigue + (100 / petID.lvl);
        //compteur de jours
        petID.days++;
        document.getElementById('days').innerHTML = petID.days;
      }, 4000);
    }
  };
});