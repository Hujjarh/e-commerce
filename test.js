let list = document.querySelector('.list');
let cartButton = document.querySelector('#myButton');
// let displayCart = document.querySelector('.cart');
let cartItems = document.querySelector('.cartItems'); 
let cartNum = document.querySelector('#cartNum') 
let removeItem = document.querySelector('.removeItem')
let cart = []

cartCount = 0;
// let product = [];

// Fetch and create product cards
function productCard() {
    fetch("data.json")
        .then(response => response.json())
        .then((data) => {
            data.forEach((value) => {
                let cardDiv = document.createElement('div');
                cardDiv.classList.add('item');

            
                cardDiv.innerHTML = `
                    <img class="desktop" src="${value.image.desktop}" alt="a dessert image" width="320px" />
                    <img class="mobile" src="${value.image.mobile}" alt="a dessert image" width="320px" />
                    <button class="add-to-cart"> <img src = "./assets/images/icon-add-to-cart.svg" width = "20" /> ${cartButton.textContent}</button>
                    <div class="category">${value.category}</div>
                    <div class="name">${value.name}</div>
                    <div class="price">$${value.price.toPrecision(3)}</div>
                `;


                // Event listener for add-to-cart button
                const button = cardDiv.querySelector('.add-to-cart');
                // let quantityElement = document.createElement('div')
                let quantity = 1
                button.addEventListener('click', () => {
                    quantity++
                    // quantityElement = quantity
                    addToCart(value.name, value.price.toPrecision(3));
                    increaseCartNum();
                });

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

function increaseCartNum(){
    cartCount++;
    cartNum.textContent = `(${cartCount})`
    // cartNum.appendChild(cartNum)
}

function addToCart(productName, productPrice) {
    let existingProduct = cart.find((item =>item.name === productName))
    
    if(existingProduct){
       existingProduct.quantity +=1
    }
    else{
        cart.push({name: productName, price:productPrice, quantity:1})
    }

    displayCart();
    
    
}


function displayCart(){
    // cartItems = document.querySelector('.cartItems')
    let itemTotal = document.createElement('div')

    cartItems.innerHTML = ''
        
    cart.forEach(product =>{
    let cartItemDiv = document.createElement('div')
    cartItemDiv.innerHTML += `${product.name}<br>`
    cartItemDiv.innerHTML += ` ${product.quantity}x &nbsp;&nbsp;&nbsp; @ $${product.price} &nbsp;&nbsp; $${product.price * product.quantity} &nbsp;&nbsp; <span class="removeItem"> <img src ="assets/images/icon-remove-item.svg" /></span><hr> `;
    // cartItemDiv.innerHTML +=`<span class="removeButton"> <img src ="assets/images/icon-remove-item.svg" /></span>`
    cartItemDiv.style.marginBlock = '20px'
    cartItemDiv.style.paddingInline = '20px'

    let orderTotal = addTotal(product.price)
    cartItems.appendChild(cartItemDiv)      
    })
    
}


function addTotal(productPrices){
    let total = document.createElement('div')
    let itemTotal = 0
    total.innerHTML =`
        ${itemTotal += productPrices}
    `
}
// remove cartItem from the cart


// Call the function to display products
productCard();
