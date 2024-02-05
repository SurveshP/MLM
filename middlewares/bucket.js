import multer from "multer";
import multerS3 from "multer-s3";
import createError from "http-errors";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "AKIAZI2LD26DMOVYULWW",
    secretAccessKey: "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",
  },
});

const multerFilter = (file, cb) => {
  if (file.fieldname === "effectOfAr") {
    if (file.mimetype === "application/octet-stream") {
      return true;
    } else {
      cb(createError("Only deeper, format allowed!"), false);
    }
  }

  if (file.fieldname === "threeDModelData") {
    if (file.mimetype === "model/obj") {
      return true;
    } else {
      cb(createError("Only obj, format allowed!"), false);
    }
  }
};

export const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: "boostupmlm-project01",
    contentType: (req, file, cb) => {
      cb(null, file.mimetype);
      multerFilter(file, cb);
    },
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + file.originalname);
    },
  }),
});

const s3 = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "AKIAZI2LD26DMOVYULWW",
    secretAccessKey: "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",
  },
});

export const deleteFileFromObjectStorage = (path) => {
  const Key = path;
  const deleteCommand = new DeleteObjectCommand({
    Bucket: process.env.AWS_OBJECT_BUCKET,
    Key,
  });
  s3.send(deleteCommand)
    .then(() => {
      console.log(`Object "${path}" deleted successfully.`);
    })
    .catch((err) => {
      console.error(`Error deleting object "${path}": ${err.message}`);
    });
};

export const getImageBuffer = async (bucketName, path) => {
  const Key = path;
  const params = {
    Bucket: process.env.AWS_OBJECT_BUCKET,
    Key,
  };

  const response = await s3Client.getObject(params).promise();
  return response.Body;
};
