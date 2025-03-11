// localStorge.setItem(key, value); // Ajout
// const ... localStorage.getItem('...'); // Afficher
// localStorage.removeItem('...'); // Supression
// const user = {nom: "Dupont", prenom: "Jacks"}; // 1. Stocker
// localStorage.setItem("user", JSON.stringify(user)); // 2. Sérialisation
// const monObjet = localStorage.getItem("user"); // 3. Désérialiser
// const monObjetParse = JSON.parse(monObjet); // 3. Désérialiser
// const{om, prenom} = monObjetParse; // 4. Détructuration
// console.log(nom, prenom); // Affichage dans ma console
async function init(){
   const products = await getDatas();
   displayProducts(products)
};
init();
async function getDatas(){
   try{
      const req = await fetch('http://localhost:3000/api/products/');
      return await req.json();
   }catch(error){
      console.error(error);
   };
}
function displayProducts(products){
   products.forEach((el) => {
      const{ 
         _id,
         shorttitle,
         titre,
         image,
      } = el;
      const displayPuoductsSection = document.querySelector('.products')
      displayPuoductsSection.insertAdjacentHTML('beforeend',`
      <article>
         <img src="${image}" alt="${titre}">
         <a href="product.html?id=${_id}">Buy ${shorttitle}</a>
      </article>`);
   })
};
