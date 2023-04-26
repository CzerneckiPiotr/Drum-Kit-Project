const smallScreen = window.matchMedia("(max-width: 992px)");
smallScreen.addEventListener("change", checkScreen);

const getDrumKit = document.getElementById("drumKit");
let drumKit = document.createElement("div");
drumKit.id = "drumKitDiv";
drumKit.style.color = "whitesmoke";
drumKit.style.height = "auto";
drumKit.style.minHeight = "calc(100vh - 2px - 4em)";
drumKit.style.display = "grid";
drumKit.style.textAlign = "center";
drumKit.style.alignContent = "center";
drumKit.style.justifyContent = "center";
drumKit.style.justifyItems = "center";
drumKit.style.gap = "3em";
getDrumKit.appendChild(drumKit);

let drumKitTitle = document.createElement("h2");
drumKitTitle.id = "drumKitTitle";
drumKitTitle.innerText =
  "Bringing the power of a full drum set to your fingertips, anytime, anywhere!";
drumKit.appendChild(drumKitTitle);

let drumKitBox = document.createElement("div");
drumKitBox.id = "drumKitBox";
drumKitBox.style.display = "grid";
if (smallScreen.matches === false) {
  drumKitBox.style.gridTemplateRows = "repeat(2, 1fr)";
  drumKitBox.style.gridTemplateColumns = "repeat(8, 1fr)";
} else if (smallScreen.matches === true) {
  drumKitBox.style.gridTemplateRows = "repeat(5, 1fr)";
  drumKitBox.style.gridTemplateColumns = "repeat(2, 1fr)";
}
drumKitBox.style.gap = "8px";
drumKit.appendChild(drumKitBox);

const buttonsKey = [
  { letter: "W", key: "w", name: "CLAP", poz1: "1", poz2: "1" },
  { letter: "S", key: "s", name: "HIHAT", poz1: "2", poz2: "1" },
  { letter: "D", key: "d", name: "KICK", poz1: "2", poz2: "2" },
  { letter: "F", key: "f", name: "OPENHAT", poz1: "2", poz2: "2" },
  { letter: "G", key: "g", name: "BOOM", poz1: "2", poz2: "3" },
  { letter: "H", key: "h", name: "RIDE", poz1: "2", poz2: "3" },
  { letter: "J", key: "j", name: "SNARE", poz1: "2", poz2: "4" },
  { letter: "K", key: "k", name: "TOM", poz1: "2", poz2: "4" },
  { letter: "L", key: "l", name: "TINK", poz1: "2", poz2: "5" },
];

buttonsKey.forEach((bKey) => {
  let button = document.createElement("button");
  button.id = bKey.name;
  button.style.height = "96px";
  button.style.width = "96px";
  button.style.borderRadius = "1.5em";
  button.style.color = "#012340";
  button.style.backgroundColor = "#d98d30e6";
  button.onmouseenter = () => {
    button.style.backgroundColor = "#A64444";
  };
  button.onmouseleave = () => {
    button.style.backgroundColor = "#d98d30e6";
  };
  button.innerHTML = `<span style = 'font-size: 1.5em; color: whitesmoke'>${bKey.letter} </span> <p></p> <span> ${bKey.name} </span>`;
  let buttonAudio = document.createElement("audio");
  buttonAudio.id = "buttonAudio" + bKey.name;

  button.addEventListener("click", clickButton);
  function clickButton() {
    let loadAndPlayButton = new Promise((loadButtonAudio) => {
      if (button.id === bKey.name) {
        loadButtonAudio((buttonAudio.src = `assets/${bKey.name}.mp3`));
        clickHistory(bKey.name);
      }
    });
    loadAndPlayButton.then(function () {
      buttonAudio.play();
    });
  }
  if (smallScreen.matches === false) {
    button.style.gridRow = bKey.poz1;
  } else if (smallScreen.matches === true) {
    button.style.gridRow = bKey.poz2;
  }
  drumKitBox.appendChild(button);
});

