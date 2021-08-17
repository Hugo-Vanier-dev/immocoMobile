import React from "react";
import { TextInput } from "react-native-gesture-handler";
import { StyleSheet } from 'react-native';
import { useController } from "react-hook-form";

function Input ({name, control, style = {}, rules = {}, defaultValue = '', placeholder = '', keyboardType = 'default' }){
    const { field } = useController({
        control,
        defaultValue,
        name,
        rules
    });

    const styles = StyleSheet.create({
        textInputStyle: style 
    })

    return (
        <TextInput
            style={styles.textInputStyle}
            value={field.value}
            onChangeText={field.onChange}
            defaultValue={field.defaultValue}
            name={field.name}
            placeholder={placeholder}
            keyboardType={keyboardType}
        />
    )
}

export default Input;