import {INCORRECT_VERIFY_CODE} from "../TextConstant.js";

class IncorrectVerifyCodeException extends Error {
    constructor() {
        super();
        this.message = INCORRECT_VERIFY_CODE;
        this.status = 422;
    }
}

export default IncorrectVerifyCodeException;