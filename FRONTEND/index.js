//get element 

window.addEventListener("DOMContentLoaded", (event)=> {
    axios.get("http://localhost:7000/get-item")
        .then((response)=> {
            console.log(response.data);
            for(var i=0; i<response.data.allItems.length; i++){
                showOnScreen(response.data.allItems[i]);
            }
        })
        .catch((error) => {
            console.log("get request error from axios", error);
        })
});


const form = document.getElementById("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const itemName = document.getElementById("itemName").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const quantity = document.getElementById("quantity").value;

    const Obj = {
        itemName,
        description,
        price,
        quantity
    }

//post request

    axios.post("http://localhost:7000/add-item", Obj)
        .then((response)=> {
            console.log(response.data);
            showOnScreen(response.data.newItem);
        })
        .catch((error) => {
            console.log("post request error from axios", error);
        })


});

function showOnScreen(product){
    const newElement = document.createElement("li");
    const pElement = document.getElementById("ul");
    newElement.textContent = `${product.itemName} - ${product.description} - ${product.price} - ${product.quantity}`;

    const buy1 = document.createElement("button");
    buy1.textContent = "Buy1";
    newElement.appendChild(buy1);

    buy1.addEventListener("click", () => handleBuy(product, newElement, 1, buy1, buy2, buy3));

    const buy2 = document.createElement("button");
    buy2.textContent = "Buy2";
    newElement.appendChild(buy2);

    buy2.addEventListener("click", () => handleBuy(product, newElement, 2, buy1, buy2, buy3));

    const buy3 = document.createElement("button");
    buy3.textContent = "Buy3";
    newElement.appendChild(buy3);

    buy3.addEventListener("click", () => handleBuy(product, newElement, 3, buy1, buy2, buy3));

    pElement.appendChild(newElement);
}



function handleBuy(product, newElement, buyAmount, buy1, buy2, buy3) {
    const newQuantity = product.quantity - buyAmount;

    if (newQuantity >= 0) {
        const updatedProduct = {
            itemName: product.itemName,
            description: product.description,
            price: product.price,
            quantity: newQuantity
        };

        axios.put(`http://localhost:7000/put-item/${product.id}`, updatedProduct)
            .then((response) => {
                console.log(`Product updated successfully: ${buyAmount}`, response.data);

                // Update the global product quantity
                product.quantity = newQuantity;

                // Update the UI
                newElement.textContent = `${updatedProduct.itemName} - ${updatedProduct.description} - ${updatedProduct.price} - ${updatedProduct.quantity}`;
                newElement.appendChild(buy1);
                newElement.appendChild(buy2);
                newElement.appendChild(buy3);
            })
            .catch((error) => {
                console.log(`put request error from axios buy${buyAmount}`, error);
            });
    }
}

