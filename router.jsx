import React from 'react';
import {connect} from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import Store from './app/shared/store/Store'
import Login from './app/components/login/login';
import Dashboard from './app/components/dashboard/Dashboard';
import CreateClient from './app/components/client/create/CreateClient';
import UpdateClient from './app/components/client/update/UpdateClient';
import ReadClient from './app/components/client/read/ReadClient';
import ListClient from './app/components/client/list/ListClient';
import CreateProperty from './app/components/property/create/CreateProperty';
import UpdateProperty from './app/components/property/update/UpdateProperty';
import ReadProperty from './app/components/property/read/ReadProperty';
import ListProperty from './app/components/property/list/ListProperty';
import CreateRdv from './app/components/rdv/create/CreateRdv';
import UpdateRdv from './app/components/rdv/update/UpdateRdv';
import ReadRdv from './app/components/rdv/read/ReadRdv';
import Day from './app/components/dashboard/Day';

function Router () {
    const Stack = createStackNavigator();
    const isLoggedIn = Store.getState().isLoggedIn;
    if(isLoggedIn) {
        return (
            <Stack.Navigator initialRouteName="Accueil">
                <Stack.Screen name="Accueil" component={Dashboard} />
                <Stack.Screen name="Journée" component={Day} />
                <Stack.Screen name="Property/Create" component={CreateProperty} />
                <Stack.Screen name="Property/Update" component={UpdateProperty} />
                <Stack.Screen name="Property/Read" component={ReadProperty} />
                <Stack.Screen name="Property/List" component={ListProperty} />
                <Stack.Screen name="Création de rendez-vous" component={CreateRdv} />
                <Stack.Screen name="Modification de rendez-vous" component={UpdateRdv} />
                <Stack.Screen name="Lecture de rendez-vous" component={ReadRdv} />
            </Stack.Navigator>    
        );
    }else {
         return (
            <Stack.Navigator>
                <Stack.Screen name="Connexion" component={Login} />
            </Stack.Navigator>
         );
    }
}

const mapStateToProps = (state) => {
    return state;
}
export default connect(mapStateToProps)(Router);