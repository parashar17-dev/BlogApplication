export default (state, action) => {
   switch (action.type) {
      case 'LOGIN_START':
         return {
            ...state,
            isFetching: true,
         };
      case 'LOGIN_SUCCESS':
         return {
            ...state,
            user: action.payload,
            isFetching: false,
         };
      case 'LOGIN_FAILURE':
         return {
            user: null,
            isFetching: false,
            error: true,
         };
      case 'LOGOUT':
         return {
            user: null,
            isFetching: false,
            error: false,
         };
      case 'UPDATE_SUCCESS':
         return {
            ...state,
            user: action.payload,
         };
      default:
         return state;
   }
};
