import React from "react";
import { StyleSheet, Platform, View } from 'react-native';
import { Controller } from "react-hook-form";
import RNDateTimePicker from '@react-native-community/datetimepicker';

function DateTimePickerInput ({name, control, mode, style = {}, rules = {}, defaultValue = '', placeholder = null}) {


    return(
        <Controller
            control={control}
            rules={rules}
            name={name}
            render={({field: {onChange, value}}) => (
                <RNDateTimePicker
                    mode={mode}
                    value={value}
                    onChange={onChange}
                />
            ) }
        />
    )
}

export default DateTimePickerInput;