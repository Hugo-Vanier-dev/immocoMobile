import React from 'react';
import { View, Text } from 'react-native';
import CardRdv from '../helpers/CardRdv'

function ReadRdv ({route}) {
    
    return(

        <View>
            <CardRdv rdvId={route.params.rdvId} />
        </View>
    )
}

export default ReadRdv;