import React from "react";
import { StyleSheet, Platform, View } from 'react-native';
import { Controller } from "react-hook-form";
import RNDateTimePicker from '@react-native-community/datetimepicker';
import Input from "./Input";

function DateTimePickerInput ({name, control, mode, getValues, setValue, style = {}, rules = {}, defaultValue = '', placeholder = null}) {


    const time = Date.now().toString();

    

    function onChangedateTime(change) {
        change();
        setValue(name, new Date(`${getValues(`${time}Date`)} ${getValues(`${time}Time`)}`));
    }

    if(Platform.OS === 'ios'){
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
    }else if(mode === 'datetime') {
        return(
            <View>
                <Controller
                    control={control}
                    rules={rules}
                    name={`${time}Date`}
                    render={({field: {onChange, value}}) => (
                        <RNDateTimePicker
                            mode="date"
                            value={value}
                            onChange={onChangedateTime(onChange)}
                        />
                    ) }
                />
                <Controller
                    control={control}
                    rules={rules}
                    name={`${time}Time`}
                    render={({field: {onChange, value}}) => (
                        <RNDateTimePicker
                            mode="time"
                            value={value}
                            onChange={onChangedateTime(onChange)}
                        />
                    )}
                />
                <Input
                    control={control}
                    rules={rules}
                    name={name}
                    style={{
                        visibility: 'hidden'
                    }}
                />
            </View>
        )
    }else {
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
}

export default DateTimePickerInput;