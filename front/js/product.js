async function init(){
   const products = await getDatas();
   console.log("Valeur id :",products)
   displayProducts(products)  
};
init();
let products = []
async function getDatas(){
   try{
      const params = new URL(document.location).searchParams;
      const id = params.get("id")   
      const req = await fetch(`http://localhost:3000/api/products/${id}`);
      return await req.json();
   }catch(error){
      console.error(error);
      return null;
   };
};
function displayProducts(products){
      const{
         titre,
         description,
         image,
         declinaisons
      } = products;
      const descriptionCourte = description.split("\n")[0];
      const descriptionBr = description.split("\n").join("<br>");
      document.querySelector('#titre').textContent = titre;
      document.querySelector('#description1').textContent = descriptionCourte;
      document.querySelector('#description2').innerHTML = descriptionBr;
      document.querySelector('#image').src = image;
      // Ligne 24 html
      declinaisons.forEach((el) =>{
         const select = document.querySelector('#format');
         select.insertAdjacentHTML('beforeend', `
            <option value="">${el.taille}</option>
            `);
            // Faire un if
         document.querySelector('.showprice').textContent = el.prix;
      });
};
// localStorge.setItem(key, value); // Ajout
// const ... localStorage.getItem('...'); // Afficher
// localStorage.removeItem('...'); // Supression
// const user = {nom: "Dupont", prenom: "Jacks"}; // 1. Stocker
// localStorage.setItem("user", JSON.stringify(user)); // 2. Sérialisation
// const monObjet = localStorage.getItem("user"); // 3. Désérialiser
// const monObjetParse = JSON.parse(monObjet); // 3. Désérialiser
// const{om, prenom} = monObjetParse; // 4. Détructuration
// console.log(nom, prenom); // Affichage dans ma console
const btn_buy = document.querySelector('.button-buy');
btn_buy.addEventListener('click', (e) => {
   e.preventDefault().
   console.log('blabal')
});


// Reste à faire : 
   //  Afficher le prix selon le format
   // Utiliser le localStorage
   // Ensuite faire ma page cart