import React, { useState, useEffect } from 'react';
import { View, Button, } from 'react-native';
import { useForm } from 'react-hook-form';
import Store from '../../../shared/store/Store';
import AppointmentService from '../../../shared/service/Appointment.service';
import AppointmentTypeService from '../../../shared/service/AppointmentType.service';
import ClientService from '../../../shared/service/Client.service';
import Input from '../../../shared/helper/formHelper/input';
import Select from '../../../shared/helper/formHelper/Select';
import DateTimePickerInput from '../../../shared/helper/formHelper/DateTimePickerInput';

function UpdateRdv ({route, navigation}) {
    const [rdv, setRdv] = useState(null);
    const [rdvTypes, setRdvTypes] = useState(null);
    const [clients, setClients] = useState(null);
    const { formState, handleSubmit, control, getValues, setValue } = useForm({
        mode: 'onTouched'
    });
    const { errors } = formState;

    useEffect(() => {
        AppointmentService.get(route.params.rdvId).then(res => {
            setRdv(res.data);
        })
    }, [])

    useEffect(() => {
        AppointmentTypeService.getAll().then(res => {
            const newRdvTypes = [];
            for(const rdvType of res.data){
                const rdvTypeToPush = {
                    label: rdvType.value,
                    value: rdvType.id,
                    key: rdvType.id
                }
                newRdvTypes.push(rdvTypeToPush);
            }
            setRdvTypes(newRdvTypes);
        })
    }, [])

    useEffect(() => {
        ClientService.getByUser(Store.getState().userData.id).then(res => {
            const newClients = [];
            for(const client of res.data) {
                const clientToPush = {
                    label: `${client.firstname} ${client.lastname}`,
                    value: client.id,
                    key: client.id
                }
                newClients.push(clientToPush);
            }
            setClients(newClients);
        })
    }, [])

    return(
        <View>
            <Input
                name="city"
                control={control}
                placeholder="ville"
            />
            <Input 
                name="address"
                control={control}
                placeholder="adresse"
            />
            <Input
                name="description"
                control={control}
                placeholder="description"
            />
            
            {
                rdvTypes && 
                <Select
                    name="appointment_type_id"
                    control={control}
                    items={rdvTypes}
                />
            }
            {
                clients && 
                <Select
                    name="client_id"
                    control={control}
                    items={clients}
                />
            }
        </View>
    )
}

export default UpdateRdv;