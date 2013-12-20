var score = document.getElementById('score');
window.onload = function ()
	{
		var canvas = document.getElementById('game'),
			context = canvas.getContext('2d'),
			width = canvas.width,
			height = canvas.height,
			keysMap = 
			{
				37: false,
				38: false,
				39: false,
				40: false
			},
			rand_image = 1;


		var tyrex = 
		{
			posX: 406,
			posY: 250,
			width: 27,
			height: 18,
		},

			eat = 
		{
			posX: Math.random() * width,
			posY: Math.random() * height,
			radius: 10
		}


		var tyrexImage = new Image(),
			loaded     = 0;

		tyrexImage.onload = function(){
			loaded++;
			tryInit();
		}
		tyrexImage.src = "img/tyrex.png";

		var eatImage = new Image();
		eatImage.onload = function()
		{
			loaded++;
			tryInit();
		};
		eatImage.src = 'img/eat.png';

		var eatImage2 = new Image();
		eatImage2.onload = function()
		{
			loaded++;
			tryInit();
		};
		eatImage2.src = 'img/chicken.png';

		var eatImage3 = new Image();
		eatImage3.onload = function()
		{
			loaded++;
			tryInit();
		};
		eatImage3.src = 'img/meat.png';

		var eatImage4 = new Image();
		eatImage4.onload = function()
		{
			loaded++;
			tryInit();
		};
		eatImage4.src = 'img/arm.png';
		
		var herbeImage = new Image();
		herbeImage.onload = function()
		{
			loaded++;
			tryInit();
		};
		herbeImage.src = 'img/herbe.png';

		function tryInit()
		{
			if(loaded === 6)
				init();
		}

		function init () {
			requestAnimationFrame(drawFrame);
			document.onkeydown = function(evt){
				if(keysMap[evt.keyCode] !== undefined){
					keysMap[evt.keyCode] = true;
				}
			}
			document.onkeyup = function(evt){
				if(keysMap[evt.keyCode] !== undefined){
					keysMap[evt.keyCode] = false;
				}
			}
		}

		function drawTyrex () {
			context.save();
			context.translate(tyrex.posX, tyrex.posY);
			context.rotate(tyrex.angle);
			context.drawImage(tyrexImage, -tyrex.width/2,-tyrex.height/2);
			context.restore();
		}

		function drawEat () {
			var eats = [eatImage,eatImage2,eatImage3,eatImage4];
			context.drawImage(eats[rand_image], eat.posX, eat.posY);
		}

		function drawBackground () {
        	context.beginPath(); 
        	context.fillStyle = 'rgba(124,198,92,1)';
        	context.fillRect(0,0,759,600);
			context.fill();
			context.closePath();
		}

		function drawHerbe () {
			context.drawImage(herbeImage, 580, 42);
			context.drawImage(herbeImage, 610, 42);
			//
			context.drawImage(herbeImage, 300, 500);
			//
			context.drawImage(herbeImage, 680, 572);
			context.drawImage(herbeImage, 710, 572);
			//
			context.drawImage(herbeImage, 80, 372);
			context.drawImage(herbeImage, 110, 372);
			//
			context.drawImage(herbeImage, 55, 50);
			//
			context.drawImage(herbeImage, 380, 280);
			//
			context.drawImage(herbeImage, 280, 172);
			context.drawImage(herbeImage, 310, 172);
			//
			context.drawImage(herbeImage, 700, 280);
			//
			context.drawImage(herbeImage, 520, 380);
			//
			context.drawImage(herbeImage, 480, 132);
			context.drawImage(herbeImage, 520, 132);
			//
			context.drawImage(herbeImage, 50, 580);
			//
			context.drawImage(herbeImage, -10, 260);
		}

		function drawTree () {
			context.beginPath();
			// tree 1
        	context.fillStyle ='rgba(68,147,33,1)';
        	context.arc(600,34,10, Math.PI*2,false);
        	context.arc(614,28,10, Math.PI*2,false);
        	context.arc(628,30,10, Math.PI*2,false);
        	context.arc(642,35,10, Math.PI*2,false);
        	context.arc(650,47,10, Math.PI*2,false);
			context.arc(640,50,10, Math.PI*2,false);
			context.arc(625,50,10, Math.PI*2,false);
			context.arc(610,50,10, Math.PI*2,false);
			context.arc(600,50,10, Math.PI*2,false);
			context.arc(590,47,10, Math.PI*2,false);
			context.fill();
		}

		function drawTree2 () {
			// tree 2
			context.beginPath();
        	context.fillStyle ='rgba(68,147,33,1)';
			context.beginPath();
        	context.arc(700,564,10, Math.PI*2,false);
        	context.arc(714,558,10, Math.PI*2,false);
        	context.arc(728,560,10, Math.PI*2,false);
        	context.arc(742,565,10, Math.PI*2,false);
        	context.arc(750,577,10, Math.PI*2,false);
			context.arc(740,580,10, Math.PI*2,false);
			context.arc(725,580,10, Math.PI*2,false);
			context.arc(710,580,10, Math.PI*2,false);
			context.arc(700,580,10, Math.PI*2,false);
			context.arc(690,577,10, Math.PI*2,false);
        	context.fill();
		}

		function drawTree3 () {
			// tree 3
			context.beginPath();
        	context.fillStyle ='rgba(68,147,33,1)';
			context.beginPath();
        	context.arc(100,364,10, Math.PI*2,false);
        	context.arc(114,358,10, Math.PI*2,false);
        	context.arc(128,360,10, Math.PI*2,false);
        	context.arc(142,365,10, Math.PI*2,false);
        	context.arc(150,377,10, Math.PI*2,false);
			context.arc(140,380,10, Math.PI*2,false);
			context.arc(125,380,10, Math.PI*2,false);
			context.arc(110,380,10, Math.PI*2,false);
			context.arc(100,380,10, Math.PI*2,false);
			context.arc(90,377,10, Math.PI*2,false);
        	context.fill();
		}

		function drawTree4 () {
			// tree 3
			context.beginPath();
        	context.fillStyle ='rgba(68,147,33,1)';
			context.beginPath();
        	context.arc(300,164,10, Math.PI*2,false);
        	context.arc(314,158,10, Math.PI*2,false);
        	context.arc(328,160,10, Math.PI*2,false);
        	context.arc(342,165,10, Math.PI*2,false);
        	context.arc(350,177,10, Math.PI*2,false);
			context.arc(340,180,10, Math.PI*2,false);
			context.arc(325,180,10, Math.PI*2,false);
			context.arc(310,180,10, Math.PI*2,false);
			context.arc(300,180,10, Math.PI*2,false);
			context.arc(290,177,10, Math.PI*2,false);
        	context.fill();
		}
		
		

		function checkCollision () {
			var distance = Math.sqrt( Math.pow(tyrex.posX - eat.posX, 2) + Math.pow(tyrex.posY - eat.posY, 2));
			if(distance <= 40){
				var score = document.getElementById('score');
				score.innerHTML = parseInt(score.innerHTML) + 10;
				eat.posX = Math.round(Math.random() * width);
				eat.posY = Math.round(Math.random() * height);
				rand_image = Math.round(Math.random()*3);
			}
		}

		function drawFrame () {
			requestAnimationFrame(drawFrame);

			context.clearRect(0,0,width,height);
			drawBackground();
			drawTree();
			drawTree2();
			drawTree3();
			drawTree4();
			drawHerbe();
			moveTyrex();
			drawTyrex();
			checkCollision();
			drawEat();
		}

		function moveTyrex () {
				if(keysMap[38] == true){
					tyrex.posY -= 4;
				}
				if(keysMap[40] == true){
					tyrex.posY += 4;
				}
				if(keysMap[37] == true){
					tyrex.posX -= 4;
				}
				if(keysMap[39] == true){
					tyrex.posX += 4;
				}
				if(tyrex.posX < tyrex.width/2) { tyrex.posX = tyrex.width/2 };
				if(tyrex.posX > width - tyrex.width) { tyrex.posX = width - tyrex.width };

				if(tyrex.posY < tyrex.height/2) { tyrex.posY = tyrex.height/2 };
				if(tyrex.posY > height - tyrex.width*1.5) { tyrex.posY = height - tyrex.width*1.5 };

		}
	};