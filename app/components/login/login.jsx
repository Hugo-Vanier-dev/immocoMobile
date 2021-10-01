import React from 'react';
import { View, Button } from 'react-native';
import { useForm } from 'react-hook-form';
import AuthService from '../../shared/service/Auth.service';
import Store from '../../shared/store/Store';
import Toast from 'react-native-toast-message';
import Input from '../../shared/helper/formHelper/Input';


function Login() {
    const { formState, handleSubmit, control } = useForm({
        mode: 'onTouched'
    });
    const { errors } = formState;

    const onSubmit = data => {
        AuthService.login(data).then(res => {
            const token = res.data;
            const action = {
                type: 'set/token',
                payload: {
                    token: token
                }
            };
            Store.dispatch(action);
            const connexionToken = Store.getState().token;
            if (connexionToken) {
                AuthService.getMe().then(res => {
                    const userData = res.data;
                    const action2 = {
                        type: 'set/userData',
                        payload: {
                            userData: userData
                        }
                    }
                    Store.dispatch(action2);
                    const user = Store.getState().userData;
                    if(user.id !== null) {
                        const action3 = {
                            type: 'set/isLoggedInTrue'
                        }
                        Store.dispatch(action3);
                    }else {
                        Toast.show({
                            type: 'error',
                            position: 'top',
                            text1: 'Erreur',
                            text2: 'Adresse mail ou mot de passe incorrect'
                        })
                    }
                }).catch(errors => {
                    console.log(errors);
                    Toast.show({
                        type: 'error',
                        position: 'top',
                        text1: 'Erreur',
                        text2: 'Adresse mail ou mot de passe incorrect'
                    })
                })
            }else {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Erreur',
                    text2: 'Adresse mail ou mot de passe incorrect'
                })
            }
        }).catch(errors => {
            console.log('Le toast ne fonctionne pas');
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Erreur',
                text2: 'Adresse mail ou mot de passe incorrect'
            })
        })
    }


    return (
        <View>
            <Input 
                control={control} 
                name="mail"
                rules={{ required: {value: true, message:'Veuillez remplir votre adresse.'} }} 
                placeholder="JeanDupont@gmail.com" 
                keyboardType="email-address"
            />
            {errors.mail && <span>{errors.mail.message}</span>}
            <Input
                control={control}
                name="password"
                rules={{ required: {value: true, message: 'Veuillez remplir le champ mot de passe.' }}}
            />
            {errors.password && <span>{errors.password.message}</span>}
            <Button title="Envoyer" onPress={handleSubmit(onSubmit)} />
        </View>
    )
}

export default Login;