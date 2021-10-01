import instance from "./instanceAxios";

class UserService {

    path = '/users';


    getAll() {
        return instance.get(`${this.path}`);
    }

    get(id) {
        return instance.get(`${this.path}/${id}`);
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