import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AppointmentService from '../../shared/service/Appointment.service';
import Store from '../../shared/store/Store';
import { CommonActions } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';

function Day ({route, navigation}) {
    const [rdvs, setRdvs] = useState([]);
    let lastRdvType = '';
    const date = route.params.date;
    const isFocused = useIsFocused();
    const dateHours = [];

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
    }, [isFocused]);

    

    function setBgColor(appointmentType) {
        const color = appointmentType === lastRdvType ? backgroundColors[appointmentType][0] : backgroundColors[appointmentType][1];
        lastRdvType = appointmentType;
        return color;
    };

    return(
        <View style={styles.dayContainer}>
            {heureArray.map((heure, index) => {
                const datetime = date;
                datetime.setHours(parseInt(heure.split('h')[0]));
                if(heure.split('h')[1] !== '30'){
                    datetime.setMinutes(0);
                }else {
                    datetime.setMinutes(30);
                }
                dateHours.push(datetime);
                return (
                    <View style={styles.hoursContainer} key={index} onTouchEnd={() => navigation.dispatch(
                        CommonActions.navigate({
                            name: 'Création de rendez-vous',
                            params: {
                                datetime: dateHours[index]
                            }
                        }))}>
                        <Text>{heure}</Text>
                        {heure.split('h')[1] != '30' ? 
                                <View style={styles.fullHour}>
                                    {
                                        rdvs && rdvs.length > 0 &&
                                        rdvs.map((rdv, indexRdv) => {    
                                            if(new Date(rdv.date).getHours() === parseInt(heure.split('h')[0]) && new Date(rdv.date).getMinutes() < 30){                                                                                
                                                return(
                                                    <View onTouchEnd={() => navigation.dispatch(
                                                        CommonActions.navigate({
                                                            name: 'Lecture de rendez-vous',
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
                                                    <View onTouchEnd={() => navigation.dispatch(
                                                        CommonActions.navigate({
                                                            name: 'Lecture de rendez-vous',
                                                            params: {
                                                                rdvId: rdv.id,
                                                                clientId: rdv.client.id,
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

const styles = StyleSheet.create({
    dayContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',    
    },
    hoursContainer : {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#B9DCAE',
        marginHorizontal:20,
        marginVertical:3,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    fullHour: {
        flex: 1,
        // borderTopColor: 'rgba(40,40,40,0.5)',
        // borderTopWidth: 1,
        marginHorizontal:10,
        paddingVertical: 8,
    },
    halfHour: {
        flex: 1,
        // borderTopColor: 'rgba(40,40,40,0.2)',
        // borderTopWidth: 1,
        paddingTop: 5,
        marginHorizontal:20,
        paddingBottom: 5,
    }    
});

export default Day;