import {INCORRECT_DATA} from "../TextConstant.js";

class LoginFailedException extends Error {
    constructor() {
        super();
        this.message = INCORRECT_DATA;
        this.status = 401;
    }
}

export default LoginFailedException;