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
