<template>
  <div class="flex flex-col min-h-screen">
    <router-view class="flex-grow" />
    <Footer />
  </div>
</template>

<script>
import Footer from './components/AppFooter.vue';

export default {
  name: 'App',
  components: {
    Footer,
  },
};
</script>
