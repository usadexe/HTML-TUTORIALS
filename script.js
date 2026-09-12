let cart = [];


/* ADD ITEM */

function addToCart(name, price) {

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    updateCart();

    openCart();
}


/* UPDATE CART */

function updateCart() {

    const cartItems = document.getElementById("cart-items");

    const cartCount = document.getElementById("cart-count");

    const cartTotal = document.getElementById("cart-total");


    if (cart.length === 0) {

        cartItems.innerHTML =
            `<p class="empty-cart">Your cart is empty.</p>`;

        cartCount.innerText = "0";

        cartTotal.innerText = "0";

        return;
    }


    let total = 0;

    let itemCount = 0;

    cartItems.innerHTML = "";


    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        itemCount += item.quantity;


        cartItems.innerHTML += `

            <div class="cart-item">

                <div class="cart-item-info">

                    <strong>${item.name}</strong>

                    <span>
                        ₹${item.price} × ${item.quantity}
                    </span>

                </div>


                <div class="quantity">

                    <button onclick="decreaseItem(${index})">
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="increaseItem(${index})">
                        +
                    </button>

                </div>

            </div>

        `;

    });


    cartCount.innerText = itemCount;

    cartTotal.innerText = total;

}


/* INCREASE */

function increaseItem(index) {

    cart[index].quantity++;

    updateCart();

}


/* DECREASE */

function decreaseItem(index) {

    cart[index].quantity--;

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }

    updateCart();

}


/* OPEN CART */

function openCart() {

    document
        .getElementById("cart-overlay")
        .classList
        .add("active");

}


/* CLOSE CART */

function closeCart() {

    document
        .getElementById("cart-overlay")
        .classList
        .remove("active");

}


/* WHATSAPP ORDER */

function orderOnWhatsApp() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }


    let message = "Hello! I would like to place an order:%0A%0A";

    let total = 0;


    cart.forEach(item => {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;

        message +=
            `${item.name} × ${item.quantity} - ₹${itemTotal}%0A`;

    });


    message += `%0ATotal: ₹${total}`;

    message += `%0A%0AThank you!`;


    /*
       CHANGE THIS NUMBER
       TO THE CAFE'S WHATSAPP NUMBER
    */

    const phoneNumber = "919876543210";


    const whatsappURL =
        `https://wa.me/${phoneNumber}?text=${message}`;


    window.open(whatsappURL, "_blank");

}