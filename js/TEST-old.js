window.onload = function() {

  var barFatigue  = document.getElementById('BarTired'),
      barHungry   = document.getElementById('BarHungry'),
      readForm    = document.getElementById('name-form'),
      petID       = retrieve_from_localStorage(),
      sleepLimit  = 0,
      gameLimit   = 0,
      foodLimit   = 0,
      showerLimit = 0,
      petExist    = document.getElementById('pet-existing'),
      petNew      = document.getElementById('new-pet'),
      interval_id;

  document.getElementById('pet-name').innerHTML = petID.petName;
  document.getElementById('level-number').innerHTML = petID.lvl;

  document.getElementById('retry').onclick = function() {
    localStorage.clear();
    $('.dead-pet').fadeOut('fast');
    $('.create-pet').fadeIn('fast');
  }


  if(petID.petName != '') {
    $('.white-bg, .select-pet').fadeIn('fast');

    petExist.onclick = function() {
      $('.white-bg, .select-pet').fadeOut('fast');
      interval_id = window.setInterval(function() {wildlife()}, 300);
    }
    petNew.onclick = function() {
      localStorage.clear();
      $('.select-pet').fadeOut('fast');
      $('.white-bg, .create-pet').fadeIn('fast');
    }
  } else {
    $('.white-bg, .create-pet').fadeIn('fast');
  }

  function retrieve_from_localStorage() {
    if(localStorage.save)
      return JSON.parse(localStorage.save);
    else
      return {
              petName:  '',
              wellfare: 0,
              lvl:      1,
              score:    0,
              faim:     50,
              fatigue:  50,
              money:    0,
              days:     1
             };
  }
    function save_localStorage() {
    localStorage.save = JSON.stringify(petID);
  }

  function wildlife() {
      // Energy
      barFatigue.value = petID.fatigue;
      petID.fatigue-=2;
      if(petID.fatigue <= 0) petID.fatigue = 0;

      // Score
      petID.score = (petID.days * petID.lvl);
      document.getElementById('score').innerHTML = petID.score;

      // Food
      barHungry.value = petID.faim;
      petID.faim-=2;
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
      if (petID.fatigue <= 0) {
        petID.fatigue = 50;
        $('.white-bg, .dead-pet').fadeIn('fast');
        clearInterval(interval_id);
        localStorage.clear();
      };
      //faire mourir de faim
      if (petID.faim <= 0) {
        petID.faim = 50;
        $('.white-bg, .dead-pet').fadeIn('fast');
        clearInterval(interval_id);
        localStorage.clear();
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
    if (sleepLimit >= 1)
    {
      return false;
    }
    //limite le nombre de repas à 2 par jour
    if (foodLimit >=2)
    {
      return false;
    }
    else
    {
      foodLimit++;
      petID.faim = petID.faim + (50 / petID.lvl);
      petID.money -= 20;
      save_localStorage();

    }
  }

  //Prendre une douche
  document.getElementById('laver').onclick = function()
  {
    //rendre impossible de prendre une douche pendnat que le dino dort
    if (sleepLimit >=1)
    {
      return false;
    }
    //limite le nombre de douches à 1 par jour
    if (showerLimit >=1)
    {
      return false;
    }
    else
    {
    showerLimit++;
    petID.fatigue = petID.fatigue + (50 / petID.lvl);
    petID.money -= 20;
    save_localStorage();
    }
  }

  //Faire jouer le Dino
  document.getElementById('jouer').onclick = function()
  {
    //rendre impossible de jouer pendant que le dino dort
    if (sleepLimit >=1)
    {
      return false;
    }
    //ne pouvoir jouer que 3 fois par jour
    if (gameLimit >=3)
    {
      return false;
    }
    else    
    {
      gameLimit++;
      petID.fatigue  = petID.fatigue - (20 / petID.lvl);
      petID.faim     = petID.faim + (100 / petID.lvl);
      petID.money += 60;
      window.location = "file:///Users/Vincent/Documents/Semaine%20Intensive/Jurassic-Pet-3/MINI_JEU/index.html"
      save_localStorage();
    }
  }

  //Dormir
  document.getElementById('dormir').onclick = function(x)
  {
    //limite dormir
    if (sleepLimit >=1 )
    {
      // si on a déjà cliqué : désactive le bouton pendant 5 sec
      return false;
    }
    else
    {
      // si on a pas déjà cliqué
      sleepLimit++;
      setTimeout(function()
      {
        alert('Ton pet a finit de se reposer')

        //réactivation du bouton au bout de 5 secondes
        sleepLimit  = 0;
        gameLimit   = 0;
        showerLimit = 0;
        foodLimit   = 0;
      }
      ,5000);
    //ajout du repos qui est calculé en fonction du niveau du pet
    petID.fatigue = petID.fatigue + (100 / petID.lvl);
    //compteur de jours
    petID.days++;
    document.getElementById('days').innerHTML = petID.days;
    } 
  };
};




