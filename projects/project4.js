import { Dimensions, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { EvilIcons } from '@expo/vector-icons';
import { Image } from 'react-native';
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
    withRepeat,
    withSequence,
    runOnJS,
    Extrapolation
} from 'react-native-reanimated';
import { Directions, FlingGestureHandler, Gesture, GestureDetector, GestureHandlerRootView, State } from 'react-native-gesture-handler';
const { width } = Dimensions.get('screen')

const data = [
    {
        title: 'Cinco De Mayo',
        location: 'Summer Road',
        date: 'Fri, May 5',
        image: 'https://e98f89a2.delivery.rocketcdn.me/wp-content/uploads/2023/05/Cinco-de-Mayo-Ticket-Photoshop-Design.jpg'
    },
    {
        title: 'High-impact Basketball',
        location: 'Townhall Park',
        date: 'Sun, May 23',
        image: 'https://e98f89a2.delivery.rocketcdn.me/wp-content/uploads/2025/03/High-impact-Basketball-flyer-1.jpg'
    },
    {
        title: "Retro 80's Party",
        location: 'Streeetz AB',
        date: 'Mon, May 30',
        image: 'https://e98f89a2.delivery.rocketcdn.me/wp-content/uploads/2020/08/Retro-80s-Party-Flyer.jpg.webp'
    }
]


const OVERFLOW_HEIGHT = 70
const SPACING = 10
const ITEM_WIDTH = width * 0.76
const ITEM_HEIGHT = ITEM_WIDTH * 1.7
const VISIBLE_ITEMS = 3
const OverflowItems = ({ data, scrollXAnimated }) => {
    const overflowStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                translateY: interpolate(scrollXAnimated.value, [-1, 0, 1], [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT])
            }]
        }
    })
    return (
        <View style={styles.overflowContainer}>
            <Animated.View style={overflowStyle}>
                {data.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                        <Text style={[styles.title]} numberOfLines={1}>
                            {item.title}
                        </Text>
                        <View style={styles.itemContainerRow}>
                            <Text style={[styles.location]}>
                                <EvilIcons name="location" size={16} color="black" /> {item.location}
                            </Text>
                            <Text style={[styles.date]}>{item.date}</Text>
                        </View>
                    </View>
                ))}
            </Animated.View>
        </View>
    )
}
const AnimatedImage = ({ item, index, scrollXAnimated }) => {
    const animatedStyle = useAnimatedStyle(() => {
        const translateX = interpolate(
            scrollXAnimated.value,
            [index - 1, index, index + 1],
            [50, 0, -100],
            Extrapolation.CLAMP
        );

        const scale = interpolate(
            scrollXAnimated.value,
            [index - 1, index, index + 1],
            [0.8, 1, 1.3],
            Extrapolation.CLAMP
        );

        const opacity = interpolate(
            scrollXAnimated.value,
            [index - 1, index, index + 1],
            [1 - 1 / VISIBLE_ITEMS, 1, 0],
            Extrapolation.CLAMP
        );

        const height = interpolate(
            scrollXAnimated.value,
            [index - 1, index, index + 1],
            [ITEM_HEIGHT * 0.8, ITEM_HEIGHT, ITEM_HEIGHT * 1.2],
            Extrapolation.CLAMP
        );

        return {
            opacity,
            transform: [
                { translateX },
                { scale }
            ],
            height,
        };
    });

    return (
        <Animated.View style={[
            animatedStyle,
            { position: 'absolute', left: -ITEM_WIDTH / 2 }
        ]}>
            <Image
                source={{ uri: item.image }}
                style={{
                    width: ITEM_WIDTH,
                    height: '100%',
                }}
            />
        </Animated.View>
    )
}

const Project4 = () => {
    const scrollXIndex = useSharedValue(0);
    const scrollXAnimated = useSharedValue(0);
    const [index, setIndex] = useState(0);

    const setActiveIndex = useCallback((activeIndex) => {
        'worklet';
        runOnJS(setIndex)(activeIndex);
        scrollXIndex.value = activeIndex;
        scrollXAnimated.value = withSpring(activeIndex, {
            damping: 20,
            stiffness: 100
        });
    }, []);

    // Separate gestures for left and right flings
    const leftFling = Gesture.Fling()
        .direction(Directions.LEFT)
        .onEnd((event) => {
            'worklet';
            if (index === data.length - 1) return;
            setActiveIndex(index + 1);
        });

    const rightFling = Gesture.Fling()
        .direction(Directions.RIGHT)
        .onEnd((event) => {
            'worklet';
            if (index === 0) return;
            setActiveIndex(index - 1);
        });

    // Combine both gestures
    const flingGestures = Gesture.Exclusive(leftFling, rightFling);

    // useEffect(() => {
    //     const updateIndex = () => {
    //         const availableIndices = Array.from({ length: data.length }, (_, i) => i)
    //             .filter(i => i !== Math.floor(scrollXIndex.value));
    //         const nextIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];

    //         scrollXIndex.value = withTiming(nextIndex);
    //         scrollXAnimated.value = withSpring(nextIndex, {
    //             damping: 20,
    //             stiffness: 100
    //         });
    //         runOnJS(setIndex)(nextIndex);
    //     };

    //     const intervalId = setInterval(updateIndex, 3000);
    //     return () => clearInterval(intervalId);
    // }, []);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <GestureDetector gesture={flingGestures}>
                <SafeAreaView style={styles.container}>
                    <StatusBar hidden />
                    <OverflowItems data={data} scrollXAnimated={scrollXAnimated} />
                    <FlatList
                        data={data}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        inverted
                        scrollEnabled={false}
                        removeClippedSubviews={false}
                        contentContainerStyle={{
                            flex: 1,
                            justifyContent: 'center',
                            padding: SPACING * 2
                        }}
                        CellRendererComponent={({ item, index, children, style, ...props }) => {
                            const newStyle = [
                                style,
                                { zIndex: data.length - index }
                            ]
                            return (
                                <View style={newStyle} {...props}>
                                    {children}
                                </View>
                            )
                        }}
                        renderItem={({ item, index }) => (
                            <AnimatedImage
                                item={item}
                                index={index}
                                scrollXAnimated={scrollXAnimated}
                            />
                        )}
                    />
                </SafeAreaView>
            </GestureDetector>
        </GestureHandlerRootView>
    )
}

export default Project4

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingTop: SPACING * 2.5,
    },
    title: {
        fontSize: 28,
        fontWeight: '900',
        letterSpacing: -1,
        textTransform: 'uppercase'
    },
    location: {
        fontSize: 16
    },
    date: {
        fontSize: 12,
    },
    itemContainer: {
        height: OVERFLOW_HEIGHT,
        padding: SPACING,
    },
    itemContainerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    overflowContainer: {
        height: OVERFLOW_HEIGHT,
        overflow: 'hidden',
    }

})