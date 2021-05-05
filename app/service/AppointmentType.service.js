import instance from './instanceAxios';

class AppointmentTypeService {

    path = '/appointmentTypes';
    

    getAll() {
        return instance.get(`${this.path}`);
    }
}

export default new AppointmentTypeService();