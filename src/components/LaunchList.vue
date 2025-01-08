<template>
    <div>
        <h2 class="title">Derniers Lancements</h2>
        
        <div class="filter">
            <label for="filter">Filtrer par :</label>
            <select 
                id="filter"
                v-model="filter"
                class="select"
            >
                <option value="all">Tous les lancements</option>
                <option value="success">Lancements réussis</option>
                <option value="failure">Lancements échoués</option>
            </select>
        </div>

        <div v-for="launch in filteredLaunches" :key="launch.id" class="launch-item">
            <div class="launch-details">
                <div class="launch-name">{{ launch.name }}</div>
                <div class="launch-date">{{ new Date(launch.date_utc).toLocaleString() }}</div>
                
            </div>
            <button 
                class="launch-button"
                @click="selectLaunch(launch)"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                    <path d="M8 3C5.243 3 2.927 4.48 2.018 6.5c-.03.07-.057.141-.086.211-.92 2.241-.92 4.78 0 7.022.03.07.057.141.086.211C2.927 11.52 5.243 13 8 13c2.757 0 5.073-1.48 5.982-3.5.03-.07.057-.141.086-.211.92-2.241.92-4.78 0-7.022-.03-.07-.057-.141-.086-.211C13.073 4.48 10.757 3 8 3zm0 7c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/>
                </svg>
            </button>
        </div>

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

<style scoped>
    .title {
        font-size: 1.25rem;
        font-weight: bold;
        margin-bottom: 1rem;
    }

    .filter {
        margin-bottom: 1rem;
    }

    .filter label {
        margin-right: 0.5rem;
    }

    .select {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .launch-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        border-bottom: 1px solid #e5e7eb;
        background-color: #f9fafb;
        transition: background-color 0.3s ease;
    }

    .launch-item:hover {
        background-color: #f3f4f6;
    }

    .launch-details {
        flex: 1;
        min-width: 200px; 
    }

    .launch-name {
        font-weight: bold;
        font-size: 1.25rem;
    }

    .launch-date {
        font-size: 0.875rem;
        color: #6b7280;
    }

    .launch-button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        transition: transform 0.3s ease;
    }

    .launch-button:hover {
        transform: scale(1.1);
    }

    .launch-button svg {
        fill: #3b82f6;
        width: 20px;
        height: 20px;
    }

    .launch-button:hover svg {
        fill: #2563eb;
    }
</style>