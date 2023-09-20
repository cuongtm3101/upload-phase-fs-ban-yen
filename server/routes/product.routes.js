const express = require("express");
const db = require("../utils/db");
const {
  filterByCategory,
  pagination,
} = require("../middlewares/product.middlewares");

//
const router = express.Router();

router.get("/", filterByCategory, pagination, async (req, res) => {
  try {
    let result = await db.execute(
      "SELECT p.*, c.description from product AS p INNER JOIN category AS c ON c.category_id = p.category_id"
    );
    let [rows] = result;
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

router.get("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let result = await db.execute(
      `SELECT p.*, m.source, c.description 
      FROM product as p INNER JOIN media as m
      ON p.product_id = m.product_id
      INNER JOIN category as c
      ON c.category_id = p.category_id 
      WHERE p.product_id = ?`,
      [id]
    );
    let [rows] = result;

    if (rows.length === 0) {
      let result2 = await db.execute(
        `SELECT p.*, c.description
        FROM product as p
        INNER JOIN category as c
        ON c.category_id = p.category_id 
        WHERE p.product_id = ?`,
        [id]
      );
      let [rows2] = result2;
      res.status(200).json(rows2[0]);
    } else {
      let sources = [];

      let product = rows.reduce((pre, cur) => {
        sources.push(cur.source);
        return { ...cur, sources: [...sources] };
      }, {});
      //
      delete product.source;
      //
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

router.patch("/:id", async (req, res) => {
  let { id } = req.params;
  let { name, price, stock, sale, category_id } = req.body;
  console.log(id, name, price, stock, sale, category_id);
  try {
    let result = await db.execute(
      "UPDATE product SET name = ?, price = ?, number = ?, sale = ?, category_id = ? WHERE product_id = ?",
      [name, price, stock, sale, category_id, id]
    );
    res.status(200).json({
      status: "Success",
      message: "Update product successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
