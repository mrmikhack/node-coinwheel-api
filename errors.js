class ApiErr extends Error {
    constructor() {
        super(`Ошибка авторизации. Проверьте валидность ваших данных`);
    }
}

class ParameterError extends Error {
    /**
     * @param {String} parameter - Название параметра
     */
    constructor(parameter) {
        super(`У вас не указан параметр \`${parameter}\``);
    }
}

module.exports = {
    ApiErr, ParameterError
};