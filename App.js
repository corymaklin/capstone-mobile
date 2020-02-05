import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Foo from './Foo';
import Red from './Red';
import Search from './Search';
import Constants from 'expo-constants';
import _ from 'lodash';

class App extends Component {
    constructor (props) {
        super(props);

        this.state = {
            searchQuery: ''
        };
        this.delayedFetchStudents = _.debounce(this.fetchStudents, 1000);
    }

    componentDidUpdate(prevProps, prevState) {
        const { searchQuery } = this.state;
        if (searchQuery != prevProps.searchQuery) {
            this.search();
        }
    }

    fetchStudents = async () => {
        const { searchQuery } = this.state;

        try {
            const response = await fetch('http://localhost:5000/students');
    
            const students = await response.json();

            this.setState({
                students
            });
            
        } catch (error) {
            console.log(error);
        }
    }

    handleChannge = async searchQuery => {
        this.setState({ searchQuery });
    }

    render () {
        return (
            <View style={ styles.container }>
                <Search />
                <Red />
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
});
