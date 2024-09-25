let list = document.querySelector('.list')
let productList = document.querySelector('.productList')
let cartItems = document.querySelector('.cartItems')

function productCard (){
    fetch("data.json")
    .then(data=>data.json())
    .then((data)=>{
        data.forEach((value) => {
            let cardDiv = document.createElement('div')
            cardDiv.classList.add('item')
            cardDiv.innerHTML = `
            <img class="desktop" src = "${value.image.desktop}"/>
            `

        });
            list.appendChild(cardDiv)      
    }).catch((err)=>{
        console.log("an error occured");
        
    })
}

productCard()