const axios = require('axios');
const { ApiErr, ParameterError } = require('./errors');


class API {
    /**
     * @param {String} userData 
     * @param {String} userId 
     */
    constructor(userData, userId) {
        this.userData = userData;
        this.userId = userId;
    }





    async getMyTop() {
        let data = {
            DayTop: {
                place: null,
                amount: null,
            },
            WeekTop: {
                place: null,
                amount: null,
            }
        }  
       await axios.post(`https://ngv2.coin-wheel.ru/server/capi.php`,{
              query:"getRating",
             data:{},
             uid:this.userId,
             referer:this.userData
          }).then(response => { 
              if(response.data.status != 'ok') {
                throw new ApiErr();  
              }
                // Топ дня
                data.DayTop.place = response.data.data.week.myPosition
                // Топ недели
                data.WeekTop.place = response.data.data.rweek.myPosition

                 return 
           }).catch(error => {       
            throw new ApiErr();  
                 });
         await axios.post(`https://ngv2.coin-wheel.ru/server/capi.php`,{
            query:"getUser",
           data:{},
           uid:this.userId,
           referer:this.userData
        }).then(response => { 
            if(response.data.status != 'ok') {
              throw new ApiErr();  
            }
            // Топ дня сумма
            data.DayTop.amount = response.data.userData.stat_day_win_sum
            // Топ недели сумма
            data.WeekTop.amount = response.data.userData.stat_rweek_win_sum
            return
              
         }).catch(error => {       
            throw new ApiErr();  
       });
    return data
    }




    async getBalance(ids) {
        if(!ids) {
            throw new ParameterError('ids');
        }
      let result = await axios.post(`https://ngv2.coin-wheel.ru/server/capi.php`,{
            query:"actions",
            data:{
            a: "getFriends",
            items: ids
            },
           uid:this.userId,
           referer:this.userData
        }).then(response => { 
            if(response.data.status != 'ok') {
              throw new ApiErr();  
            }
            return response.data.data
         }).catch(error => {       
            throw new ApiErr();  
       });
let data = {}
       for(let i in result) {
if(!data[result[i].id]) {
    data[result[i].id] = Number(result[i].coins)
}
       }
       return data
    }

    async getMyBalance() {
      let result = await axios.post(`https://ngv2.coin-wheel.ru/server/capi.php`,{
            query:"actions",
            data:{
            a: "getFriends",
            items: [this.userId]
            },
           uid:this.userId,
           referer:this.userData
        }).then(response => { 
            if(response.data.status != 'ok') {
              throw new ApiErr();  
            }
            return response.data.data
         }).catch(error => {       
            throw new ApiErr();  
       });
let data = {}
       for(let i in result) {
if(!data[result[i].id]) {
    data[result[i].id] = Number(result[i].coins)
}
       }
       return data
    }


    async sendPayment(id, amount) {
if(!id) {
    throw new ParameterError('id');
}
if(!amount) {
    throw new ParameterError('amount');
}
        let result = await axios.post(`https://ngv2.coin-wheel.ru/server/capi.php`,{
            query: "actions",
            data: {
                a: "transfer",
                to:id,
                sum: Number(amount)
                },
                
             uid:this.userId,
             referer:this.userData
          }).then(response => { 
              if(response.data.status != 'ok') {
                throw new ApiErr();  
              }
              return response.data.status
           }).catch(error => {       
              throw new ApiErr();  
         });

         return result
      }












}




module.exports = class CoinWheel {
    /**
     * @param {Object} options - Опции класса
     * 
     * 
     * @param {String} options.userData - API-ключ
     * @param {Number} options.userId - ID пользователя
     */
    constructor(options) {
        if (!options.userData) throw new ParameterError('userData');  // Уникальная ссылка пользователя
        if (!options.userId) throw new ParameterError('userId'); // Айди пользователя
        this.userData = options.userData;
        this.userId = options.userId;
        this.api = new API(this.userData, this.userId);
    }
};