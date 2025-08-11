<script setup lang="ts">
import type { IFormModel } from '@/types/types.ts';

import { ref } from 'vue';

import { validateRules } from '@/composables/validateRules.ts';
import { useApi } from '../../api/useApi.ts';
import router from '@/router';

const { ruleRequired, ruleMaxLength25, ruleMaxLength50, ruleMaxLength100 } = validateRules;

// Флаг валидности формы
const isValidForm = ref(null);

// Флаг загрузки
const isLoading = ref(false);

// Модель для создания объекта организации
const formModel = ref<IFormModel>({
    fullName: '',
    shortName: '',
    description: '',
    isActive: true,
});

// Функция-обработчик события отправки формы
const onFormSubmit = async () => {
    // Запуск загрузки
    isLoading.value = true;

    // Если форма не валидна прервать функцию
    if (!isValidForm.value) {
        // остановить загрузку
        isLoading.value = false;
        return;
    }

    // Запрос на добавление организации
    await useApi.addOrganization(formModel.value).finally(() => (isLoading.value = false));

    // Переход на начальную страницу
    await router.push('/');
};
</script>

<template>
    <div class="organization-add-form">
        <h1 class="organization-add-form__title">Место проведения детально</h1>

        <div class="organization-add-form__wrapper">
            <v-form class="organization-add-form__form" v-model="isValidForm" @submit.prevent="onFormSubmit">
                <v-text-field
                    v-model="formModel.fullName"
                    :rules="[ruleRequired, ruleMaxLength50]"
                    label="Полное наименование"
                ></v-text-field>
                <v-text-field
                    v-model="formModel.shortName"
                    :rules="[ruleRequired, ruleMaxLength25]"
                    label="Краткое наименование"
                ></v-text-field>
                <v-textarea
                    v-model="formModel.description"
                    :rules="[ruleRequired, ruleMaxLength100]"
                    label="Описание"
                    auto-grow
                ></v-textarea>

                <div class="organization-add-form__controls">
                    <v-btn color="success" type="submit" :loading="isLoading">Отправить</v-btn>
                    <RouterLink to="/">
                        <v-btn color="blue"> Назад </v-btn>
                    </RouterLink>
                </div>
            </v-form>
        </div>
    </div>
</template>

<style scoped lang="scss">
.organization-add-form {
    container-type: inline-size;

    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 0;

    &__title {
        text-align: center;
    }

    &__wrapper {
        padding: 50px 30px;
        width: 100%;

        @container (width > 800px) {
            width: 800px;
        }
    }

    &__form {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    &__controls {
        display: flex;
        gap: 15px;
    }
}
</style>
