
import Realm from 'realm';
import userInfoSingleton from '../userInfoSingleton';
import appStaticInfomation from '../appStaticInfomation';
import loginRegisterController from '../../server/loginRegisterController';
import CuponServerController from '../../server/CuponServerController';


const UserInfo ={
    name: 'Userinfo',
    properties: {
        isLogin:'bool',
        autoLogin:'bool',
        userId: { type: 'int', default: 0 },
        tok_name : 'string',
        mem_method : { type: 'int', default: 0 },
    }
}

/*
const UserInfo = {
        name: 'Userinfo',
        properties: {
            isLogin:'bool',
            autoLogin:'bool',
            userId: { type: 'int', default: 0 },
            userName : 'string',
            name :'string',
            userPassword : 'string',
            gender : 'string',
            bday :'string',
            height:'string',
            weight :'string',
            phone : "string",
            email : "string",
            loginType : { type: 'int', default: -1 },
            mem_notification : "string",
            mem_notification_event : "string"
    }
};
*/

const updateUserInfomation = async (state)=>{
        var realm = await Realm.open({schemaVersion:17,schema: [UserInfo]});
        await realm.write(()=>{
            try{  
                realm.deleteAll();
                let ob = realm.create('Userinfo', {
                    userId : state.userId,
                    isLogin:  state.isLogin,
                    autoLogin:  state.autoLogin,
                    tok_name : state.tok_name,
                    mem_method : state.mem_method
                });

                userInfoSingleton.getInstance().updateUserInfo(state);
             
            }
            catch(e){
                console.log(e);
            }   
            
        })  
}

const loadLoginDataFromRealm = async () =>{
  
    var initData = {};
    var realm = await Realm.open({schemaVersion:17,schema: [UserInfo]});
    var filter = await realm.objects('Userinfo');

    if(filter.length == 0){
        userInfoSingleton.getInstance().logout();
        return {autoLogin:false};
    }

    initData.userId = filter[0].userId;
    initData.tok_name = filter[0].tok_name;
    initData.autoLogin = filter[0].autoLogin;
    initData.isLogin = filter[0].isLogin;
    initData.mem_method = filter[0].mem_method;

    await userInfoSingleton.getInstance().updateUserInfo(initData);
    return (await initData);
}

const logOutUserState = () =>{
    updateUserInfomation({
        userId : 0,
        tok_name : "",
        autoLogin : false,
        isLogin : false,
        mem_method : 0,
    });
}

export default {
    checkAutoLogin : async (setLoad) =>{
        var data =  await loadLoginDataFromRealm();
        if(data.autoLogin == true){

            const nextEvent = async (userJsonFile) =>{


                if(userJsonFile == "" || userJsonFile == false || !userJsonFile.userInfo){
                    //Alert.alert(" ","서버 접속 에러 발생");
                    setLoad(true);
                    logOutUserState();
                    return;
                }
            
                var state = {
                    userId : userJsonFile.userInfo.mem_id,
                    tok_name : userJsonFile.userInfo.tok_name,
                    name : userJsonFile.userInfo.mem_name,
                    userName :  userJsonFile.userInfo.mem_username,
                    gender : userJsonFile.userInfo.mem_gender,
                    bday : userJsonFile.userInfo.mem_dob,
                    autoLogin : true,
                    isLogin : true,
                    height :  userJsonFile.userInfo.mem_additional1,
                    weight :  userJsonFile.userInfo.mem_additional2,
                    phone : userJsonFile.userInfo.mem_phone,
                    mem_method : userJsonFile.userInfo.mem_method,
                    email : userJsonFile.userInfo.mem_email ?  userJsonFile.userInfo.mem_email : "" ,
                    mem_refund_bank : userJsonFile.userInfo.mem_refund_bank,
                    mem_refund_account : userJsonFile.userInfo.mem_refund_account,
                    refund_name : userJsonFile.userInfo.mem_refund_name,
                    mem_notification : userJsonFile.userInfo.mem_notification,
                    mem_notification_event : userJsonFile.userInfo.mem_notification_event,
                    tok_name :userJsonFile.tocken
                  }

                  await updateUserInfomation(state);
                  setLoad(true);
            }
            

            const formData = new FormData();
            formData.append('tok_name',  data.tok_name);
            formData.append('mem_id', data.userId);
            formData.append('fcm', appStaticInfomation.getInstance()._token);

            loginRegisterController.autoLogin(formData,nextEvent);
        }
        else{
            logOutUserState();
            setLoad(true);
        }
    },
    successUserLogin : (state) => {
        updateUserInfomation(state);
    },
    loadLoginData : () => {
        loadLoginDataFromRealm();
    },
    logoutUserState : async () => {
       await logOutUserState();
        //userInfoSingleton.getInstance().logout();
  
    }

};
  