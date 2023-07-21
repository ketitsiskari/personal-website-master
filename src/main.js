document.addEventListener("DOMContentLoaded", function() {
    const section = document.createElement("section");
    section.classList.add("join-section");

    const image = document.createElement("img");
    image.src = "./assets/images/join.jpg";
    image.alt = "Cover Image";
    image.classList.add("cover-image");

    const h1 = document.createElement("h1");
    h1.textContent = "Join Our Program";
    h1.classList.add("join-program-title");

    const h2 = document.createElement("h2");
    h2.textContent =
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
    h2.classList.add("join-program-subtitle");

    const emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.placeholder = "Email";
    emailInput.classList.add("email-input");

    const subscribeButton = document.createElement("button");
    subscribeButton.textContent = "Subscribe";
    subscribeButton.classList.add("subscribe-button");

    const form = document.createElement("form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let emailValue = emailInput.value;
      console.log(emailValue);
      emailInput.value = "";
  });

    form.appendChild(emailInput);
    form.appendChild(subscribeButton);

    const coverContent = document.createElement("div");
    coverContent.classList.add("cover-content");
    coverContent.appendChild(h1);
    coverContent.appendChild(h2);
    coverContent.appendChild(form);

    section.appendChild(image);
    section.appendChild(coverContent);

    const mainContainer = document.getElementById("app-container");
    const footer = document.querySelector("footer");
    mainContainer.insertBefore(section, footer);

});