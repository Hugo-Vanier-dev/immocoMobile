import instance from "./instanceAxios";

class UserService {

    path = '/users';

    login(data) {
        return instance.post(`${this.path}/login`, data);
    }

    /*logout() {
        return instance.get(`${this.path}/logout`).then(() => localStorage.removeItem('user'));
    }*/

    getAll() {
        return instance.get(`${this.path}`);
    }

    get(id) {
        return instance.get(`${this.path}/${id}`);
    }

    getMe(){
        return instance.get(`${this.path}/me`);
    }

    create(data) {
        return instance.post(`${this.path}`, data);
    }

    update(id, data) {
        return instance.put(`${this.path}/${id}`, data);
    }

    delete(id) {
         return instance.delete(`${this.path}/${id}`);
    }
    
}

export default new UserService();