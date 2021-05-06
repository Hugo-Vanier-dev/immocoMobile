import React from 'react';
import { View, TextInput, Button, } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import UserService from '../../shared/service/User.service';
import Store from '../../shared/store/Store';

function Login() {

    const { formState, handleSubmit, control } = useForm({
        mode: 'onTouched'
    });
    const { isSubmitted, isDirty, isValid, errors } = formState;

    const onSubmit = data => {
        UserService.login(data).then(res => {
            const token = res.data;
            const action = {
                type: 'connexion',
                payload: {
                    token: token
                }
            };
            Store.dispatch(action);
            const connexionToken = store.getState().token;
            if (connexionToken) {
                UserService.getMe().then(res => {
                    console.log(res);
                    const userData = res.data;
                    const action2 = {
                        type: 'set/userData',
                        payload: {
                            userData: userData
                        }
                    }
                    Store.dispatch(action2);
                    console.log(Store.getState());
                }).catch(errors => console.log(errors))
            }

        }).catch(errors => console.log(errors))
    }


    return (
        <View>
            <Controller
                control={control}
                name="mail"
                rules={{ required: {value: true, message:'Veuillez remplir votre adresse.'} }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        keyboardType='email-address'
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                        placeholder="JeanDupont@gmail.com"
                    />
                )}
            />
            {errors.mail && <span>{errors.mail.message}</span>}

            <Controller
                control={control}
                name="password"
                rules={{ required: {value: true, message: 'Veuillez remplir le champ mot de passe.' }}}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                    />
                )}
            />
            {errors.password && <span>{errors.password.message}</span>}

            <Button title="Envoyer" /*disabled={isSubmitted || !isDirty || !isValid}*/ onPress={handleSubmit(onSubmit)} />
        </View>
    )
}

export default Login;