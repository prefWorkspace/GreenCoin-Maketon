
import localStringData from '../const/localStringData';

const api = localStringData.api;

export default {
    getLikesLikesByUserId: (formData,nextEvent) => {
     api.post(`likes/getlist/`,formData,{})
     .then(response=>{
       nextEvent(response.data)
      }).catch(e=>{console.log(e)})
     },
    insertLikesTaginDetailPage: (formData,nextEvent) => {
      api.post(`/likes/insert/inDetail`,formData,{})
      .then(response=>{
        nextEvent(response.data)
       }).catch(e=>{console.log(e)})
    },
    insertLikesTag: (formData,nextEvent) => {
     api.post(`likes/insert/`,formData,{})
     .then(response=>{
       nextEvent(response.data)
      }).catch(e=>{console.log(e)})
     },
    deleteLikesTag: (formData,nextEvent) => {
     api.post(`likes/delete/`,formData,{})
     .then(response=>{
       nextEvent(response.data)
      }).catch(e=>{console.log(e)})
     },
};

