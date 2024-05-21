import ImageService from "../../services/image/ImageService.js";
import {checkFormDataWithFile, deleteRequestFiles, getErrorResponse, getUserFromRequest} from "../../utils.js";
import LotService from "../../services/lot/LotService.js";
import LotBetService from "../../services/lot/LotBetService.js";

class LotController {
    async createLot(req, res) {
        try {
            checkFormDataWithFile(req)
            const lot = await LotService.createLot(req.db, req.body)
            await ImageService.createImageLot(req.db, req.files, lot.id)
            res.status(200).send({})
        } catch (e) {
            deleteRequestFiles(req)
            console.error('createLot', e)
            return getErrorResponse(res, e)
        }
    }

    async getAuctionLots(req, res) {
        const auctionId = +req.params.id;
        try {
            const lots = await LotService.getAuctionLots(req.db, auctionId)
            return res.status(200).send({lots})
        } catch (e) {
            console.error(`getAuctionLots error: `, e)
            return getErrorResponse(res, e)
        }
    }

    async getLotById(req, res) {
        const lotId = +req.params.id;
        try {
            const lot = await LotService.getLotById(req.db, lotId)
            const images = await LotService.getLotImagesByLotId(req.db, lotId)
            const bets = await LotBetService.getLotBetsByLotId(req.db, lotId)
            const winner = await LotService.getWinnerByLotId(req.db, lotId)

            return res.status(200).send({lot, images, bets, winner: winner.length > 0 ? winner[0] : null})
        } catch (e) {
            console.error(`getAuctionLots error: `, e)
            return getErrorResponse(res, e)
        }
    }

    async deleteLotById(req, res) {
        const lotId = +req.params.id;
        try {
            await LotService.isLotOwner(req, lotId)

            const lot_delete = await LotService.deleteLot(req.db, lotId)

            if (!lot_delete) {
                throw new Error("Lot not deleted.")
            }
            return res.status(200).send({lot: lot_delete})
        } catch (e) {
            console.error(`deleteLot error: `, e)
            return getErrorResponse(res, e)
        }
    }

    async deleteLotBetByLotId(req, res) {
        const lotId = +req.params.id;
        const betLotId = +req.params.bet_id;

        try {
            await LotService.isLotOwner(req, lotId)
            const existWinner = await LotService.getWinnerByLotId(req.db, lotId)
            const bet_delete = await LotBetService.deleteBetLotByIdAndLotId(req.db, betLotId, lotId)
            if (!bet_delete) {
                throw new Error("Lot not deleted.")
            }
            const bets = await LotBetService.getLotBetsByLotId(req.db, lotId)

            if (existWinner.length > 0 && bets.length > 0 && existWinner[0].lot_bet_id === betLotId) {
                console.warn(`Get other winner for lot ${lotId}`)
                await LotService.createWinner(req.db, lotId)
            }

            return res.status(200).send({bets})
        } catch (e) {
            console.error(`deleteLot error: `, e)
            return getErrorResponse(res, e)
        }
    }

    async updateLotById(req, res) {
        const lotId = +req.params.id
        try {
            req.body.lotId = lotId
            await LotService.updateLotById(req.db, req.body)
            if (req.files.length !== 0) {
                await ImageService.deleteImagesByLotId(req.db, lotId)
                await ImageService.createImageLot(req.db, req.files, lotId)
            }
            res.status(200).send({})
        } catch (e) {
            deleteRequestFiles(req)
            console.error('updateLotById', e)
            return getErrorResponse(res, e)
        }
    }
}

export default new LotController()