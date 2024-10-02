<template>
  <div class="game text-white bg-gray-900 min-h-screen flex flex-col items-center justify-center relative">
    <div class="absolute top-4 left-4 bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center w-80">
      <h2 class="text-2xl font-bold text-green-500 mb-4 flex items-center">
        <i class="fas fa-user-circle mr-2"></i>{{ username }}'s Score
      </h2>
      <div class="flex justify-between w-full text-lg">
        <div class="text-center">
          <p class="font-semibold">Wins</p>
          <p class="text-3xl font-bold text-green-400">{{ wins }}</p>
        </div>
        <div class="text-center">
          <p class="font-semibold">Losses</p>
          <p class="text-3xl font-bold text-red-400">{{ losses }}</p>
        </div>
        <div class="text-center">
          <p class="font-semibold">Ties</p>
          <p class="text-3xl font-bold text-yellow-400">{{ ties }}</p>
        </div>
      </div>
    </div>

    <div class="absolute top-4 right-4 bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center w-80">
      <h2 class="text-2xl font-bold text-red-500 mb-4 flex items-center">
        <i class="fas fa-desktop mr-2"></i>Computer's Score
      </h2>
      <div class="flex justify-between w-full text-lg">
        <div class="text-center">
          <p class="font-semibold">Wins</p>
          <p class="text-3xl font-bold text-green-400">{{ computerWins }}</p>
        </div>
        <div class="text-center">
          <p class="font-semibold">Losses</p>
          <p class="text-3xl font-bold text-red-400">{{ computerLosses }}</p>
        </div>
        <div class="text-center">
          <p class="font-semibold">Ties</p>
          <p class="text-3xl font-bold text-yellow-400">{{ ties }}</p>
        </div>
      </div>
    </div>

    <div class="absolute top-4 flex justify-center w-full">
      <router-link to="/home" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline flex items-center text-xl">
        <i class="fas fa-home mr-3"></i> Homepage
      </router-link>
    </div>

    <div class="w-full max-w-3xl text-center flex flex-col items-center justify-center mt-20">
      <div class="flex justify-around items-center mb-8 w-full">
        <div class="relative">
          <img src="https://i.imgur.com/c4hjWHw.png" alt="Rock" class="h-44 cursor-pointer transform transition-all" @click="playGame('rock')" :class="{ 'cursor-not-allowed': resultMessage }">
          <p class="text-lg font-semibold mt-8">Rock</p>
          <div v-if="userChoice === 'rock'" class="indicator-wrapper">
            <div class="indicator bg-green-500"></div>
            <p class="indicator-text">Your Choice</p>
          </div>
          <div v-if="computerChoice === 'rock'" class="indicator-wrapper" style="top: unset; bottom: -28px;">
            <div class="indicator bg-red-500"></div>
            <p class="indicator-text">PC Choice</p>
          </div>
        </div>

        <div class="relative">
          <img src="https://i.imgur.com/dh5Z6mq.png" alt="Paper" class="h-44 cursor-pointer transform transition-all" @click="playGame('paper')" :class="{ 'cursor-not-allowed': resultMessage }">
          <p class="text-lg font-semibold mt-8">Paper</p>
          <div v-if="userChoice === 'paper'" class="indicator-wrapper">
            <div class="indicator bg-green-500"></div>
            <p class="indicator-text">Your Choice</p>
          </div>
          <div v-if="computerChoice === 'paper'" class="indicator-wrapper" style="top: unset; bottom: -28px;">
            <div class="indicator bg-red-500"></div>
            <p class="indicator-text">PC Choice</p>
          </div>
        </div>

        <div class="relative">
          <img src="https://i.imgur.com/qt3WWjy.png" alt="Scissors" class="h-44 cursor-pointer transform transition-all" @click="playGame('scissors')" :class="{ 'cursor-not-allowed': resultMessage }">
          <p class="text-lg font-semibold mt-8">Scissors</p>
          <div v-if="userChoice === 'scissors'" class="indicator-wrapper">
            <div class="indicator bg-green-500"></div>
            <p class="indicator-text">Your Choice</p>
          </div>
          <div v-if="computerChoice === 'scissors'" class="indicator-wrapper" style="top: unset; bottom: -28px;">
            <div class="indicator bg-red-500"></div>
            <p class="indicator-text">PC Choice</p>
          </div>
        </div>
      </div>

      <div v-if="resultMessage" :class="resultClass" class="text-2xl font-bold mt-4">
        {{ resultMessage }}
      </div>

      <button v-if="resultMessage" @click="resetGame" class="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline flex items-center text-xl mt-8">
        <i class="fas fa-redo-alt mr-3"></i> Play Again
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RockPaperScissorsGame',
  data() {
    return {
      username: '',
      wins: 0,
      losses: 0,
      ties: 0,
      computerWins: 0,
      computerLosses: 0,
      userChoice: null,
      computerChoice: null,
      resultMessage: '',
      resultClass: '',
    };
  },
  mounted() {
    this.username = localStorage.getItem('username') || 'Player';
    this.wins = parseInt(localStorage.getItem(`${this.username}_wins`)) || 0;
    this.losses = parseInt(localStorage.getItem(`${this.username}_losses`)) || 0;
    this.ties = parseInt(localStorage.getItem(`${this.username}_ties`)) || 0;
    this.computerWins = parseInt(localStorage.getItem(`${this.username}_computerWins`)) || 0;
    this.computerLosses = parseInt(localStorage.getItem(`${this.username}_computerLosses`)) || 0;
  },
  methods: 
  {
    playGame(userChoice) 
    {
      if (this.resultMessage) 
        return;

      const choices = ['rock', 'paper', 'scissors'];
      const computerChoice = choices[Math.floor(Math.random() * choices.length)];

      this.userChoice = userChoice;
      this.computerChoice = computerChoice;

      if (userChoice === computerChoice) 
      {
        this.ties++;
        this.resultMessage = "It's a tie!";
        this.resultClass = 'text-yellow-500';
      } 
      else if 
      (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
      ) 
      {
        this.wins++;
        this.computerLosses++;
        this.resultMessage = `You win! ${userChoice.charAt(0).toUpperCase() + userChoice.slice(1)} beats ${computerChoice}!`;
        this.resultClass = 'text-green-500';
      } 
      else 
      {
        this.losses++;
        this.computerWins++;
        this.resultMessage = `Computer wins! ${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)} beats ${userChoice}!`;
        this.resultClass = 'text-red-500';
      }

      localStorage.setItem(`${this.username}_wins`, this.wins);
      localStorage.setItem(`${this.username}_losses`, this.losses);
      localStorage.setItem(`${this.username}_ties`, this.ties);
      localStorage.setItem(`${this.username}_computerWins`, this.computerWins);
      localStorage.setItem(`${this.username}_computerLosses`, this.computerLosses);
    },
    resetGame() 
    {
      this.userChoice = null;
      this.computerChoice = null;
      this.resultMessage = '';
      this.resultClass = '';
    },
  },
};
</script>

<style scoped>
.indicator-wrapper 
{
  position: absolute;
  top: -28px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.indicator 
{
  height: 4px;
  width: 80px;
  margin-bottom: 4px;
}

.indicator-text 
{
  font-size: 0.75rem;
  color: white;
}
</style>
