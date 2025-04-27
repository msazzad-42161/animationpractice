import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import data from '../utils/mockData'
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'


const { height } = Dimensions.get('screen')
const _spacing = 4
const _itemSize = height * 0.72
const _itemFullSize = _itemSize + _spacing * 2

const AnimatedCard = ({ item, index, scrollY }) => {

    const stylez = useAnimatedStyle(() => {
        const opacity = interpolate(
            scrollY.value,
            [index - 1, index, index + 1],
            [0.3, 1, 0.3]
        )
        const scale = interpolate(
            scrollY.value,
            [index - 1, index, index + 1],
            [0.95, 1, 0.95]
        )

        return {
            opacity,
            transform: [{ scale }]
        }
    })

    return (
        <Animated.View style={[stylez, {
            flex: 1,
            height: _itemSize,
            padding: _spacing * 2,
            borderRadius: 12,
            gap: _spacing,
            overflow: 'hidden',
        }]}>
            <Image
                source={{ uri: item.image }}
                style={[
                    StyleSheet.absoluteFillObject,
                ]}
                blurRadius={50}
            />
            <Image
                source={{ uri: item.image }}
                style={{
                    flex: 1,
                    height: _itemSize * 0.4,

                }}
            />
            <View style={{ gap: _spacing }}>
                <Text style={{ fontSize: 24, fontWeight: '700', color: "#fff" }}>{item.title}</Text>
                <Text style={{ color: "#ddd" }} numberOfLines={3}>{item.description}</Text>
            </View>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: _spacing,
            }}>
                <Image
                    source={{ uri: item.author.avatar }}
                    style={{
                        width: 24,
                        aspectRatio: 1,
                        borderRadius: 12,
                    }}
                />
                <Text style={{ fontSize: 12, color: "#ddd" }}>{item.author.name}</Text>
            </View>
        </Animated.View>
    )
}
const Project3 = () => {
    const scrollY = useSharedValue(0)
    const onScroll = useAnimatedScrollHandler(e => {
        scrollY.value = e.contentOffset.y / _itemFullSize
    })
    console.log(data)
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#141414',
        }}>
            <Animated.FlatList
                data={data}
                contentContainerStyle={{
                    paddingHorizontal: _spacing * 3,
                    paddingVertical: (height - _itemFullSize) / 2,
                    gap: _spacing * 2,
                }}
                renderItem={({ item, index }) => <AnimatedCard item={item} index={index} scrollY={scrollY} />}
                snapToInterval={_itemFullSize}
                decelerationRate={'fast'}
                onScroll={onScroll}
                scrollEventThrottle={16} // 1000/60 = 16.67ms
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.key}
            />
        </View>
    )
}

export default Project3

const styles = StyleSheet.create({})