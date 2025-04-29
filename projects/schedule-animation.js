import { Platform, Pressable, ScrollView, StatusBar, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Plus, X } from 'lucide-react-native'
import Animated, { FadeInDown, FadeOut, LinearTransition } from 'react-native-reanimated'
const WEEKDAYS = [
    'Saturday',
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday'
]

const _spacing = 10
const _color = '#ececec'
const _borederRadius = 16
const _startHour = 8

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

// animations
const _damping = 14
const _stiffness = 200
const _entering = FadeInDown.springify().damping(_damping)
const _exiting = FadeOut.springify().damping(_damping)
const _layout = LinearTransition.springify().damping(_damping)
const HourBlock = ({ block }) => {
    return (
        <View style={{
            borderWidth: 1,
            borderColor: _color,
            borderRadius: _borederRadius - _spacing,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: _spacing / 4,
        }}>
            <Text>
                {block > 9 ? block : `0${block}`}:00{" "}
                {block > 11 && block < 24 ? "PM" : "AM"}
            </Text>
        </View>
    )
}
const DayBlock = () => {
    const [hours, setHours] = useState([_startHour])
    return (
        <Animated.View
            entering={_entering}
            exiting={_exiting}
            layout={_layout}
            style={{
                gap: _spacing,
            }}>
            {hours.map((hour) => (
                <Animated.View key={`hour=${hour}`}
                    style={{
                        flexDirection: 'row',
                        gap: _spacing,
                        alignItems: 'center'
                    }}
                    entering={_entering}
                    exiting={_exiting}
                    layout={_layout}
                >
                    <Text>From:</Text>
                    <HourBlock block={hour} />
                    <Text>To:</Text>
                    <HourBlock block={hour + 1} />
                    <Pressable onPress={() => {
                        console.log("remove hour", hour)
                        setHours((prev) => [...prev.filter((k) => k !== hour)])
                    }}>
                        <View style={{
                            backgroundColor: _color,
                            height: 24,
                            aspectRatio: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: _borederRadius - _spacing
                        }}>
                            <X size={14} color={"#555"} />
                        </View>
                    </Pressable>
                </Animated.View>
            ))}
            <AnimatedPressable
                layout={_layout}
                onPress={() => {
                    if (hours.length === 0) {
                        setHours([_startHour])
                        return
                    }
                    setHours((prev) => [...prev, prev[prev.length - 1] + 1])
                }}
            >
                <View style={{
                    flexDirection: 'row',
                    gap: _spacing / 2,
                    padding: _spacing,
                    borderRadius: _borederRadius - _spacing / 2,
                    backgroundColor: _color,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: _spacing / 2,
                }}>
                    <Plus size={18} color={'#333'} />
                    <Text style={{ fontSize: 14, color: '#333' }}>Add more</Text>
                </View>
            </AnimatedPressable>
        </Animated.View>
    )
}
const Day = ({ day }) => {
    const [isOn, setIsOn] = useState(false)
    return (
        <Animated.View
            layout={_layout}
            style={{
                borderWidth: 1,
                borderColor: _color,
                borderRadius: _borederRadius,
                padding: _spacing,
                backgroundColor: isOn ? "transparent" : _color,
                gap: _spacing
            }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <Text style={{ fontWeight: '500', fontSize: 20 }}>{day}</Text>
                <Switch
                    value={isOn}
                    onValueChange={(value) => setIsOn(value)}
                    trackColor={{ true: "#666" }}
                    thumbColor={"#fff"}
                    style={{
                        transformOrigin: ["100%", "50%", 0],
                        transform: [
                            {
                                scale: Platform.OS === 'ios' ? 0.7 : 1.2,
                            }
                        ]
                    }}
                />
            </View>
            {isOn && <DayBlock />}
        </Animated.View>
    )

}
const ScheduleAnimation = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', paddingTop: StatusBar.currentHeight }}>
            <ScrollView contentContainerStyle={{
                padding: _spacing,
                gap: _spacing,
                flexGrow: 1,
                // justifyContent: 'center'
            }}
                showsVerticalScrollIndicator={false}
            >
                <Text style={{ marginBottom: _spacing, fontSize: 36, fontWeight: 800, letterSpacing: -1 }}>Schedule Week Days</Text>
                {
                    WEEKDAYS.map((day, index) => (
                        <Day
                            day={day}
                            key={`day-${day}-${index}`}
                        />
                    ))
                }
            </ScrollView>
        </View>
    )
}

export default ScheduleAnimation

const styles = StyleSheet.create({
    container: {

    }
})