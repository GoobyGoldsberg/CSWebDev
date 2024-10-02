<template>
  <div class="relative flex flex-col justify-center items-center h-screen bg-gray-900 text-white">
    <button @click="logout" class="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline flex items-center">
      <i class="fas fa-sign-out-alt mr-2"></i> Logout
    </button>

    <img src="https://i.imgur.com/jFHBGTz.png" alt="Logo" class="mx-auto mb-4 h-64">

    <h1 class="text-4xl font-extrabold text-orange-500 mb-4">Welcome, {{ username }}!</h1>
    <p class="text-lg text-gray-300 mb-8">Ready to play Rock-Paper-Scissors?</p>

    <div class="bg-gray-800 p-8 rounded-lg shadow-lg text-center mb-8 w-full max-w-lg">
      <h2 class="text-2xl font-bold text-orange-500 mb-6">Your Score</h2>
      <div class="grid grid-cols-3 gap-4">
        <div class="bg-green-600 p-4 rounded-lg">
          <p class="text-xl font-semibold">Wins</p>
          <p class="text-3xl font-bold">{{ wins }}</p>
        </div>
        <div class="bg-red-600 p-4 rounded-lg">
          <p class="text-xl font-semibold">Losses</p>
          <p class="text-3xl font-bold">{{ losses }}</p>
        </div>
        <div class="bg-yellow-600 p-4 rounded-lg">
          <p class="text-xl font-semibold">Ties</p>
          <p class="text-3xl font-bold">{{ ties }}</p>
        </div>
      </div>
      <button @click="resetScore" class="mt-6 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline">
        <i class="fas fa-redo-alt mr-2"></i> Reset Score
      </button>
    </div>

    <router-link to="/game" class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-lg focus:outline-none focus:shadow-outline flex items-center justify-center text-xl">
      <i class="fas fa-gamepad mr-3"></i> Play Game
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      wins: 0,
      losses: 0,
      ties: 0,
    };
  },
  mounted() {
    const loggedIn = localStorage.getItem('loggedIn');
    if (!loggedIn) {
      this.$router.push('/');
    } else {
      this.username = localStorage.getItem('username') || 'Player';
      this.wins = parseInt(localStorage.getItem(`${this.username}_wins`)) || 0;
      this.losses = parseInt(localStorage.getItem(`${this.username}_losses`)) || 0;
      this.ties = parseInt(localStorage.getItem(`${this.username}_ties`)) || 0;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('loggedIn');
      this.$router.push('/');
    },
    resetScore() {
      this.wins = 0;
      this.losses = 0;
      this.ties = 0;
      this.computerWins = 0;
      this.computerLosses = 0;
      localStorage.setItem(`${this.username}_wins`, this.wins);
      localStorage.setItem(`${this.username}_losses`, this.losses);
      localStorage.setItem(`${this.username}_ties`, this.ties);
      localStorage.setItem(`${this.username}_computerWins`, this.computerWins);
      localStorage.setItem(`${this.username}_computerLosses`, this.computerLosses);
    },
  },
};
</script>

