<template>
    <div class="modal-overlay">
        <div class="modal-content">
            <h2 class="modal-title">{{ launch.name }}</h2>
            <p class="modal-date">{{ formattedDate }}</p>
            <p class="modal-details">{{ launch.details || 'Aucune information disponible.' }}</p>

            <img
                v-if="launch.links.patch.large"
                :src="launch.links.patch.large"
                alt="Patch de lancement"
                class="modal-image"
            />

            <div class="payloads-section">
                <p><strong>Chargements envoyés:</strong></p>
                <ul>
                    <li v-for="(payload, index) in launch.payloads" :key="index">{{ payload }}</li>
                </ul>
            </div>

            <div class="article-link">
                <p><strong>Article de présentation:</strong></p>
                <a :href="launch.links.article" target="_blank" v-if="launch.links.article">Lire l'article</a>
            </div>

            <div class="video-section">
                <label class="video-label">
                    <input type="checkbox" v-model="showVideo" class="video-checkbox" />
                    Afficher la vidéo
                </label>
                <YouTubePlayer v-if="showVideo" :videoId="launch.links.youtube_id" />
            </div>

            <button
                class="modal-close-button"
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

            // Formatage de la date
            const formattedDate = computed(() => {
                return new Date(props.launch.date_utc).toLocaleDateString('fr-FR');
            });

            return { showVideo, formattedDate };
        },
    });
</script>

<style scoped>
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }

    .modal-content {
        background-color: white;
        padding: 1.5rem;
        border-radius: 0.5rem;
        max-width: 32rem;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
    }

    .modal-title {
        font-size: 1.25rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
    }

    .modal-date {
        font-size: 0.875rem;
        color: #666;
        margin-bottom: 0.5rem;
    }

    .modal-details {
        margin-bottom: 1rem;
    }

    .modal-image {
        width: 100%;
        margin-bottom: 1rem;
    }

    .video-section {
        margin-bottom: 1rem;
    }

    .video-label {
        display: flex;
        align-items: center;
        margin-bottom: 0.5rem;
    }

    .video-checkbox {
        margin-right: 0.5rem;
    }

    .modal-close-button {
        background-color: #14b8a6;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
        border: none;
        cursor: pointer;
        margin-top: 1rem;
    }

    .modal-close-button:hover {
        background-color: #0d9488;
    }

    .launch-location,
    .payloads-section,
    .clients-section,
    .article-link {
        margin-bottom: 1rem;
    }
</style>
