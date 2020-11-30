import { ACTION_TYPE } from "../../actions/firestoreActions";

let initialState = {
  course_levels: [],
  course_areas: [],
  courses: [],
  errors: [],
  isLoading: false,
};

export const firestoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.GET_COURSE_START:
      return { ...state, isLoading: true };

    case ACTION_TYPE.GET_COURSE_SUCCESS:
      return { ...state, isLoading: false, courses: action.payload };

    case ACTION_TYPE.GET_COURSE_FAIL:
      return { ...state, isLoading: false, error: [action.error] };

    case ACTION_TYPE.ADD_COURSE_START:
      return { ...state, isLoading: true };

    case ACTION_TYPE.ADD_COURSE_SUCCESS:
      return { ...state, isLoading: false };

    case ACTION_TYPE.ADD_COURSE_FAIL:
      return { ...state, isLoading: false, error: [action.error] };

    case ACTION_TYPE.DELETE_AREA_WITH_UID_START:
      return { ...state, isLoading: true };

    case ACTION_TYPE.DELETE_AREA_WITH_UID_SUCCESS:
      return { ...state, isLoading: false };

    case ACTION_TYPE.DELETE_AREA_WITH_UID_FAIL:
      return { ...state, isLoading: false, error: [action.error] };

    case ACTION_TYPE.GET_AREA_START:
      return { ...state, isLoading: true };

    case ACTION_TYPE.GET_AREA_SUCCESS:
      return { ...state, isLoading: false, course_areas: action.payload };

    case ACTION_TYPE.GET_AREA_FAIL:
      return { ...state, isLoading: false, error: [action.error] };

    case ACTION_TYPE.GET_LEVEL_START:
      return { ...state, isLoading: true };

    case ACTION_TYPE.GET_LEVEL_SUCCESS:
      return { ...state, isLoading: false, course_levels: action.payload };

    case ACTION_TYPE.GET_LEVEL_FAIL:
      return { ...state, isLoading: false, error: [action.error] };

    case ACTION_TYPE.ADD_LEVEL_START:
      return { ...state, isLoading: true };

    case ACTION_TYPE.ADD_LEVEL_SUCCESS:
      return { ...state, isLoading: false };

    case ACTION_TYPE.ADD_LEVEL_FAIL:
      return { ...state, isLoading: false, errors: [action.error] };

    case ACTION_TYPE.DELETE_LEVEL_WITH_UID_START:
      return { ...state, isLoading: true };

    case ACTION_TYPE.DELETE_LEVEL_WITH_UID_SUCCESS:
      return { ...state, isLoading: false };

    case ACTION_TYPE.DELETE_LEVEL_WITH_UID_FAIL:
      return { ...state, isLoading: false, error: [action.error] };

    case ACTION_TYPE.UPDATE_LEVEL_NAME_WITH_UID_START:
      return { ...state, isLoading: true };

    case ACTION_TYPE.UPDATE_LEVEL_NAME_WITH_UID_SUCCESS:
      return { ...state, isLoading: false };

    case ACTION_TYPE.UPDATE_LEVEL_NAME_WITH_UID_FAIL:
      return { ...state, isLoading: false, error: [action.error] };

    default:
      return state;
  }
};
