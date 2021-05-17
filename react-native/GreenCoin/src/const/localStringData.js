import axios from 'axios';

const api = axios.create({baseURL:"https://yongdeanda.com:8088"});
//const api = axios.create({baseURL:"http://192.168.0.102:8088/"});
//const api = axios.create({baseURL:"http://13.209.109.135:8088/"});

export default {
    imagePath : "https://bedragonimage.s3.ap-northeast-2.amazonaws.com/images/",
    ip : "https:///yongdeanda.com:8088/",
    webIp : "https://yongdeanda.com/",
    api : api,
    mapApi : 'AIzaSyBSKiB4eOGTqpzDt8eJZKDsSfb9F0PEFF0',
    searchApi : 'U01TX0FVVEgyMDIxMDMxNTEyMDczNTExMDkxNDg='
};

