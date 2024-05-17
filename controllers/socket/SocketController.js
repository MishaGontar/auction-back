import jwt from "jsonwebtoken";
import LotBetService from "../../services/lot/LotBetService.js";
import LotService from "../../services/lot/LotService.js";

class SocketController {
    constructor() {
        this.connectedUsers = {};
    }

    authenticateSocketToken(socket, next, db) {
        const token = socket.handshake.auth.token;

        if (!this.validateAuthToken(token)) {
            return next(new Error('Authentication error'));
        }
        socket.db = db;
        return next();
    }

    validateAuthToken(token) {
        try {
            jwt.verify(token, process.env.TOKEN_SECRET);
            return true;
        } catch (error) {
            return false;
        }
    }

    connectionToLot(socket, io) {
        const query = socket.handshake.query;
        socket.lotId = +query.lotId;
        socket.user = JSON.parse(query.user);
        socket.is_owner = query.is_owner === "true" ?? "false";
        const userId = socket.user.user_id;
        console.warn(`User with ID: ${userId} connected to lot ID: ${socket.lotId} , is_owner = ${socket.is_owner}`);

        this.connectedUsers[userId] = {socketId: socket.id, lot_id: socket.lotId};

        socket.on("updatedBet", (new_amount) => this.handleBet(socket, io, new_amount));
        socket.on("updatedBets", () => this.handleUpdatedBets(socket, io));
        socket.on("finishedLot", () => this.handleFinishLot(socket, io))
        socket.on("disconnect", () => console.log(`Client with ID: ${socket.user.user_id} disconnected from lot ID: ${socket.lotId}`));
    }

    async handleBet(socket, io, newAmount) {
        const data = {
            lot_id: socket.lotId,
            user_id: socket.user.user_id,
            amount: +newAmount,
            is_owner: socket.is_owner
        };
        try {
            await LotBetService.bet(socket.db, data);
            const bets = await LotBetService.getLotBetsByLotId(socket.db, socket.lotId);
            this.emitWithLotId(io, socket.lotId, "updatedBet", JSON.stringify({bets}))
        } catch (e) {
            console.error(e);
            console.warn("Error while SOCKET handleBet");
        }
    }

    async handleUpdatedBets(socket, io) {
        try {
            const bets = await LotBetService.getLotBetsByLotId(socket.db, socket.lotId);
            const winner = await LotService.getWinnerByLotId(socket.db, socket.lotId)
            const data = {
                bets: bets,
                winner: winner.length > 0 ? winner[0] : null
            }
            this.emitWithLotId(io, socket.lotId, "updatedBet", JSON.stringify(data))
        } catch (e) {
            console.error(e);
            console.warn("Error while SOCKET handleUpdatedBets");
        }
    }

    async handleFinishLot(socket, io) {
        try {
            await LotService.finishLot(socket.db, socket.lotId);
            this.emitWithLotId(io, socket.lotId, "finishedLot")
        } catch (e) {
            console.error(e);
            console.warn("Error while SOCKET handleFinishLot");
        }
    }

    emitWithLotId(io, lotId, emitName, emitData) {
        Object.keys(this.connectedUsers).forEach((userId) => {
            const user = this.connectedUsers[userId];
            if (user.lot_id === lotId) {
                io.to(user.socketId).emit(emitName, emitData);
            }
        });
    }
}

export default new SocketController();
