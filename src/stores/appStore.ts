import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Organization } from '@/types/types.ts';
import type { SortItem } from 'vuetify/lib/components/VDataTable/composables/sort.mjs';

export const useAppStore = defineStore('app-store', () => {
    /**
     * Список объектов организаций
     */
    const organizationsList = ref<Organization[]>([]);

    /**
     * Количество запрашиваемых организаций
     */
    const itemsInPage = ref(10);

    /**
     * Текущая страница пагинации списка организаций
     */
    const currentPage = ref(1);

    /**
     * Количество всех организаций
     */
    const totalItemsCount = ref(0);

    /**
     * Объект сортировки запросов
     */
    const sortObject = ref<SortItem[]>([]);

    return { organizationsList, itemsInPage, currentPage, totalItemsCount, sortObject };
});
