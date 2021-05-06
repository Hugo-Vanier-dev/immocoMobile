import instance from "./instanceAxios";

class ShutterTypeService {

    path = '/shutterTypes';

    getAll() {
        return instance.get(`${this.path}`);
    }
}

export default new ShutterTypeService();