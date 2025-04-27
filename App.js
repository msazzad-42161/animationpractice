import './gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './root';
import SharedElementExample from './projects/shared-element-transition';
import CrossFadeFlatList from './projects/paginated-crossfade-animations';
import Project4 from './projects/project4';
import Project3 from './projects/project3';
import Leaderboard from './projects/leaderboard';
import AnimatedTabs from './projects/animated-tabs';
import AvailabilityAnimation from './projects/availability-animation';

const { Navigator, Screen } = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Navigator
        initialRouteName='root'
        screenOptions={{
          headerTitleAlign: 'center',
        }}
      >
        <Screen
          name="root"
          component={HomeScreen}
          options={{ title: '✨ Reanimated Projects' }}
        />
        {/* animation screens */}
        <Screen
          name="shared_element"
          component={SharedElementExample}
          options={{ title: 'Shared Element Transition' }}
        />
        <Screen
          name="paginated_crossfade"
          component={CrossFadeFlatList}
          options={{ title: 'Paginated Crossfade Animation madafaka' }}
        />
        <Screen
          name="project3"
          component={Project3}
          options={{ headerShown: false, title: 'Vertical Carousel Animation' }}
        />
        <Screen
          name="project4"
          component={Project4}
          options={{ headerShown: false, title: 'Horizontal Stack Carousel Animation 60 fps' }}
        />
        <Screen
          name="leaderboard"
          component={Leaderboard}
          options={{ headerShown: false, title: 'Leaderboard Animation' }}
        />
        <Screen
          name="animated_tabs"
          component={AnimatedTabs}
          options={{ headerShown: false, title: 'Animated Tabs' }}
        />
        <Screen
          name="availability_animation"
          component={AvailabilityAnimation}
          options={{ headerShown: false, title: 'Availability Animation' }}
        />
      </Navigator>
    </NavigationContainer>
  );
}