import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar, KeyboardAvoidingView } from 'react-native';

import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { InputWithButton } from '../components/TextInput';
import { ClearButton } from '../components/Buttons';
import { LastConverted } from '../components/Text';
import { Header } from '../components/Header';

import { swapCurrency, changeCurrencyAmount } from '../actions/currencies';

const TEMP_BASE_CURRENCY = 'USD';
const TEMP_QUOTE_CURRENCY = 'GBP';
const TEMP_BASE_PRICE = '100';
const TEMP_QUOTE_PRICE = '79.74';
const TEMP_CONVERSION_RATE = 0.7974;
const TEMP_CONVERSION_DATE = new Date();

// export default () => ();
class Home extends Component {
    static propTypes = {
        navigation: PropTypes.object,
    };

    handlePressBaseCurrency = () => {
        console.log('press base');
        this.props.navigation.navigate('CurrencyList', { title: 'Base Currency'});
    };
    handlePressQuoteCurrency = () => {
        console.log('press quote');
        this.props.navigation.navigate('CurrencyList', { title: 'Quote Currency'});
    };
    handleTextChange = (text) => {
        console.log('change text', text);

        console.log(changeCurrencyAmount(text));
    };
    handleSwapCurrency = () => {
        console.log('swap text');
        // this.props.dispatch(swapCurrency());
        console.log(swapCurrency());
    };
    handleOptionPress = () => {
        console.log('option pressed');
        this.props.navigation.navigate('Options');
    };
    // render is for display the output
    render () {
        return (
            <Container>
                <StatusBar translucent={false} barStyle="light-content"></StatusBar>
                <Header onPress={this.handleOptionPress}/>
                <KeyboardAvoidingView behavior="padding">
                    <Logo />
                    <InputWithButton
                        buttonText={TEMP_BASE_CURRENCY} 
                        onPress={this.handlePressBaseCurrency} 
                        defaultValue={TEMP_BASE_PRICE} 
                        keyboardType="numeric" 
                        onChangeText={this.handleTextChange}
                    />
                    <InputWithButton 
                        buttonText={TEMP_QUOTE_CURRENCY}
                        onPress={this.handlePressQuoteCurrency}
                        editable={false} 
                        value={TEMP_QUOTE_PRICE}
                    />
                    <LastConverted 
                    base={TEMP_BASE_CURRENCY} 
                    quote={TEMP_QUOTE_CURRENCY} 
                    date={TEMP_CONVERSION_DATE} 
                    conversionRate={TEMP_CONVERSION_RATE} />
                    
                    <ClearButton text="Reverse Currencies" 
                    onPress={this.handleSwapCurrency}
                    />
                </KeyboardAvoidingView>
                {/* <View /> */}
            </Container>
        );
    }
}

export default Home;