export const validDataFetched = (state, force = false) => !force && state.isFetched && !state.isFail;

export const successCacheState = () => ({ isFetching: false, isFetched: true, isFail: false, errors: [], lastUpdate: new Date() });
export const errorCacheState = errors => ({ errors, isFetching: false, isFetched: true, isFail: true });
export const fetchingCacheState = { isFetching: true, isFetched: false, isFail: false, errors: [] };

export const initialCacheState = {
    isFetching: true,
    isFetched: false,
    isFail: false,
    errors: [],
    lastUpdate: null,
};
