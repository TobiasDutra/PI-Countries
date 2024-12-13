const initialState = {
  allContinents: [],
  continents: [],
  activities: [],
  detail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_CONTINENTS":
      console.log(state.continents);
      return {
        ...state,
        continents: action.payload,
        allContinents: action.payload,
      };
    case "GET_NAME_CONTINENTS":
      return {
        ...state,
        continents:
          Array.isArray(action.payload) === true ? action.payload : [],
      };
    case "GET_ACTIVITIES":
      return {
        ...state,
        activities: action.payload,
      };
    case "FILTER_BY_VALUE":
      const allContinents = state.allContinents;
      const statusFiltered =
        action.payload == "All"
          ? allContinents
          : allContinents.filter((el) => el.continent === action.payload);

      return {
        ...state,
        continents: statusFiltered,
      };
    case "FILTER_CREATED":
      const createdFilter =
        action.payload !== "All"
          ? state.continents.filter(
              (el) => console.log(el)
              // el.Activities.map((e) => e.name === action.payload)
            )
          : state.allContinents;
      console.log(createdFilter);
      console.log(action.payload);
      return {
        ...state,
        continents:
          action.payload === "All" ? state.allContinents : createdFilter,
      };
    case "ORDER_BY_NAME":
      let sortedArr =
        action.payload === "asc"
          ? state.continents.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.continents.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        continents: sortedArr,
      };
    case "ORDER_BY_POPULATION":
      let sortedPop =
        action.payload === "menor"
          ? state.continents.sort(function (a, b) {
              if (a.population > b.population) return 1;
              if (a.population < b.population) return -1;
              return 0;
            })
          : state.continents.sort(function (a, b) {
              if (a.population > b.population) return -1;
              if (a.population < b.population) return 1;
              return 0;
            });
      console.log("aa", sortedPop);
      return {
        ...state,
        continents: sortedPop,
      };

    case "POST_CHARACTER":
      return {
        ...state,
      };
    case "GET_DETAILS":
      return {
        ...state,
        detail: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
