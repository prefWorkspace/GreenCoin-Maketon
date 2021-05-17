
import localStringData from '../const/localStringData';
import userInfoSingleton from '../db/userInfoSingleton';

const api = localStringData.api;


export default {
    post: (link,formData,nextEvent) => {
     api.post(link,formData,{ headers: {Authorization: userInfoSingleton.getInstance()._tok_name }})
     .then(response=>{
       nextEvent(response.data)
      }).catch(e=>{console.log(e)})
     },
    get: (link,nextEvent) => {
      api.get(link,{headers: {Authorization: userInfoSingleton.getInstance()._tok_name }})
      .then(response=>{
        nextEvent(response.data)
       }).catch(e=>{console.log(e)})
    },
     
};

