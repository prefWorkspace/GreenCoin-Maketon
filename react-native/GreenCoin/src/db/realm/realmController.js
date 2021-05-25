
import Realm from 'realm';
import userInfoSingleton from '../userInfoSingleton';
import serverController from '../../server/serverController';

const UserInfo ={
    name: 'Userinfo',
    properties: {
        isLogin:'bool',
        autoLogin:'bool',
        no: 'string',
        username : 'string',
        point : 'string',
        location_no : 'string',
        location_name : 'string',
        location_fullname : 'string',
        token : 'string'
    }
}




const updateUserInfomation = async (state)=>{
        var realm = await Realm.open({schemaVersion:21,schema: [UserInfo]});
        await realm.write(()=>{
            try{  
                realm.deleteAll();
                let ob = realm.create('Userinfo', {
                    no : state.no,
                    username : state.username,
                    autoLogin : true,
                    isLogin : true,
                    point : state.point,
                    location_no : state.location_no,
                    location_name : state.location_name,
                    location_fullname : state.location_fullname,
                    token : state.token
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
    var realm = await Realm.open({schemaVersion:21,schema: [UserInfo]});
    var filter = await realm.objects('Userinfo');

    if(filter.length == 0){
        userInfoSingleton.getInstance().logout();
        return {autoLogin:false};
    }

    initData.no = filter[0].no;
    initData.token = filter[0].token;
    initData.autoLogin = filter[0].autoLogin;
    initData.isLogin = filter[0].isLogin;

    await userInfoSingleton.getInstance().updateUserInfo(initData);
    return (await initData);
}

const logOutUserState = () =>{
    updateUserInfomation({
        no : "0",
        autoLogin : false,
        isLogin : false,
        username : "",   
        point : '',
        location_no : '',
        location_name : '',
        location_fullname : '',
        token : ''

    });
}

export default {
    checkAutoLogin : async (setLoad) =>{
        var realData =  await loadLoginDataFromRealm();
        console.log(realData);
        if(realData.autoLogin == true && realData.token){
            
            console.log("==============");
            serverController.connectFetchController(`/auth?token=${realData.token}`,"GET",null,async function(res){
                console.log(res);
                let data = res.data;

                if(!data)
                    return;
            
                var state = {
                    no : data.userInfo.no,
                    username : data.userInfo.username,
                    autoLogin : true,
                    isLogin : true,
                    point : data.userInfo.point ? data.userInfo.point : "0",
                    location_no : data.userInfo.location_no,
                    location_name : data.userInfo.location_name,
                    location_fullname : data.userInfo.location_fullname,
                    token : data.token
                }

                console.log(state);
                await updateUserInfomation(state);
                setLoad(true);
                  
            });
        }
        else{
            logOutUserState();
            setLoad(true);
        }
    },
    successUserLogin : (state) => {
        return updateUserInfomation(state);
    },
    loadLoginData : () => {
        loadLoginDataFromRealm();
    },
    logoutUserState : async () => {
       await logOutUserState();
        //userInfoSingleton.getInstance().logout();
  
    }

};
  