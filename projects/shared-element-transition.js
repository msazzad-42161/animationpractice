import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Animated, { SharedTransition, withSpring } from 'react-native-reanimated';
import { View, Pressable, StyleSheet, Text, Dimensions } from 'react-native';

const Stack = createNativeStackNavigator();
const { width } = Dimensions.get('window');

// Custom transition animation
const transition = SharedTransition.custom((values) => {
    'worklet';
    return {
        height: withSpring(values.targetHeight),
        width: withSpring(values.targetWidth),
    };
});

// Screen One Component
function ScreenOne({ navigation }) {
    return (
        <View style={styles.container}>
            <Pressable onPress={() => navigation.navigate('Two')}>
                <Animated.View
                    sharedTransitionTag="sharedElement"
                    style={[styles.box, { backgroundColor: 'green' }]}
                />
            </Pressable>
            <Pressable 
                style={styles.button}
                onPress={() => navigation.navigate('Two')}
            >
                <Text style={styles.buttonText}>#2.1 👉 Go to Screen Two</Text>
            </Pressable>
        </View>
    );
}

// Screen Two Component
function ScreenTwo({ navigation }) {
    return (
        <View style={styles.container}>
            <Pressable onPress={() => navigation.navigate('One')}>
                <Animated.View
                    sharedTransitionTag="sharedElement"
                    style={[styles.boxLarge, { backgroundColor: 'green' }]}
                />
            </Pressable>
            <Pressable 
                style={styles.button}
                onPress={() => navigation.navigate('One')}
            >
                <Text style={styles.buttonText}>#2.2 👉 Back to Screen One</Text>
            </Pressable>
        </View>
    );
}

// Main App Component
export default function SharedElementExample() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="One" component={ScreenOne} />
            <Stack.Screen name="Two" component={ScreenTwo} />
        </Stack.Navigator>
    );
}

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    boxLarge: {
        width: width - 40,
        height: 300,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        elevation: 3,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    }
});