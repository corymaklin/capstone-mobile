import React, { Component } from 'react';
import { FlatList, Item, Button, StyleSheet, Text, View } from 'react-native';
// import Foo from './Foo';
// import Red from './Red';
// import Search from './Search';
import { SearchBar } from 'react-native-elements';
import Constants from 'expo-constants';
import _ from 'lodash';

class App extends Component {
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

            console.log(students);

            this.setState({
                students
            });
            
        } catch (error) {
            console.log(error);
        }
    }

    _onPressButton = () => {
        alert('You long-pressed the button!')
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
                            onPress={ this._onPressButton }
                        >
                            { item.first_name }
                        </Text>

                        // <Item style={styles.item}>{ item.first_name }</Item>

                    )}
                />
            </View>
        ); 
    }
}

export default App;

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
