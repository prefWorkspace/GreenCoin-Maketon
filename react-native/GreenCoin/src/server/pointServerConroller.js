
import localStringData from '../const/localStringData';
import userInfoSingleton from '../db/userInfoSingleton';

const api = localStringData.api;


export default {
    getPointListByUserId: (formData,nextEvent) => {
     api.post(`point/getlist/user`,formData,{headers: {Authorization: userInfoSingleton.getInstance()._tok_name }})
     .then(response=>{
       nextEvent(response.data)
      }).catch(e=>{console.log(e)})
     }
};

