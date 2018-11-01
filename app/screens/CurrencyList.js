import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, FlatList, View, StatusBar } from 'react-native';

//component
import { ListItem, Separator } from '../components/List';

import currencies from '../data/currencies';

const TEMP_CURRENT_CURRENCY = 'CAD';

class CurrencyList extends Component {
    static propTypes = {
        navigation: PropTypes.object,
    };

    handlePress = () => { 
        this.props.navigation.goBack(null);
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar translucent={false} barStyle="light-content"></StatusBar>
                <FlatList
                    data={currencies}
                    renderItem={({ item }) => (
                        <ListItem
                            text={item}
                            selected={item === TEMP_CURRENT_CURRENCY}
                            onPress={this.handlePress}
                        />
                    )}
                    keyExtractor={item => item}
                    ItemSeparatorComponent={Separator}
                />
            </View>
        );
    }
}

export default CurrencyList;