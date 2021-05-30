import axios from 'axios';

const api = axios.create({baseURL:"http://192.168.0.102:3000"});
//const api = axios.create({baseURL:"http://192.168.0.102:8088/"});
//const api = axios.create({baseURL:"http://13.209.109.135:8088/"});

export default {
    imagePath : "https://greencoinimage.s3.ap-northeast-2.amazonaws.com/images/",
    ip : "http://192.168.0.102:3000",
    webIp : "http://192.168.0.102:3000",
    api : api,
};

