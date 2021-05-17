
import localStringData from '../const/localStringData';
const api = localStringData.api;

export default {
    getCuponListByUserId: (formData,nextEvent) => {
     api.post(`coupon/getlist/user`,formData,{})
     .then(response=>{
       nextEvent(response.data)
      }).catch(e=>{console.log(e)})
     },
     getUseAbleCouponListByUserId: (formData,nextEvent) => {
      api.post(`coupon/getlist/useAble/user`,formData,{})
      .then(response=>{
        nextEvent(response.data)
       }).catch(e=>{console.log(e)})
    }
     
     
};

