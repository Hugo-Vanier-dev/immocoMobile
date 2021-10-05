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

function CreateRdv({ route, navigation }) {
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
        AppointmentService.create(appointment).then(res => {
        })
    }

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
            <Input
                name="city"
                control={control}
                rules={{ required: { value: true, message: 'Veuillez remplir votre ville.' } }}
                placeholder="ville"
            />
            {errors.city && <Text>{errors.city.message}</Text>}

            <Input
                name="address"
                control={control}
                rules={{ required: { value: true, message: 'Veuillez remplir votre adresse.' } }}
                placeholder="adresse"
            />
            {errors.address && <Text>{errors.address.message}</Text>}

            <Input
                name="description"
                control={control}
                placeholder="description"
            />

            {rdvTypes &&
                <Select
                    name="appointment_type_id"
                    control={control}
                    rules={{ required: { value: true, message: 'Veuillez choisir un type de rendez-vous.' } }}
                    items={rdvTypes}
                />
            }
            {errors.appointment_type_id && <Text>{errors.appointment_type_id.message}</Text>}
            
            {clients && 
                <Select
                    name="client_id"
                    control={control}
                    items={clients}
                />
            }
            {errors.city && <Text>{errors.city.message}</Text>}

            <DateTimePickerInput
                name="date"
                control={control}
                mode="date"
                defaultValue={route.params.datetime}
            />
            {errors.city && <Text>{errors.city.message}</Text>}

            <DateTimePickerInput
                name="time"
                control={control}
                mode="time"
                defaultValue={route.params.datetime}
            />
            {errors.city && <Text>{errors.city.message}</Text>}
            <Button title="Envoyer" onPress={handleSubmit(onSubmit)} />
        </View>

    )
}

export default CreateRdv;