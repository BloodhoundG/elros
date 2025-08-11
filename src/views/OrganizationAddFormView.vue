<script setup lang="ts">
import type { IFormModel } from '@/types/types.ts';

import { ref } from 'vue';

import { useApi } from '../../api/useApi.ts';
import router from '@/router';

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

// Правило для обязательных полей
const ruleRequired = (value: string) => {
    return !!value || 'Обязательное поле';
};

// Правило для максимальной длины
const ruleMaxLength100 = (value: string) => {
    if (!value) return true;

    return value.length <= 100 || 'Максимум 100 символов';
};

// Правило для максимальной длины
const ruleMaxLength50 = (value: string) => {
    if (!value) return true;

    return value.length <= 50 || 'Максимум 50 символов';
};

// Правило для максимальной длины
const ruleMaxLength25 = (value: string) => {
    if (!value) return true;

    return value.length <= 25 || 'Максимум 25 символов';
};

// Функция-обработчик возвращает пользователя на главную страницу
const onClickBack = async () => {
    // Переход на начальную страницу
    await router.push('/');
};

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
                    <v-btn color="blue" @click="onClickBack">Назад</v-btn>
                </div>
            </v-form>
        </div>
    </div>
</template>

<style scoped lang="scss">
.organization-add-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px 30px;

    &__wrapper {
        padding: 30px 0 0;
        width: 1200px;
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
