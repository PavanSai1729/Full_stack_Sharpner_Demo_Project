const Item = require("../models/stationaryModel");

exports.postRequest = async(req, res, next) => {

    try{
        const itemName = req.body.itemName;
        const description = req.body.description;
        const price = req.body.price;
        const quantity = req.body.quantity;

        const data = await Item.create({itemName: itemName, description: description, price: price, quantity: quantity});
        res.status(201).json({newItem: data});
    }
    catch(error){
        console.log("post request in database is failed", JSON.stringify(error));
        res.status(500).json({error: error});
    }

}

exports.getRequest = async(req, res, next) =>{
    try{
        const items = await Item.findAll();
        res.status(200).json({allItems: items});

    }
    catch(error){

        console.log("get orders from database failed", JSON.stringify(error));
        res.status(500).json({error: error});

    }
}

exports.putRequest = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log("put req from node js data:", req.body);
        const { itemName, description, price, quantity } = req.body;
        
        // Find the item by ID and update its properties
        const updatedItem = await Item.update(
            { itemName, description, price, quantity },
            { where: { id }, returning: true }
        );
        
        res.status(200).json({ updatedItem });
    } catch (error) {
        console.log("Update request to the database failed", JSON.stringify(error));
        res.status(500).json({ error: error.message });
    }
}