import React from 'react';
import { View, Text } from 'react-native';
import Calendar from './calendar/calendar';

function Dashboard ({navigation}) {
    return(
        <View>
            <Text>Page du Dashboard</Text>
            <Calendar navigation={navigation} />
        </View>
    )
}

export default Dashboard;