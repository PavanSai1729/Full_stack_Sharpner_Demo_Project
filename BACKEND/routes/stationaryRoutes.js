const express = require("express");
const router = express.Router();

const stationaryControl = require("../controllers/stationaryControl");


router.post("/add-item", stationaryControl.postRequest);



router.get("/get-item", stationaryControl.getRequest);




router.put(`/put-item/:id`, stationaryControl.putRequest);


module.exports = router;