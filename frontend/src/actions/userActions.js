import axios from "axios";
import {
	CLEAR_ERRORS,
	LOGIN_FAIL,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	REGISTER_USER_REQUEST,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAIL,
	LOAD_USER_REQUEST,
	LOAD_USER_SUCCESS,
	LOAD_USER_FAIL,
	LOGOUT_SUCCESS,
	LOGOUT_FAIL,
	UPDATE_PROFILE_REQUEST,
	UPDATE_PROFILE_SUCCESS,
	UPDATE_PROFILE_FAIL,
	UPDATE_PASSWORD_REQUEST,
	UPDATE_PASSWORD_SUCCESS,
	UPDATE_PASSWORD_FAIL,
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS
} from "../constants/userConstants";

// Clear Errors
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};

// Login User
export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({
			type: LOGIN_REQUEST
		});

		const config = {
			headers: {
				"Content-Type": "application/json"
			}
		};

		const { data } = await axios.post("/api/v1/login", { email, password }, config);
		console.log(data);
		dispatch({
			type: LOGIN_SUCCESS,
			payload: data.user
		});
	} catch (error) {
		dispatch({
			type: LOGIN_FAIL,
			payload: error.response.data.message
		});
	}
};

// Register user
export const register = (userData) => async (dispatch) => {
	try {
		dispatch({ type: REGISTER_USER_REQUEST });
		const config = {
			headers: {
				"Content-Type": "multipart/form-data"
			}
		};

		const { data } = await axios.post("/api/v1/register", userData, config);

		dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
	} catch (error) {
		dispatch({
			type: REGISTER_USER_FAIL,
			payload: error.response.data.message
		});
	}
};

export const loadUser = () => async (dispatch) => {
	try {
		dispatch({ type: LOAD_USER_REQUEST });

		const { data } = await axios.get("/api/v1/me");

		dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
	} catch (error) {
		dispatch({
			type: LOAD_USER_FAIL,
			payload: error.response.data.message
		});
	}
};

export const logout = () => async (dispatch) => {
	try {
		await axios.get("/api/v1/logout");

		dispatch({ type: LOGOUT_SUCCESS });
		// window.location.reload(false);
	} catch (error) {
		dispatch({
			type: LOGOUT_FAIL,
			payload: error.response.data.message
		});
	}
};

// Update user profile
export const updateProfile = (userData) => async (dispatch) => {
	try {
		dispatch({ type: UPDATE_PROFILE_REQUEST });

		const config = {
			headers: {
				"Content-Type": "multipart/form-data"
			}
		};

		const { data } = await axios.put("/api/v1/me/update", userData, config);

		dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
	} catch (error) {
		dispatch({
			type: UPDATE_PROFILE_FAIL,
			payload: error.response.data.message
		});
	}
};

// Update user password
export const updatePassword = (passwords) => async (dispatch) => {
	try {
		dispatch({ type: UPDATE_PASSWORD_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json"
			}
		};

		const { data } = await axios.put("/api/v1/password/update", passwords, config);

		dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
	} catch (error) {
		dispatch({
			type: UPDATE_PASSWORD_FAIL,
			payload: error.response.data.message
		});
	}
};

// Forgot user password
export const forgotPassword = (email) => async (dispatch) => {
	try {
		dispatch({ type: FORGOT_PASSWORD_REQUEST });

		const config = {
			headers: {
				"Content-Type": "application/json"
			}
		};

		const { data } = await axios.post("/api/v1/password/forgot", email, config);

		dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
	} catch (error) {
		dispatch({
			type: UPDATE_PASSWORD_FAIL,
			payload: error.response.data.message
		});
	}
};