
import localStringData from '../const/localStringData';
import userInfoSingleton from '../db/userInfoSingleton';


const api = localStringData.api;
 
export default {
   updateUserBoardInfo:(formData,callback)=>{
    api.post(`board/update/user`,formData,{
      headers: {Authorization: userInfoSingleton.getInstance()._tok_name }
    }).then(response=>{
      if(response.data)
        callback(response.data);
     }).catch(e=>{console.log(e); callback(0);})
   },
    insertUserBoardInfo:(formData,callback)=>{
        api.post(`board/insert/user`,formData,{
          headers: {Authorization: userInfoSingleton.getInstance()._tok_name }
        }).then(response=>{
            callback(response.data);
         }).catch(e=>{console.log(e); callback(0);})
    },
    getBoardListByIdAndOffset:(id,offset,callback)=> { 
      api.get(`/board/${id}/${offset}`,{}).
      then(value=>{
        callback(value.data);
      }).catch(er=>{alert(" ","boardlistOffset :  " + er)})
    },
    getBoardListByUserId:(mem_id,callback)=> { 
      api.get(`/board/getlist/user/${mem_id}`,{}).
      then(value=>{
        callback(value.data);
      }).catch(er=>{alert(" ","boardlist :  " + er)})
    },
};