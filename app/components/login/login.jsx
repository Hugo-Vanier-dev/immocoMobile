import React from 'react';
import { View, TextInput, Button, } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import UserService from '../../shared/service/User.service';
import Store from '../../shared/store/Store';
import { useToast } from 'react-native-styled-toast'
import { flex, left } from 'styled-system';


function Login() {

    const { toast } = useToast();
    const { formState, handleSubmit, control, register } = useForm({
        mode: 'onTouched'
    });
    const { isSubmitted, isDirty, isValid, errors } = formState;

    const onSubmit = data => {
        UserService.login(data).then(res => {
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
                UserService.getMe().then(res => {
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
                        toast({
                            message: 'Adresse mail ou mot de passe incorect',
                            toastStyles:{
                                backgroundColor: 'red'
                            },
                            color: 'white',
                            iconColor: 'white',
                            closeButtonStyles: {
                                px: 4,
                                bg: 'darkgrey',
                                borderRadius: 16
                              },
                              closeIconColor: 'white',
                              hideAccent: true
                        });
                    }
                }).catch(errors => {
                    console.log(errors);
                    toast({
                        message: 'Adresse mail ou mot de passe incorect',
                        toastStyles:{
                            backgroundColor: 'lightgreen'
                        },
                        color: 'white',
                        iconColor: 'white',
                        closeButtonStyles: {
                            px: 4,
                            bg: 'darkgrey',
                            borderRadius: 16
                          },
                          closeIconColor: 'white',
                          hideAccent: true
                    });
                })
            }else {
                toast({
                    message: 'Adresse mail ou mot de passe incorect',
                    toastStyles:{
                        backgroundColor: 'lightgreen'
                    },
                    color: 'white',
                    iconColor: 'white',
                    closeButtonStyles: {
                        px: 4,
                        bg: 'darkgrey',
                        borderRadius: 16
                      },
                      closeIconColor: 'white',
                      hideAccent: true
                });
            }

        }).catch(errors => {
            console.log(errors);
            toast({
                message: 'Adresse mail ou mot de passe incorect',
                color: 'white',
                toastStyles: {
                    bg: 'red',
                    borderRadius: 16,
                    position: 'absolute',
                    padding: '2rem',
                    top:'5vh',
                    width: '75vw',
                    display: flex,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    alignItems: 'center'
                  },
                  duration: 0,
                  closeButtonStyles: {
                    bg: 'darkgrey',
                    borderRadius: 16
                  },
                  closeIconColor: 'white',
                  hideAccent: true,
                  hideIcon: true
            });
        })
    }


    return (
        <View>
            <Controller
                control={control}
                name="mail"
                rules={{ required: {value: true, message:'Veuillez remplir votre adresse.'} }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        {...register}
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
                        {...register}
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