import { REDUX_TYPES } from "../../constants";
import { fetchEmailTemplatesApi } from "../../api/emailTemplate";

const {
  FECTH_EMAIL_TEMPLATES,
  ERROR_FETCHING_EMAIL_TEMPLATES,
  IS_LOADING_EMAIL_TEMPLATES,
} = REDUX_TYPES.EMAILTEMPLATES;

export function fetchEmailTemplates() {
  return async (dispatch) => {
    dispatch({
      type: IS_LOADING_EMAIL_TEMPLATES,
      payload: true,
    });
    try {
      const data = await fetchEmailTemplatesApi();
      dispatch({
        type: FECTH_EMAIL_TEMPLATES,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: ERROR_FETCHING_EMAIL_TEMPLATES,
        payload: { data: err },
      });
    }
  };
}
