async function init() {
  const datas = await getDatas();
  populateDatas(datas);
}
init();

/**
 * @returns {Promise<Array>}
 */
async function getDatas() {
  try {
    const req = await fetch("http://localhost:3000/api/products/");
    return await req.json();
  } catch (error) {
    throw new Error("Erreur lors de la récupération des données");
  }
}

function populateDatas(datas) {
  // Parcourir chacune des données pour les afficher sur la page
  for (const data of datas) {
    const { image, titre, shorttitle, _id } = data;
    const article = `
      <article>
        <img src="${image}" alt="${titre}">
        <a href="product.html?id=${_id}">${shorttitle}</a>
      </article>
      `;
    document
      .querySelector(".products")
      .insertAdjacentHTML("beforeend", article);
  }
}
