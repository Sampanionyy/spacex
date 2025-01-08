    <template>
        <div class="p-6 bg-teal-500 text-white rounded shadow-md">
        <h2 class="text-2xl font-bold mb-2">Prochain Lancement</h2>
        <div v-if="launch">
            <p class="text-lg">Nom : {{ launch.name }}</p>
            <p>Date : {{ formattedDate }}</p>
        </div>
        <div v-else>Chargement...</div>
        </div>
    </template>
    
    <script lang="ts">
        import { defineComponent, ref, onMounted, computed } from 'vue';
        import { fetchNextLaunch } from '../api/spacex';
        import type { Launch } from '../api/spacex';
        
        export default defineComponent({
            setup() {
                const launch = ref<Launch | null>(null);
            
                onMounted(async () => {
                    launch.value = await fetchNextLaunch();
                });
        
                const formattedDate = computed(() => {
                    if (launch.value) {
                        return new Date(launch.value.date_utc).toLocaleString();
                    }
                    return '';
                });
            
                return { launch, formattedDate };
            },
        });
    </script>
    