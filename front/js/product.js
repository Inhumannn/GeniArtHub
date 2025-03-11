async function init(){
   const products = await getDatas();
   // displayProducts(products)
   console.log(products)
};
init();
async function getDatas(){
   try{
      const params = new URL(document.location).searchParams;
      const id = params.get("id")
      console.log(id);
      const req = await fetch(params);
      return await req.json();
   }catch(error){
      console.error(error);
   };
}
// function displayProducts(products){
//    products.forEach((el) =>{
//       const{
//          _id,
//          titre,
//          description,
//          image,
//          declinaisons
//       } = el;
//       document.querySelector('#titre').textContent = titre;
//       document.querySelector('#description').textContent = description;
//       document.querySelector('#image').textContent = image;
//       document.querySelector('.declinaison').textContent = declinaisons;
//    })
// };