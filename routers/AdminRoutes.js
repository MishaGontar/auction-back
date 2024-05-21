    import AdminController from "../controllers/admin/AdminController.js";
import SellerController from "../controllers/seller/SellerController.js";

// don't forget add app.use(AuthController.authenticateToken) before use method
export default function applyAdminRoutes(app) {
    app.use(AdminController.authenticateAdminToken)

    app.post("/admin/check", AdminController.check)
    app.get("/sellers", SellerController.getSellers)
    app.get("/sellers/status", SellerController.getSellersStatuses)
    app.post("/seller/2", SellerController.acceptSeller)
    app.post("/seller/3", SellerController.rejectSeller)
}