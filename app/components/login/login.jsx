import React from 'react';
import { View, Button, StyleSheet, Image } from 'react-native';
import { useForm } from 'react-hook-form';
import AuthService from '../../shared/service/Auth.service';
import Store from '../../shared/store/Store';
import Toast from 'react-native-toast-message';
import Input from '../../shared/helper/formHelper/Input';
// import { styles } from 'styled-system';


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
        <View style={styles.viewBg}>
            <Image
                    style={styles.logo} 
                    source={require('../../../assets/icoLogo.png')} 
                    />
            <View style={styles.inputContainer}>
                <Input  
                    style={styles.input} 
                    control={control} 
                    name="mail"
                    rules={{ required: {value: true, message:'Veuillez remplir votre adresse.'} }} 
                    placeholder="prénom.nom@immoco.fr" 
                    keyboardType="email-address"
                />
                {errors.mail && <span>{errors.mail.message}</span>}
                <Input  
                    style={styles.input}
                    control={control}
                    name="password"
                    placeholder="mot de passe" 
                    rules={{ required: {value: true, message: 'Veuillez remplir le champ mot de passe.' }}}
                    secureTextEntry={true}
                    />
                
                {errors.password && <span>{errors.password.message}</span>}
                <Button title="Se connecter" onPress={handleSubmit(onSubmit)} style={styles.btnEnter} />
            </View>
        </View>
    )
}

export default Login;

const styles = StyleSheet.create({
    viewBg: {
      flex: 1,
      backgroundColor: 'rgb(250,250,250)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputContainer:{
        flex:1,
        paddingHorizontal:10,
    },
    // btnEnter:{
    //     color: '#B9DCAE',
    //     borderRadius: 10,
    //     marginVertical: 10,
    // },
    logo:{
        flex: 1,
        height: 200,
        width: 200,
        resizeMode: 'contain',
    }
  });