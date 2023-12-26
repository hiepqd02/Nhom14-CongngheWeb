import axios from "axios";
import setBearer from "../Utils/SetBearer";
import { loadFailure, loadStart, loadSuccess, loginFailure, loginStart, loginSuccess, registrationEnd, registrationStart } from "../Redux/Slices/userSlices";
import { openAlert } from "../Redux/Slices/alertSlice";
const baseUrl = "http://localhost:3001/user/";
export const register = async (
    { name, surname, email, password, repassword },
    dispatch
) => {
    dispatch(registrationStart());
    if (password !== repassword) {
        dispatch(
            openAlert({
                message: "Your passwords does not match!",
                severity: "error",
            })
        );
    } else {
        try {
            const res = await axios.post(`${baseUrl}register`, {
                name,
                surname,
                email,
                password,
            });
            dispatch(
                openAlert({
                    message: res.data.message,
                    severity: "success",
                    nextRoute: "/",
                    duration: 1500,
                })
            );
        } catch (error) {
            dispatch(
                openAlert({
                    message: error?.response?.data?.errMessage
                        ? error.response.data.errMessage
                        : error.message,
                    severity: "error",
                })
            );
        }
    }
    dispatch(registrationEnd());
};

export const login = async ({ email, password }, dispatch) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(baseUrl + "login", { email, password });
        const { user, message } = res.data;
        localStorage.setItem("token", user.token);
        setBearer(user.token);
        dispatch(loginSuccess({ user }));
        dispatch(
            openAlert({
                message,
                severity: "success",
                duration: 500,
                nextRoute: "/boards",
            })
        );
    } catch (error) {
        dispatch(loginFailure());
        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage
                    ? error.response.data.errMessage
                    : error.message,
                severity: "error",
            })
        );
    }
};

export const loadUser = async (dispatch) => {
    dispatch(loadStart());
    if (!localStorage.token) return dispatch(loadFailure());
    setBearer(localStorage.token);
    try {
        const res = await axios.get(baseUrl + "get-user");
        dispatch(loadSuccess({ user: res.data }));
    } catch (error) {
        dispatch(loadFailure());
    }
};

