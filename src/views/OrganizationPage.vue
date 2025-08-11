<script setup lang="ts">
import { useAppStore } from '@/stores/appStore.ts';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

import { computed } from 'vue';

const route = useRoute();

const appStore = useAppStore();

const { organizationsList } = storeToRefs(appStore);

// Вычисляемое свойство возвращает текущего пользователя, на основании ID, который был передан параметром
// в качестве части URL-а
const currentOrganization = computed(() => {
    const current = organizationsList.value.find((organization) => organization.id === +route.params.id);

    return current;
});
</script>

<template>
    <div class="organization-page">
        <div class="organization-page__wrapper">
            <h1 class="organization-page__title">Страница организации</h1>
            <v-card
                class="organization-page__card"
                :title="currentOrganization?.name"
                :subtitle="currentOrganization?.short_name"
                :text="currentOrganization?.description ?? 'Нет описания'"
            >
            </v-card>
        </div>
    </div>
</template>

<style scoped lang="scss">
.organization-page {
    container-type: inline-size;

    padding: 50px 0;
    display: flex;
    flex-direction: column;

    &__title {
        text-align: center;
    }

    &__wrapper {
        padding: 0 20px;
    }

    &__card {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        margin: 0 auto;

        @container (width > 800px) {
            max-width: 600px;
        }
    }
}
</style>
