import React from 'react';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Calendar from './calendar/calendar';
import CardRdv from '../rdv/helpers/CardRdv';
import Store from '../../shared/store/Store';
import AppointmentService from '../../shared/service/Appointment.service';
import { useIsFocused } from '@react-navigation/native';

function Dashboard ({navigation}) {
    const [rdv, setRdv] = useState(null)
    const isFocused = useIsFocused();

    useEffect(() => {
        AppointmentService.getNextRdv(Store.getState().userData.id).then(res => {
            setRdv(res.data);
        })
    }, [isFocused]);

    const styles = StyleSheet.create({
        dashboardContainer: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-around',
        },
        card: {
            width: '80%',
            shadowColor: 'black',
            shadowOpacity: 0.5,
            shadowRadius: 5
        },
        rdvContainer: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center'
        },
        rdvTitle : {
            fontWeight: 'bold',
            fontSize: '1.5rem'
        }
    })

    return(
        <View style={styles.dashboardContainer}>
            <Calendar navigation={navigation} />
            {rdv && 
                <View style={styles.rdvContainer}>
                    <Text style={styles.rdvTitle}>Prochain rendez-vous :</Text>
                    <View style={styles.card}>
                        <CardRdv rdvId={rdv.id} navigation={navigation} accueil={true} />
                    </View>
                </View>
            }
        </View>
    )
}

export default Dashboard;