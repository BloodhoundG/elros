<script setup lang="ts">
import type { IDataTableServerOptions } from '@/types/types.ts';
import IconDelete from '@/components/icons/IconDelete.vue';

import { ref } from 'vue';
import { useAppStore } from '@/stores/appStore.ts';
import { storeToRefs } from 'pinia';

import { useApi } from '../../api/useApi.ts';

const appStore = useAppStore();

const { currentPage, itemsInPage, organizationsList, totalItemsCount, sortObject } = storeToRefs(appStore);

// Флаг загрузки таблицы
const isTableDataLoading = ref(false);

// Настройки заголовков таблицы
const tableHeaders = [
    { title: 'ID', key: 'id', width: 1 },
    { title: 'Имя', key: 'name' },
    { title: 'Активен', key: 'is_active', width: 1 },
    { title: '', key: 'deleteButton', width: 1, sortable: false },
];

/**
 * Функция обновляет данные в таблице
 * @param options - настройки таблицы
 */
const loadItems = (options: IDataTableServerOptions) => {
    const { page, itemsPerPage, sortBy } = options;

    // Включение флага загрузки
    isTableDataLoading.value = true;

    // Если массив сортировки пустой
    if (!sortBy.length) {
        // Сохранить сортировку в pinia по умолчанию
        sortObject.value[0] = { key: 'id', order: 'asc' };
    } else {
        // В противном случае сохранить сортировку в pinia из переданных настроек
        sortObject.value[0] = sortBy[0];
    }

    // Сохранить в Pinia количество элементов на странице
    itemsInPage.value = itemsPerPage;

    // Сохранить в Pinia номер текущей страницы
    currentPage.value = page;

    // Получение данных с сервера
    useApi
        .getOrganizations(page, itemsPerPage, sortObject.value[0])
        .then((response) => {
            // Обновление значения максимального количества данных
            totalItemsCount.value = response.count;

            // Отображение полученных данных
            organizationsList.value = response.results;
        })
        // Отключение флага загрузки
        .finally(() => (isTableDataLoading.value = false));
};

// Флаг открытия диалогового окна
const isDialogOpen = ref(false);

// Переменная хранит ID выбранной для удаления организации
const selectedOrganizationId = ref<number | null>(null);

// Функция-обработчик клика на кнопку удаления организации
const onClickDeleteOrganizationButton = (organizationId: number) => {
    // открытие диалогового окна
    isDialogOpen.value = true;

    // Сохранение переданного ID
    selectedOrganizationId.value = organizationId;
};

// Функция-обработчик удаления организации по ID
const onClickDeleteOrganization = async (organizationId: number | null) => {
    if (!organizationId) return;

    // Запрос на удаление организации
    await useApi.deleteOrganization(organizationId);

    // Закрытие диалогового окна
    isDialogOpen.value = false;
};
</script>

<template>
    <main class="organizations-list">
        <h1 class="organizations-list__title">
            Страница отображения списка организаций
            <RouterLink to="/create-organization" class="organizations-list__button-add" type="button"></RouterLink>
        </h1>

        <v-data-table-server
            :items-per-page="itemsInPage"
            :page="currentPage"
            :sort-by="sortObject"
            :headers="tableHeaders"
            :loading="isTableDataLoading"
            :items="organizationsList"
            :items-length="totalItemsCount"
            :item-value="'id'"
            :items-per-page-options="[
                { value: 10, title: '10' },
                { value: 25, title: '25' },
                { value: 50, title: '50' },
                { value: 100, title: '100' },
            ]"
            @update:options="loadItems"
        >
            <template #item="{ item }">
                <tr>
                    <td>{{ item.id }}</td>
                    <td>
                        <RouterLink class="link" :to="`/organization/${item.id}`">
                            {{ item.name }}
                        </RouterLink>
                    </td>
                    <td>
                        <span
                            class="organizations-list__is-active"
                            :class="
                                item['is_active']
                                    ? 'organizations-list__is-active--active'
                                    : 'organizations-list__is-active--no-active'
                            "
                        >
                            {{ item['is_active'] ? 'Да' : 'Нет' }}
                        </span>
                    </td>
                    <td class="organizations-list__delete-button">
                        <IconDelete width="24" height="24" @click="onClickDeleteOrganizationButton(item.id)" />
                    </td>
                </tr>
            </template>
        </v-data-table-server>

        <v-dialog max-width="600" v-model="isDialogOpen" persistent>
            <v-card
                title="Вы уверены что хотите удалить запись?"
                text="Подумайте, действительно ли вы хотите удалить запись, данное дейтсиве нельзя будет отменить."
            >
                <template v-slot:actions>
                    <v-spacer></v-spacer>

                    <v-btn variant="outlined" color="error" @click="onClickDeleteOrganization(selectedOrganizationId)">
                        Удалить
                    </v-btn>

                    <v-btn variant="outlined" color="blue" @click="isDialogOpen = false"> Отменить </v-btn>
                </template>
            </v-card>
        </v-dialog>
    </main>
</template>

<style scoped lang="scss">
.organizations-list {
    padding: 50px 30px;

    &__title {
        display: flex;
        gap: 20px;
        justify-content: center;
        align-items: center;
    }

    &__button-add {
        position: relative;
        width: 50px;
        height: 50px;
        border: 2px solid #008000;
        border-radius: 10px;
        color: #008000;
        cursor: pointer;

        &::before,
        &::after {
            content: '';
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate3d(-50%, -50%, 0);
            background: #008000;
        }

        &::before {
            width: 20px;
            height: 4px;
        }

        &::after {
            width: 4px;
            height: 20px;
        }
    }

    &__is-active {
        padding: 8px 16px;
        border-radius: 15px;
        color: #fff;

        &--active {
            background: #008000;
        }

        &--no-active {
            background: #c31616;
        }
    }

    &__delete-button {
        display: flex;
        justify-content: center;
        align-items: center;
        fill: #c31616;
        cursor: pointer;
    }
}

.v-data-table {
    max-width: 1200px;
    margin: 0 auto;

    .link {
        color: inherit;
    }
}
</style>
