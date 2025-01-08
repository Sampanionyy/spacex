
<template>
    <header class="bg-teal-500 text-white p-4 entete">
        <nav class="flex justify-center space-x-8 navbar">
            <a href="#next-launch" class="text-xl hover:bold !no-underline">Prochain Lancement</a>
            <a href="#launch-list" class="text-xl hover:bold !no-underline">Liste des Lancements</a>
        </nav>
    </header>
    <div class="min-h-screen bg-gray-100 main">
        <main class="p-6">
            <section id="next-launch" class="mb-8">
                <NextLaunch />
            </section>

            <section id="launch-list" class="mb-8">
                <LaunchList />
            </section>
        </main>
    </div>
</template>

<style>
    .entete {
        position: fixed;
        width: 100%;
        background-color: #fbe7ff;
        left: 0;
        padding: 1rem;
        color: white !important;
    }
    .navbar {
        display: flex;
        gap: 1rem;
    }
    .main {
        margin-top: 5rem;
    }
</style>

<script lang="ts">
    import { defineComponent } from 'vue';
    import NextLaunch from './components/NextLaunch.vue';
    import LaunchList from './components/LaunchList.vue';

    export default defineComponent({
        components: {
            NextLaunch,
            LaunchList,
        },
    });
</script>

<style scoped>
    /* Style pour le menu de navigation */
    header nav a {
        text-decoration: none;
    }
    header nav a:hover {
        text-decoration: underline;
    }
</style>
    