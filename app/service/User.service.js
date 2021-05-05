import instance from "./instanceAxios";

class UserService {

    path = '/users';

    login(data) {
        return http.post(`${this.path}/login`, data)
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
    }

    logout() {
        return instance.get(`${this.path}/logout`, { headers: authHeader() }).then(() => localStorage.removeItem('user'));
    }

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