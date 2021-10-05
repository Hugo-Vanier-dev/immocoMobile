import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AppointmentService from '../../../shared/service/Appointment.service';
import Store from '../../../shared/store/Store';
import { CommonActions, useIsFocused } from '@react-navigation/native';
import { style } from 'styled-system';


function Calendar({ navigation }) {
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octbre', 'Novembre', 'Décembre'];
    const daysName = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    const today = new Date();
    const isFocused = useIsFocused();
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [firstDay, setFirstDay] = useState(new Date(currentYear, currentMonth, 1));
    const [weeks, setCurrentWeeks] = useState(null);
    const [events, setCurrentEvents] = useState([]);

    useEffect(() => {
        AppointmentService.getByUser(Store.getState().userData.id, new Date(currentYear, currentMonth, 1), new Date(currentYear, currentMonth + 1, 1)).then(response => {
            setCurrentEvents(response.data);
            setFirstDay(new Date(currentYear, currentMonth, 1));
        });
    }, [currentMonth, isFocused])

    useEffect(() => {
        setCurrentWeeks(loadCalendar());
    }, [firstDay])



    function loadCalendar() {
        let daysArray = [];
        const firstDayNumber = firstDay.getDay() !== 0 ? firstDay.getDay() - 1 : 6;
        const lastdayOfTheMonth = currentMonth === 0 || currentMonth === 2 || currentMonth === 4 || currentMonth === 6 || currentMonth === 7 || currentMonth === 9 || currentMonth === 11 ? 31 : currentMonth !== 1 ? 30 : currentYear % 4 !== 0 ? 28 : 29;
        const lastMonth = currentMonth !== 0 ? currentMonth - 1 : 11;
        let x = 1;
        const lastDayOfLastMont = lastMonth === 0 || 2 || 4 || 6 || 7 || 9 || 11 ? 31 : lastMonth !== 1 ? 30 : currentYear % 4 !== 0 ? 28 : 29;
        for (let i = 0; i < 42; i++) {
            let day;
            if (firstDayNumber > i) {
                day = {
                    index: i,
                    isInMonth: false,
                    jourIndex: i % 7,
                    isToday: false,
                    haveEvent: false,
                    nombreDuJour: lastDayOfLastMont - firstDayNumber + i,
                    exist: true
                }
            } else if (lastdayOfTheMonth >= x && firstDayNumber <= i) {
                if (x === today.getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()) {
                    day = {
                        index: i,
                        isInMonth: true,
                        jourIndex: i % 7,
                        isToday: true,
                        haveEvent: false,
                        nombreDuJour: x,
                        exist: true,
                    }
                } else {
                    if (events.length > 0) {
                        let haveEvent = false;
                        for (const event of events) {
                            if (new Date(event.date).getDate() === x) {
                                haveEvent = true;
                            }
                        }
                        if (haveEvent) {
                            day = {
                                index: i,
                                isInMonth: true,
                                jourIndex: i % 7,
                                isToday: false,
                                haveEvent: true,
                                nombreDuJour: x,
                                exist: true
                            }
                        } else {
                            day = {
                                index: i,
                                isInMonth: true,
                                jourIndex: i % 7,
                                isToday: false,
                                haveEvent: false,
                                nombreDuJour: x,
                                exist: true
                            }
                        }
                    } else {
                        day = {
                            index: i,
                            isInMonth: true,
                            jourIndex: i % 7,
                            isToday: false,
                            haveEvent: false,
                            nombreDuJour: x,
                            exist: true
                        }
                    }
                }
                x++;
            } else {
                day = {
                    index: i,
                    isInMonth: false,
                    jourIndex: i % 7,
                    isToday: false,
                    haveEvent: false,
                    nombreDuJour: x,
                    exist: false
                }
            }
            daysArray.push(day);
        }
        const weekArray = [daysArray.slice(0, 7), daysArray.slice(7, 14), daysArray.slice(14, 21), daysArray.slice(21, 28), daysArray.slice(28, 35), daysArray.slice(35, 41)];
        return weekArray;
    }

    function precedingMonth() {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    }

    function nextMonth() {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    }


    

    return (
        <View style={{height:380, width:'100%',}}>
            <View style={styles.headerRow}>
                <Button
                    onPress={precedingMonth}
                    title="<"
                    accessibilityLabel="Mois précédent"
                />
                <Text>{months[currentMonth]} {currentYear.toString()}</Text>
                <Button
                    onPress={nextMonth}
                    title=">"
                    accessibilityLabel="Mois précédent"
                />
            </View>
            <View style={styles.calendarContainer}>
                <View style={styles.dayNameRow}>
                    {
                        daysName.map((day, index) => {
                            return (
                                <View style={[styles.cell, styles.dayName]} key={index}>
                                    <Text>{day}</Text>
                                </View>
                            )
                        })
                    }
                </View>
                {
                    weeks &&
                    weeks.map((week, index) => {
                        return (
                            <View style={styles.daysRow} key={index}>
                                {
                                    week.map(day => {
                                        return (
                                            <View onTouchEnd={() => navigation.dispatch(
                                                CommonActions.navigate({
                                                    name: 'Journée',
                                                    params: {
                                                        date: new Date(currentYear, currentMonth, day.nombreDuJour, 12)
                                                    }
                                                }))} style={[styles.cell, day.isToday ? styles.today : '', day.haveEvent ? styles.event : '']} key={day.index} >
                                                <Text style={[!day.isInMonth ? styles.isNotInMonth : '', !day.exist ? styles.inexistent : '']}>{day.nombreDuJour.toString()}</Text>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        )
                    })
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerRow: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    calendarContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    dayNameRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    daysRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cell: {
        flex: 1,
        borderColor: 'black',
        textAlign: 'center'
    },
    isNotInMonth: {
        opacity: 0.5
    },
    today: {
        backgroundColor: '#E9C8DC'
    },
    inexistent: {
        opacity: 0
    },
    event: {
        backgroundColor: '#E9C8DC'
    }

})

export default Calendar;