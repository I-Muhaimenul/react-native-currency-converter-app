import { takeEvery } from 'redux-saga/effects';
// 1. Swap Currency
// 2. Change Base currency
// 3. initial rate

import { SWAP_CURRENCY, CHANGE_BASE_CURRENCY, GET_INITIAL_CONVERSION } from '../actions/currencies';

const fetchLatestConversionRates = function* (action) {
    yield;
};

const rootSaga = function* () {
    yield takeEvery(GET_INITIAL_CONVERSION, fetchLatestConversionRates);
    yield takeEvery(SWAP_CURRENCY, fetchLatestConversionRates);
    yield takeEvery(CHANGE_BASE_CURRENCY, fetchLatestConversionRates);
};

export default rootSaga;
