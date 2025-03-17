async function init() {
   const datas = await getDatas();
  //  console.log(datas)
   populateDatas(datas);
};
init();
async function getDatas() {
  try {
    const req = await fetch("http://localhost:3000/api/products/");
    return await req.json();
  } catch (error) {
    throw new Error("Erreur lors de la récupération des données");
  };
};
function populateDatas(datas){
  const cart = JSON.parse(localStorage.getItem('cart')) || []
  cart.forEach(el => {
    const cartFull = datas.find(data => {
      return data._id === el.id;
    });
    // find for seek declinaison
    const declinaison = datas.find(data => {
      return data.declinaison === el.format;
    });
    // console.log(cartFull);
    console.log(declinaison);
  });
};  


function showInfos(message, title=""){
  const mondal = document.createElement("dialog")
  mondal.appendChild(document.createTextNode(message));
  document.body.appendChild(mondal);
  if(title){
    mondal.setAttribute("Félicitation !", title);
    h1.textContent = title;
    mondal.insertBeefore(h1, mondal.firstChild)
  };
  mondal.showModal();
  setTimeout(() => {
    mondal.close();
  }, 2000);

  
  const btnBuys = document.querySelector("#btn-commande");
  btnBuys.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("click");
    if(btnBuys){
      showInfos("Votre commande a bien été prise en compte. Numero de commande : XXXXXXXXXXXX", "Félicitation !");
      return;
    };
  });
};
