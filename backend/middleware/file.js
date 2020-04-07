const multer = require('multer');

const MIME_Type_MAP = {
    'image/png' : 'png',
    'image/jpeg' : 'jpg',
    'image/jpg' : 'jpg'
  };
  
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const isValid = MIME_Type_MAP[file.mimetype];
      let error = Error("Invalid mime type");
      if(isValid){
        error = null;
      }
      cb(null, "backend/images")
    },
    filename : (req,file,cb) => {
      const name = file.originalname.toLowerCase().split(' ').join('-');
      const ext = MIME_Type_MAP[file.mimetype];
      cb(null, name + '-' + Date.now() + '.' + ext);
    }
  });

module.exports = multer({storage: storage}).single('image');
  