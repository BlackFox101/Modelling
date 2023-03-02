const express = require("express");
const router = express.Router();
const routes = require('./routes');
const ShortLink = require("../models/short-link");

router.get("/:hash", async (req, res) => {
    const shortLink = await ShortLink.findOne({shortLink: req.params.hash});
    res.redirect(shortLink.link);
})

router.use("/api/links", routes);

module.exports = router;
