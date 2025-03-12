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
      document.querySelector('.declinaison').textContent = declinaisons;
};