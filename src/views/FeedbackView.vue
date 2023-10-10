<template>
  <div :class="'flex flex-col justify-center lg:px-6 lg:py-8 mx-auto lg:py-0 h-auto '">

      <button
          v-if="!showFeedback"
          type="button"
          class="
                text-blue-900 bg-white border border-blue-300 focus:outline-none
                hover:bg-blue-100 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg
                text-sm px-5 py-2.5 lg:mr-2 md:mr-2 mb-2 dark:bg-blue-800 dark:text-white
                dark:border-blue-600 dark:hover:bg-blue-700
                dark:hover:border-blue-600 dark:focus:ring-blue-700
                mb-[20px] mt-12 lg:w-72 md:w-72
            "
          @click="addFeedback = !addFeedback"
      >{{ addFeedback ? 'Go To Feedback List' : 'Create Feedback' }}</button>


      <div v-if="addFeedback">
          <FeedbackFormComponent />
      </div>

      <div v-else>

          <div v-if="!showFeedback">
              <FeedbackListingComponent
                  @show-feedback="(feedbackId) => {
                    currentFeedbackId = feedbackId
                    showFeedback = true
                  }"
              />
          </div>
          <div v-else class="relative w-full max-h-full mx-auto" >
              <FeedbackComponent
                  :feedbackId="currentFeedbackId"
                  @hide-feedback="showFeedback = false"
              />
          </div>
      </div>
  </div>
</template>

<style>
    /*img {*/
    /*    width: 30%;*/
    /*    margin: auto;*/
    /*    display: block;*/
    /*    margin-bottom: 10px;*/
    /*}*/
</style>

<script setup>

    import { ref} from "vue";
    import FeedbackComponent from "@/components/FeedbackComponent.vue";
    import FeedbackListingComponent from "@/components/FeedbackListingComponent.vue";
    import FeedbackFormComponent from "@/components/FeedbackFormComponent.vue";
    const props = defineProps(['darkMode'])


    let addFeedback = ref(false)
    let showFeedback = ref(false)
    let currentFeedbackId = ref(null)








</script>