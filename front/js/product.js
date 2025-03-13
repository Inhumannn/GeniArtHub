// Retrieve id from url
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

// init function
async function init() {
  const data = await getDatas();
  populateDatas(data);
}
init();

async function getDatas() {
  try {
    const req = await fetch(`http://localhost:3000/api/products/${id}`);
    return await req.json();
  } catch (error) {
    throw new Error("Erreur lors de la récupération des données");
  }
}

function populateDatas(data) {
  const { titre, image, description, declinaisons, shorttitle } = data;
  document.title = `${titre} - GeniArtHub`;
  document.querySelector(".detailoeuvre h1").textContent = titre;
  document.querySelector(".detailoeuvre img").src = image;
  document.querySelector(
    ".detailoeuvre div p"
  ).textContent = `${description.substring(0, 200)}...`;

  document.querySelector(".showprice").textContent = `${declinaisons[0].prix}€`;

  document.querySelector(".button-buy").textContent = `Buy ${shorttitle}`;
  document.querySelector(
    "aside h2"
  ).textContent = `Description de l’oeuvre : ${titre}`;

  document
    .querySelector("aside")
    .insertAdjacentHTML(
      "afterend",
      `<p>${description.replace(/\n/g, "<br />")}</p>`
    );

  //  Populate the select element
  const select = document.querySelector("select");
  declinaisons.forEach((declinaison, index) => {
    const { taille } = declinaison;
    const option = `<option data-index="${index}" value="${taille}">Format : ${taille}</option>`;
    select.insertAdjacentHTML("beforeend", option);
  });

  // add event listener to select element
  select.addEventListener("change", () => {
    const index = select.options[select.selectedIndex].dataset.index;
    document.querySelector(
      ".showprice"
    ).textContent = `${declinaisons[index].prix}€`;
  });
}

// Click on button buy
const button = document.querySelector(".button-buy");
button.addEventListener("click", (e) => {
  e.preventDefault();

  const quantityInput = document.querySelector("#quantity");
  const formatInput = document.querySelector("#format");

  // La quantité doit être un nombre entier
  const quantity = parseInt(quantityInput.value);
  const format = formatInput.value;

  // We need at least one artwork

  if (quantity < 1) {
    showInfos("Vous devez commander au moins une oeuvre");
    return;
  }

  if(quantity > 100){
      showInfos("Vous ne pouvez pas commander plus de 100 oeuvres");
      return;
  }

  const caractereInterdits =  /[a-zA-Z]/;
  if(caractereInterdits.test(quantity)){
   showInfos("Veuillez entrer uniquement des chiffres")
   return
  }
   // We build our cart OR we get the cart if it already exists
   const cart = JSON.parse(localStorage.getItem('cart')) || []

   // We check if the artwork is already in the cart
   const existingProductIndex = cart.findIndex(el => el.id === id && el.taille === format)

   // 2 possible answers :
      // -1 : the artwork is not in the cart
      // >= 0 : the artwork is in the cart

   // Product is not in the cart
   if(existingProductIndex === -1){
      cart.push({
         id,
         taille: format,
         quantity,
         index: formatInput.options[formatInput.selectedIndex].dataset.index
      })
      showInfos("L'oeuvre a été ajoutée au panier", "Ajout au panier")
      localStorage.setItem("cart", JSON.stringify(cart))
      return
   }

   // Product is already in the cart, we check if new quantity is less than 100, and if it's good > add to cart
   const currentQuantity = cart[existingProductIndex].quantity
   const newQuantity = currentQuantity + quantity

   // If new quantity is more than 100, we show an error message
   if(newQuantity > 100){
      showInfos("Vous ne pouvez pas commander plus de 100 oeuvres", "Erreur")
      return
   }

   // Update the quantity of the product in the cart
   cart[existingProductIndex].quantity = newQuantity
   localStorage.setItem("cart", JSON.stringify(cart))
   showInfos("L'oeuvre a été ajoutée au panier", "Ajout au panier")

});

function showInfos(message, title = "") {
  const modal = document.createElement("dialog");

  // Add content to the modal
  modal.appendChild(document.createTextNode(message));
  document.body.appendChild(modal);

  // If there is title, add it to the modal
  if (title) {
    const h1 = document.createElement("h1");
    h1.textContent = title;
    modal.insertBefore(h1, modal.firstChild);
  }

  // Open the modal
  modal.showModal();

  // Close the modal after 3 seconds
  setTimeout(() => {
    modal.close();
    // Remove the modal from the DOM
    modal.remove();
  }, 3000);
}