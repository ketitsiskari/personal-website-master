class SectionCreator {
    create(type) {
      let section;
      if (type === "standard") {
        section = this.createSection(type);
      } else if (type === "advanced") {
        section = this.createSection(type);
      } else {
        throw new Error("Invalid section type.");
      }
      return section;
    }
  
    createSection(x) {
      const section = document.createElement("section");
      section.classList.add("join-section");
  
      const image = document.createElement("img");
      image.src = "./assets/images/join.jpg";
      image.alt = "Cover Image";
      image.classList.add("cover-image");
  
      const h1 = document.createElement("h1");
      h1.textContent =
        x === "standard" ? "Join Our Program" : "Join Our Advanced Program";
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
      subscribeButton.textContent =
        x === "standard" ? "Subscribe" : "Subscribe to Advanced Program";
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
  
      section.remove = () => {
        section.parentNode.removeChild(section);
      };
  
      return section;
    }
  }
  
  export default SectionCreator;
  
  