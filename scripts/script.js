
const winning_sound = new Audio("./audio/winning-moment.wav"); 

let score =JSON.parse(localStorage.getItem('score'))||{
  win : 0,
  loss : 0,
  tie : 0
}
updateScore();

function reset(){
  score.win=0; score.loss=0; score.tie=0;
  localStorage.removeItem('score');

  const mssg = document.querySelector('.msg');
  mssg.innerHTML = '';
  
  const mssg1 = document.querySelector('.msg1');
  mssg1.innerHTML = '';
  
  updateScore();
}

function game(user){
  let val = Math.random();
  let computer;
  
  if(val>=0&&val<1/3)
    computer = 'rock';
  else if(val>=1/3&&val<2/3)
    computer = 'paper';
  else
    computer = 'scissor';

  //Generating HTML using Javascipt
  let result=`
    User: <img class="user-img" src="images/${user}.png">
    Computer: <img class="user-img" src="images/${computer}.png">
  `;

  let main_result='';

  if(user==='rock'&&computer==='scissor'){
    score.win++;
    main_result='You win';
  }
  else if(user==='paper'&&computer==='rock'){
    score.win++;
    main_result='You win';
  }
  else if(user==='scissor'&&computer==='paper'){
    score.win++;
    main_result='You win';
  }
  else if(user===computer){
    score.tie++;
    main_result='Match Tie';
  }
  else{
    score.loss++;
    main_result='You lose';
  }
  localStorage.setItem('score',JSON.stringify(score));

  const msg1 = result;
  const mssg = document.querySelector('.msg');
  mssg.innerHTML = main_result;

  //Code for Celebration if the user win
  if(main_result==='You win'){
    import('./animation.js').then(module => {
      module.fun();
    }).catch(error => {
      console.error('Error importing module:', error);
    });
    winning_sound.play();
  }

  const mssg1 = document.querySelector('.msg1');
  mssg1.innerHTML = msg1;

  updateScore();  
}

function updateScore(){
  const msg2 = `Matches won:<span> ${score.win} </span>
                Matches lost: <span>${score.loss}</span> 
                Matches Tied:<span>${score.tie}</span>`;

  const msg3 = `Total Matches Played: <span>${score.win+score.loss+score.tie}</span>`;

  const msg4 = `Winning Percentage: 
                <span>${Math.round(score.win/(score.win+score.loss+score.tie)*100)||'0'}%</span>`;

  const mssg2 = document.querySelector('.msg2');
  const mssg3 = document.querySelector('.msg3');
  const mssg4 = document.querySelector('.msg4');

  mssg2.innerHTML = msg2;
  mssg3.innerHTML = msg3;
  mssg4.innerHTML = msg4;    
}