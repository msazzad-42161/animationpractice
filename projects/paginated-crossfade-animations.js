import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    runOnJS,
    interpolate,
    Extrapolation,
    useAnimatedGestureHandler,
} from 'react-native-reanimated';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.4;

const PAGES = [
    { id: '1', backgroundColor: '#FF5733', title: 'Page 1' },
    { id: '2', backgroundColor: '#33FF57', title: 'Page 2' },
    { id: '3', backgroundColor: '#3357FF', title: 'Page 3' },
    { id: '4', backgroundColor: '#F033FF', title: 'Page 4' },
];

const Page = ({ item, index, activeIndex, translateX }) => {
    const animatedStyle = useAnimatedStyle(() => {
        // Get the current absolute position in the scroll
        const scrollPosition = -translateX.value / width;
        
        // Calculate how far we are between pages (0 = exactly on a page)
        const transitionPosition = scrollPosition - Math.floor(scrollPosition);
        
        // Determine which pages are involved in the transition
        const currentPage = Math.floor(scrollPosition);
        const isCurrentPage = index === currentPage;
        const isNextPage = index === currentPage + 1;
        
        let opacity = 1;
        let scale = 1;

        if (isCurrentPage) {
            // Current page fades out and scales down as we scroll
            opacity = interpolate(
                transitionPosition,
                [0, 1],
                [1, 0],
                Extrapolation.CLAMP
            );
            scale = interpolate(
                transitionPosition,
                [0, 1],
                [1, 0.95],
                Extrapolation.CLAMP
            );
        } else if (isNextPage) {
            // Next page fades in and scales up as we scroll
            opacity = interpolate(
                transitionPosition,
                [0, 1],
                [0, 1],
                Extrapolation.CLAMP
            );
            scale = interpolate(
                transitionPosition,
                [0, 1],
                [0.95, 1],
                Extrapolation.CLAMP
            );
        } else {
            // Other pages stay hidden
            opacity = 0;
        }

        return {
            opacity,
            transform: [{ scale }],
            zIndex: isCurrentPage ? 2 : isNextPage ? 1 : 0,
        };
    });

    return (
        <Animated.View style={[styles.page, animatedStyle]}>
            <View style={[styles.pageContent, { backgroundColor: item.backgroundColor }]}>
                <Text style={styles.text}>{item.title}</Text>
            </View>
        </Animated.View>
    );
};

const HomeScreenPages = () => {
    const translateX = useSharedValue(0);
    const [activeIndex, setActiveIndex] = useState(0);

    const gestureHandler = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
            ctx.startX = translateX.value;
        },
        onActive: (event, ctx) => {
            const newPosition = ctx.startX + event.translationX;
            // Limit scrolling to prevent going beyond first/last page
            const minPosition = -(PAGES.length - 1) * width;
            translateX.value = Math.max(minPosition, Math.min(0, newPosition));
        },
        onEnd: (event) => {
            const velocity = event.velocityX;
            const currentPosition = translateX.value;

            // Calculate target page based on velocity and position
            let targetPage = Math.round(-currentPosition / width);

            if (Math.abs(velocity) > 500) {
                targetPage = velocity > 0
                    ? Math.floor(-currentPosition / width)
                    : Math.ceil(-currentPosition / width);
            }

            // Ensure target page is within bounds
            targetPage = Math.max(0, Math.min(PAGES.length - 1, targetPage));
            const targetPosition = -targetPage * width;

            translateX.value = withSpring(targetPosition, {
                velocity: velocity,
                damping: 20,
                stiffness: 200,
            }, (finished) => {
                if (finished) {
                    runOnJS(setActiveIndex)(targetPage);
                }
            });
        }
    });

    return (
        <GestureHandlerRootView style={styles.container}>
            <PanGestureHandler onGestureEvent={gestureHandler}>
                <Animated.View style={styles.pagesContainer}>
                    {PAGES.map((item, index) => (
                        <Page
                            key={item.id}
                            item={item}
                            index={index}
                            activeIndex={activeIndex}
                            translateX={translateX}
                        />
                    ))}
                </Animated.View>
            </PanGestureHandler>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    pagesContainer: {
        flex: 1,
    },
    page: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pageContent: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default HomeScreenPages;