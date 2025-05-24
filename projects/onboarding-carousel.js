import Animated, { Extrapolation, interpolate, interpolateColor, useAnimatedScrollHandler, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring } from 'react-native-reanimated'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
const bgs = ['#000000', '#0f77b3', '#1b499f', '#005416'];
const DATA = [
    {
        "key": "3571572",
        "title": "JavaScript",
        "description": "A JavaScript library for building user interfaces.",
        "image": "https://cdn-icons-png.flaticon.com/128/5968/5968292.png"
    },
    {
        "key": "3571747",
        "title": "Python",
        "description": "A TypeScript-based open-source web application framework.",
        "image": "https://cdn-icons-png.flaticon.com/128/5968/5968350.png"
    },
    {
        "key": "3571680",
        "title": "Vue.js",
        "description": "The Progressive JavaScript Framework.",
        "image": "https://cdn-icons-png.flaticon.com/128/5968/5968342.png"
    },
    {
        "key": "3571603",
        "title": "Node.js",
        "description": "JavaScript runtime built on Chrome's V8 JavaScript engine.",
        "image": "https://cdn-icons-png.flaticon.com/128/5968/5968322.png"
    }
]
const { width, height } = Dimensions.get('screen');
const onboardingCarousel = () => {
    const scrolX = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler({
        onScroll: event => {
            scrolX.value = event.contentOffset.x;
        },
    });
    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <Backdrop scrollX={scrolX} />
            <Square scrollX={scrolX} />
            <Animated.FlatList
                data={DATA}
                scrollEventThrottle={16}
                onScroll={scrollHandler}
                pagingEnabled
                horizontal
                contentContainerStyle={{ paddingBottom: 100 }}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.key}
                renderItem={({ item }) => <View style={styles.item}>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.description}>{item.description}</Text>
                    </View>
                </View>}
            />
            <Indicator scrolX={scrolX} />
        </View>
    )
}

const Indicator = ({ scrolX }) => {

    return (
        <View style={styles.indicatorContainer}>
            {DATA.map((_, index) => {
                const animatedStyle = useAnimatedStyle(() => {
                    return {
                        transform: [
                            {
                                scale: interpolate(
                                    scrolX.value,
                                    [(index - 1) * width, index * width, (index + 1) * width],
                                    [0.8, 1.4, 0.8],
                                    Extrapolation.CLAMP
                                )
                            }
                        ],
                        opacity: interpolate(
                            scrolX.value,
                            [(index - 1) * width, index * width, (index + 1) * width],
                            [0.4, 1, 0.4],
                            Extrapolation.CLAMP
                        ),
                        width: 10,
                        aspectRatio: 1,
                        borderRadius: 10,
                        backgroundColor: '#ffffff',
                    }
                })
                return (
                    <Animated.View
                        key={index}
                        style={animatedStyle} />
                )
            })}
        </View>
    )
}

const Backdrop = ({ scrollX }) => {
    const bgstyle = useAnimatedStyle(() => (
        {
            backgroundColor: interpolateColor(
                scrollX.value,
                DATA.map((_, index) => width * index),
                bgs
            )
        }
    ))
    return (
        <Animated.View
            style={[
                StyleSheet.absoluteFillObject,
                bgstyle
            ]}
        />
    )
}

const Square = ({ scrollX }) => {
    const moduloSharedValue = (value, divisor) => {
        'worklet';
        return value - Math.floor(value / divisor) * divisor;
    };

    // Equivalent of the YOLO animated value

    const YOLO = useDerivedValue(() => {
        'worklet';
        return moduloSharedValue(scrollX.value, width) / width;
    });

    // Equivalent of the rotate interpolation
    const rotate = useDerivedValue(() => {
        'worklet';
        return interpolate(
            YOLO.value,
            [0, 0.5, 1],
            [35, 0, 35]
        ) + 'deg';
    });
    const translateX = useDerivedValue(() => {
        'worklet';
        return interpolate(
            YOLO.value,
            [0, 0.5, 1],
            [0, -height, 0]
        )
    });
    const rstyle = useAnimatedStyle(() => (
        {
            transform: [
                { rotate: rotate.value },
                { translateX: translateX.value }
            ]
        }
    ))
    return <Animated.View
        style={[rstyle, {
            width: height,
            aspectRatio: 1,
            top: -height * 0.6,
            left: -height * 0.3,
            backgroundColor: '#fff',
            borderRadius: 86,
            position: 'absolute',
        }]}
    />
}

export default onboardingCarousel

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    item: {
        width,
        alignItems: 'center',
        padding: 20,
    },
    imageContainer: {
        flex: 0.7,
        justifyContent: 'center',
    },
    image: {
        width: width * 0.5,
        aspectRatio: 1,
        resizeMode: 'contain',
    },
    textContainer: {
        flex: 0.3,
        gap: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: "#fff"
    },
    description: {
        fontWeight: '300',
        color: "#fff"

    },
    indicatorContainer: {
        position: 'absolute',
        bottom: 100,
        flexDirection: 'row',
        gap: 10,
    }
})