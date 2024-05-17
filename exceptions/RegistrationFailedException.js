import {USER_IS_ALREADY_EXIST} from "../TextConstant.js";

class RegistrationFailedException extends Error {
    constructor() {
        super();
        this.message = USER_IS_ALREADY_EXIST;
        this.status = 401;
    }
}

export default RegistrationFailedException;