const express = require("express");
const axios = require("axios");
const router = express.Router();

// Get Pokemon By Name
router.get('/name/:name', async (req, res) => {
    try {
        const {name} = req.params;
        const response = await axios.get(`${process.env.POKEAPI_URL}/${name}`)
        res.json(response.data)
    } catch (error) {
        res.status(404).json({
            message: "Pokemon not found!"
        })
    }
})

// Get Random Pokemon
router.get('/random', async (req, res) => {
    try {
        const ranIndex = Math.floor(Math.random() * 1025) + 1;
          const response = await axios.get(`${process.env.POKEAPI_URL}/${ranIndex}`)
        res.json(response.data)
    } catch (error) {
         res.status(404).json({
            message: "Pokemon not found!"
        })
    }
})

module.exports = router;