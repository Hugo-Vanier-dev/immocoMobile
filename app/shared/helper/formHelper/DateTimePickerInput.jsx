import React, { useState } from "react";
import { StyleSheet, Platform, View } from 'react-native';
import { Controller } from "react-hook-form";
import RNDateTimePicker from '@react-native-community/datetimepicker';
import Input from "./Input";
import { onChange } from "react-native-reanimated";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

function DateTimePickerInput ({name, control, mode, style = {}, rules = {}, defaultValue = new Date(), placeholder = null}) {

    const [defaultValueInputDateTimePicker, setDefaultValueInputDateTimePicker] = useState(defaultValue);
    const [date, setDate] = useState(`${defaultValue.getDate().toString()}/${defaultValue.getMonth() + 1 < 10 ? '0' : ''}${(defaultValue.getMonth() + 1).toString()}/${defaultValue.getFullYear().toString()}`);
    const [time, setTime] = useState(`${defaultValue.getHours() < 10 ? '0' : ''}${(defaultValue.getHours()).toString()}::${defaultValue.getMinutes() < 10 ? '0' : ''}${defaultValue.getMinutes().toString()}`);

    const [showDateTimePicker, setShowDateTimePicker] = useState(false)

    const onChangeDateTimePicker = (value) => {
        setShowDateTimePicker(false);
        if(value.type === 'set'){
            setDefaultValueInputDateTimePicker(new Date(value.nativeEvent.timestamp))
            if(mode === 'date'){
                setDate(`${new Date(value.nativeEvent.timestamp).getDate().toString()}/${new Date(value.nativeEvent.timestamp).getMonth() + 1 < 10 ? '0' : ''}${(new Date(value.nativeEvent.timestamp).getMonth() + 1).toString()}/${new Date(value.nativeEvent.timestamp).getFullYear().toString()}`);
            }else if (mode === 'time'){
                setTime(`${new Date(value.nativeEvent.timestamp).getHours() < 10 ? '0' : ''}${(new Date(value.nativeEvent.timestamp).getHours()).toString()}::${new Date(value.nativeEvent.timestamp).getMinutes() < 10 ? '0' : ''}${new Date(value.nativeEvent.timestamp).getMinutes().toString()}`);
            }
        }
        
    }

    return(
        <View>
            <TextInput
                onTouchEnd={() => setShowDateTimePicker(true)}
                placeholder={mode === 'date' ? 'date' : mode === 'time' ? 'heure' : '' }
                pointerEvents="box-only"
                value={mode === 'date' ? date : mode === 'time' ? time : '' }
                name={name}
                style={styles.input}
                showSoftInputOnFocus={false}
            />
            {showDateTimePicker && 
                <RNDateTimePicker
                    mode={mode}
                    value={defaultValueInputDateTimePicker}
                    onChange={onChangeDateTimePicker}
                />
            }
        </View>
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

export default DateTimePickerInput;