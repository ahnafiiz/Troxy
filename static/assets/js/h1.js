// home.js

// Random wallpaper
const wallpapers = [
  "/assets/media/background/f1-base.jpeg",
  "/assets/media/background/fa-mcl-saopaolo.jpeg",
  "/assets/media/background/full-inverted.png",
  "/assets/media/background/full-main.png",
  "/assets/media/background/Green-Nature.jpeg",
  "/assets/media/background/pink-clouds.jpg",
  "/assets/media/background/Stock-1.jpg",
];

document.body.style.backgroundImage = `url("${wallpapers[Math.floor(Math.random() * wallpapers.length)]}")`;

let inFrame;

try {
  inFrame = window !== top;
} catch {
  inFrame = true;
}

if (!localStorage.getItem("ab")) {
  localStorage.setItem("ab", "true");
}

if (!inFrame && !navigator.userAgent.includes("Firefox") && localStorage.getItem("ab") === "true" && !localStorage.getItem("waitModalShown") && !sessionStorage.getItem("waitModalShown")) {
  const popup = open("about:blank", "_blank");

  setTimeout(() => {
    if (!popup || popup.closed) {
      if (!localStorage.getItem("waitModalShown") && !sessionStorage.getItem("waitModalShown")) {
        try {
          localStorage.setItem("waitModalShown", "true");
        } catch {}
        try {
          sessionStorage.setItem("waitModalShown", "true");
        } catch {}
        const overlay = document.createElement("div");

        overlay.innerHTML = `
        <div id="waitModal">
          <div id="waitBox">
            <div id="waitGlow"></div>
            <div id="waitIcon">✦</div>
            <h2>Popup Permission Required</h2>
            <p>
              Allow popups to continue using the about:blank cloak.
              This helps keep the site hidden from browser history.
            </p>
            <button id="okBtn" disabled>
              Continue (5)
            </button>
          </div>
        </div>
      `;

        const styleEl = document.createElement("style");

        styleEl.textContent = `
        #waitModal {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.72);
          backdrop-filter: blur(10px);
          z-index: 999999;
          animation: fadeIn 0.2s ease;
          font-family: Inter, Arial, sans-serif;
        }
        #waitBox {
          position: relative;
          width: 420px;
          max-width: 92%;
          padding: 30px;
          border-radius: 22px;
          background: linear-gradient(145deg, rgba(24,24,24,0.96), rgba(14,14,14,0.96));
          border: 1px solid rgba(255,255,255,0.08);
          overflow: hidden;
          text-align: center;
          box-shadow: 0 0 50px rgba(0,0,0,0.45), 0 0 18px rgba(0,0,0,0.25);
          animation: popIn 0.24s ease;
        }
        #waitGlow {
          position: absolute;
          width: 240px;
          height: 240px;
          background: rgba(70,120,255,0.16);
          filter: blur(80px);
          top: -100px;
          left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
        }
        #waitIcon {
          position: relative;
          width: 70px;
          height: 70px;
          margin: 0 auto 18px auto;
          border-radius: 18px;
          background: linear-gradient(145deg, #3f7cff, #275df2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          color: white;
          box-shadow: 0 0 25px rgba(60,120,255,0.4);
        }
        #waitBox h2 {
          position: relative;
          margin: 0 0 14px;
          color: white;
          font-size: 26px;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        #waitBox p {
          position: relative;
          margin: 0;
          color: rgba(255,255,255,0.78);
          font-size: 15px;
          line-height: 1.6;
        }
        #okBtn {
          position: relative;
          width: 100%;
          margin-top: 24px;
          padding: 13px;
          border: none;
          border-radius: 14px;
          background: linear-gradient(145deg, #3f7cff, #275df2);
          color: white;
          font-size: 15px;
          font-weight: 600;
          opacity: 0.6;
          cursor: not-allowed;
          transition: opacity 0.18s ease, transform 0.15s ease, filter 0.18s ease;
        }
        #okBtn.enabled { opacity: 1; cursor: pointer; }
        #okBtn.enabled:hover { transform: translateY(-1px); filter: brightness(1.08); }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.96) translateY(6px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `;

        document.head.appendChild(styleEl);
        document.body.appendChild(overlay);

        const okBtn = document.getElementById("okBtn");
        let seconds = 5;

        const timer = setInterval(() => {
          seconds--;
          if (seconds > 0) {
            okBtn.textContent = `Continue (${seconds})`;
          } else {
            clearInterval(timer);
            okBtn.disabled = false;
            okBtn.classList.add("enabled");
            okBtn.textContent = "Continue";
          }
        }, 1000);

        okBtn.addEventListener("click", () => {
          overlay.remove();
          try {
            localStorage.setItem("waitModalShown", "true");
          } catch (_e) {}
        });
      }
    } else {
      const doc = popup.document;
      const iframe = doc.createElement("iframe");
      const iframeStyle = iframe.style;
      const link = doc.createElement("link");
      const name = localStorage.getItem("name") || "My Drive - Google Drive";
      const icon = localStorage.getItem("icon") || "https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png";

      doc.title = name;
      link.rel = "icon";
      link.href = icon;
      iframe.src = location.href;

      iframeStyle.position = "absolute";
      iframeStyle.top = 0;
      iframeStyle.bottom = 0;
      iframeStyle.left = 0;
      iframeStyle.right = 0;
      iframeStyle.border = "none";
      iframeStyle.outline = "none";
      iframeStyle.width = "100%";
      iframeStyle.height = "100%";

      doc.head.appendChild(link);
      doc.body.appendChild(iframe);

      const pLink = localStorage.getItem(encodeURI("pLink")) || getRandomUrl();
      location.replace(pLink);

      const script = doc.createElement("script");
      script.textContent = `
        window.onbeforeunload = function (event) {
          const confirmationMessage = 'Leave Site?';
          (event || window.event).returnValue = confirmationMessage;
          return confirmationMessage;
        };
      `;
      doc.head.appendChild(script);
    }
  }, 2000);
}

