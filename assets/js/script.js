const products = [
  { ID: 0, 'SKU': "JB-30811", Name: 'Coconut Hair Shampoo', Src: './assets/images/products/shampoo-bg.png', Desc: 'Suitable for all hair type&apos;s. Achieve best results with our coconut hair conditioner', Price: 45 },
  { ID: 1, 'SKU': "JB-30812", Name: 'Coconut Hair Conditioner', Src: './assets/images/products/conditioner-bg.png', Desc: 'Suitable for all hair type&apos;s. Achieve best results with our coconut hair shampoo', Price: 75 },
  { ID: 2, 'SKU': "JB-30813", Name: 'Disposable Pedicure Set', Src: './assets/images/products/pedi-bg.png', Desc: 'Useful &amp; compact. Made with durable sponge', Price: 75 },
  { ID: 3, 'SKU': "JB-30814", Name: 'Disposable Spa Cover', Src: './assets/images/products/spa-bg.png', Desc: 'Expands to fit small to large spa&apos;s', Price: 99 },
  { ID: 4, 'SKU': "JB-30815", Name: 'Disposable Slippers', Src: './assets/images/products/slippers-bg.png', Desc: 'Comfortable Inner Sole. Expands to fit most feet', Price: 99 },
]

window.addEventListener('scroll', () => {
  let main = document.querySelector('main')
  let header = document.querySelector('header')
  if (main.getBoundingClientRect().top < 40) {
    header.classList.add('nav-active')
  } else {
    header.classList.remove('nav-active')
  }
})
const productsHtml = document.querySelector('.products')
function addProductHTML(id, name, img, desc, price) {
  const html = `<div class="product" id=${id}>
                        <img src="${img}" class="product-image" alt="product-image">
                        <div class="product-body">
                            <span class="product-name">${name}</span>
                            <br>
                            <hr>
                            <span class="product-desc">${desc}</span>
                            <br>
                            <span class="product-amount">
                            <button class="input-down" aria-label="input down" id="changer">- </button>
                            <input type="number" aria-label="input amount" class="input-amount" min="1" value="1"
                            name="item-amount" disabled>
                            <button class="input-up" aria-label="input up" id="changer"> + </button>
                            </span>
                            $<span class="product-price">${price}</span>
                           
                        </div>
                        <button class="add-cart-btn">Add to &#128722;</button>
                      </div>`
  return html
}

productsHtml ? products.forEach(product => productsHtml.innerHTML += addProductHTML(product.ID, product.Name, product.Src, product.Desc, product.Price)) : -1

const inputUP = document.querySelectorAll(".input-up")
for (let i = 0; i < inputUP.length; i++) { let incrementUP = inputUP[i]; incrementUP.addEventListener("click", increaseItem) }
const inputDOWN = document.querySelectorAll(".input-down")
for (let i = 0; i < inputDOWN.length; i++) { let incrementDOWN = inputDOWN[i]; incrementDOWN.addEventListener("click", decreaseItem) }

function increaseItem(event) {
  let target = event.target
  let parentElement = target.parentElement.parentElement
  parentElement.querySelector(".input-amount").value++
}
function decreaseItem(event) {
  let target = event.target
  let parentElement = target.parentElement.parentElement
  let parentElementValue = parentElement.querySelector(".input-amount").value
  if (parentElementValue > 1) { parentElementValue-- } else { return }
  parentElement.querySelector(".input-amount").value--
}

let slideIndex = 0;
carousel();
function carousel() {
  let i;
  let x = document.getElementsByClassName("slide-img");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > x.length) slideIndex = 1
  x[slideIndex - 1].style.display = "block";
  setTimeout(carousel, 3500);
}

let totalCartItems = 0
const cartTotal = document.getElementById("cart-total")
function upDateCartIcon() {
  cartTotal ? cartTotal.textContent = totalCartItems :-1
}

const contactForm = document.querySelector('.contact-form')
contactForm ? 
contactForm.addEventListener('submit', function (ev) {
  ev.preventDefault()
  let target = ev.target
  const payLoad = {
    userName: target.querySelector('.user-name').value,
    userEmail: target.querySelector('.user-email').value,
  }
  alert(`Thanks, ${payLoad.userName}!`)
}) : -1

