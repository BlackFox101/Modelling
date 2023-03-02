const express = require("express");
const router = express.Router();
const ShortLink = require("../models/short-link");
const crypto = require("crypto");

// GET all
router.get("/", async (req, res) => {
    ShortLink.find({}, function (err, users) {
        const userMap = {};

        users.forEach(function (user) {
            userMap[user._id] = user;
        });

        res.send(userMap);
    });
});

// GET by id
router.get("/:id", async (req, res) => {
    const shortLink = await ShortLink.findOne({_id: req.params.id});
    return res.send(shortLink);
});

// POST create
router.post("/", async (req, res) => {
    const body = req.body;
    const link = body.link;

    let shortLink = await ShortLink.findOne({link: link});
    if (shortLink) {
        return res.send({shortLink});
    }

    const hash = crypto.createHash('md5').update(link).digest('hex').slice(0, 8);
    shortLink = new ShortLink({
        link: link,
        shortLink: hash.toUpperCase(),
        name: body.name,
        authorName: body.authorName,
        deletedAt: null,
        createdAt: new Date()
    });

    await shortLink.save();
    return res.send(shortLink);
});

// DELETE by id
router.delete("/:id", async (req, res) => {
    const shortLink = await ShortLink.deleteOne({_id: req.params.id});
    return res.send(shortLink.link);
});

module.exports = router;
