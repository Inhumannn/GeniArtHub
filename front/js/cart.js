const cart = JSON.parse(localStorage.getItem("cart")) || [];
let datas = [];
async function init() {
  datas = await getDatas();
  populateData();
  updateTotal();
  listenQuantity();
  listenDelete();
  //   console.log(datas);
}
init();

async function getDatas() {
  const req = await fetch("http://localhost:3000/api/products");
  return await req.json();
}

function populateData() {
  // Browse the localstorage
  cart.forEach((el) => {
    // Get corresponding artwork in datas
    const product = datas.find((product) => product._id === el.id);
    const { image, titre, declinaisons } = product;
    const { taille, quantity, id, index } = el;
    const article = `<article class="article">
                        <img src="${image}" alt="${titre}">
                        <h3>${titre}</h3>
                        <p>Format : ${taille}</p>
                        <p class="price">${declinaisons[index].prix}€</p>
                        <div>
                           <p>Quantité : </p>
                           <input type="number" value="${quantity}" data-id="${id}" data-format="${taille}" min="1">
                           <a href="#">Supprimer</a>
                        </div>
                     </article>`;
    // Add article to the dom
    document.querySelector("#panier").insertAdjacentHTML("beforeend", article);
  });
}

// Function for updating total quantity and price
function updateTotal() {
  const totalArticle = document.querySelector("#totalarticle");
  const totalSum = document.querySelector("#montanttotal");

  let totalArticles = 0;
  let totalAmount = 0;

  // We do calculating number of articles and quantity, for that we have to do :
  // Get each product from dom
  // Get unit price and quantity
  const price = document.querySelectorAll(".price");
  price.forEach((el) => {
    const quantity = el.parentNode.querySelector("input").value;
    const unitPrice = parseFloat(el.textContent);
    totalArticles += parseInt(quantity);
    totalAmount += unitPrice * quantity;
  });
  // update dom
  totalArticle.innerText = totalArticles;
  totalSum.innerText = totalAmount.toFixed(2);
}

// Function to listen quantity change
function listenQuantity() {
  // Get all articles input
  const inputs = document.querySelectorAll(".article input");
  inputs.forEach((el) => {
    el.addEventListener("change", () => {
      const { id, format } = el.dataset;
      const quantity = el.value;

      // Get index of the product in the cart
      const index = cart.findIndex(
        (el) => el.id === id && el.taille === format
      );

      // We check quantity : old quantity + new quantity !> 100
      if (parseInt(cart[index].quantity) + parseInt(quantity) > 100) {
        showInfos("La quantité doit être de 100 maximum", "Erreur de quantité");
        el.value = cart[index].quantity;
        return;
      }

      // Check quantity > 0
      if (parseInt(quantity) < 1) {
        showInfos("La quantité doit être d'au moins 1.", "Erreur de quantité");
        el.value = cart[index].quantity;
        return;
      }

      // If we reach this point, we can modify the cart
      cart[index].quantity = quantity;

      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      // Update total on the dom
      updateTotal();
    });
  });
}

// Function to listen delete button
function listenDelete() {
  const deleteButtons = document.querySelectorAll(".article a");
  deleteButtons.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const article = e.target.closest(".article");
      const id = article.querySelector("input").dataset.id;
      const format = article.querySelector("input").dataset.format;

      // Search index in the cart
      const index = cart.findIndex(
        (el) => el.id === id && el.taille === format
      );

      // Delete element from cart
      cart.splice(index, 1);

      // Update localstorage
      localStorage.setItem("cart", JSON.stringify(cart));

      // Remove from the dom
      article.remove();

      // Update total
      updateTotal();
    });
  });
}
