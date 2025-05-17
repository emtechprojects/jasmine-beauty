const products = [
  { ID: "JB-30811", Name: 'First Product', Src: './assets/images/cream.png', Desc: 'A short Product Descrition', Price: 45 },
  { ID: "JB-30812", Name: 'Second Product', Src: './assets/images/cream.png', Desc: 'A short Product Descrition', Price: 75 },
  { ID: "JB-30813", Name: 'Third Product', Src: './assets/images/cream.png', Desc: 'A short Product Descrition', Price: 75 },
  { ID: "JB-30814", Name: 'Forth Product', Src: './assets/images/cream.png', Desc: 'A short Product Descrition', Price: 99 },
  { ID: "JB-30815", Name: 'Fifth Product', Src: './assets/images/cream.png', Desc: 'A short Product Descrition', Price: 99 },
  { ID: "JB-30816", Name: 'Sixth Product', Src: './assets/images/cream.png', Desc: 'A short Product Descrition', Price: 115 },
  { ID: "JB-30817", Name: 'Seventh Product', Src: './assets/images/cream.png', Desc: 'A short Product Descrition', Price: 115 }
]
const packages = [
  { ID: "JB-30911", Name: 'Hydration Therapy Moisteriser', Src: './assets/images/pkg-1.png', Desc: 'Includes a bonus moisterising sanitizer from our range', Price: 95 },
  { ID: "JB-30912", Name: '3 Travel Moituriser Package', Src: './assets/images/pkg-2.png', Desc: 'Includes a bonus moisterising sanitizer from our range', Price: 119 },
  { ID: "JB-30913", Name: 'Hydration Therapy Moisteriser', Src: './assets/images/pkg-1.png', Desc: 'Includes a bonus moisterising sanitizer from our range', Price: 150 },
  { ID: "JB-30914", Name: '3 Travel Moituriser Package', Src: './assets/images/pkg-2.png', Desc: 'Includes a bonus moisterising sanitizer from our range', Price: 175 },
  { ID: "JB-30915", Name: 'Hydration Therapy Moisteriser', Src: './assets/images/pkg-1.png', Desc: 'Includes a bonus moisterising sanitizer from our range', Price: 250 },
  { ID: "JB-30916", Name: '3 Travel Moituriser Package', Src: './assets/images/pkg-2.png', Desc: 'Includes a bonus moisterising sanitizer from our range', Price: 250 }
]
window.addEventListener('scroll', () => {
  let main = document.querySelector('main')
  let header = document.querySelector('header')
  if (main.getBoundingClientRect().top < 411) {
    header.classList.add('nav-active')
  }
})
const productsHtml = document.querySelector('.products')
const packagesHtml = document.querySelector('.packages')
function addProductHTML(id, name, img, desc, price) {
  const html = `<div class="product" id=${id}>
                        <img src="${img}" class="product-image" alt="product-image">
                        <div class="product-body">
                            <span class="product-name">${name}</span>
                            <br>
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
function addPackageHTML(id, name, img, desc, price) {
  const html = `<div class="package" id=${id}>
                        <img src="${img}" class="package-image" alt="package-image">
                        <div class="package-body">
                          <br>
                            <span class="package-name">${name}</span>
                            <br>
                            <br>
                            <span class="package-desc">${desc}</span>
                            <br>
                            <br>
                            <span class="product-amount">
                              <button class="input-down" aria-label="input down" id="changer">- </button>
                              <input type="number" aria-label="input amount" class="input-amount" min="1" value="1"
                                  name="item-amount" disabled>
                              <button class="input-up" aria-label="input up" id="changer"> + </button>
                            </span>
                            $<span class="package-price">${price}</span>
                        </div>
                        <button class="add-cart-btn">Add to &#128722;</button>
                      </div>`
  return html
}
products.forEach(product => productsHtml.innerHTML += addProductHTML(product.ID, product.Name, product.Src, product.Desc, product.Price))
packages.forEach(package => packagesHtml.innerHTML += addPackageHTML(package.ID, package.Name, package.Src, package.Desc, package.Price))

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
  document.getElementById('about').style.animationName = 'fader'
  let i;
  let x = document.getElementsByClassName("slide-img");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > x.length) { slideIndex = 1 }
  x[slideIndex - 1].style.display = "block";
  setTimeout(carousel, 3100); // Change image every 3 seconds
}

let totalCartItems = 0
function upDateCartIcon() {
  const cartTotal = document.getElementById("cart-total")
  cartTotal.textContent = totalCartItems
}

const contactForm = document.querySelector('.contact-form')
contactForm.addEventListener('submit', function (ev) {
  ev.preventDefault()
  let target = ev.target
  const payLoad = {
    userName: target.querySelector('.user-name').value,
    userEmail: target.querySelector('.user-email').value,
    userEnquiry: target.querySelector('.user-enq').value,
  }
  console.log(payLoad)
})

const cartInLocal = JSON.parse(localStorage.getItem('cart-items'))
if (cartInLocal === null) localStorage.setItem('cart-items', '[]')
console.log(cartInLocal)

function AddToCart(id, name, src, desc, amount, price) {
  const itemObj = {
    id: id,
    name: name,
    src: src,
    desc: desc,
    amount: amount,
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
const removeCartBtn = document.querySelectorAll('.remove-cart-btn')
console.log(removeCartBtn)
removeCartBtn.forEach((btn, index) => {
  btn.addEventListener('click', function (event) {
    console.log("CLICKCLICK")
    RemoveFromCart(index)
  })
})

const cartItems = document.querySelector('.cart-items')
function upDateCartHtml() {

  if (cartItems) {
    if (cartInLocal === null || (!typeof localStorage.cart) === "string" || cartInLocal.length === 0) {
      upDateCartIcon()
      cartItems.textContent = ("Your Cart Is Empty").toUpperCase()
    } else {
      cartItems.innerHTML = ""
      totalCartItems = 0
      cartInLocal.forEach((item, index) => {
        totalCartItems++
        upDateCartIcon()
        let mealHTML = `<div class="cart-item" id=${item.id}>
                          <div class="cart-image-price">
                              <img class="cart-image" alt="cart image" src=${item.src}>
                          </div>
                          <div class="cart-body">
                              <div class="cart-name">${item.name}</div>
                              <div class="cart-desc">${item.desc ? item.desc : "Monthly Special Item"}</div>
                              <div class="cart-price">
                                      ${item.amount} <span>${item.amount > 1 ? "items" : "item"} @ $${item.price}</span>
                                  <div class="cart-item-total">
                                      Total $<span class="cart-item-total-amount">${(item.amount * item.price).toFixed(2)}</span>
                                  </div>
                              </div>
                              <button aria-label="remove from cart" class="remove-cart-btn" onClick="RemoveFromCart(${index})"> Remove <span style="color: white; filter: drop-shadow(0px 0px 0.5px white) drop-shadow(0px 0px 0.5px white);">&#128722;</span></button>
                          </div>
                      </div>`
        cartItems.innerHTML += mealHTML
      })
    }
  }
}
upDateCartHtml()
// cartInLocal.forEach(item => console.log(item))

function RemoveFromCart(id) {
  // let cartInFunction = JSON.parse(localStorage.getItem('cart-items'))
  // cartInFunction.splice(id, 1)
  // localStorage.setItem("cart-items", JSON.stringify(cartInLocal))
  cartInLocal.splice(id, 1)
  localStorage.setItem("cart-items", JSON.stringify(cartInLocal))
  console.log(cartInLocal)
  upDateCartHtml()
}
function PurchaseItems() { }
