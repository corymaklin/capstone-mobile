import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Details from './Details';

const Stack = createStackNavigator();

class App extends Component {
    render () {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={ Home } />
                    <Stack.Screen name="Details" component={ Details } />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

export default App;