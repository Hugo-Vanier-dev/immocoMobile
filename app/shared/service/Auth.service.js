import instance from './instanceAxios';

class AuthService {

    path = '/auth';
    

    
    login(data) {
        return instance.post(`${this.path}/login`, data);
    }

    /*logout() {
        return instance.get(`${this.path}/logout`).then(() => localStorage.removeItem('user'));
    }*/

    getMe(){
        return instance.get(`${this.path}/me`);
    }

}

export default new AuthService();