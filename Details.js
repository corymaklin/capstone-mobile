import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';

class Details extends Component {
    constructor (props) {
        super(props);

        this.state = {
            questions: []
        };
    }

    async componentDidMount () {
        const { route } = this.props;
        const { id } = route.params;

        try {
            
            const response = await fetch(`http://localhost:5000/students/${id}`);
    
            const questions = await response.json();

            this.setState({
                questions
            });
            
        } catch (error) {
            console.log(error);
        }
    }

    render () {
        const { questions } = this.state;

        

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Details Screen</Text>

            </View>
        );
    }
}

export default Details;