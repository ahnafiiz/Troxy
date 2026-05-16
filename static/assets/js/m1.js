// main.js
let qp;

try {
  qp = window.top.location.pathname === "/d";
} catch {
  try {
    qp = window.parent.location.pathname === "/d";
  } catch {
    qp = false;
  }
}

function getSearchUrl(query) {
  const engine = localStorage.getItem("searchEngine") || "Google";
  const engines = {
    Google: "https://www.google.com/search?q=",
    Bing: "https://www.bing.com/search?q=",
    Brave: "https://search.brave.com/search?q=",
    Qwant: "https://www.qwant.com/?q=",
    Startpage: "https://www.startpage.com/search?q=",
    SearchEncrypt: "https://www.searchencrypt.com/search?q=",
    Ecosia: "https://www.ecosia.org/search?q=",
  };
  return (engines[engine] || engines.Google) + encodeURIComponent(query);
}

function isUrl(val = "") {
  return /^http(s?):\/\//.test(val) || (val.includes(".") && val.substr(0, 1) !== " ");
}

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".f-nav");

  if (nav) {
    const themeId = localStorage.getItem("theme");
    let LogoUrl = "/assets/media/favicon/main.png";
    if (themeId === "Inverted") {
      LogoUrl = "/assets/media/favicon/main-inverted.png";
    }

    const html = `
      <div id="icon-container">
        <a class="icon" href="/./"><img alt="nav" id="INImg" src="${LogoUrl}"/></a>
      </div>
      <form id="home-search" style="flex:1; display:flex; align-items:center; padding: 0 1rem;">
        <input
          id="nav-input"
          type="text"
          placeholder="Search or enter a URL"
          autocomplete="off"
          style="
            width: 100%;
            background: rgba(255,255,255,0.06);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 8px;
            color: #eef2ff;
            font-size: 0.85rem;
            font-family: 'DM Sans', sans-serif;
            padding: 5px 14px;
            height: 32px;
            outline: none;
            transition: border-color 0.2s ease, box-shadow 0.2s ease;
          "
        />
      </form>
      <div class="f-nav-right">
        <a class="navbar-link" href="/./a"><i class="fa-solid fa-gamepad navbar-icon"></i><span>Games</span></a>
        <a class="navbar-link" href="/./b"><i class="fa-solid fa-phone navbar-icon"></i><span>Apps</span></a>
        ${qp ? "" : '<a class="navbar-link" href="/./d"><i class="fa-solid fa-laptop navbar-icon"></i><span>Tabs</span></a>'}
        <a class="navbar-link" href="/./c"><i class="fa-solid fa-gear navbar-icon settings-icon"></i><span>Settings</span></a>
      </div>`;

    nav.innerHTML = html;

    // Focus styles for nav input
    const navInput = document.getElementById("nav-input");
    if (navInput) {
      navInput.addEventListener("focus", () => {
        navInput.style.borderColor = "rgba(91, 143, 255, 0.6)";
        navInput.style.boxShadow = "0 0 0 3px rgba(91, 143, 255, 0.15)";
        navInput.style.background = "rgba(255,255,255,0.09)";
      });
      navInput.addEventListener("blur", () => {
        navInput.style.borderColor = "rgba(255,255,255,0.1)";
        navInput.style.boxShadow = "none";
        navInput.style.background = "rgba(255,255,255,0.06)";
      });
    }

    // Handle search from nav bar — goes to tabs page
    const homeSearch = document.getElementById("home-search");
    if (homeSearch && navInput) {
      homeSearch.addEventListener("submit", e => {
        e.preventDefault();
        const val = navInput.value.trim();
        if (!val) return;
        const url = isUrl(val) ? (val.startsWith("http") ? val : `https://${val}`) : getSearchUrl(val);
        sessionStorage.setItem("GoUrl", url);
        window.location.href = "/d";
      });
    }
  }

  // Theme Logic
  const themeid = localStorage.getItem("theme");
  const themeEle = document.createElement("link");
  themeEle.rel = "stylesheet";
  const themes = {
    catppuccinMocha: "/assets/css/themes/catppuccin/mocha.css?v=00",
    catppuccinMacchiato: "/assets/css/themes/catppuccin/macchiato.css?v=00",
    catppuccinFrappe: "/assets/css/themes/catppuccin/frappe.css?v=00",
    catppuccinLatte: "/assets/css/themes/catppuccin/latte.css?v=00",
    Inverted: "/assets/css/themes/colors/inverted.css?v=00",
    sky: "/assets/css/themes/colors/sky.css?v=00",
  };

  if (themes[themeid]) {
    themeEle.href = themes[themeid];
    document.body.appendChild(themeEle);
  } else {
    const customThemeEle = document.createElement("style");
    customThemeEle.textContent = localStorage.getItem(`theme-${themeid}`);
    document.head.appendChild(customThemeEle);
  }

  // Favicon and Name Logic
  const icon = document.getElementById("tab-favicon");
  const name = document.getElementById("t");
  const selectedValue = localStorage.getItem("selectedOption");

  function setCloak(nameValue, iconUrl) {
    const customName = localStorage.getItem("CustomName");
    const customIcon = localStorage.getItem("CustomIcon");

    let FinalNameValue = nameValue;
    let finalIconUrl = iconUrl;

    if (customName) FinalNameValue = customName;
    if (customIcon) finalIconUrl = customIcon;

    if (finalIconUrl) {
      icon.setAttribute("href", finalIconUrl);
      localStorage.setItem("icon", finalIconUrl);
    }
    if (FinalNameValue) {
      name.textContent = FinalNameValue;
      localStorage.setItem("name", FinalNameValue);
    }
  }

  const options = {
    Google: { name: "Google", icon: "/assets/media/favicon/google.png" },
    "Savvas Realize": { name: "Savvas Realize", icon: "/assets/media/favicon/savvas-realize.png" },
    SmartPass: { name: "SmartPass", icon: "/assets/media/favicon/smartpass.png" },
    "World Book Online - Super Home": { name: "Super Home Page", icon: "/assets/media/favicon/wbo.ico" },
    "World Book Online - Student": { name: "WBO Student | Home Page", icon: "/assets/media/favicon/wbo.ico" },
    "World Book Online - Timelines": { name: "Timelines - Home Page", icon: "/assets/media/favicon/wbo.ico" },
    Naviance: { name: "Naviance Student", icon: "/assets/media/favicon/naviance.png" },
    "PBS Learning Media": { name: "PBS LearningMedia | Teaching Resources For Students And Teachers", icon: "/assets/media/favicon/pbslearningmedia.ico" },
    "PBS Learning Media Student Home": { name: "Student Homepage | PBS LearningMedia", icon: "/assets/media/favicon/pbslearningmedia.ico" },
    Drive: { name: "My Drive - Google Drive", icon: "/assets/media/favicon/drive.png" },
    Classroom: { name: "Home", icon: "/assets/media/favicon/classroom.png" },
    Schoology: { name: "Home | Schoology", icon: "/assets/media/favicon/schoology.png" },
    Gmail: { name: "Gmail", icon: "/assets/media/favicon/gmail.png" },
    Clever: { name: "Clever | Portal", icon: "/assets/media/favicon/clever.png" },
    Khan: { name: "Dashboard | Khan Academy", icon: "/assets/media/favicon/khan.png" },
    Dictionary: { name: "Dictionary.com | Meanings & Definitions of English Words", icon: "/assets/media/favicon/dictionary.png" },
    Thesaurus: { name: "Synonyms and Antonyms of Words | Thesaurus.com", icon: "/assets/media/favicon/thesaurus.png" },
    Campus: { name: "Infinite Campus", icon: "/assets/media/favicon/campus.png" },
    IXL: { name: "IXL | Dashboard", icon: "/assets/media/favicon/ixl.png" },
    Canvas: { name: "Dashboard", icon: "/assets/media/favicon/canvas.png" },
    CodeHS: { name: "Sandbox | CodeHS", icon: "/assets/media/favicon/codehs.png" },
    LinkIt: { name: "Test Taker", icon: "/assets/media/favicon/linkit.ico" },
    Edpuzzle: { name: "Edpuzzle", icon: "/assets/media/favicon/edpuzzle.png" },
    "i-Ready Math": { name: "Math To Do, i-Ready", icon: "/assets/media/favicon/i-ready.ico" },
    "i-Ready Reading": { name: "Reading To Do, i-Ready", icon: "/assets/media/favicon/i-ready.ico" },
    "ClassLink Login": { name: "Login", icon: "/assets/media/favicon/classlink-login.png" },
    "Google Meet": { name: "Google Meet", icon: "/assets/media/favicon/google-meet.png" },
    "Google Docs": { name: "Google Docs", icon: "/assets/media/favicon/google-docs.ico" },
    "Google Slides": { name: "Google Slides", icon: "/assets/media/favicon/google-slides.ico" },
    Wikipedia: { name: "Wikipedia", icon: "/assets/media/favicon/wikipedia.png" },
    Britannica: { name: "Encyclopedia Britannica | Britannica", icon: "/assets/media/favicon/britannica.png" },
    Ducksters: { name: "Ducksters", icon: "/assets/media/favicon/ducksters.png" },
    Minga: { name: "Minga – Creating Amazing Schools", icon: "/assets/media/favicon/minga.png" },
    "i-Ready Learning Games": { name: "Learning Games, i-Ready", icon: "/assets/media/favicon/i-ready.ico" },
    "NoRedInk Home": { name: "Student Home | NoRedInk", icon: "/assets/media/favicon/noredink.png" },
    Desmos: { name: "Desmos | Graphing Calculator", icon: "/assets/media/favicon/desmos.ico" },
    "Newsela Binder": { name: "Newsela | Binder", icon: "/assets/media/favicon/newsela.png" },
    "Newsela Assignments": { name: "Newsela | Assignments", icon: "/assets/media/favicon/newsela.png" },
    "Newsela Home": { name: "Newsela | Instructional Content Platform", icon: "/assets/media/favicon/newsela.png" },
    "PowerSchool Sign In": { name: "Student and Parent Sign In", icon: "/assets/media/favicon/powerschool.png" },
    "PowerSchool Grades and Attendance": { name: "Grades and Attendance", icon: "/assets/media/favicon/powerschool.png" },
    "PowerSchool Teacher Comments": { name: "Teacher Comments", icon: "/assets/media/favicon/powerschool.png" },
    "PowerSchool Standards Grades": { name: "Standards Grades", icon: "/assets/media/favicon/powerschool.png" },
    "PowerSchool Attendance": { name: "Attendance", icon: "/assets/media/favicon/powerschool.png" },
    Nearpod: { name: "Nearpod", icon: "/assets/media/favicon/nearpod.png" },
    StudentVUE: { name: "StudentVUE", icon: "/assets/media/favicon/studentvue.ico" },
    "Quizlet Home": { name: "Flashcards, learning tools and textbook solutions | Quizlet", icon: "/assets/media/favicon/quizlet.webp" },
    "Google Forms Locked Mode": { name: "Start your quiz", icon: "/assets/media/favicon/googleforms.png" },
    DeltaMath: { name: "DeltaMath", icon: "/assets/media/favicon/deltamath.png" },
    Kami: { name: "Kami", icon: "/assets/media/favicon/kami.png" },
    "GoGuardian Admin Restricted": { name: "Restricted", icon: "/assets/media/favicon/goguardian-lock.png" },
    "GoGuardian Teacher Block": { name: "Uh oh!", icon: "/assets/media/favicon/goguardian.png" },
    "World History Encyclopedia": { name: "World History Encyclopedia", icon: "/assets/media/favicon/worldhistoryencyclopedia.png" },
    "Big Ideas Math Assignment Player": { name: "Assignment Player", icon: "/assets/media/favicon/bim.ico" },
    "Big Ideas Math": { name: "Big Ideas Math", icon: "/assets/media/favicon/bim.ico" },
  };

  if (options[selectedValue]) {
    setCloak(options[selectedValue].name, options[selectedValue].icon);
  }

  // Event Key Logic
  const eventKey = JSON.parse(localStorage.getItem("eventKey")) || ["Ctrl", "E"];
  const pLink = localStorage.getItem("pLink") || "https://classroom.google.com/";
  let pressedKeys = [];

  document.addEventListener("keydown", event => {
    pressedKeys.push(event.key);
    if (pressedKeys.length > eventKey.length) {
      pressedKeys.shift();
    }
    if (eventKey.every((key, index) => key === pressedKeys[index])) {
      window.location.href = pLink;
      pressedKeys = [];
    }
  });

  // Background Image Logic
  const savedBackgroundImage = localStorage.getItem("backgroundImage");
  if (savedBackgroundImage) {
    document.documentElement.style.setProperty("--background-image", `url('${savedBackgroundImage}')`);
    document.body.style.backgroundImage = `url('${savedBackgroundImage}')`;
  }
});