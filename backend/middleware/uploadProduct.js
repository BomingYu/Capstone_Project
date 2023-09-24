const multer = require("multer");

const storage = multer.diskStorage({
    destination:"public/productsImages",
    filename:(req,file,cd) => {
        cd(null , Date.now() + "-" + file.originalname)
    }
})

const uploadFile = multer({storage : storage}).single("file")
const uploadFiles = multer({storage : storage}).array("files")

module.exports = {uploadFile , uploadFiles}