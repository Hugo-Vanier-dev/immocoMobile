import React from "react";
import { StyleSheet } from 'react-native';
import { Controller } from "react-hook-form";
import RNPickerSelect from 'react-native-picker-select';

function Select ({name, control, items, style = {}, rules = {}, defaultValue = '', placeholder = null}) {

    const styles = StyleSheet.create({
        selectStyle: style
    });

    return (
        <Controller
            control={control}
            rules={rules}
            name={name}
            render={({ field: { onChange, value } }) => (
                <RNPickerSelect
                    onValueChange={onChange}
                    items={items}
                    //value={defaultValue}
                    //placeholder={placeholder}
                    //style={styles.selectStyle}
                />
            )}        
        />
    )
    
}

export default Select;