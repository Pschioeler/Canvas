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
    const menuItems = [
        { name: "Home", iconName: "fa-home", hasSubNav: false },
        { name: "Studies", iconName: "fa-book-open", hasSubNav: true },
        { name: "Calendar", iconName: "fa-calendar", hasSubNav: false },
        { name: "Resources", iconName: "fa-question", hasSubNav: true },
    ];

    menuItems.forEach((item, index) => {
        const li = document.createElement("li");
        li.id = item.name.toLowerCase(); // Set ID with the name of the menu item
        li.className = "menuBtn";
        const i = document.createElement("i");
        i.className = `fas ${item.iconName}`;
        const p = document.createElement("p");
        p.textContent = item.name;

        if (item.hasSubNav) {
            const subNav = document.createElement("div");
            subNav.className = "subNav";
            const subNavId = `subNav${index + 1}`; // Unique id for each sub-navigation
            subNav.id = subNavId;

            if (item.name === "Studies") {
                for (let semester = 1; semester <= 7; semester++) {
                    const dropdownToggle = document.createElement("div");
                    dropdownToggle.className = "dropdown-toggle";
                    dropdownToggle.textContent = `Semester ${semester}`;
                    const subNavItem = document.createElement("ul");
                    subNavItem.className = "dropdown-content";

                    if (semester === 1) {
                        // Original content for "Semester 1"
                        const semester1Links = {
                            "JavaScript": "studie.html",
                            "Udviklingsmiljøer": "https://example.com/link2",
                            "Brugeroplevelser": "https://example.com/link3",
                        };

                        Object.keys(semester1Links).forEach((linkText) => {
                            const subNavLink = document.createElement("li");
                            const a = document.createElement("a");
                            a.href = semester1Links[linkText];
                            a.textContent = linkText;
                            subNavLink.appendChild(a);
                            subNavItem.appendChild(subNavLink);
                        });
                    } else {
                        // Adding empty content for "Semester 2" through "Semester 7"
                        const emptySemester = document.createElement("li");
                        emptySemester.textContent = "Empty";
                        subNavItem.appendChild(emptySemester);
                    }

                    subNavItem.style.display = "none"; // Ensure links start with display: none

                    dropdownToggle.addEventListener("click", () => {
                        subNavItem.style.display = subNavItem.style.display === "block" ? "none" : "block";
                    });

                    subNav.appendChild(dropdownToggle);
                    subNav.appendChild(subNavItem);
                }

                const assignmentsLink = document.createElement("li");
                const assignmentsNavLink = document.createElement("a");
                assignmentsNavLink.href = "assignments.html";
                assignmentsNavLink.textContent = "Assignments";
                assignmentsLink.appendChild(assignmentsNavLink);
                subNav.appendChild(assignmentsLink);
            }

            if (item.name === "Resources") {
                const resourcesLinks = ["Nyttige Links", "IBA Bibliotek", "IBA Forum", "DSR Forum"];
                resourcesLinks.forEach((linkText) => {
                    const subNavItem = document.createElement("div");
                    subNavItem.className = "subNavItem";
                    const subNavLink = document.createElement("a");
                    subNavLink.href = "#";
                    subNavLink.textContent = linkText;
                    subNavItem.appendChild(subNavLink);
                    subNav.appendChild(subNavItem);
                });
            }

            li.appendChild(subNav);

            let timeoutId;
            // Add event listener for hover effect
            li.addEventListener("mouseenter", () => {
                clearTimeout(timeoutId);
                subNav.style.display = "flex";
            });

            li.addEventListener("mouseleave", () => {
                timeoutId = setTimeout(() => {
                    subNav.style.display = "none";
                }, 500);
            });

            subNav.addEventListener("mouseenter", () => {
                clearTimeout(timeoutId);
            });

            subNav.addEventListener("mouseleave", () => {
                subNav.style.display = "none";
            });
        }

        li.appendChild(i);
        li.appendChild(p);
        ul.appendChild(li);
    });

    aside.appendChild(ul);

    body.insertBefore(aside, body.firstChild);
    body.insertBefore(header, body.firstChild);
}

createMenu();