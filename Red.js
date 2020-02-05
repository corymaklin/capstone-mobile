import React, { Component } from 'react';
import {FlatList, Text, StyleSheet } from 'react-native';

class Red extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: []
        }
    }
    
    async componentDidMount () {
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

    render () {
        const { students } = this.state;

        return (
            <FlatList
                data={ students }
                renderItem={({ item }) => (
                    <Text style={styles.item}>{ item.first_name }</Text>
                )}
          />
        );
    }
}



const styles = StyleSheet.create({
    item: {
        padding: 10,
        fontSize: 18,
        height: 44
    }
});

export default Red;