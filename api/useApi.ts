import axios from 'axios';
import type { SortItem } from 'vuetify/lib/components/VDataTable/composables/sort.mjs';
import type { IFormModel } from '@/types/types.ts';

// Базовый URL для данного объекта
const BASE_URL = 'https://developer3.elros.info/api/v1';

export const useApi = {
    /**
     * Функция запрашивает данные об организациях и возвращает данные из промиса
     * @param page - текущая страница
     * @param itemsInPage - количество запрашиваемых элементов
     * @param ordering - сортировка
     */
    async getOrganizations(page: number, itemsInPage: number, ordering: SortItem) {
        try {
            const response = await axios.get(`${BASE_URL}/organizations/`, {
                params: {
                    page: page,
                    page_size: itemsInPage,
                    ordering: `${ordering.order === 'asc' ? '' : '-'}${ordering.key}`,
                },
            });

            return response.data;
        } catch (error) {
            console.error(error);
        }
    },

    /**
     * Функция делает запрос на удаление объекта организации по id этого объекта
     * @param organizationId - id объекта организации
     */
    async deleteOrganization(organizationId: number) {
        try {
            const response = await axios.delete(`${BASE_URL}/organizations/${organizationId}/`);

            return response;
        } catch (error) {
            console.error(error);
        }
    },

    /**
     * Функция делает запрос на создание объекта организации
     * @param organizationModel - данные для создания объекта организации
     */
    async addOrganization(organizationModel: IFormModel) {
        try {
            const { fullName, shortName, description, isActive } = organizationModel;

            const response = await axios.post(`${BASE_URL}/organizations/`, {
                name: fullName,
                short_name: shortName,
                description: description,
                is_active: isActive,
            });

            return response;
        } catch (error) {
            console.error(error);
        }
    },
};
