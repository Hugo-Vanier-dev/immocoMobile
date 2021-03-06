import React, { useState, useEffect } from 'react';
import { View, Button, Text, } from 'react-native';
import { useForm } from 'react-hook-form';
import Store from '../../../shared/store/Store';
import AppointmentService from '../../../shared/service/Appointment.service';
import AppointmentTypeService from '../../../shared/service/AppointmentType.service';
import ClientService from '../../../shared/service/Client.service';
import Input from '../../../shared/helper/formHelper/Input';
import Select from '../../../shared/helper/formHelper/Select';
import DateTimePickerInput from '../../../shared/helper/formHelper/DateTimePickerInput';

function UpdateRdv({ route, navigation }) {
    const [rdv, setRdv] = useState(null);
    const [rdvTypes, setRdvTypes] = useState(null);
    const [clients, setClients] = useState(null);
    const { formState, handleSubmit, control, getValues, setValue } = useForm({
        mode: 'onTouched'
    });
    const { errors } = formState;

    const onSubmit = data => {
        const date = new Date(data.date.getFullYear(), data.date.getMonth(), data.date.getDate(), data.time.getHours(), data.time.getMinutes(), data.time.getSeconds());
        const appointment = data;
        appointment.date = date;
        delete appointment.time;
        AppointmentService.update(route.params.rdvId, appointment).then(res => {
        })
    }

    useEffect(() => {
        AppointmentService.get(route.params.rdvId).then(res => {
            res.data.date = new Date(res.data.date.replace(' ', 'T'));
            setRdv(res.data);
        })
    }, [])

    useEffect(() => {
        AppointmentTypeService.getAll().then(res => {
            const newRdvTypes = [];
            for (const rdvType of res.data) {
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
            for (const client of res.data) {
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

    return (
        <View>
            {
                rdv &&
                <Input
                    name="city"
                    control={control}
                    rules={{ required: { value: true, message: 'Veuillez remplir votre ville.' } }}
                    placeholder="ville"
                    defaultValue={rdv.city}
                />
            }
            {errors.city && <Text>{errors.city.message}</Text>}

            {rdv &&
                <Input
                    name="address"
                    control={control}
                    rules={{ required: { value: true, message: 'Veuillez remplir votre adresse.' } }}
                    placeholder="adresse"
                    defaultValue={rdv.address}
                />
            }
            {errors.address && <Text>{errors.address.message}</Text>}
            {
                rdv &&
                <Input
                    name="description"
                    control={control}
                    placeholder="description"
                    defaultValue={rdv.description}
                />
            }

            {   
                
                rdvTypes && rdv &&
                <Select
                    name="appointment_type_id"
                    control={control}
                    rules={{ required: { value: true, message: 'Veuillez choisir un type de rendez-vous.' } }}
                    items={rdvTypes}
                    defaultValue={rdv.appointment_type_id}
                />
            }
            {errors.appointment_type_id && <Text>{errors.appointment_type_id.message}</Text>}
            {
                clients && rdv &&
                <Select
                    name="client_id"
                    control={control}
                    items={clients}
                    defaultValue={rdv.client_id}
                />
            }
            {errors.city && <Text>{errors.city.message}</Text>}
            {rdv &&
                <DateTimePickerInput
                    name="date"
                    control={control}
                    mode="date"
                    defaultValue={rdv.date}
                />
            }
            {errors.city && <Text>{errors.city.message}</Text>}
            {rdv && 
                <DateTimePickerInput
                    name="time"
                    control={control}
                    mode="time"
                    defaultValue={rdv.date}
                />
            }
            {errors.city && <Text>{errors.city.message}</Text>}
            <Button title="Envoyer" onPress={handleSubmit(onSubmit)} />
        </View>

    )
}

export default UpdateRdv;