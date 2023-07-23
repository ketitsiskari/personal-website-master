import SectionCreator from "../join-us-section.js";

document.addEventListener("DOMContentLoaded", () => {
  const sectionCreator = new SectionCreator();
  const realSection = sectionCreator.create("standard");

  const mainContainer = document.getElementById("app-container");
  const footer = document.querySelector("footer");

  mainContainer.insertBefore(realSection, footer);
});
