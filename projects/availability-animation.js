import { Button, Image, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { generateHomes } from '../utils/mockData'
import Animated, { FadeIn, FadeOut, ZoomIn, ZoomOut } from 'react-native-reanimated'
import { MotiView } from 'moti'
const _itemSize = 40
const _spacing = 4
const _borderRadius = _spacing * 2
const _stagger = 75
const getRandomRotation = () => (Math.random() > 0.5 ? -1 : 1) * Math.random() * 15
const Item = ({ item, index }) => {
    return (
        <View style={{
            width: _itemSize,
            aspectRatio: 1,
            borderRadius: _borderRadius,
            borderWidth: _spacing / 2,
            borderColor: "#fff",
            backgroundColor: "#eee",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowOpacity: 0.4,
            shadowRadius: 7,
            elevation: 5,
            marginLeft: index !== 0 ? -_itemSize / 2 : 0,
            transform: [
                {
                    rotate: ` ${getRandomRotation()}deg`,
                }
            ]
        }}>
            <Image
                source={{ uri: item.image }}
                style={{
                    flex: 1,
                    borderRadius: _borderRadius,
                }}
            />
        </View>
    )
}
const _loadingColor = "#ddd"
const _loadingColorWashed = "#eee"
const Skeleton = ({ style, ...rest }) => {
    return (
        <MotiView
            style={style}
            {...rest}
            from={{
                backgroundColor: _loadingColor,
            }}
            animate={{
                backgroundColor: _loadingColorWashed,
            }}
            transition={{
                duration: 1000,
                loop: true,
                repeatReverse: true,
            }}
            entering={FadeIn.springify().damping(80).stiffness(200)}
            exiting={FadeOut.springify().damping(80).stiffness(200)}
        />
    )
}
const LoadingSkeleton = () => {
    return (
        <View style={{
            flexDirection: 'row',


        }}
        >
            {[...Array(3)].map((_, index) => (
                <Skeleton key={index} style={{
                    width: _itemSize,
                    aspectRatio: 1,
                    borderRadius: _borderRadius,
                    backgroundColor: _loadingColor,
                    borderWidth: _spacing / 2,
                    borderColor: "#fff",
                    marginLeft: index === 0 ? 0 : -_itemSize / 2,
                    transform: [
                        {
                            rotate: ` ${getRandomRotation()}deg`,
                        }
                    ]
                }} />
            ))}
        </View>
    )
}
const AvailabilityAnimation = () => {
    const [homes, setHomes] = useState(generateHomes())
    const [isLoading, setIsLoading] = useState(false)
    const timer = useRef(null)
    return (
        <View style={styles.root}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                minHeight: _itemSize,
            }}>
                <View style={{ flex: 0.6, justifyContent: 'center', minHeight: _itemSize }}>
                    {!isLoading ? (
                        <Animated.Text
                            entering={FadeIn.springify().damping(80).stiffness(200)}
                            exiting={FadeOut.springify().damping(80).stiffness(200)}>
                            {homes.length} available
                        </Animated.Text>
                    ) : (<Skeleton style={{
                        width: "80%",
                        height: _itemSize * 0.25,
                        borderRadius: _borderRadius,
                        backgroundColor: _loadingColor,
                    }} />)}
                </View>
                <View style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'flex-end',
                    minHeight: _itemSize,
                }}>
                    {!isLoading ? homes.map((item, index) => <Animated.View key={item.key}
                        style={{
                            zIndex: index
                        }}
                        entering={ZoomIn.springify().damping(80).stiffness(200).delay(index * _stagger)}
                        exiting={ZoomOut.springify().damping(80).stiffness(200).delay(index * _stagger)}
                    >
                        <Item item={item} index={index} />
                    </Animated.View>
                    ) : (
                        <LoadingSkeleton />
                    )}
                </View>
            </View>
            <Button
                title="Generate new data"
                onPress={() => {
                    clearTimeout(timer.current)
                    setIsLoading(true)
                    setTimeout(() => {
                        setIsLoading(false)
                        setHomes(generateHomes())
                    }, Math.random() * 1000 + 1000)

                }}
            />

        </View>
    )
}

export default AvailabilityAnimation

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
})