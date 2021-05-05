import React from 'react';
import { View, TextInput, Button,  } from 'react-native';
import { useForm, Controller, FieldError } from 'react-hook-form';

function Login() {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <View>
            <Controller
                control={control}
                name="mail"
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        //style={styles.input}
                        onChangeText={value => onChange(value)}
                        value={value}
                        placeholder="JeanDupont@gmail.com"
                    />
                )}
            />
            <Controller
                control={control}
                name="password"
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        //style={styles.input}
                        onChangeText={value => onChange(value)}
                        value={value}
                        placeholder=""
                    />
                )}
            />
            <Button title="Envoyer" onPress={handleSubmit(onSubmit)} />
        </View>
    )
}

export default Login;