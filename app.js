import express from "express";
import {config} from "dotenv";
import {applyMiddlewares} from "./routers/MiddlewaresRoutes.js";
import {applyNoAuthRoutes} from "./routers/NoAuthRoutes.js";
import {applyAuthRoutes} from "./routers/AuthRoutes.js";
import applyAdminRoutes from "./routers/AdminRoutes.js";
import setupSocketServer from "./socketServer.js";
import setupDB from "./setupDB.js";

config();
const app = express();

const PORT = process.env.PORT || 3000;

const db = await setupDB();
applyMiddlewares(app, db)
applyNoAuthRoutes(app)
applyAuthRoutes(app)
applyAdminRoutes(app)

const server = setupSocketServer(app, db);
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));