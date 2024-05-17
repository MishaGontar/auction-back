import {CANNOT_ACTIVATE_ACCOUNT} from "../TextConstant.js";

class CannotActivateAccountException extends Error {
    constructor() {
        super();
        this.message = CANNOT_ACTIVATE_ACCOUNT;
        this.status = 503;
    }
}

export default CannotActivateAccountException;