import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar, KeyboardAvoidingView } from 'react-native';
//connect is use to bind reduxt with component
import { connect } from 'react-redux';


//componenets
import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { InputWithButton } from '../components/TextInput';
import { ClearButton } from '../components/Buttons';
import { LastConverted } from '../components/Text';
import { Header } from '../components/Header';

import { connectAlert } from '../components/Alert';

//redux
import { swapCurrency, changeCurrencyAmount, getInitialConversion } from '../actions/currencies';

// export default () => ();
class Home extends Component {
    static propTypes = {
        navigation: PropTypes.object,
        dispatch: PropTypes.func,
        baseCurrency: PropTypes.string,
        quoteCurrency: PropTypes.string,
        amount: PropTypes.number,
        conversionRate: PropTypes.number,
        isFetching: PropTypes.bool,
        lastConvertedDate: PropTypes.object,
        primaryColor: PropTypes.string,
        alertWithType: PropTypes.func,
        currencyError: PropTypes.string
    };

    componentWillMount () {
        this.props.dispatch(getInitialConversion());
    }

    componentWillReceiveProps (nextProps) {
        if(nextProps.currencyError && nextProps.currencyError != this.props.currencyError){
            this.props.alertWithType('error', 'Error', nextProps.currencyError);
        }
    }

    handlePressBaseCurrency = () => {
        console.log('press base');
        this.props.navigation.navigate('CurrencyList', { title: 'Base Currency', type: 'base'});
    };
    handlePressQuoteCurrency = () => {
        console.log('press quote');
        this.props.navigation.navigate('CurrencyList', { title: 'Quote Currency', type: 'quote'});
    };
    handleTextChange = (text) => {
        console.log('change text', text);
        //this need to call from dispatch
        this.props.dispatch(changeCurrencyAmount(text));
    };
    handleSwapCurrency = () => {
        console.log('swap text');
        this.props.dispatch(swapCurrency());
        // console.log(swapCurrency());
    };
    handleOptionPress = () => {
        console.log('option pressed');
        this.props.navigation.navigate('Options');
    };
    // render is for display the output
    render () {
        const TEMP_BASE_CURRENCY = this.props.baseCurrency;
        const TEMP_QUOTE_CURRENCY = this.props.quoteCurrency;
        const TEMP_BASE_PRICE = this.props.amount.toString();
        const TEMP_QUOTE_PRICE = (this.props.amount * this.props.conversionRate).toFixed(2);
        const TEMP_CONVERSION_RATE = this.props.conversionRate;
        const TEMP_CONVERSION_DATE = this.props.lastConvertedDate;

        let quotePrice = (this.props.amount * this.props.conversionRate).toFixed(2);
        if(this.props.isFetching){
            quotePrice = '...';
        }

        return (
            <Container backgrounColor={this.props.primaryColor}>
                <StatusBar translucent={false} barStyle="light-content"></StatusBar>
                <Header onPress={this.handleOptionPress}/>
                <KeyboardAvoidingView behavior="padding">
                    <Logo tintColor={this.props.primaryColor}/>
                    <InputWithButton
                        buttonText={TEMP_BASE_CURRENCY} 
                        onPress={this.handlePressBaseCurrency} 
                        defaultValue={TEMP_BASE_PRICE} 
                        keyboardType="numeric" 
                        onChangeText={this.handleTextChange} 
                        textColor={this.props.primaryColor}
                    />
                    <InputWithButton 
                        buttonText={TEMP_QUOTE_CURRENCY}
                        onPress={this.handlePressQuoteCurrency}
                        editable={false} 
                        value={TEMP_QUOTE_PRICE} 
                        textColor={this.props.primaryColor}
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

//convert redux state to component prop and show to changed value
const mapStateToProps = (state) => {
    const baseCurrency = state.currencies.baseCurrency;
    const quoteCurrency = state.currencies.quoteCurrency;
    const amount =  state.currencies.amount;
    const conversionSelector = state.currencies.conversions[baseCurrency] || {};
    const rates = conversionSelector.rates || {};
    const conversionRate = rates[quoteCurrency] || 0;
    const isFetching = conversionSelector.isFetching;
    const lastConvertedDate = conversionSelector.date ? new Date(conversionSelector.date) : new Date();
    const primaryColor= state.themes.primaryColor;
    
    return {
        baseCurrency,
        quoteCurrency,
        amount,
        conversionRate,
        isFetching,
        lastConvertedDate,
        primaryColor,
        currencyError: state.currencies.error,

    };
};

//connecy (react-reduxt) first expression returns state value
export default connect(mapStateToProps)(connectAlert(Home));