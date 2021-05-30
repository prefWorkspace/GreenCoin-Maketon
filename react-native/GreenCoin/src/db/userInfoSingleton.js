export default class CommonDataManager {

    static myInstance = null;


    _no = 0;
    _point = 0;
    _username = "";
    _autoLogin = false;
    _isLogin = false;
    _token = "";
    _location_no ="";
    _location_name = "";
    _location_fullname = "";

    _email = "";
    _phone = "";
    _bDay = "";



    /**
     * @returns {CommonDataManager}
     */
    static getInstance() {
        if (CommonDataManager.myInstance == null) {
            CommonDataManager.myInstance = new CommonDataManager();
        }
     
        return this.myInstance;
    }

    updateUserInfo(state){     
        this._no = state.no;
        this._point = state.point;
        this._username = state.username;
        this._autoLogin = state.autoLogin;
        this._isLogin = state.isLogin;
        this._token = state.token;
        this._location_no = state.location_no;
        this._location_name = state.location_name;
        this._location_fullname = state.location_fullname;
        this._email = state.email;
        this._phone = state.phone;
        this._bDay = state.bDay;
    }

    logout(){
        this._no =  "";
        this._name = "";
        this._autoLogin = false;
        this._isLogin = false;
        this._token = "";
    }

    isLogin(){
        return this._isLogin;
    }

    getUserID() {
        return this._mem_id;
    }

    setUserID(id) {
        this._mem_id = id;
    }
}