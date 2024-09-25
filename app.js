let list = document.querySelector('.list')
let cartButton = document.querySelector('#myButton')
let displayCart = document.querySelector('.cart')
let cartItems = document.querySelector('.cartItems')
cartItems = []
let product = []

// function productCard(){
    
//     let card = fetch("data.json")
//     .then(data=>data.json())
//     .then((data)=>{

//         data.forEach((value)=>{

//             let cardDiv = document.createElement('div')
//             cardDiv.classList.add('item')
//             cardDiv.innerHTML = `
//             <img class = "desktop" src = "${value.image.desktop}" alt = "a dessert image" width = 320px/>
//             <img class = "tablet" src = "${value.image.tablet}" alt = "a dessert image"  width = 320px />
//             <button class ='add-to-cart'>${cartButton.textContent}</button>
//             <div class = "category"> ${value.category}</div>
//             <div class = "name"> ${value.name}</div>
//             <div class = "price"> $${value.price.toPrecision(3)}</div>
//             `
//             // document.addEventListener('click',changeText)
//             // function changeText(){
//             //     cartItems.textContent = `${value.textContent}`
//             // }

//             const button = cardDiv.querySelector('.add-to-cart');
//     button.addEventListener('click', () => {
//         changeText(value.textContent);
//     })
//             list.appendChild(cardDiv)
//         })

//         function changeText(textContent) {
//             cartItems.textContent = `hello world`;
//         }
//     })
//     .catch(err=>{

//         let errorMessage = document.createElement('div')
//         errorMessage.innerHTML = "Sorry! an error Occured"
//         list.appendChild(errorMessage)
//     })
//     }

function addToCart(productName, productPrice, button) {
    // Remove the "Add to Cart" button and replace it with quantity controls
    button.outerHTML = `
        <div class="quantity-controls">
            <button class="decrease"> <img src="./assets/images/icon-decrement-quantity.svg" width="20px"/> </button>
            <span class="quantity">1</span>
            <button class="increase"> <img src="./assets/images/icon-increment-quantity.svg" width="20px"/> </button>
        </div>
    `;

    // Set the initial quantity to 1
    let quantity = 1;

    // Update the cart with the initial product and quantity
    updateCart(productName, productPrice, quantity);

    // Select the newly created increase/decrease buttons and quantity display
    const quantityElement = button.parentNode.querySelector('.quantity');
    const increaseButton = button.parentNode.querySelector('.increase');
    const decreaseButton = button.parentNode.querySelector('.decrease');

    // Add event listeners to the increase and decrease buttons
    increaseButton.addEventListener('click', () => {
        quantity++;
        quantityElement.textContent = quantity;
        updateCart(productName, productPrice, quantity);
    });

    decreaseButton.addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            quantityElement.textContent = quantity;
            updateCart(productName, productPrice, quantity);
        }
    });
}

function productCard() {
    fetch("data.json")
        .then(response => response.json())
        .then((data) => {
            data.forEach((value) => {
                // Create product card div
                let cardDiv = document.createElement('div');
                cardDiv.classList.add('item');

                // Set innerHTML for the card
                cardDiv.innerHTML = `
                    <img class="desktop" src="${value.image.desktop}" alt="a dessert image" width="320px" />
                    <img class="tablet" src="${value.image.tablet}" alt="a dessert image" width="320px" />
                    <button class="add-to-cart">Add to Cart</button>
                    <div class="category">${value.category}</div>
                    <div class="name">${value.name}</div>
                    <div class="price">$${value.price.toPrecision(3)}</div>
                `;

                // Event listener for add-to-cart button
                const button = cardDiv.querySelector('.add-to-cart');
                button.addEventListener('click', () => {
                    addToCart(value.name, value.price, button);
                });

                // Append the card to the list
                list.appendChild(cardDiv);
            });
        })
        .catch(err => {
            // Display error message
            let errorMessage = document.createElement('div');
            errorMessage.textContent = "Sorry! An error occurred";
            list.appendChild(errorMessage);
        });
}

function updateCart(productName, productPrice, quantity) {
    // Update the cart with the product name, quantity, and total price
    const cartItem = document.querySelector(`.cartItems [data-product="${productName}"]`);

    // If the product is already in the cart, update the quantity and total price
    if (cartItem) {
        cartItem.querySelector('.cart-quantity').textContent = `Quantity: ${quantity}`;
        cartItem.querySelector('.cart-total').textContent = `Total: $${(productPrice * quantity).toPrecision(3)}`;
    } else {
        // If the product is not in the cart, add it as a new item
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.setAttribute('data-product', productName);
        cartItemDiv.innerHTML = `
            <div class="cart-product">${productName}</div>
            <div class="cart-quantity">Quantity: ${quantity}</div>
            <div class="cart-total">Total: $${(productPrice * quantity).toPrecision(3)}</div>
        `;
        cartItems.appendChild(cartItemDiv);
    }
}



productCard()