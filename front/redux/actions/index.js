import axios from "axios";

const GET_CONTINENTS = "GET_CONTINENTS";
const GET_NAME_CONTINENTS = "GET_NAME_CONTINENTS";
const GET_ACTIVITIES = "GET_ACTIVITIES";
const GET_DETAILS = "GET_DETAILS";
const FILTER_BY_VALUE = "FILTER_BY_VALUE";
const FILTER_CREATED = "FILTER_CREATED";
const ORDER_BY_NAME = "ORDER_BY_NAME";
const ORDER_BY_POPULATION = "ORDER_BY_POPULATION";

export function getContinents() {
  return async function (dispatch) {
    var json = await axios(`http://localhost:3001/countries`, {});
    return dispatch({
      type: "GET_CONTINENTS",
      payload: json.data,
    });
  };
}

export function getNameContinents(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        `http://localhost:3001/countries/?name=` + name
      );
      return dispatch({
        type: "GET_NAME_CONTINENTS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterContinentsByContinent(payload) {
  return {
    type: "FILTER_BY_VALUE",
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function orderByPopulation(payload) {
  return {
    type: "ORDER_BY_POPULATION",
    payload,
  };
}

export function getActivities() {
  return async function (dispatch) {
    var json = await axios("http://localhost:3001/activities/", {});
    return dispatch({ type: "GET_ACTIVITIES", payload: json.data });
  };
}

export function postActivity(payload) {
  return async function (dispatch) {
    const response = await axios.post(
      "http://localhost:3001/activities/",
      payload
    );
    console.log(response);
    return response;
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/countries/" + id);
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
