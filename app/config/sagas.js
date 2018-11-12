import { takeEvery, select, call, put } from 'redux-saga/effects';
// 1. Swap Currency
// 2. Change Base currency
// 3. initial rate

import { SWAP_CURRENCY, CHANGE_BASE_CURRENCY, GET_INITIAL_CONVERSION, CONVERSION_RESULT, CONVERSION_ERROR }
 from '../actions/currencies';


const getLatestRate = currency => fetch(`https://fixer.handlebarlabs.com/latest?base=${currency}`);

const fetchLatestConversionRates = function* (action) {
    try {
        let currency = action.currency;
        if(currency == undefined){
            currency = yield select(state => state.currencies.baseCurrency);
        }
        const response = yield call(getLatestRate, currency);
        const result = yield response.json();
        if(result.error){
            yield put({ type: CONVERSION_ERROR, error: result.error});
        }else{
            yield put({ type: CONVERSION_RESULT, result});
        }
        // getLatestRate(currency)
        // .then(res => res.json())
        // .then(res => console.log(res))
        // .catch((err) => console.log(err));
    }catch(e){
        yield put({ type: CONVERSION_ERROR, error: e.message});
    }
};

const rootSaga = function* () {
    yield takeEvery(GET_INITIAL_CONVERSION, fetchLatestConversionRates);
    yield takeEvery(SWAP_CURRENCY, fetchLatestConversionRates);
    yield takeEvery(CHANGE_BASE_CURRENCY, fetchLatestConversionRates);
};

export default rootSaga;
