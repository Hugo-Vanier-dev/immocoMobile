import React from "react";
import { StyleSheet, Platform, View } from 'react-native';
import { Controller } from "react-hook-form";
import DateTimePicker from '@react-native-community/datetimepicker';
import Input from "./input";

function DateTimePickerInput ({name, control, mode, getValues, setValue, style = {}, rules = {}, defaultValue = '', placeholder = null}) {

    const styles = StyleSheet.create({
        selectStyle: style
    });

    function onChangedateTime(change) {
        change();
        setValue(name, new Date(`${getValues('datetimeDate')} ${getValues('datetimeTime')}`));
    }

    if(Platform.OS === 'ios'){
        return(
            <Controller
                control={control}
                rules={rules}
                name={name}
                render={({field: {onChange, onBlur, value}}) => (
                    <DateTimePicker
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
                    name="datetimeDate"
                    render={({field: {onChange, value}}) => (
                        <DateTimePicker
                            mode="date"
                            value={value}
                            onChange={onChangedateTime(onChange)}
                        />
                    ) }
                />
                <Controller
                    control={control}
                    rules={rules}
                    name="datetimeTime"
                    render={({field: {onChange, value}}) => (
                        <DateTimePicker
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
                render={({field: {onChange, onBlur, value}}) => (
                    <DateTimePicker
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