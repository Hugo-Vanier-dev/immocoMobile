import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AppointmentService from '../../../shared/service/Appointment.service';
import { CommonActions } from '@react-navigation/native';
import Toast from 'react-native-toast-message';


function CardRdv({ rdvId, navigation, accueil }) {
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octbre', 'Novembre', 'Décembre'];
    const daysName = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const [rdv, setRdv] = useState(null);

    useEffect(() => {
        AppointmentService.get(rdvId).then(res => {
            setRdv(res.data);
        })
    }, [])

    function deleteRdv (){
        AppointmentService.delete(rdvId).then(res => {
            if(accueil){
                AppointmentService.getNextRdv(rdv.user.id).then(res => {
                    setRdv(res.data);
                })
            }else {
                navigation.goBack();
            }
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Le rendez-vous à bien été supprimer'
            })
        })
    }

    const styles = StyleSheet.create({
        Text: {
            fontSize: '0.75rem'
        },
        card: {
            flex: 1,
            flexDirection: 'column',
            shadowColor: 'black',
            shadowOpacity: '2px',
            shadowOffset: '3px 3px'
        },
        cardHeader : {
            textAlign: 'center',
            padding: '4px',
            borderBottomWidth: '2px',
            borderBottomColor: 'black'
        },
        cardContent: {
            textAlign: 'center',
            padding: '4px',
            borderBottomWidth: '2px',
            borderBottomColor: 'black'
        },
        cardAction: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            padding: '4px',
        },

    })

    return (
        <View style={styles.card}>
            {rdv &&
                <View>
                    <View style={styles.cardHeader}>
                        <Text>Information sur le rendez-vous avec {rdv.client.sexe ? 'Mr' : 'Mme'}. {rdv.client.firstname} {rdv.client.lastname}</Text>
                    </View>
                    <View style={styles.cardContent}>
                            <Text>Date du rendez-vous : {daysName[new Date(rdv.date).getDay()]} {new Date(rdv.date).getDate()} {months[new Date(rdv.date).getMonth()]} {new Date(rdv.date).getFullYear().toString()}</Text>
                            <Text>Heure du rendez-vous : {new Date(rdv.date).getHours().toString()}H{new Date(rdv.date).getMinutes().toString()}</Text>
                            <Text>Ville : {rdv.city}</Text>
                            <Text>Adresse : {rdv.address}</Text>
                            <Text>Description/Commentaire : {rdv.description}</Text>
                            <Text>Téléphone portable client : {rdv.client.cellphone ? rdv.client.cellphone : ''}</Text>
                            <Text>Téléphone Fixe client : {rdv.client.phone ? rdv.client.phone : ''}</Text>
                            <Text>Adresse mail du client : {rdv.client.mail ? rdv.client.mail : ''}</Text>
                    </View>
                    <View style={styles.cardAction}>
                        <Button onPress={() => navigation.dispatch(
                            CommonActions.navigate({
                                name: 'Rdv/Update',
                                params: {
                                    rdvId: rdv.id,
                                }
                            }))}
                            title="Modifier"
                            color="#38d981" 
                        />
                            <Button onPress={deleteRdv} title="Supprimer" color="#ff0000" />
                    </View>
                </View>
            }
        </View>
    )
}

export default CardRdv;