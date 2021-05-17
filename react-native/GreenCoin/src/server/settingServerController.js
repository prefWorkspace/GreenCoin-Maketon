
import localStringData from '../const/localStringData';

const api = localStringData.api;

export default {
    updateNotification: (formData,nextEvent) => {
       api.post(`/users/update/notification`,formData,{
       }).then(response=>{
         nextEvent(response.data);
        }).catch(e=>{console.log(e)})
    },
    updateNotificationEvent: (formData,nextEvent) => {
      api.post(`/users/update/notification_event`,formData,{
      }).then(response=>{
        nextEvent(response.data);
       }).catch(e=>{console.log(e)})
   },
   getNotificationList: (formData,nextEvent) => {
    api.post(`/notification`,formData,{
    }).then(response=>{
      nextEvent(response.data);
     }).catch(e=>{console.log(e)})
 },
    
};

