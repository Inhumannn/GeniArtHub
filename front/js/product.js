const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
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
  const select = document.querySelector("select");
  declinaisons.forEach((declinaison, index) => {
    const { taille } = declinaison;
    const option = `<option data-index="${index}" value="${taille}">Format : ${taille}</option>`;
    select.insertAdjacentHTML("beforeend", option);
  });
  select.addEventListener("change", () => {
    const index = select.options[select.selectedIndex].dataset.index;
    document.querySelector(
      ".showprice"
    ).textContent = `${declinaisons[index].prix}€`;
  });
}
const button = document.querySelector(".button-buy");
button.addEventListener("click", (e) => {
  e.preventDefault()
  const quantityInput = document.querySelector("#quantity");
  const formatInput = document.querySelector("#format");
  const quantity = parseInt(quantityInput.value);
  const format = formatInput.value;
  if(quantity < 1){
    showInfos("Vous devez commander au moins une oeuvre");
    return;
  }
  if(quantity > 100){
    showInfos("Vous ne pouvez pas commander plus de 100 oeuvres");
    return;
  };
  const caractereInterdits =  /[a-zA-Z]/;
  if(caractereInterdits.test(quantity)){
   showInfos("Veuillez entrer uniquement des chiffres")
   return
  };
   const cart = JSON.parse(localStorage.getItem('cart')) || []
   const existingProductIndex = cart.findIndex(el => el.id === id && el.taille === format)
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
   };
   const currentQuantity = cart[existingProductIndex].quantity
   const newQuantity = currentQuantity + quantity
   if(newQuantity > 100){
      showInfos("Vous ne pouvez pas commander plus de 100 oeuvres", "Erreur")
      return
   };
   cart[existingProductIndex].quantity = newQuantity
   localStorage.setItem("cart", JSON.stringify(cart))
   showInfos("L'oeuvre a été ajoutée au panier", "Ajout au panier")

});
function showInfos(message, title = "") {
  const modal = document.createElement("dialog");
  modal.appendChild(document.createTextNode(message));
  document.body.appendChild(modal);
  if (title) {
    const h1 = document.createElement("h1");
    h1.textContent = title;
    modal.insertBefore(h1, modal.firstChild);
  }
  modal.showModal();
  setTimeout(() => {
    modal.close();
    modal.remove();
  }, 3000);
}