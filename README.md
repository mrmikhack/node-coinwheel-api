# node-coinwheel-api
Простой модуль для работы с CoinWheel



### Установка

```js
$ npm i node-coinwheel-api
```

# Начало работы
Для начала использования, вам нужно создать в своей папке исполняемый файл, пусть это будет **index.js**

Теперь его нужно открыть и импортировать библиотеку:
```js
const CoinWheel = require('node-coinwheel-api')

const client = new CoinWheel({ 
    userId: айди страницы вк, 
    userData: "https://ngv2.coin-wheel.ru/?vk_access_token_settings=friends&vk_app_id=7611829&vk_are_notifications_enabled=0&vk_is_app_user=1&vk_is_favorite=0&vk_language=ru&vk_platform=desktop_web&vk_ref=other&vk_ts=***&vk_user_id=***&sign=***"
});

```



# Доступные методы

# getMyTop  
Показывает ваши данные в топе (место, сколько выиграли)

```js
async function run() {
    const result = await client.api.getMyTop();
    
    console.log(result);
}

run().catch(console.error);
```
