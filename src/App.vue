<script setup lang="ts">
import {computed, ref} from 'vue'
import { useAuthStore } from '@/stores/auth'
import router from "@/router";
import MenubarComponent from "@/components/MenubarComponent.vue";
const store = useAuthStore()



const darkModeOn = ref(false)

// alert(darkModeOn.value ? 'parent dark mode on' : 'parent dark mode off')

const isLoggedIn = computed(() => {
  return store.getToken !== '' && router.currentRoute.value !== 'signin' && router.currentRoute.value !== 'signup' && router.currentRoute.value !== 'home'
})

function toggleDarkMode(){
  const html = document.querySelector("html");
  html.classList.toggle('dark');
  darkModeOn.value = !darkModeOn.value;
}
</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900">

      <div class="w-full h-16 relative" v-if="isLoggedIn">
      <!-- <button class="bg-gray-50 dark:bg-gray-900 mt-10 mr-10 float-right" @click="toggleDarkMode">-->
      <!--   <svg v-if="darkModeOn" data-toggle-icon="moon" class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">-->
      <!--     <path d="M17.8 13.75a1 1 0 0 0-.859-.5A7.488 7.488 0 0 1 10.52 2a1 1 0 0 0 0-.969A1.035 1.035 0 0 0 9.687.5h-.113a9.5 9.5 0 1 0 8.222 14.247 1 1 0 0 0 .004-.997Z"></path>-->
      <!--   </svg>-->
      <!--   <svg v-if="!darkModeOn" id="theme-toggle-light-icon" class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 20 20">-->
      <!--     <path d="M10 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-11a1 1 0 0 0 1-1V1a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1Zm0 12a1 1 0 0 0-1 1v2a1 1 0 1 0 2 0v-2a1 1 0 0 0-1-1ZM4.343 5.757a1 1 0 0 0 1.414-1.414L4.343 2.929a1 1 0 0 0-1.414 1.414l1.414 1.414Zm11.314 8.486a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414ZM4 10a1 1 0 0 0-1-1H1a1 1 0 0 0 0 2h2a1 1 0 0 0 1-1Zm15-1h-2a1 1 0 1 0 0 2h2a1 1 0 0 0 0-2ZM4.343 14.243l-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414a1 1 0 0 0-1.414-1.414ZM14.95 6.05a1 1 0 0 0 .707-.293l1.414-1.414a1 1 0 1 0-1.414-1.414l-1.414 1.414a1 1 0 0 0 .707 1.707Z"></path>-->
      <!--    </svg>-->
      <!-- </button>-->
<!--            <NotificationsComponent/>-->
<!---->
<!--            <ProfileAndLogoutComponent />-->
          <MenubarComponent />


      </div>

      <div class="w-full p-10">
        <router-view></router-view>
      </div>
  </section>
</template>

<style scoped>

</style>
