import { ScrollView, StyleSheet, Text, View } from "react-native";

function HomeScreen({ navigation }) {
    return (
        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
            <Text
                onPress={() => navigation.navigate('shared_element')}
                style={styles.buttonText}>#1 👉 Shared Element Transition</Text>
            <Text
                onPress={() => navigation.navigate('paginated_crossfade')}
                style={styles.buttonText}>#2 👉 Paginated Crossfade Animation</Text>
            <Text
                onPress={() => navigation.navigate('project3')}
                style={styles.buttonText}>#3 👉 Vertical Carousel Animation</Text>
            <Text
                onPress={() => navigation.navigate('project4')}
                style={styles.buttonText}>#4 👉 Horizontal Stack Carousel Animation 60 fps</Text>
            <Text
                onPress={() => navigation.navigate('leaderboard')}
                style={styles.buttonText}>#5 👉 Leaderboard Animation</Text>
            <Text
                onPress={() => navigation.navigate('animated_tabs')}
                style={styles.buttonText}>#6 👉 Animated Tabs</Text>
            <Text
                onPress={() => navigation.navigate('availability_animation')}
                style={styles.buttonText}>#7 👉 Availability Animation</Text>
            <Text
                onPress={() => navigation.navigate('schedule_animation')}
                style={styles.buttonText}>#8 👉 Schedule Animation</Text>
            <Text
                onPress={() => navigation.navigate('onboarding_carousel')}
                style={styles.buttonText}>#9 👉 Onboarding Carousel</Text>
        </ScrollView>
    );
}

export default HomeScreen;
const styles = StyleSheet.create({
    contentContainerStyle: {
        flexGrow: 1,
        gap: 10,
        padding: 20,
    },
    buttonText: {
        fontSize: 20,
    }
})