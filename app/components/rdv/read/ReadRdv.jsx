import React, { useState } from 'react';
import { View } from 'react-native';
import CardRdv from '../helpers/CardRdv'

function ReadRdv ({route, navigation}) {
    return(
        <View>
            <CardRdv rdvId={route.params.rdvId} navigation={navigation} accueil={false} />
        </View>
    )
}

export default ReadRdv;