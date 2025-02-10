let layoutProducts = document.querySelector(".layout__products");
let cart = [];
//////////
const setProducts = (data) =>
  data.forEach((product) => {
    layoutProducts.innerHTML += `
          <article class="product">
              <div class="product__img-container">
                  <img class="product__img" src="${product?.image}"/>
              </div>

              <div class="product__title">${product?.title}</div>

              <div class="product__price">${product?.price}$</div>

              <button class="product__btn" data-id="${product?.id}" >Add</button>

          </article>
      `;
  });
////////
const checkQuantity = (id) => {
  let exist = cart.findIndex((cartProduct) => cartProduct?.id === id);
  if (exist != undefined) {
    return cart[exist];
  } else {
    return null;
  }
};
////////
const checkStore = (products, id) => {
  return products.find((product) => product?.id === id);
};
////////
const addToCart = (id) => {
  let cartProduct = checkQuantity(id);
  let product = checkStore(id);
  if (cartProduct === null) {
    cart.push({
      id: product?.id,
      quantity: 1,
    });
  } else {
    cartProduct.quantity++;
  }
};
////////
const handleCart = (products) => {
  let addBtn = document.querySelectorAll(".product__btn");

  addBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      let productId = +btn.getAttribute("data-id");
      const product = checkStore(products, productId);
      if (product?.rating?.count > 0) {
        //add prduct to cart
        addToCart(productId);
      }
    });
  });
};
///////
const setBlock = async () => {
  const limit = 4;
  try {
    const res = await fetch(`https://fakestoreapi.com/products?limit=${limit}`);
    const data = await res.json();
    setProducts(data);
    handleCart(data);
  } catch (err) {
    console.error("Error fetching products:", err?.message);
    return [];
  }
};

setBlock();
