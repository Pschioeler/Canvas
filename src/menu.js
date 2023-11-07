export function createMenu() {
    const header = document.createElement("header");
    const nav = document.createElement("nav");
    const logo = document.createElement("logo");
    logo.src = "logo.webp";
    logo.alt = "IBA (International Business Academy) logo";
    logo.width = "50";
    logo.height = "50";
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Search...";
    const i1 = document.createElement("i");
    i1.className = "fas fa-caret-right";
    const i2 = document.createElement("i");
    i2.className = "fas fa-caret-right";
  
    nav.appendChild(logo);
    nav.appendChild(input);
    nav.appendChild(i1);
    nav.appendChild(i2);
    header.appendChild(nav);
  
    const aside = document.createElement("aside");
    aside.id = "sideMenu";
    const ul = document.createElement("ul");
    ul.style.listStyleType = "none";
    const menuItems = ["Home", "Studies", "Calendar", "Resources"];
    menuItems.forEach((item) => {
      const li = document.createElement("li");
      li.className = "menuBtn";
      const i = document.createElement("i");
      i.className = "fas fa-caret-right";
      const p = document.createElement("p");
      p.textContent = item;
      li.appendChild(i);
      li.appendChild(p);
      ul.appendChild(li);
    });
  
    aside.appendChild(ul);
  
    document.body.appendChild(header);
    document.body.appendChild(aside);
}