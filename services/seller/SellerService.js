import {
    INSERT_SELLER,
    SELECT_ALL_SELLER_STATUS,
    SELECT_SELLER_BY_ID,
    SELECT_SELLER_BY_USER_ID,
    SELECT_SELLERS,
    UPDATE_STATUS_ID
} from "../../databaseSQL/seller/SellerSqlQuery.js";
import AlreadyExistSellerException from "../../exceptions/AlreadyExistSellerException.js";
import {getRowsOrThrowException} from "../../utils.js";

class SellerService {
    async handleSellerForm(db, formData) {
        const seller = await this.findSellerByUserId(db, formData.user_id);
        if (seller) {
            throw new AlreadyExistSellerException()
        }

        const newSeller = await this.createSeller(db, formData)
        if (!newSeller) {
            throw new Error("Couldn't submit an application for the seller")
        }
        return newSeller
    }

    async findSellerById(db, sellerId) {
        const result = await db.query(SELECT_SELLER_BY_ID, [sellerId])
        return getRowsOrThrowException(result, "Can't find seller")[0]
    }

    async findSellerByUserId(db, user_id) {
        try {
            const result = await db.query(SELECT_SELLER_BY_USER_ID, [user_id]);
            return result.rows[0]
        } catch (e) {
            console.error('Error find seller:', e.message);
            return null;
        }
    }

    async createSeller(db, formData) {
        try {
            const result = await db.query(INSERT_SELLER, [
                formData.user_id,
                formData.full_name,
                formData.social_media,
                formData.address ?? null,
                formData.phone_number ?? null,
                formData.description
            ]);
            return result.rows[0]
        } catch (e) {
            console.error('Error inserting seller:', e.message);
            return null;
        }
    }

    async getAllSellers(db) {
        try {
            const result = await db.query(SELECT_SELLERS)
            return result.rows
        } catch (e) {
            console.error('Error inserting seller:', e.message);
            return null;
        }
    }

    async acceptSeller(db, seller_id) {
        try {
            const result = await db.query(UPDATE_STATUS_ID, [2, seller_id])
            return result.rows[0]
        } catch (e) {
            console.error('Error inserting seller:', e.message);
            return null;
        }
    }

    async rejectSeller(db, seller_id) {
        try {
            const result = await db.query(UPDATE_STATUS_ID, [3, seller_id])
            return result.rows[0]
        } catch (e) {
            console.error('Error inserting seller:', e.message);
            return null;
        }
    }

    async getSellerStatus(db) {
        try {
            const result = await db.query(SELECT_ALL_SELLER_STATUS)
            return result.rows
        } catch (e) {
            console.error('Error inserting seller:', e.message);
            return null;
        }
    }
}

export default new SellerService()