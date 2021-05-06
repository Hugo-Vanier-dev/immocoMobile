import instance from "./instanceAxios";

class UserTypeService {

    path = '/userTypes';

    getAll() {
        return instance.get(`${this.path}`);
    }
}

export default new UserTypeService();