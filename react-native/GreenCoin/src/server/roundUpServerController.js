
import localStringData from '../const/localStringData';

const api = localStringData.api;

export default {   
    getRoundUpListByCatId: (formData,nextEvent) => {
       api.post(`roundup/getlist`,formData ,{
       }).then(response=>{
         nextEvent(response.data);
        }).catch(e=>{console.log(e)})
    },    
    getRoundUpDetailListByRuId: (formData,nextEvent) => {
      api.post(`roundup/detail/getlist`,formData ,{
      }).then(response=>{
        nextEvent(response.data);
       }).catch(e=>{console.log(e)})
   },    
  
   
};

