<template>

    <form class="mb-8">
        <div class="columns-2 mb-6">
            <div>
                <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                <input type="text" v-model="title" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="the title of discussion goes here..." required>
            </div>
            <div>
                <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a category</label>
                <select id="category" v-model="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>Choose a category</option>
                    <option v-for="category in ['bug_report', 'feature_request', 'improvement']" :key="category" :value="category">
                      {{ humanize(category) }}
                    </option>
                </select>
            </div>
        </div>
        <div class="mb-6">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <Editor
                id="description"
                :api-key="apiKey"
                v-model="description"
                value="hello how are you"
                :init='{
                    menubar: false,
                    plugins: "lists link image table code help dark",
                    skin: "oxide-dark",  // props.darkMode ? "oxide-dark" : "oxide",
                    content_css: "dark"  // props.darkMode ? "dark" : "default"
                }'
            />
        </div>
        <div class="mb-6">
            <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="multiple_files">Upload multiple files</label>
                <input
                    class="
                        block w-full text-sm text-gray-900 border border-gray-300
                        rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400
                        focus:outline-none dark:bg-gray-700 dark:border-gray-600
                        dark:placeholder-gray-400 p-1.5
                    "
                    id="multiple_files" type="file"
                    multiple @change="onFileChange"
                >
            </div>

            <div class="flex overflow-x-auto space-x-8 bg-transparent mb-6 text-white">
                <section v-for="(image, index) in images" :key="index" class="relative flex-shrink-0 mt-5 mr-5 mb-5 ">
                    <span>
                      <img :src="image" class=" h-24 w-36 border-2 border-blue-500" alt=""/>
                    </span>
                    <button @click="removeImage(index)" class="absolute top-2 right-2 bg-blue-500 text-white rounded px-2 hover:bg-blue-800">
                      X
                    </button>
                </section>
            </div>
        </div>
        <button @click="saveFeedback" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>

</template>

<script setup>

    import Editor from '@tinymce/tinymce-vue'
    import {reactive, ref} from "vue";
    // Need to be moved to env file but for the sake of simplicity just wrote here
    let apiKey = import.meta.env.VITE_TINY_MCE_KEY
    let images = reactive([])
    let currentImageIndex = reactive<Number>(0)

    let title = ref('')
    let category = ref('')
    let description = ref('<b>hello</b> world')

    import { useAuthStore } from '@/stores/auth'
    const store = useAuthStore()

    function humanize(category){
      category = category.replace('_', ' ')
        return category.toUpperCase();
    }

    function onFileChange(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        createImage(files);
    }

    function createImage(files) {
        console.log(files)
        for (let index = 0; index < files.length; index++) {
            let reader = new FileReader();
            reader.onload = function(event) {
                const imageUrl = event.target.result;
                images.push(imageUrl);
            }
            reader.readAsDataURL(files[index]);
        }

        currentImageIndex = images.length
        console.log(typeof  currentImageIndex)
    }

    function removeImage(index) {
        images.splice(index, 1)
        currentImageIndex = images.length === 0 ? null : 0
    }

    async function saveFeedback() {
        try {
            const response = await fetch(import.meta.env.VITE_SERVER_URL+'/api/feedbacks', {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${store.getToken}`
                },
                body: JSON.stringify({
                  title: title.value,
                  category: category.value,
                  description: description.value,
                  images: images
                })
            });

            const data = await response.json();
            alert(data.message)

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

</script>