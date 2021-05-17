
import localStringData from '../const/localStringData';
import userInfoSingleton from '../db/userInfoSingleton';

const api = localStringData.api;


export default {
    getVaildateInfomation: (formData,nextEvent) => {
       api.post(`/order/vaildate/price/`,formData,{
       }).then(response=>{
         nextEvent(response.data);
        }).catch(e=>{console.log(e)})
    },
    insertTransactions:(formData,callback)=>{
      api.post(`/order/insert/transactions`,formData,{headers: {Authorization: userInfoSingleton.getInstance()._tok_name }}).
      then(response=>{
          callback(response.data);
      }).catch(er=>{alert(" ","address insertTransactions  " + er)})
    },
    getTransactionListByUserName:(formData,callback)=>{
      api.post(`/order/transactions/getlist`,formData,{}).
      then(response=>{
          callback(response.data);
      }).catch(er=>{alert(" ","order getTransactionListByUserName  " + er)})
    },
    updateTransactionOptionBeforeOrder:(formData,callback)=>{
      api.put(`/order/update/option`,formData,{headers: {Authorization: userInfoSingleton.getInstance()._tok_name }}).
      then(response=>{
          callback(response.data);
      }).catch(er=>{alert(" ","order updateTransactionOption  " + er)})
    },
    updateAddress:(formData,callback)=>{
      api.post(`/order/updateAddress`,formData,{headers: {Authorization: userInfoSingleton.getInstance()._tok_name }}).
      then(response=>{
          callback(response.data);
      }).catch(er=>{alert(" ","order updateTransactionOption  " + er)})
    },
    updateTransactionOption:(formData,callback)=>{
      api.post(`/order/update/option`,formData,{headers: {Authorization: userInfoSingleton.getInstance()._tok_name }}).
      then(response=>{
          callback(response.data);
      }).catch(er=>{alert(" ","order updateTransactionOption  " + er)})
    },
    cancelVbankTranscation:(formData,callback)=>{
      api.post(`/order/remove/transactions`,formData,{headers: {Authorization: userInfoSingleton.getInstance()._tok_name }}).
      then(response=>{
          callback(response.data);
      }).catch(er=>{alert(" ","order remove  " + er)})
    },
    cancelTransactionOption:(formData,callback)=>{
      api.post(`/order/transactions/cancel`,formData,{headers: {Authorization: userInfoSingleton.getInstance()._tok_name }}).
      then(response=>{
          callback(response.data);
      }).catch(er=>{alert(" ","order cancel  " + er)})
    },
    getTransactionDetail:(formData,callback)=>{
      api.post(`/order/transactions/detail`,formData,{}).
      then(response=>{
          callback(response.data);
      }).catch(er=>{alert(" ","order getTransactionDetail  " + er)})
    },
    getShipPrice:(zipcode,callback)=>{
      api.get(`/order/get/deliver/ship/price/${zipcode}`,{}).
      then(response=>{
          callback(response.data);
      }).catch(er=>{alert(" ","order getShipPrice  " + er)})
    },
    getReserveInfo:(n,callback)=>{
      api.get(`/order/get/reserve/info`,{}).
      then(response=>{
          callback(response.data);
      }).catch(er=>{alert(" ","reserve/info  " + er)})
    },
   
    

};

