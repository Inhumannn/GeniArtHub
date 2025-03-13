let products
async function init(){
   product = await getDatas();
   displayProducts(product)  
};
init();

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
      const select = document.querySelector('#format');
      declinaisons.forEach((el) =>{
         select.insertAdjacentHTML('beforeend', `
            <option data-price="${el.prix}" value="${el.taille}">${el.taille}</option>
            `);
         });
      const firstOption = select.options[select.selectedIndex]; 
      document.querySelector('.showprice').textContent = `${firstOption.dataset.price}€`;
      select.addEventListener('change', function(el){
         const option = el.target.options[el.target.selectedIndex];
         document.querySelector('.showprice').textContent = `${option.dataset.price}€`;
      });
};
const btn_buy = document.querySelector('.button-buy');
btn_buy.addEventListener('click', (e) => {
   e.preventDefault();
   const formatSelectionne = document.querySelector('#format').value;
   const quantiteSelectionnee = document.querySelector('#quantity').value || 1;
   const {_id, image, shorttitle} = product;
   const cart2 = [{_id, image, shorttitle, format:formatSelectionne, quantite:quantiteSelectionnee}];
   let cart = JSON.parse(localStorage.getItem("cart"))
   // Faire un find(index) sur mon cart (localStorage)
   cart.find()
   if(cart){
      cart.push(cart2);
   }else{
      cart = [cart2];
   };
   localStorage.setItem("cart", JSON.stringify(cart));
   const monObjet = localStorage.getItem('cart');
   const monobjetParse = JSON.parse(monObjet);
   console.log(monobjetParse);
});
// Reste à faire : 
   // Utiliser le localStorage
   // Ensuite faire ma page cart