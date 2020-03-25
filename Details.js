import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import _ from 'lodash';

const tableHead = ['Question Number', 'Correct'];

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

        const tableData = _.map(questions, question => {
            return [question.question_number, question.score.toString()[0].toUpperCase()];
        });

        return (
            <View>
                <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                    <Row data={ tableHead } style={ styles.head } textStyle={ styles.text } />
                    <Rows data={ tableData } textStyle={ styles.text }/>
                </Table>
            </View>
        );
    }
}

export default Details;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
});