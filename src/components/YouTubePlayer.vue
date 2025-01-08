<template>
    <div v-if="videoId" class="youtube-container">
    <div id="youtube-player" class="w-full h-64"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch, onUnmounted } from 'vue';

export default defineComponent({
    name: 'YouTubePlayer',
    props: {
        videoId: {
            type: String as () => string | null, 
            required: true,
        },
    },
    setup(props) {
    let player: any = null;
    let initializationInterval: number | null = null;

    const loadYouTubeAPI = () => {
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
        }
    };

    const createPlayer = () => {
        if (window.YT && window.YT.Player && !player) {
            player = new window.YT.Player('youtube-player', {
                height: '360',
                width: '640',
                videoId: props.videoId || '',
                events: {
                    onReady: () => console.log('YouTube Player ready'),
                },
            });
        }
    };

    onMounted(() => {
        loadYouTubeAPI();
        initializationInterval = window.setInterval(() => {
            if (window.YT && window.YT.Player) {
                window.clearInterval(initializationInterval!);
                createPlayer();
            }
        }, 500);
    });

    onUnmounted(() => {
        if (initializationInterval) {
            window.clearInterval(initializationInterval);
        }
        if (player) {
            player.destroy();
        }
    });

    watch(() => props.videoId, () => {
        if (player) {
            player.destroy();
            player = null;
        }
        createPlayer();
    });

    return {};
    },
});
</script>

<style scoped>
    .youtube-container {
        width: 100%;
        height: auto;
        position: relative;
        overflow: hidden;
    }
</style>