import React, { Component } from 'react';
import { FlatList, Button, StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { SearchBar } from 'react-native-elements';
// import { NavigationContainer } from '@react-navigation/native';
import Constants from 'expo-constants';
import _ from 'lodash';

class Home extends Component {
    constructor (props) {
        super(props);

        this.state = {
            searchQuery: '',
            students: []
        };
        this.delayedFetchStudents = _.debounce(this.fetchStudents, 500);
    }

    componentDidMount () {
        this.fetchStudents();
    }

    componentDidUpdate (prevProps, prevState) {
        const { searchQuery } = this.state;
        if (searchQuery != prevState.searchQuery) {
            this.delayedFetchStudents();
        }
    }

    fetchStudents = async () => {
        const { searchQuery } = this.state;

        try {
            const response = await fetch(`http://localhost:5000/students/search?q=${searchQuery}`);
    
            const students = await response.json();

            this.setState({
                students
            });
            
        } catch (error) {
            console.log(error);
        }
    }

    _onPressButton = id => {
        const { navigation } = this.props;

        navigation.navigate('Details', {
            id: id
        });
    }

    handleChange = searchQuery => {
        this.setState({ searchQuery });
    }

    render () {
        const {
            students,
            searchQuery
        } = this.state;

        return (
            <View style={ styles.container }>
                <SearchBar
                    placeholder="Type Here..."
                    lightTheme
                    round
                    onChangeText={ this.handleChange }
                    value={ searchQuery }
                />
                <FlatList
                    data={ students }
                    renderItem={({ item }) => (
                        <Text
                            style={ styles.item }
                            onPress={ () => this._onPressButton(item.id) }
                        >
                            { item.first_name }
                        </Text>
                    )}
                />
            </View>
        ); 
    }
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
        marginTop: Constants.statusBarHeight
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44
    }
});
