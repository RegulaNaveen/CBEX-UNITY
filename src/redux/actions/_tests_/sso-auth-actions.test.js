/**
 * jest-dom environment
 */

import * as SSOAUTHAPIs from '../../../api/sso-auth';
import { store } from '../../../store';
import { 
    proposals, 
    favourites, 
    proposalDetails, 
    favouritesUpdatedDateMap 
} from './proposals-actions.test';
import { REDUX_TYPES } from '../../../constants';
import { fetchUserOpportunityPrefs, updateFavourite } from '../sso-auth-actions';

const opportuntityPrefsRes = {
    "preferences": [
        {
            "opp_number": "HAB199007",
            "favourite": true,
            "custom_header_tab": "custom 199007",
            "favourite_updated_date": "2023-07-11T15:15:27.664Z"
        },
        {
            "opp_number": "IAB70826",
            "favourite": true,
            "custom_header_tab": "",
            "favourite_updated_date": "2023-07-11T15:17:07.953Z"
        },
        {
            "opp_number": "IAB83484",
            "favourite": true,
            "custom_header_tab": "",
            "favourite_updated_date": "2023-07-11T15:53:51.236Z"
        }
    ]
}

describe('testing sso auth actions fetchUserOpportunityPrefs', () => {
    test('render with empty response', () => {
        const mockGetOppPrefs = jest.spyOn(SSOAUTHAPIs, 'getOppPrefs').mockResolvedValue({});
        store.dispatch(fetchUserOpportunityPrefs());
        expect(mockGetOppPrefs).toHaveBeenCalled();
    });

    test('dispatch the action with response', () => {
        store.dispatch({
            type: REDUX_TYPES.PROPOSALS.ON_GET_PROPOSALS,
            payload: { proposals: proposals.proposals }
        })
        const mockGetOppPrefs = jest.spyOn(SSOAUTHAPIs, 'getOppPrefs')
                                .mockResolvedValue(opportuntityPrefsRes);
        store.dispatch(fetchUserOpportunityPrefs());
        expect(mockGetOppPrefs).toHaveBeenCalled();
    });
});

describe('testing sso auth actions updateFavourite', () => {
    beforeEach(() => {
        store.dispatch({
            type: REDUX_TYPES.PROPOSALS.ON_GET_PROPOSALS,
            payload: { proposals: proposals.proposals }
        });
        store.dispatch({
            type: REDUX_TYPES.SSO_AUTH.SET_USER_FAVOURITES,
            payload: favourites
        });
        store.dispatch({
            type: REDUX_TYPES.SSO_AUTH.SET_FAVOURITES_UPDATED_DATE,
            payload: favouritesUpdatedDateMap
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('render with empty parameters', () => {
        store.dispatch(updateFavourite('UZA88708', true, "2023-07-11T15:15:27.664Z", proposalDetails));
        expect(favouritesUpdatedDateMap.length).toBe(2);
    });
})