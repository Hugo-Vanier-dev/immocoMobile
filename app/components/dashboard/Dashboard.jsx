import React from 'react';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Dimensions, ScrollView } from 'react-native';
import Calendar from './calendar/calendar';
import CardRdv from '../rdv/helpers/CardRdv';
import Store from '../../shared/store/Store';
import AppointmentService from '../../shared/service/Appointment.service';
import { useIsFocused } from '@react-navigation/native';

function Dashboard({ navigation }) {
    const [rdv, setRdv] = useState(null)
    const isFocused = useIsFocused();

    useEffect(() => {
        AppointmentService.getNextRdv(Store.getState().userData.id).then(res => {
            setRdv(res.data);
        }).catch((error) => {
        })
    }, [isFocused]);



    return (
        <ScrollView>
            <View style={styles.dashboardContainer}>
                <Calendar navigation={navigation} style={styles.calendar} />
                {rdv &&
                    <View style={styles.rdvContainer}>
                        <Text style={styles.rdvTitle}>Prochain rendez-vous :</Text>
                        <View>
                            <CardRdv rdvId={rdv.id} navigation={navigation} accueil={true} />
                        </View>
                    </View>
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    dashboardContainer: {
        flex: 1,
        backgroundColor: 'rgb(250,250,250)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    calendar: {
        flex: 1,
        height: 250,
        width: '100%',
        // maxHeight: Dimensions.get('screen').height * 3 / 4
    },

    rdvContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // maxHeight: Dimensions.get('screen').height * 3 / 4
    },

    rdvTitle: {
        fontWeight: 'bold',
        fontSize:24,
        alignItems:'center',
        justifyContent:'center',
    }
})

export default Dashboard;