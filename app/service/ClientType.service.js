import instance from "./instanceAxios";

class ClientTypeService {

    path = '/clientTypes';

    getAll() {
        return instance.get(`${this.path}`);
    }
}

export default new ClientTypeService();