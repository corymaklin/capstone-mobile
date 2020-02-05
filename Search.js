import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements';

class Search extends Component {
    render () {
        return (
            <SearchBar placeholder="Type Here..." lightTheme round />
        );
    }
}

export default Search;