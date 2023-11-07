function createMenu() {
    //Laver link element i head elementet så der linkes til FontAwesome og ikoner kan vises
    const head = document.head;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css";
    head.appendChild(link);

    const body = document.body;
    const header = document.createElement("header");
    const nav = document.createElement("nav");
    const a = document.createElement("a");
    a.href = "index.html";
    const logo = document.createElement("img");
    logo.src = "../assets/img/logo.webp";
    logo.alt = "IBA logo";
    logo.width = 97;
    logo.height = 59;
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Search...";
    const div = document.createElement("div");
    div.id = "navIcons";
    const i1 = document.createElement("i");
    i1.className = "fas fa-bell";
    const i2 = document.createElement("i");
    i2.className = "fas fa-user";

    a.appendChild(logo);
    nav.appendChild(a);
    nav.appendChild(input);
    nav.appendChild(div);
    div.appendChild(i1);
    div.appendChild(i2);
    header.appendChild(nav);
  
    const aside = document.createElement("aside");
    aside.id = "sideMenu";
    const ul = document.createElement("ul");
    ul.style.listStyleType = "none";
    const menuItems = ["Home", "Studies", "Calendar", "Resources"];
    const iconNames = ["fa-home", "fa-book-open", "fa-calendar", "fa-question"];
    menuItems.forEach((item, index) => {
      const li = document.createElement("li");
      li.className = "menuBtn";
      const i = document.createElement("i");
      i.className = `fas ${iconNames[index]}`;
      const p = document.createElement("p");
      p.textContent = item;
      li.appendChild(i);
      li.appendChild(p);
      ul.appendChild(li);
    });
  
    aside.appendChild(ul);
  
    body.insertBefore(aside, body.firstChild);
    body.insertBefore(header, body.firstChild);
}
createMenu();