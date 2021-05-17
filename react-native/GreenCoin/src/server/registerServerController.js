
import localStringData from '../const/localStringData';
import userInfoSingleton from '../db/userInfoSingleton';

const api = localStringData.api;

export default {
    insertRegisterPhoneIdentify: (phoneNumber,nextEvent) => {
       api.get(`/register/get/number/${phoneNumber}`,{
       }).then(response=>{
         nextEvent(response.data);
        }).catch(e=>{console.log(e)})
    },
    registerPhoneNumberCheck: (phoneNumber,nextEvent) => {
      api.get(`/register/get/number/phoneCheck/${phoneNumber}`,{
      }).then(response=>{
        nextEvent(response.data);
       }).catch(e=>{console.log(e)})
   },
   registerPhoneCheck: (phoneNumber,nextEvent) => {
     api.get(`/register/get/phoneCheck/${phoneNumber}`,{
     }).then(response=>{
       nextEvent(response.data);
      }).catch(e=>{console.log(e)})
    },
    checkRegisterNumber:(formData ,nextEvent) => {
       api.post(`register/check/`,formData,{
       }).then(response=>{
         console.log(response.data);
         if(response.data == ""){
            alert(" ","인증번호를 재확인해주세요");
         }else{
            nextEvent(response.data);
         }
        }).catch(e=>{console.log(e)})
    },
  checkRegisterIdVailable:(userId,nextEvent) =>{
    api.get(`users/check/${userId}`,{
    }).then(response=>{
      nextEvent(response.data);
     }).catch(e=>{console.log(e)})

  },
  insertRegisterUserInfomation: (formData,nextEvent) => {
     api.post(`users/register/`,formData,{
     }).then(response=>{
       nextEvent(response.data)
      }).catch(e=>{console.log(e)})
  },
  insertUserInfomationAsTocken: (formData,nextEvent) => {
    api.post(`users/register/tocken`,formData,{
    }).then(response=>{
      nextEvent(response.data)
     }).catch(e=>{console.log( " F " +  e)})
 },
 updateUserInfoDelete: (formData,nextEvent) =>{
   api.post(`users/delete/user`,formData,{
    headers: {Authorization: userInfoSingleton.getInstance()._tok_name }
   }).then(response=>{
     nextEvent(response.data)
   }).catch(e=>{console.log(e)})
 },
 appleRefreash: (formData,nextEvent) =>{
   api.post(`apple/redirect`,formData,{
   }).then(response=>{
     nextEvent(response.data)
   }).catch(e=>{console.log(e)})
 },
  updateUserPassword:() =>{

  },
};

