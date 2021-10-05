import React from "react";
import { TextInput } from "react-native-gesture-handler";
import { StyleSheet } from 'react-native';
import { useController } from "react-hook-form";


function Input ({name, control, style = {}, rules = {}, defaultValue = '', placeholder = '', keyboardType = 'default' , secureTextEntry=false, pointerEvents="auto"}){
    const { field } = useController({
        control,
        defaultValue,
        name,
        rules
    });

    

    return (
        <TextInput
            style={styles.input}
            value={field.value}
            onChangeText={field.onChange}
            defaultValue={field.defaultValue}
            name={field.name}
            placeholder={placeholder}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            pointerEvents={pointerEvents}
        />
    )
}

const styles = StyleSheet.create({
        input: {
            backgroundColor: '#B9DCAE',
            borderWidth: 1,
            borderRadius: 25,
            borderColor: '#95C886',
            marginVertical: 10,
            padding: 5,
            paddingHorizontal: 25,
      },
})

export default Input;