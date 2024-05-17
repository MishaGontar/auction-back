import ImageService from "../../services/image/ImageService.js";

class ImageController {
    async getUploadImage(req, res) {
        const {filename} = req.params;
        try {
            const imagePath = await ImageService.getImageUploadPath(filename);
            res.sendFile(imagePath)
        } catch (e) {
            return res.status(404).send("File not found");
        }
    }
}

export default new ImageController()