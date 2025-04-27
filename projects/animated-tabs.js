import { LayoutAnimation, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Fish, icons, LifeBuoy, Sailboat, Ship, ShipWheel } from 'lucide-react-native'
import Animated, { FadeInRight, FadeOutLeft, FadeOutRight, LayoutAnimationConfig, LinearTransition } from 'react-native-reanimated'
import { MotiView } from 'moti'
import { motifySvg } from 'moti/svg'

const data = [
    { icon: "LifeBuoy", label: 'Buoy', bg: '#FF0000' },
    { icon: "Fish", label: 'Fresh fish', bg: '#00FF00' },
    { icon: "Sailboat", label: 'Sail', bg: '#0000FF' },
    { icon: "Ship", label: 'Ship it', bg: '#FFFF00' },
    { icon: "ShipWheel", label: 'Manage it', bg: '#FF00FF' },
]

const Icon = ({ name, ...rest }) => {
    const IconComponent = motifySvg(icons[name])()
    if (!IconComponent) {
        console.warn(`Icon "${name}" not found in Lucide icons`)
        return null
    }
    return <IconComponent size={16} {...rest} />
}
const _spacing = 4


const Tabs = ({ data, onChange, selectedIndex, activeColor = '#ddd', inactiveColor = '#111', activeBackgroundColor = '#111', inactiveBackgroundColor = '#ddd' }) => {
    return (
        <View style={{ flexDirection: 'row', gap: _spacing }}>
            {data.map((item, index) => {
                const isSelected = selectedIndex === index
                return (
                    <MotiView
                        key={index}
                        animate={{
                            backgroundColor: isSelected ? activeBackgroundColor : inactiveBackgroundColor,
                            overflow: 'hidden',
                            borderRadius: 8,
                        }}
                        layout={LinearTransition.springify().damping(80).stiffness(200)}
                    >

                        <Pressable
                            onPress={() => onChange(index)}
                            style={{
                                padding: _spacing * 3,
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: _spacing,
                                flexDirection: 'row',
                            }}
                        >
                            <Icon
                                name={item.icon}
                                animate={{
                                    color: isSelected ? activeColor : inactiveColor,
                                }}
                            />
                            <LayoutAnimationConfig skipEntering>
                                {isSelected && (
                                    <Animated.Text
                                        entering={FadeInRight.springify().damping(80).stiffness(200)}
                                        exiting={FadeOutRight.springify().damping(80).stiffness(200)}
                                        style={{ color: activeColor }}
                                    >{item.label}</Animated.Text>)}
                            </LayoutAnimationConfig>
                        </Pressable>
                    </MotiView>

                )
            })}
        </View>
    )
}


const AnimatedTabs = () => {
    const [selectedIndex, setSelectedIndex] = React.useState(0)
    const onChange = (index) => {
        setSelectedIndex(index)
    }
    return (
        <View style={styles.root}>
            <Tabs data={data} onChange={onChange} selectedIndex={selectedIndex} />
            <LayoutAnimationConfig skipEntering>
                <Animated.View
                    key={`tab-content-${selectedIndex}`}
                    entering={FadeInRight.springify().damping(80).stiffness(200)}
                    exiting={FadeOutLeft.springify().damping(80).stiffness(200)}
                    style={{
                        backgroundColor: data[selectedIndex].bg,
                        flex: 1,
                        borderRadius: 8,
                    }}>

                </Animated.View>
            </LayoutAnimationConfig>
        </View>
    )
}

export default AnimatedTabs

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        margin: 12,
        gap: 12,
        paddingTop: 30
    },
    container: {}
})