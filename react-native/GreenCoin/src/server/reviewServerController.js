
import localStringData from '../const/localStringData';
import userInfoSingleton from '../db/userInfoSingleton';

const api = localStringData.api;


export default {
    updateReviewlikeScore: (formData,callback) => {
      api.post(`/reviewLike/update`,formData,{}).
      then(response=>{
          callback(response.data);
      }).catch(er=>{alert(" ","updateReviewlikeScore " + er)})
   },    
    getReviewDetailByReviewId: (rev_id,nextEvent) => {
       api.get(`/review/get/${rev_id}`,{
       }).then(response=>{
         nextEvent(response.data);
        }).catch(e=>{console.log(e)})
    },    
    getReviewDetailAndProductsByReviewId: (rev_id,nextEvent) => {
      api.get(`/review/getDetail/${rev_id}`,{
      }).then(response=>{
        nextEvent(response.data);
       }).catch(e=>{console.log(e)})
   },
    getReviewListByIdAndOffset:(id,offset,callback)=> { 
        api.get(`/review/getlist/${id}/${offset}`,{}).
        then(value=>{
          callback(value.data);
        }).catch(er=>{alert(" ","getReviewListByIdAndOffset " + er)})
    },
    insertReviewInfomation:(formData,callback)=>{
      api.post(`/review/insert`,formData,{headers: {Authorization: userInfoSingleton.getInstance()._tok_name }}).
      then(response=>{
          callback(response.data);
      }).catch(er=>{alert(" ","insertReviewInfomation " + er)})
    },
     updateReviewInfomation:(formData,callback)=>{
      api.post(`/review/insert`,formData,{headers: {Authorization: userInfoSingleton.getInstance()._tok_name }}).
      then(response=>{
          callback(response.data);
      }).catch(er=>{alert(" ","updateReviewInfomation " + er)})
    },
    getReviewListByUserId:(id,callback)=> { 
      api.get(`/review/getlist/user/${id}`,{}).
      then(value=>{
        callback(value.data);
      }).catch(er=>{alert(" ","getReviewListByUserId " +  er)})
    },
    deleteReviewByIds:(formData,callback)=>{
      api.post(`/review/delete/id`,formData,{headers: {Authorization: userInfoSingleton.getInstance()._tok_name }}).
      then(value=>{
        callback(value.data);
      }).catch(er=>{alert(" ","deleteReviewByIds " +  er)})
    },
    getReviewListByCustomFilter:(formData,callback)=> { 
      api.post(`/review/getlist/filter`,formData,{}).
      then(response=>{
          callback(response.data);
      }).catch(er=>{alert(" ","getReviewListByCustomFilter " +  er)})
    },
    getWriteReviewAble:(formData,callback)=> { 
      api.post(`/review/getlist/writeAble`,formData,{}).
      then(response=>{
          callback(response.data);
      }).catch(er=>{alert(" ","getWriteReviewAble " +  er)})
    },


    
    
};

