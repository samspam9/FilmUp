import {BottomTabBarProps, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import Container from 'react-native-container';
import Icon from 'react-native-easy-icon';
import Favorite from './containers/Favorite';
import Home from './containers/Home';
import Movie from './containers/Movie';
import Search from './containers/Search';
import Styles from './constants/styles';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export type AppTabParamList = {
  Home: undefined;
  Favorite: undefined;
  Movie: {movieID: string};
};
function MyTabBar({state, descriptors, navigation}: BottomTabBarProps) {
  return (
    <Container row center="vertical" noflex style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        let iconName = '';

        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Favorite') {
          iconName = 'heart';
        } else if (route.name === 'Search') iconName = 'magnifier';

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={Styles.flex}>
            <Container center>
              <Icon
                name={iconName}
                type="simple-line-icon"
                size={24}
                color={isFocused ? 'white' : 'gray'}
              />
              <Text style={{color: isFocused ? 'white' : 'gray', fontSize: 10, marginTop: 4}}>
                {label}
              </Text>
            </Container>
          </TouchableOpacity>
        );
      })}
    </Container>
  );
}

const Main = () => {
  return (
    <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Favorite" component={Favorite} />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Movie" component={Movie} />
    </Stack.Navigator>
  );
};

export default App;

const styles = StyleSheet.create({
  tabbar: {height: 82, paddingBottom: 20, backgroundColor: '#111111'},
});
