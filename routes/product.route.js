import express from "express";
import * as productController from "../controllers/product.controller.js";
import { upload } from "../middlewares/bucket.js";

const router = express.Router();

// add product
router.post(
  "/",
  upload.fields([{ name: "photos", maxCount: 10 }]),
  productController.insertProduct
);
// router.post("/", productController.insertProduct);

// all products
router.get("/", productController.ListProducts);

/* show */
router.get("/:itemId", productController.showProduct);

/* update */
router.put(
  "/:itemId",
  upload.fields([{ name: "photos", maxCount: 10 }]),
  productController.updateProduct
);

/* Delete Picture */
router.delete("/:picturePath", productController.deletePictureInProduct);

/* Delete */
router.delete("/:itemId", productController.deleteProduct);

// Search/filter products by categoryId
router.get(
  "/searchProductsByCategoryId/:categoryId",
  productController.searchProductsByCategoryId
);

// Search/filter products by price range
router.get(
  "/searchProductsByPriceRange/:minPrice/:maxPrice",
  productController.searchProductsByPriceRange
);

export default router;