if (smallScreen.matches === true) {
  TINK.style.gridColumn = "1 / span 2";
  TINK.style.width = "200px";
}

buttonsKey.forEach((kKey) => {
  let keyAudio = document.createElement("audio");
  keyAudio.id = "keyAudio" + kKey.name;
  drumKitBox.appendChild(keyAudio);
});

document.addEventListener("keydown", whichKey);
function whichKey(which) {
  let loadAndPlayKey = new Promise((loadKeyAudio) => {
    for (let i = 0; i < buttonsKey.length; i++) {
      if (
        which.key === buttonsKey[i].key ||
        which.key === buttonsKey[i].letter
      ) {
        const getAudio = document.getElementById(
          `keyAudio${buttonsKey[i].name}`
        );
        loadKeyAudio((getAudio.src = `assets/${buttonsKey[i].name}.mp3`));
        const getButton = document.getElementById(buttonsKey[i].name);
        getButton.style.backgroundColor = "#A64444";
        clickHistory(buttonsKey[i].name);
      }
    }
  });
  loadAndPlayKey.then(function (value) {
    const valueLength = value.length;
    const valuename = value.slice(7, valueLength - 4);
    const playAudio = document.getElementById(`keyAudio${valuename}`);
    playAudio.addEventListener("canplaythrough", soundLoaded);
    function soundLoaded() {
      playAudio.play();
    }
  });
}

document.addEventListener("keyup", whichKeyUp);
function whichKeyUp(whichUp) {
  for (let i = 0; i < buttonsKey.length; i++) {
    if (
      whichUp.key === buttonsKey[i].key ||
      whichUp.key === buttonsKey[i].letter
    ) {
      const getButtonUp = document.getElementById(buttonsKey[i].name);
      getButtonUp.style.backgroundColor = "#d98d30e6";
    }
  }
}

function checkScreen() {
  const getGrid = document.getElementById("drumKitBox");
  if (smallScreen.matches === false) {
    getGrid.style.gridTemplateRows = "repeat(2, 1fr)";
    getGrid.style.gridTemplateColumns = "repeat(8, 1fr)";
  } else if (smallScreen.matches === true) {
    getGrid.style.gridTemplateRows = "repeat(5, 1fr)";
    getGrid.style.gridTemplateColumns = "repeat(2, 1fr)";
  }
  for (let i = 0; i < buttonsKey.length; i++) {
    const getButton = document.getElementById(`${buttonsKey[i].name}`);
    if (smallScreen.matches === false) {
      getButton.style.gridRow = buttonsKey[i].poz1;
      TINK.style.width = "96px";
      TINK.style.gridColumn = "8";
    } else if (smallScreen.matches === true) {
      getButton.style.gridRow = buttonsKey[i].poz2;
      TINK.style.gridColumn = "1 / span 2";
      TINK.style.width = "200px";
    }
  }
  const getTittle = document.getElementById("drumKitTitle");
  if (smallScreen.matches === false) {
    getTittle.style.maxWidth = "none";
  } else if (smallScreen.matches === true) {
    getTittle.style.maxWidth = "600px";
  }
  const drumHistory = document.getElementById("drumHistory");
  if (smallScreen.matches === false) {
    drumHistory.style.maxWidth = "824px";
  } else if (smallScreen.matches === true) {
    drumHistory.style.maxWidth = "600px";
  }
}

let drumHistory = document.createElement("div");
drumHistory.id = "drumHistory";
drumHistory.display = "block";
drumHistory.style.textAlign = "left";
drumHistory.style.placeContent = "auto";
drumHistory.style.width = "95%";
drumHistory.style.maxWidth = "824px";
drumHistory.style.paddingBottom = "0.83em";
drumHistory.style.fontStyle = "italic";
drumHistory.innerHTML = "HISTORY: ";
drumKit.appendChild(drumHistory);

function clickHistory(history) {
  let keyDrumHistory = document.createElement("span");
  keyDrumHistory.innerHTML = `${history}, `;
  drumHistory.appendChild(keyDrumHistory);
}
