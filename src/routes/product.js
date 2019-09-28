require("module-alias/register");
const express = require("express");
const router = express.Router();

const { response, passport } = require("@helpers");
const { products: Product, categories: Categori } = require("@models");

/**
 * endpoint get product
 *
 */

router.get("/product", passport.authenticate("jwt"), async (req, res) => {
  const product = await Product.findAll();
  return res.status(200).json(response(true, product));
});

/**
 * endpoint create product
 *
 */
router.post("/post-product", passport.authenticate("jwt"), async (req, res) => {
  const { nama, code, categori_id } = req.body;
  const payload = Object.assign(
    {},
    {
      nama,
      code,
      categori_id
    }
  );
  const product = await Product.create(payload);
  return res.status(400).json(response(true, "Create product", product));
});

/**
 * endpoint  update product
 *
 */

router.put(
  "/put-product/:id",
  passport.authenticate("jwt"),
  async (req, res) => {
    const id = req.params.id;
    const { nama, code } = req.body;
    const product = await Product.findOne({ where: { id },
      include : [ { model : Categori, attributes: ['id'] }]
    });
    if (!product) {
      return res.status(400).json(response(false, "product empty"));
    } else {
      const payload = Object.assign(
        {},
        {
          nama,
          code,
          categori_id
        }
      );
      const product = await Product.update(payload, { where: { id: id } });
      return res
        .status(200)
        .json(response(false, "Product successfully udpate", product));
    }
  }
);

/**
 * endpoint  delete product
 *
 */

router.delete(
  "/del-product/:id",
  passport.authenticate("jwt"),
  async (req, res) => {
    const id = req.params.id;
    const product = await Product.destroy({ where: { id: id } });
    return res
      .status(200)
      .json(response(true, "Successfully delete product", product));
  }
);

module.exports = router;
