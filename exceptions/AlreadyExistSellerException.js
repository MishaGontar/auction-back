import {SELLER_IS_ALREADY_EXIST, USER_IS_ALREADY_EXIST} from "../TextConstant.js";

class AlreadyExistSellerException extends Error {
    constructor() {
        super();
        this.message = SELLER_IS_ALREADY_EXIST;
        this.status = 401;
    }
}

export default AlreadyExistSellerException;