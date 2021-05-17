
import localStringData from '../const/localStringData';
import userInfoSingleton from '../db/userInfoSingleton';

const api = localStringData.api;

export default {
    loginByIdAndPassword: (formData,nextEvent) => {
       api.post(`users/login`,formData,{}).then(response=>{
         nextEvent(response.data);
        }).catch(e=>{nextEvent(false,e)})
    },
    autoLogin: (formData,nextEvent) => {
      api.post(`users/autologin`,formData,{}).then(response=>{
        nextEvent(response.data);
       }).catch(e=>{nextEvent(false,e)})
   },
    checkProfileSearchAbleByPhoneNumber:(formData,callBack)=>{
      return api.post(`users/search/phone`,formData,{
      }).then(response=>{
        callBack(response.data);
       }).catch(e=>{console.log(e)})
    },
    updateUserPassword:(formData,nextEvent)=>{
      return api.post(`users/update/password`,formData,{headers: {Authorization: userInfoSingleton.getInstance()._tok_name }}).then(response=>{
        if(nextEvent != undefined)
          nextEvent(response.data);
       }).catch(e=>{console.log(e)})

    },
    updateUserProfileSetting:(formData,moveToNext) =>{
      api.post(`users/update/setting`,formData,{headers: {Authorization: userInfoSingleton.getInstance()._tok_name }}).then(response=>{
        if(response.data)
           moveToNext(response.data);
       }).catch(e=>{console.log(e)})
    },
    updateRefundInfomation:(formData,moveToNext) =>{
      api.post(`users/update/refund/setting`,formData,{headers: {Authorization: userInfoSingleton.getInstance()._tok_name }}).then(response=>{
        moveToNext(response.data);
       }).catch(e=>{console.log(e)})
    },
    getRegisterPhoneNumber:(formData,moveToNext) =>{
      api.post(`users/check/phone`,formData,{}).then(response=>{
        moveToNext(response.data);
       }).catch(e=>{console.log(e)})
    },
    updatePhoneNumber:(formData,moveToNext) =>{
      api.post(`users/update/phone`,formData,{headers: {Authorization: userInfoSingleton.getInstance()._tok_name }}).then(response=>{
        moveToNext(response.data);
       }).catch(e=>{console.log(e)})
    },
   

    
};

