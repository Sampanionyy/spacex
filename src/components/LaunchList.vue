<template>
    <div>
    <h2 class="text-xl font-bold mb-4">Derniers Lancements</h2>
    <ul>
        <li
        v-for="launch in filteredLaunches"
        :key="launch.id"
        class="p-4 border-b hover:bg-gray-200 cursor-pointer"
        @click="selectLaunch(launch)"
        >
        {{ launch.name }}
        </li>
    </ul>

    <LaunchModal
        v-if="selectedLaunch"
        :launch="selectedLaunch"
        @close="selectedLaunch = null"
    />
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref, computed, onMounted } from 'vue';
    import { fetchPastLaunches } from '../api/spacex';
    import type { Launch } from '../api/spacex';
    import LaunchModal from './LaunchModal.vue';

    export default defineComponent({
        name: 'LaunchList',
        components: {
        LaunchModal,
        },
        setup() {
            const launches = ref<Launch[]>([]);
            const filter = ref<string>('all');
            const selectedLaunch = ref<Launch | null>(null);

            onMounted(async () => {
                launches.value = await fetchPastLaunches();
            });

            const filteredLaunches = computed(() => {
                if (filter.value === 'success') {
                return launches.value.filter((launch) => launch.success);
                } else if (filter.value === 'failure') {
                return launches.value.filter((launch) => !launch.success);
                }
                return launches.value;
            });

            const selectLaunch = (launch: Launch) => {
                selectedLaunch.value = launch;
            };

            return { launches, filter, filteredLaunches, selectedLaunch, selectLaunch };
        },
    });
</script>
    