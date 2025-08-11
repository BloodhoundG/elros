/**
 * Объект с функциями-правилами для валидации
 */
export const validateRules = {
    // Правило для обязательных полей
    ruleRequired(value: string) {
        return !!value || 'Обязательное поле';
    },

    // Правило для максимальной длины
    ruleMaxLength100(value: string) {
        if (!value) return true;

        return value.length <= 100 || 'Максимум 100 символов';
    },

    // Правило для максимальной длины
    ruleMaxLength50(value: string) {
        if (!value) return true;

        return value.length <= 50 || 'Максимум 50 символов';
    },

    // Правило для максимальной длины
    ruleMaxLength25(value: string) {
        if (!value) return true;

        return value.length <= 25 || 'Максимум 25 символов';
    },
};
