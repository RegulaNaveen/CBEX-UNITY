import { EMAILTEMPLATES } from '../../constants/types';

const INITIAL_STATE = {
    emailTemplatesList: [],
    fetchEmailTemplatesErrorMsg: '',
    isLoadingEmailTemplates: false
};

export default function emailTemplatesReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case EMAILTEMPLATES.FECTH_EMAIL_TEMPLATES: {
            return {
                ...state,
                emailTemplatesList: action.payload,
                isLoadingEmailTemplates: false,
            };
        }
        case EMAILTEMPLATES.IS_LOADING_EMAIL_TEMPLATES: {
            return {
                ...state,
                isLoadingEmailTemplates: action.payload
            };
        }
        case EMAILTEMPLATES.ERROR_FETCHING_EMAIL_TEMPLATES: {
            return {
                ...state,
                emailTemplatesList: [],
                fetchEmailTemplatesErrorMsg: action.payload,
                isLoadingEmailTemplates: false
            };
        }
        default:
            return state;
        }
}
