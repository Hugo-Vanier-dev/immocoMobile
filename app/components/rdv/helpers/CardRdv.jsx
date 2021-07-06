import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AppointmentService from '../../../shared/service/Appointment.service';
import { CommonActions } from '@react-navigation/native';

function CardRdv({ rdvId, navigation }) {
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octbre', 'Novembre', 'Décembre'];
    const daysName = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    const [rdv, setRdv] = useState(null);

    useEffect(() => {
        AppointmentService.get(rdvId).then(res => {
            setRdv(res.data);
        })
    }, [])

    function deleteRdv (){
        AppointmentService.delete(rdvId).then(res => {

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
        
        button: {
            borderRadius: '50%'
        },

        rdvUpdateButton : {
            backgroundColor: '#38d981'
        },

        rdvSuppressionButton : {
            backgroundColor: '#ff0000'
        },

        clientInfoButton : {
            backgroundColor: '#1794c2'
        }

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
                        <Button onClick={() => navigation.dispatch(
                            CommonActions.navigate({
                                name: 'Rdv/Update',
                                params: {
                                    rdvId: rdv.id,
                                }
                            }))} style={[styles.button, styles.rdvUpdateButton]}>Modifier le rendez-vous</Button>
                            <Button onPress={deleteRdv} style={[styles.button, styles.rdvSuppressionButton]}>Supprimer le rendez-vous</Button>
                    </View>
                </View>
            }
        </View>
    )
}

export default CardRdv;