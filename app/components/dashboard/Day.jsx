import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppointmentService from '../../shared/service/Appointment.service';
import Store from '../../shared/store/Store';
import { CommonActions } from '@react-navigation/native';

function Day ({route, navigation}) {
    const [rdvs, setRdvs] = useState([]);
    let lastRdvType = '';
    const date = route.params.date;

    const heureArray = ['08h00', '08h30', '09h00', '09h30', '10h00', '10h30', '11h00', '11h30', '12h00', '12h30', '13h00', '13h30', '14h00', '14h30', '15h00', '15h30', '16h00', '16h30', '17h00', '17h30', '18h00', '18h30', '19h00', '19h30', '20h00' ];
    const backgroundColors = {
        'Premier contact achat' : ['#e69997', '#e3e391'],
        'Premier contact vente': ['#a2ebd6', '#9de2e3'],
        'Visite achat': ['#ba6159', '#b5b257'],
        'Visite vente': ['#469977', '#469998'],
        'Modification souhait achat': ['#873220', '#8a8624'],
        'Modification souhait vente': ['#1c5740', '#1b5958'],
        'Achat': ['#e02f09', '#e0d909'],
        'Vente': ['#0ce88c', '#0ce8d6'],
        'Autres': ['#4942db', '#b545de']
    }

    useEffect(() => {
        AppointmentService.getByUserAndDate(Store.getState().userData.id, date).then(response => {
            setRdvs(response.data);
        })
    }, []);

    const styles = StyleSheet.create({
        dayContainer: {
            flex: 1,
            flexDirection: 'column',        
        },  

        heureContainer : {
            flex: 1,
            flexDirection: 'row',
        },

        fullHour: {
            flex: 1,
            borderTopColor: 'black',
            borderTopWidth: '2px',
            paddingTop: '4px',
            paddingBottom: '4px'
        },

        halfHour: {
            flex: 1,
            borderTopColor: 'black',
            borderTopWidth: '1px',
            paddingTop: '4px',
            paddingBottom: '4px'
        }
        

    });

    function setBgColor(appointmentType) {
        const color = appointmentType === lastRdvType ? backgroundColors[appointmentType][0] : backgroundColors[appointmentType][1];
        lastRdvType = appointmentType;
        return color;
    };

    return(
        <View style={styles.dayContainer}>
            {heureArray.map((heure, index) => {
                return (
                    <View style={styles.heureContainer} key={index}>
                        <Text>{heure}</Text>
                        {heure.split('h')[1] != '30' ? 
                                <View style={styles.fullHour}>
                                    {
                                        rdvs && rdvs.length > 0 &&
                                        rdvs.map((rdv, indexRdv) => {    
                                            if(new Date(rdv.date).getHours() === parseInt(heure.split('h')[0]) && new Date(rdv.date).getMinutes() < 30){                                                                                
                                                return(
                                                    <View onClick={() => navigation.dispatch(
                                                        CommonActions.navigate({
                                                            name: 'Rdv/Read',
                                                            params: {
                                                                rdvId: rdv.id,
                                                                clientId: rdv.client.id
                                                            }
                                                        }))} key={indexRdv} style={[{backgroundColor: setBgColor(rdv.appointment_type.value)}]} >
                                                        <Text>
                                                            Rendez-vous pris par {rdv.client.firstname} {rdv.client.lastname} 
                                                        </Text>
                                                    </View>
                                               )                
                                           }
                                       })
                                    }
                                </View>
                            :
                                <View style={styles.halfHour}>
                                    {
                                        rdvs && rdvs.length > 0 &&
                                        rdvs.map((rdv, indexRdv) => {
                                            if(new Date(rdv.date).getHours() === parseInt(heure.split('h')[0]) && new Date(rdv.date).getMinutes() >= 30){
                                                return(
                                                    <View onClick={() => navigation.dispatch(
                                                        CommonActions.navigate({
                                                            name: 'Rdv/Read',
                                                            params: {
                                                                rdvId: rdv.id,
                                                                clientId: rdv.client.id
                                                            }
                                                        }))} key={indexRdv} style={[{backgroundColor: setBgColor(rdv.appointment_type.value)}]}>
                                                        <Text>
                                                            Rendez-vous pris par {rdv.client.firstname} {rdv.client.lastname} 
                                                        </Text>
                                                    </View>
                                                )
                                            }
                                        })
                                    }
                                </View>
                        }
                    </View>
                )
            })}
        </View>
    )
}

export default Day;