// Particles

document.addEventListener("DOMContentLoaded", () => {
  if (window.localStorage.getItem("Particles") === "true") {
    const particlesConfig = {
      particles: {
        number: { value: 200, density: { enable: true, value_area: 600 } },
        color: { value: "#ffffff" },
        shape: {
          type: "circle",
          stroke: { width: 0, color: "#000000" },
          polygon: { nb_sides: 5 },
          image: { src: "img/github.svg", width: 100, height: 100 },
        },
        opacity: { value: 1, random: true, anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false } },
        size: { value: 3, random: true, anim: { enable: false, speed: 40, size_min: 0.1, sync: false } },
        line_linked: { enable: false, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
        move: { enable: true, speed: 2, direction: "bottom", random: true, straight: false, out_mode: "out", bounce: false, attract: { enable: false, rotateX: 600, rotateY: 1200 } },
      },
      interactivity: {
        detect_on: "canvas",
        events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: false, mode: "push" }, resize: true },
        modes: {
          grab: { distance: 400, line_linked: { opacity: 1 } },
          bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
          repulse: { distance: 40, duration: 0.4 },
          push: { particles_nb: 4 },
          remove: { particles_nb: 2 },
        },
      },
      retina_detect: true,
    };
    particlesJS("particles-js", particlesConfig);
  }
});

// Splash texts
// Each entry is [text, weight] — higher weight = more likely to appear

const SplashW = [
  ["Over 3246238643824983274 Million Users since 2026", 3],
  ["Made for Troy-OS", 3],
  ["Thanks for using the site", 3],
  ["Go on Geforce Now!", 3],
  ["I wish this was easier", 2],
  ["Check out the settings page cuz why not", 4],
  ["Forked from Interstellar, go check them out!", 3],
  ["Click this for more messages", 10],
  ["You're reading this.", 3],
  ["I should add more messages...", 2],
  ["Still here?", 2],
  ["Hello Wolrd.", 3],
  ["Go touch some grass.", 4],
  ["Why are you still here?", 3],
  ["Are you doing alright?", 3],
  ["Get some water. Seriously.", 4],
  ["Remember to sleep tonight.", 4],
  ["Dont blame me if you fail your tests", 8],
  ["Nobody's watching. You're safe here.", 4],
  ["We appreciate you using Troxy.", 3],
  ["Try searching something fun.", 4],
  ["404: motivation not found.", 4],
  ["Error 418: I eat code and i spit errors.", 7],
  ["sudo make me a sandwich.", 3],
  ["Have you tried turning it off and on again?", 4],
  ["It works on my machine.", 3],
  ["// TODO: fix this later", 4],
  ["git blame: i didnt make this i promise.", 3],
  ["Troy-OS was built out of frustration. Thanks teachers.", 3],
  ["Not responsible for any detentions.", 5],
  ["I'm running out of ideas ngl.", 4],
  ["Hire me. I made this.", 4],
  ["Your teacher is literally right behind you.", 5],
  ["Close the tab. NOW.", 8],
  ["That's not a drill.", 4],
  ["Okay the teachers gone. Carry on.", 8],
  ["We don't talk about the old UI.", 3],
  ["The settings page is actually really cool. Go look.", 4],
  ["Imagine using Chrome. Couldn't be you.", 4],
  ["More excuses just to not do homework...", 5],
  ["Powered by caffeine and spite.", 4],
  ["100% guaranteed to get you in trouble.", 5],
  ["This site does not exist.", 4],
  ["You did not find this.", 4],
  ["There is no proxy here.", 4],
  ["Move along.", 3],
  ["Senso if you're reading this, go away.", 5],
  ["Bradar what are you doing???? Get back to work!!!!", 20],
  ["Speedrun: how fast can you get caught?", 5],
  ["New high score: 0 seconds.", 4],
  ["Task failed successfully.", 4],
  ["Please rate us 5 stars on an app store we're not on.", 3],
  ["This splash text was generated by an ai because the dev was too lazy...", 3],
  ["We have cookies. Not the kind you eat.", 3],
  ["Your WiFi password is probably 'password'.", 4],
  ["Just gonna pretend I didn't see that search history...", 5],
  ["Did you know? Nobody reads these. Except you.", 4],
  ["https://troy-os.vercel.app/ go check it out... well you're in it. I think.", 2],
  ["I hope your chromebook gets taken off you.", 4],
  ["CTRL + W instantly switches your tab into a safe one. Try it out!", 10],
  ["Philip chicken likes men", 0.01]
];

// Build weighted pool
const splashPool = [];
for (const [text, weight] of SplashW) {
  for (let i = 0; i < weight; i++) {
    splashPool.push(text);
  }
}

let lastSplash = "";

function getRandomSplash() {
  let pick;
  do {
    pick = splashPool[Math.floor(Math.random() * splashPool.length)];
  } while (pick === lastSplash);
  lastSplash = pick;
  return pick;
}

const SplashE = document.getElementById("splash");
SplashE.innerText = getRandomSplash();
SplashE.addEventListener("click", () => {
  SplashE.innerText = getRandomSplash();
});

// Random URL

function getRandomUrl() {
  const randomUrls = ["https://classroom.google.com", "https://drive.google.com", "https://google.com", "https://docs.google.com", "https://slides.google.com", "https://www.nasa.gov", "https://clever.com", "https://edpuzzle.com", "https://wikipedia.org", "https://dictionary.com", "https://linguascope.com/"];
  return randomUrls[Math.floor(Math.random() * randomUrls.length)];
}