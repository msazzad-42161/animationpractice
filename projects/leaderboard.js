import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import Animated, { Extrapolation, FadeInRight, interpolate, interpolateColor, runOnJS, useAnimatedStyle, useDerivedValue, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated'

const users = [
    {
        name: "Alex Zhang",
        score: 5,
    },
    {
        name: "Maria Rodriguez",
        score: 30,
    },
    {
        name: "Kai Anderson",
        score: 88,
    },
    {
        name: "Sarah Kim",
        score: 85,
    },
    {
        name: "James Wilson",
        score: 45,
    },
    {
        name: "Lena Park",
        score: 20,
    },
    {
        name: "David Lee",
        score: 75,
    },
    {
        name: "Emma Brown",
        score: 90,
    },
    {
        name: "Michael Johnson",
        score: 60,
    },
    {
        name: "Sophia Davis",
        score: 55,
    },
]
const _avatarSize = 28
const _stagger = 200
const Place = ({ user, index, onFinish, anim }) => {
    const _anim = useDerivedValue(() => {
        return withDelay(_stagger * index, withSpring(anim.value, {
            damping: 80,
            stiffness: 200
        }))
    })

    const stylez = useAnimatedStyle(() => {
        return {
            height: interpolate(_anim.value, [0, 1], [
                _avatarSize,
                Math.max(user.score * 3, _avatarSize + _spacing)]
            ),
            // backgroundColor: user.score === Math.max(...users.map(u => u.score)) ? interpolateColor(_anim.value, [0, 1], [
            //     'rgba(0,0,0,0.1)',
            //     `turquoise`
            // ]) : 'rgba(0,0,0,0.1)',
            backgroundColor: interpolateColor(_anim.value, [0, 1], [
                'rgba(0,0,0,0.1)',
                `rgba(0,0,0,${Math.min(user.score / 100, 1)})`
            ]),
        }
    })
    const textStylez = useAnimatedStyle(() => {
        return {
            opacity: interpolate(_anim.value, [0, 0.2, 1], [0, 0, 1])
        }
    })
    return (
        <Animated.View
            style={{ alignItems: 'center' }}
            entering={FadeInRight.delay(index * _stagger).springify().damping(80).stiffness(200).withCallback(finished => {
                if (finished && onFinish) {
                    runOnJS(onFinish)()
                }
            })}>
            <Animated.Text style={[{ fontSize: 7, fontWeight: '700' }, textStylez]}>{user.score}</Animated.Text>
            <Animated.View
                style={[stylez, {
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    // width: _avatarSize,
                    height: _avatarSize,
                    borderRadius: _avatarSize / 2,
                }]}
            >
                <View
                    style={{
                        width: _avatarSize,
                        aspectRatio: 1,
                    }}
                >
                    <Image
                        source={{ uri: `https://i.pravatar.cc/150?u=user_${user.name}` }}
                        style={{
                            borderRadius: _avatarSize / 2,
                            flex: 1,
                            aspectRatio: 1,
                        }}
                    />
                </View>
            </Animated.View>
        </Animated.View>
    )
}
const _spacing = 4
const Leaderboard = () => {
    const _anim = useSharedValue(0)
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <View style={{
                flexDirection: 'row',
                gap: _spacing,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
            }}>
                {users.map((user, index) => (
                    <Place
                        onFinish={() => {
                            if (index === users.length - 1) {
                                _anim.value = withSpring(1, {
                                    damping: 80,
                                    stiffness: 200
                                });
                            }
                        }}
                        index={index}
                        key={index}
                        user={user}
                        anim={_anim}
                    />
                ))}
            </View>
        </View>
    )
}

export default Leaderboard

const styles = StyleSheet.create({})