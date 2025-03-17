function showInfos(message, title = "") {
  const modal = document.createElement("dialog");

  // Add content to the modal
  modal.appendChild(document.createTextNode(message));
  document.body.appendChild(modal);

  // If there is title, add it to the modal
  if (title) {
    const h1 = document.createElement("h1");
    h1.textContent = title;
    modal.insertBefore(h1, modal.firstChild);
  }

  // Open the modal
  modal.showModal();

  // Close the modal after 3 seconds
  setTimeout(() => {
    modal.close();
    // Remove the modal from the DOM
    modal.remove();
  }, 3000);
}
