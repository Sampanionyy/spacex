<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg max-w-lg w-full">
        <h2 class="text-xl font-bold">{{ launch.name }}</h2>
        <p class="text-sm text-gray-600 mb-2">{{ formattedDate }}</p>
        <p class="mb-4">{{ launch.details || 'Aucune information disponible.' }}</p>

        <img
        v-if="launch.links.patch.large"
        :src="launch.links.patch.large"
        alt="Patch de lancement"
        class="mb-4"
        />

        <div>
        <label class="flex items-center mb-2">
            <input type="checkbox" v-model="showVideo" class="mr-2" />
            Afficher la vidéo YouTube
        </label>
        <YouTubePlayer v-if="showVideo" :videoId="launch.links.youtube_id" />
        </div>

        <button
        class="mt-4 bg-teal-500 text-white px-4 py-2 rounded"
        @click="$emit('close')"
        >
        Fermer
        </button>
    </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, computed, ref } from 'vue';
    import YouTubePlayer from './YouTubePlayer.vue';
    import type { Launch } from '../api/spacex';

    export default defineComponent({
        name: 'LaunchModal',
        components: {
        YouTubePlayer,
        },
        props: {
        launch: {
            type: Object as () => Launch,
            required: true,
        },
        },
        setup(props) {
        const showVideo = ref(false);

        const formattedDate = computed(() => {
            return new Date(props.launch.date_utc).toLocaleDateString();
        });

        return { showVideo, formattedDate };
        },
    });
</script>
