import multer from "multer";
import path from "path";
import randomstring from "randomstring";

// Allowed file types
const allowedFileTypes = /jpeg|jpg|png|gif|mp4|mov|svg|mkv/;
const fileType = (file, cb) => {
  const extname = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error("File type not allowed"), false);
  }
};


// export const createMulter = () => {
//   return multer({
//     storage: multer.diskStorage({
//       destination: (req, file, cb) => {
//         cb(null, "./public/hotelsImages");
//       },
//       filename: (req, file, cb) => {
//         const uniqueString = randomstring.generate(24);
//         const ext = path.extname(file.originalname).toLowerCase();
//         cb(null, `${file.fieldname}_${uniqueString}${ext}`);
//       },
//     }),
//     limits: {
//       fileSize: 1024 * 1024 * 1024, 
//     },
//     fileFilter: (req, file, cb) => {
//       fileType(file, cb);
//     },
//   });
// };

// router.put(
//   "/plan-media/:id",
//   createMulter("uploads").fields([
//     { name: "makkah_hotel_images", maxCount: 10 },
//     { name: "medinah_hotel_images", maxCount: 10 },
//   ]),
//   updateImages
// );

export const fileUploader = (fieldName, destination) => {
  return multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, `./public/${destination}`);
      },
      filename: (req, file, cb) => {
        const p1 = randomstring.generate(12);
        const p2 = randomstring.generate(12);
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, `${fieldName}_${p1}${p2}${ext}`);
      },
    }),
    fileFilter: (req, file, cb) => {
      fileType(file, cb);
    },
  }).single(`${fieldName}`);
};