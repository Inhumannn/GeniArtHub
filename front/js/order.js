const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form datas
  const datas = new FormData(form);

  if (datas.get("prenom").length < 2) {
    showInfos("Le prénom doit contenir au moins 2 caractères", "Erreur");
    return;
  }

  if (datas.get("nom").length < 2) {
    showInfos("Le nom doit contenir au moins 2 caractères", "Erreur");
    return;
  }

  if (datas.get("adresse").length < 10) {
    showInfos("L'adresse doit contenir au moins 10 caractères", "Erreur");
    return;
  }

  if (datas.get("ville").length < 3) {
    showInfos("La ville doit contenir au moins 3 caractères");
    return;
  }

  // Valid address email
  if (
    !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(datas.get("mail"))
  ) {
    showInfos("L'email n'est pas valide", "Erreur");
    return;
  }

  const contact = {
    firstName: datas.get("prenom"),
    lastName: datas.get("nom"),
    address: datas.get("adresse"),
    city: datas.get("ville"),
    email: datas.get("mail"),
  };

  const products = [];
  cart.forEach((el) => {
    products.push(el.id);
  });

  // Send datas to the server
  sendForm(contact, products);
});

async function sendForm(contact, products) {
  const req = await fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ contact, products }),
  });

  const res = await req.json();

  showInfos(
    `Votre commande a bien été enregistrée, voici votre numéro de commande : ${res.orderId}`,
    "Commande enregistrée"
  );
}
