export const initialState = {
  newsList: [],
};

export function favoritesReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_FAVORITES": {
      const isInList = state.newsList.find((product) => {
        return product.id === action.payload.id;
      });

      if (isInList) {
        return state;
      } else {
        const newState = {
          newsList: [action.payload, ...state.newsList],
        };
        return newState;
      }
    }
    case "REMOVE_FROM_FAVORITES": {
      const filteredNews = state.newsList.filter((news) => {
        return news.id !== action.payload;
      });
      const newState = {
        newsList: filteredNews,
      };
      return newState;
    }
    default: {
      return state;
    }
  }
}
