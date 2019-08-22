const initialState = {
  confidential: '',
  edit: false,
};

const confidential = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'UPDATE_CONFIDENTIAL':
      return {
        confidential: payload,
      };
    default:
      return state;
  }
};

export default confidential;
