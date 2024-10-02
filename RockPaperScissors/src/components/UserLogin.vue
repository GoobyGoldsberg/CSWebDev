<template>
  <div class="flex flex-col justify-center items-center h-screen bg-gray-900">
    <div class="text-center mb-6">
      <img src="https://i.imgur.com/jFHBGTz.png" alt="logo" class="mx-auto mb-4 h-64">
      <h1 class="text-4xl font-extrabold text-orange-500 mb-2">Rock-Paper-Scissors Game</h1>
      <p class="text-gray-300 text-lg">To play the game, please login or register below.</p>
    </div>

    <div class="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
      <h2 class="text-2xl font-bold mb-6 text-center text-white">{{ isRegistering ? 'Register' : 'Login' }}</h2>
      <div class="mb-4">
        <label class="block text-gray-300 text-sm font-bold mb-2" for="username">Username</label>
        <input v-model="username" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 bg-gray-700" id="username" type="text" placeholder="Enter username">
      </div>
      <div class="mb-6">
        <label class="block text-gray-300 text-sm font-bold mb-2" for="password">Password</label>
        <input v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 bg-gray-700" id="password" type="password" placeholder="Enter password">
      </div>
      <div v-if="isRegistering" class="mb-6">
        <label class="block text-gray-300 text-sm font-bold mb-2" for="confirmPassword">Confirm Password</label>
        <input v-model="confirmPassword" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 bg-gray-700" id="confirmPassword" type="password" placeholder="Confirm password">
      </div>
      <div class="flex items-center justify-between">
        <button @click="isRegistering ? register() : login()" class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
          {{ isRegistering ? 'Register' : 'Login' }}
        </button>
      </div>
      <div class="mt-4 text-center">
        <a href="#" @click.prevent="toggleForm" class="text-orange-400 hover:text-orange-600">{{ isRegistering ? 'Already have an account? Login' : 'Don\'t have an account? Register' }}</a>
      </div>
      <div v-if="error" class="text-red-500 mt-4 text-center">{{ error }}</div>
    </div>
  </div>
</template>

<script>
export default 
{
  data() 
  {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      isRegistering: false,
      error: null,
    };
  },
  mounted() 
  {
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn) 
    {
      this.$router.push('/home');
    }
  },
  methods: 
  {
    toggleForm() 
    {
      this.isRegistering = !this.isRegistering;
      this.error = null;
      this.username = '';
      this.password = '';
      this.confirmPassword = '';
    },
    register() 
    {
      if (this.password !== this.confirmPassword) 
      {
        this.error = 'Passwords do not match';
        return;
      }

      const existingUser = localStorage.getItem(this.username);

      if (existingUser) 
      {
        this.error = 'Username already exists';
        return;
      }

      localStorage.setItem(this.username, this.password);
      localStorage.setItem('username', this.username);
      localStorage.setItem('loggedIn', true);
      this.$router.push('/home');
    },
    login() 
    {
      const storedPassword = localStorage.getItem(this.username);

      if (storedPassword && storedPassword === this.password) 
      {
        localStorage.setItem('loggedIn', true);
        localStorage.setItem('username', this.username);
        this.$router.push('/home');
      } 
      else 
      {
        this.error = 'Incorrect username or password';
      }
    },
  },
};
</script>
