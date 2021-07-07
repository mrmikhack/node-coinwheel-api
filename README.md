# node-coinwheel-api
Простой модуль для работы с WheelCoin из CoinWheel



### Установка

```js
$ npm i node-coinwheel-api
```

### Доступные методы

#
getMyTop - Показывает ваши данные в топе (место, сколько выиграли)

```js
async function run() {
    const result = await client.api.getMyTop();
    
    console.log(result);
}

run().catch(console.error);
```
