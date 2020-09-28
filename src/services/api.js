import axios from 'axios';



//Config of requisitions
const api = axios.create({

    /* Address for each emulator :
    ** Genymotion:              http://10.0.3.2:3333/
    ** Android Studio:          http://10.0.2.2:3333/
    ** simulator IOS:           http://localhost:3333/
    */
    baseURL: 'http://localhost:3333/',

});

export default api;