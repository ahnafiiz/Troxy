// home.js

let inFrame;

try {
  inFrame = window !== top;
} catch (e) {
  inFrame = true;
}

if (!localStorage.getItem("ab")) {
  localStorage.setItem("ab", "true");
}

if (!inFrame && !navigator.userAgent.includes("Firefox") && localStorage.getItem("ab") === "true") {
  const popup = open("about:blank", "_blank");

  setTimeout(() => {
    // Popup blocked
    if (!popup || popup.closed) {
      const overlay = document.createElement("div");

      overlay.innerHTML = `
        <div id="waitModal">
          <div id="waitBox">

            <div id="waitGlow"></div>

            <div id="waitIcon">
              ✦
            </div>

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

          font-family:
            Inter,
            Arial,
            sans-serif;
        }

        #waitBox {
          position: relative;

          width: 420px;
          max-width: 92%;

          padding: 30px;

          border-radius: 22px;

          background:
            linear-gradient(
              145deg,
              rgba(24,24,24,0.96),
              rgba(14,14,14,0.96)
            );

          border:
            1px solid rgba(255,255,255,0.08);

          overflow: hidden;

          text-align: center;

          box-shadow:
            0 0 50px rgba(0,0,0,0.45),
            0 0 18px rgba(0,0,0,0.25);

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

          margin:
            0 auto
            18px auto;

          border-radius: 18px;

          background:
            linear-gradient(
              145deg,
              #3f7cff,
              #275df2
            );

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 32px;
          color: white;

          box-shadow:
            0 0 25px rgba(60,120,255,0.4);
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

          background:
            linear-gradient(
              145deg,
              #3f7cff,
              #275df2
            );

          color: white;

          font-size: 15px;
          font-weight: 600;

          opacity: 0.6;

          cursor: not-allowed;

          transition:
            opacity 0.18s ease,
            transform 0.15s ease,
            filter 0.18s ease;
        }

        #okBtn.enabled {
          opacity: 1;
          cursor: pointer;
        }

        #okBtn.enabled:hover {
          transform: translateY(-1px);
          filter: brightness(1.08);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes popIn {
          from {
            opacity: 0;
            transform:
              scale(0.96)
              translateY(6px);
          }
          to {
            opacity: 1;
            transform:
              scale(1)
              translateY(0);
          }
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
      });
    } else {
      // Popup worked
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

      iframeStyle.position = "fixed";
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

          (event || window.event).returnValue =
            confirmationMessage;

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
        number: {
          value: 200,
          density: {
            enable: true,
            value_area: 600,
          },
        },

        color: {
          value: "#ffffff",
        },

        shape: {
          type: "circle",

          stroke: {
            width: 0,
            color: "#000000",
          },

          polygon: {
            nb_sides: 5,
          },

          image: {
            src: "img/github.svg",
            width: 100,
            height: 100,
          },
        },

        opacity: {
          value: 1,
          random: true,

          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },

        size: {
          value: 3,
          random: true,

          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false,
          },
        },

        line_linked: {
          enable: false,
          distance: 150,
          color: "#ffffff",
          opacity: 0.4,
          width: 1,
        },

        move: {
          enable: true,
          speed: 2,
          direction: "bottom",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,

          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },

      interactivity: {
        detect_on: "canvas",

        events: {
          onhover: {
            enable: true,
            mode: "repulse",
          },

          onclick: {
            enable: false,
            mode: "push",
          },

          resize: true,
        },

        modes: {
          grab: {
            distance: 400,

            line_linked: {
              opacity: 1,
            },
          },

          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },

          repulse: {
            distance: 40,
            duration: 0.4,
          },

          push: {
            particles_nb: 4,
          },

          remove: {
            particles_nb: 2,
          },
        },
      },

      retina_detect: true,
    };

    particlesJS("particles-js", particlesConfig);
  }
});

// Splash texts

const SplashT = ["Over 8 Million Users since 2026 (totally not made up)", "Made for Troy-OS", "Thanks for using the site", "Castletroy College really sucks", "fug u senso", "Check out the settings page"];

let SplashI = Math.floor(Math.random() * SplashT.length);

const SplashE = document.getElementById("splash");

function US() {
  SplashI = (SplashI + 1) % SplashT.length;

  SplashE.innerText = SplashT[SplashI];
}

SplashE.innerText = SplashT[SplashI];

SplashE.addEventListener("click", US);

// Random URL

function getRandomUrl() {
  const randomUrls = ["https://classroom.google.com", "https://drive.google.com", "https://google.com", "https://docs.google.com", "https://slides.google.com", "https://www.nasa.gov", "https://clever.com", "https://edpuzzle.com", "https://wikipedia.org", "https://dictionary.com", "https://linguascope.com/"];

  return randomUrls[randRange(0, randomUrls.length)];
}

function randRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}