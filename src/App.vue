
<template>
    <div class="min-h-screen bg-gray-100">
    <header class="bg-teal-500 text-white p-4">
        <nav class="flex justify-center space-x-8">
            <a href="#next-launch" class="text-xl hover:text-teal-300 !text-red-600">Prochain Lancement</a>
            <a href="#launch-list" class="text-xl hover:text-teal-300">Liste des Lancements</a>
        </nav>
    </header>

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
    