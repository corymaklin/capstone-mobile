import React, { Component } from 'react';
import { Button } from 'react-native';

class Foo extends Component {

    _onPressButton = () => {
        // console.log('hello world');
        // fetch('10.10.10.10/pi');
    }

    render() {
        return (
            <Button
                title='Start'
                onPress={this._onPressButton}
            />
        );
    }
}

export default Foo;