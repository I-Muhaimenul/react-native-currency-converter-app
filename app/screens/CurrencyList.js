import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, FlatList, View, StatusBar } from 'react-native';

import { connect } from 'react-redux';

//component
import { ListItem, Separator } from '../components/List';

//list of currencies
import currencies from '../data/currencies';

//redux
import { changeBaseCurrency, changeQuoteCurrency } from '../actions/currencies';

const TEMP_CURRENT_CURRENCY = 'CAD';

class CurrencyList extends Component {
    static propTypes = {
        navigation: PropTypes.object,
        dispatch: PropTypes.func,
        baseCurrency: PropTypes.string,
        quoteCurrency: PropTypes.string,
        primaryColor: PropTypes.string,
    };

    handlePress = (currency) => {
        const { type } = this.props.navigation.state.params;
        //dispatch action based on type
        if(type === 'base'){
            this.props.dispatch(changeBaseCurrency(currency));
        }else if(type === 'quote'){
            this.props.dispatch(changeQuoteCurrency(currency));
        }
        this.props.navigation.goBack(null);
    };

    render() {
        let comparisonCurrency = this.props.baseCurrency;
        if(this.props.navigation.state.params.type === 'quote'){
            comparisonCurrency = this.props.quoteCurrency;
        }

        return (
            <View style={{ flex: 1 }}>
                <StatusBar translucent={false} barStyle="light-content"></StatusBar>
                <FlatList
                    data={currencies}
                    renderItem={({ item }) => (
                        <ListItem
                            text={item}
                            selected={item === comparisonCurrency}
                            onPress={ () => this.handlePress(item) }
                            iconBackground={this.props.primaryColor}
                        />
                    )}
                    keyExtractor={item => item}
                    ItemSeparatorComponent={Separator}
                />
            </View>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        baseCurrency: state.currencies.baseCurrency,
        quoteCurrency: state.currencies.quoteCurrency,
        primaryColor: state.themes.primaryColor
    };
};

export default connect(mapStateToProps)(CurrencyList);