const cartInLocal = JSON.parse(localStorage.getItem('cart-items'))
if (cartInLocal === null) localStorage.setItem('cart-items', '[]')
console.log(cartInLocal)

function AddToCart(id, name, src, desc, quantity, price) {
  const itemObj = {
    id: id,
    name: name,
    src: src,
    desc: desc,
    quantity: quantity,
    price: price
  }
  cartInLocal.push(itemObj)
  upDateCartIcon()
  localStorage.setItem("cart-items", JSON.stringify(cartInLocal))
}
const addCartBtn = document.querySelectorAll('.add-cart-btn')
addCartBtn.forEach(btn => {
  btn.addEventListener('click', function (event) {
    const parent = event.target.parentElement
    AddToCart(parent.id, parent.querySelectorAll('div span')[0].textContent, parent.querySelector('img').src, parent.querySelectorAll('div span')[1].textContent, parseInt(parent.querySelector('.input-amount').value), parseInt(parent.querySelectorAll('div span')[3].textContent))
    upDateCartHtml()
  })
})

const cartItems = document.querySelector('.cart-items')
const cartTotalPriceHTML = document.querySelector('.cart-total-price')
function upDateCartHtml() {
  let totalCartPrice = 0
  if (cartInLocal === null || (!typeof localStorage.cart) === "string" || cartInLocal.length === 0) {
    cartTotal ? cartTotal.textContent = 0 : -1
    cartTotalPriceHTML ? cartTotalPriceHTML.textContent = totalCartPrice : -1
    cartItems ? cartItems.textContent = ("Your Cart Is Empty").toUpperCase() : -1
  } else {
    cartItems ? cartItems.innerHTML = "" : -1
    totalCartItems = 0
    totalCartPrice = 0
    cartInLocal.forEach((item, index) => {
      totalCartItems++
      upDateCartIcon()
      totalCartPrice += item.quantity * item.price
      let itemHTML = `<div class="cart-item" id=${item.id}>
                          <div class="cart-image-price">
                              <img class="cart-image" alt="cart image" src=${item.src}>
                          </div>
                          <div class="cart-body">
                              <div class="cart-name">${item.name}</div>
                              <div class="cart-desc">${item.desc ? item.desc : "Monthly Special Item"}</div>
                              <div class="cart-price">
                                      ${item.quantity} <span>${item.quantity > 1 ? "items" : "item"} @ $${item.price}</span>
                                  <div class="cart-item-total">
                                      Total $<span class="cart-item-total-amount">${(item.quantity * item.price).toFixed(2)}</span>
                                  </div>
                              </div>
                              <button aria-label="remove from cart" class="remove-cart-btn" onClick="RemoveFromCart(${index})"> Remove <span style="color: white; filter: drop-shadow(0px 0px 0.5px white) drop-shadow(0px 0px 0.5px white);">&#128722;</span></button>
                          </div>
                      </div>`
      cartItems ? cartItems.innerHTML += itemHTML : -1
    })
    cartTotalPriceHTML ? cartTotalPriceHTML.textContent = totalCartPrice : -1
  }
}
upDateCartHtml()

function RemoveFromCart(id) {
  cartInLocal.splice(id, 1)
  localStorage.setItem("cart-items", JSON.stringify(cartInLocal))
  upDateCartHtml()
}

function initPayload() {
  const cartItems = localStorage.getItem('cart-items')
  fetch("/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ cartItems }),
  })
    .then(async res => {
      if (res.ok) return res.json()
      const json = await res.json()
      return await Promise.reject(json)
    })
    .then(({ assets }) => {
      localStorage.setItem("OrderID", JSON.stringify(assets.orderNum))
      console.log(localStorage.getItem('OrderID'))
      window.location = assets.url
    })
    .catch(e => {
      console.log(e)
    })
}
const checkoutBTN = document.querySelector(".checkout-btn")
checkoutBTN ? checkoutBTN.addEventListener('click', function (e) {
  e.preventDefault()
  parseInt(cartTotalPriceHTML.textContent) < 1 ?
    alert("No products in cart.")
    :
    // initPayload()
    alert("{ EmTechProcess : Secure Stripe portal will now open }")
}) : -1