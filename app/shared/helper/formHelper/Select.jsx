import React from "react";
import { StyleSheet } from 'react-native';
import { Controller } from "react-hook-form";
import RNPickerSelect from 'react-native-picker-select';

const style = {};

function Select ({name, control, items, style = {}, rules = {}, placeholder = {label: 'Veuillez séléctionner une option', value: null}}) {

    
    return (
        <Controller
            control={control}
            rules={rules}
            name={name}
            render={({ field: { onChange, value } }) => (
                <RNPickerSelect
                    onValueChange={onChange}
                    items={items}
                    placeholder={placeholder}
                    style={pickerStyle}
                    //style={styles.selectStyle}
                />
            )}        
        />
    )
    
}

const pickerStyle = {
	inputIOS: {
		color: 'white',
		paddingTop: 13,
		paddingHorizontal: 10,
		paddingBottom: 12,
	},
	inputAndroid: {
		color: 'white',
	},
	placeholderColor: 'white',
	underline: { borderTopWidth: 0 },
	icon: {
		position: 'absolute',
		backgroundColor: 'transparent',
		borderTopWidth: 5,
		borderTopColor: '#00000099',
		borderRightWidth: 5,
		borderRightColor: 'transparent',
		borderLeftWidth: 5,
		borderLeftColor: 'transparent',
		width: 0,
		height: 0,
		top: 20,
		right: 15,
	},
};

const styles = StyleSheet.create({
    selectStyle: style
});

export default Select;