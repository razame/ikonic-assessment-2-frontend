<template>

  <div class="h-screen">
      <form class="mb-5">
          <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
              </div>
              <input v-model="searchText"
                     type="search"
                     id="default-search"
                     class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg
                     bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600
                     dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="Search Mockups, Logos..."
                     required
              >
              <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
          </div>
      </form>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" class="px-6 py-3">
                          <div class="flex items-center">
                              Title
                              <!--                              <a href="#"><svg class="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">-->
                              <!--                                <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>-->
                              <!--                              </svg></a>-->
                          </div>
                      </th>
                      <th scope="col" class="px-6 py-3">
                          <div class="flex items-center">
                              Description
                              <!--                              <a href="#"><svg class="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">-->
                              <!--                                <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>-->
                              <!--                              </svg></a>-->
                          </div>
                      </th>
                      <th scope="col" class="px-6 py-3">
                          <div class="flex items-center">
                              Feedback by
                              <!--                              <a href="#"><svg class="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">-->
                              <!--                                <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>-->
                              <!--                              </svg></a>-->
                          </div>
                      </th>
                      <th>
                          Action
                      </th>
                  </tr>
              </thead>
              <tbody>
                    <tr v-for="(feedback, index) in feedbackList" :key="feedback.id" :class="index === 9 ? 'bg-white dark:bg-gray-800': 'bg-white border-b dark:bg-gray-800 dark:border-gray-700'">
                        <td class="px-6 py-4">
                            {{ feedback.title }}
                        </td>
                        <td class="px-6 py-4" v-html="feedback.description">
                        </td>
                        <td class="px-6 py-4">
                            {{ feedback?.created_by?.name }}
                        </td>
                        <td >
                            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-0.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" @click="showFeedbackItem(feedback.id)">View</button>
                        </td>
                    </tr>
              </tbody>
          </table>

          <div class="flex my-6 ml-6">
              <!-- Previous Button -->
              <button v-if="!isFirstPage" @click="moveToPrevPage" class="flex items-center justify-center px-3 h-8 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <svg class="w-3.5 h-3.5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                  </svg>
                  Previous
              </button>
              <button v-if="!isLastPage" @click="moveToNextPage" class="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  Next
                  <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                  </svg>
              </button>
          </div>

      </div>
  </div>

</template>

<script setup>
    import {ref, watch, customRef} from "vue";

    import { useAuthStore } from '@/stores/auth'
    const store = useAuthStore()

    const useDebouncedRef = (value, delay = 200)  => {
        let timeout
        return customRef((track, trigger) => {
            return {
                get() {
                    track()
                    return value
                },
                set(newValue) {
                    clearTimeout(timeout)
                    timeout = setTimeout(() => {
                        value = newValue
                        trigger()
                    }, delay)
                }
            }
        })
    }


    let isFirstPage = ref(false)
    let isLastPage = ref(false)
    let currentPage = ref(1)
    let feedbackList = ref([])
    let searchText = useDebouncedRef('', 1000)

    const emit = defineEmits(['showFeedback'])

    function showFeedbackItem(feedbackId) {
        emit('showFeedback', feedbackId)
    }

    watch(searchText, () => {
        currentPage = ref(1)
        fetchFeedbackList()
    })

    async function fetchFeedbackList() {
        try {
            let queryString = `?page=${currentPage.value}`;
            queryString +=  searchText.value !== '' ? '&search='+searchText.value : '';
            const response = await fetch(import.meta.env.VITE_SERVER_URL+'/api/feedbacks'+queryString, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${store.getToken}`
                }
            });
            const data = await response.json();
            feedbackList.value = data.feedbacks
            isFirstPage = data.is_first_page
            isLastPage = data.is_last_page
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function moveToPrevPage(){
        currentPage.value--
        fetchFeedbackList()
    }

    function moveToNextPage(){
        currentPage.value++
        fetchFeedbackList()
    }

    setTimeout(() => {
        fetchFeedbackList()
    }, 1000)

</script>