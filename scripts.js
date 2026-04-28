// 1. รายการของรางวัล (Loot Table) - โอกาสเท่ากันทุกรางวัล
const rewards = [
  { text: "เงินรางวัล 10 บาท 💸", rarity: "Common" },
  { text: "เงินรางวัล 50 บาท 💸", rarity: "Common" },
  { text: "เงินรางวัล 100 บาท 💰", rarity: "Rare" },
  { text: "เงินรางวัล 200 บาท 💰", rarity: "Rare" },
  { text: "เงินรางวัล 300 บาท 💎", rarity: "SSR" },
  { text: "สิทธิ์สั่งอะไรก็ได้ 1 ครั้ง 👑", rarity: "SSR" },
  { text: "พาไปกินหมูกระทะ 🥓", rarity: "Rare" },
  { text: "นวดคอบ่าไหล่ 💆‍♂️", rarity: "Common" },
];

// 2. การตั้งค่าไฟล์ภาพ
const staticImg = "gif/static.png";
const animatedImg = "gif/giphy.gif";

const happyGifs = [
  "gif/happy/happy1.gif",
  "gif/happy/happy2.gif",
  "gif/happy/happy3.gif",
];
const sadGifs = [
  "gif/sad/sad1.gif",
  "gif/sad/sad2.gif",
  "gif/sad/sad3.gif",
  "gif/sad/sad4.gif",
  "gif/sad/sad5.gif",
  "gif/sad/sad6.gif",
  "gif/sad/sad7.gif",
  "gif/sad/sad8.gif",
];

// 3. อ้างอิง DOM Elements
const gachaImg = document.getElementById("gacha-img");
const spinBtn = document.getElementById("spin-btn");
const detailBtn = document.getElementById("detail-btn");
const resultModal = document.getElementById("result-modal");
const detailModal = document.getElementById("detail-modal");
const rewardText = document.getElementById("reward-text");
const closeBtns = document.querySelectorAll(".close, .close-detail");

// 3.1 อ้างอิง Music Elements
const bgMusic = document.getElementById("bg-music");
const musicToggle = document.getElementById("music-toggle");
const musicIcon = document.getElementById("music-icon");
const spinSound = document.getElementById("spin-sound");
const clatterSound = document.getElementById("clatter-sound");

bgMusic.volume = 0.4;
spinSound.volume = 0.6;
clatterSound.volume = 1.0;

function toggleMusic() {
  if (bgMusic.paused) {
    bgMusic.play();
    musicToggle.classList.add("playing");
    musicIcon.innerText = "🔊";
  } else {
    bgMusic.pause();
    musicToggle.classList.remove("playing");
    musicIcon.innerText = "🎵";
  }
}
musicToggle.onclick = toggleMusic;

document.addEventListener(
  "click",
  function () {
    if (bgMusic.paused) {
      bgMusic.play();
      musicToggle.classList.add("playing");
      musicIcon.innerText = "🔊";
    }
  },
  { once: true },
);

gachaImg.src = staticImg;

const titleText = document.querySelector("h1");
const loveMessage = document.getElementById("love-message");
let gameStep = "start";
let noCount = 0;

function moveButton(btn) {
  const x = Math.random() * (window.innerWidth - btn.offsetWidth);
  const y = Math.random() * (window.innerHeight - btn.offsetHeight);
  btn.style.position = "fixed";
  btn.style.left = `${x}px`;
  btn.style.top = `${y}px`;
  btn.style.zIndex = "9999";
}

function resetButtons() {
  spinBtn.style.fontSize = "";
  spinBtn.style.padding = "";
  spinBtn.style.transform = "";
  detailBtn.style.fontSize = "";
  detailBtn.style.padding = "";
  detailBtn.style.transform = "";
  detailBtn.style.display = "block";
  detailBtn.style.position = "static";
  detailBtn.style.zIndex = "";
  detailBtn.onmouseover = null;
  detailBtn.ontouchstart = null;
  detailBtn.onclick = null;
  noCount = 0;
}

spinBtn.onclick = function () {
  // ด่านที่ 1: บอกรัก
  if (gameStep === "start") {
    loveMessage.classList.add("show");
    spinBtn.innerText = "บอกรักแล้ว กดอีกที!";
    gameStep = "honesty_step";
    return;
  }

  // ด่านคั่น: ห้ามโกงนะ
  if (gameStep === "honesty_step") {
    loveMessage.classList.remove("show");
    titleText.innerText = "ห้ามโกงนะ ซื่อสัตย์เข้าใจมั้ย!! หมุนแค่รอบเดียว 😤";
    spinBtn.innerText = "รับทราบค้าบ";
    gameStep = "pre_question_step";
    return;
  }

  // ด่านคั่น: เค้ามีคำถาม
  if (gameStep === "pre_question_step") {
    titleText.innerText = "เค้ามีคำถาม ตอบเค้าก่อนน 🥺";
    spinBtn.innerText = "??";
    detailBtn.style.display = "none"; // ซ่อนปุ่มดูรายละเอียดในหน้านี้
    gameStep = "is_cute_step";
    return;
  }

  // ด่านที่ 2: แฟนน่ารักมั้ย?
  if (gameStep === "is_cute_step") {
    titleText.innerText = "แฟนน่ารักมั้ย? 💖";
    spinBtn.innerText = "น่ารัก";
    detailBtn.innerText = "ไม่น่ารัก";
    detailBtn.style.display = "block"; // คืนค่าปุ่มให้กลับมาโชว์
    gachaImg.src = happyGifs[2];
    detailBtn.onclick = handleNoPath;
    gameStep = "how_cute_step";
    return;
  }

  if (gameStep === "how_cute_step") {
    titleText.innerText = "น่ารักแค่ไหน? 🥰";
    spinBtn.innerText = "น่ารักมากก";
    detailBtn.style.display = "none";
    gachaImg.src = happyGifs[0];
    gameStep = "really_step";
    return;
  }

  if (gameStep === "really_step") {
    titleText.innerText = "จริงหรอ? 😳";
    spinBtn.innerText = "จริงงง";
    gachaImg.src = happyGifs[1];
    gameStep = "wish_luck_step";
    return;
  }

  if (gameStep === "wish_luck_step") {
    titleText.innerText = "ขอให้โชคดีนะแฟนนนนน 🥰";
    spinBtn.innerText = "หมุนเลย!";
    gachaImg.src = happyGifs[2];
    resetButtons();
    detailBtn.innerText = "ดูรายละเอียด";
    detailBtn.onclick = function () {
      detailModal.style.display = "flex";
    };
    gameStep = "ready_to_spin";
    return;
  }

  if (gameStep === "ready_to_spin") {
    startGacha();
  }
};

function handleNoPath() {
  noCount++;

  if (noCount <= sadGifs.length) {
    gachaImg.src = sadGifs[noCount - 1];
  }

  if (noCount === 1) {
    detailBtn.innerText = "จริงหรอ 🥺";
  } else if (noCount === 2) {
    detailBtn.innerText = "เค้าจะซึมเป็นส้วมเลยนะ 😥";
  } else if (noCount === 3) {
    detailBtn.innerText = "เค้าจะเศร้าจริงๆนะ 😭";
  } else if (noCount === 4) {
    detailBtn.innerText = "ขอร้อง 🥺";
  } else if (noCount === 5) {
    detailBtn.innerText = "ได้โปรดด.. 🥺";
  } else if (noCount === 6) {
    detailBtn.innerText = "เค้าจะไม่ให้หมุนแล้วนะ 😭";
  } else if (noCount === 7) {
    detailBtn.innerText = "ถ้าแฟนยังยืนยันที่จะตอบแบบนี้..";
  } else if (noCount === 8) {
    detailBtn.innerText = "จับเค้าให้ได้สิ 😏";
    const escape = (e) => {
      e.preventDefault();
      moveButton(detailBtn);
    };
    detailBtn.onmouseover = escape;
    detailBtn.ontouchstart = escape;
    detailBtn.onclick = escape;
  }

  if (noCount < 8) {
    const isMobile = window.innerWidth <= 600;
    const baseYesFont = isMobile ? 1.1 : 1.5;
    const baseYesPadH = isMobile ? 25 : 40;
    const baseYesPadV = isMobile ? 10 : 15;
    const baseNoFont = isMobile ? 0.9 : 1.2;
    const baseNoPadH = isMobile ? 15 : 30;
    const baseNoPadV = isMobile ? 8 : 12;

    const yesFontSize = baseYesFont + noCount * 0.15;
    const yesPaddingH = baseYesPadH + noCount * 8;
    const yesPaddingV = baseYesPadV + noCount * 4;

    const noFontSize = Math.max(0.6, baseNoFont - noCount * 0.05);
    const noPaddingH = Math.max(8, baseNoPadH - noCount * 2);
    const noPaddingV = Math.max(4, baseNoPadV - noCount * 1);

    spinBtn.style.fontSize = `${yesFontSize}rem`;
    spinBtn.style.padding = `${yesPaddingV}px ${yesPaddingH}px`;

    detailBtn.style.fontSize = `${noFontSize}rem`;
    detailBtn.style.padding = `${noPaddingV}px ${noPaddingH}px`;

    spinBtn.style.transform = "none";
    detailBtn.style.transform = "none";
  }
}

function startGacha() {
  resetButtons();
  detailBtn.innerText = "ดูรายละเอียด";
  detailBtn.onclick = function () {
    detailModal.style.display = "flex";
  };

  spinBtn.disabled = true;
  spinBtn.innerText = "กำลังหมุน...";
  gachaImg.src = `${animatedImg}?t=${new Date().getTime()}`;

  spinSound.currentTime = 0;
  spinSound.play();

  setTimeout(() => {
    spinSound.pause();
    spinSound.currentTime = 0;
    clatterSound.currentTime = 0;
    clatterSound.play();
    setTimeout(() => {
      clatterSound.pause();
      clatterSound.currentTime = 0;
    }, 1500);
  }, 2000);

  gachaImg.classList.add("shake");

  setTimeout(() => {
    gachaImg.classList.remove("shake");
    const randomIndex = Math.floor(Math.random() * rewards.length);
    const result = rewards[randomIndex];
    rewardText.innerText = result.text;
    resultModal.style.display = "flex";
    gachaImg.src = staticImg;
    spinBtn.disabled = false;
    spinBtn.innerText = "หมุนเลย!";
    gameStep = "start";
  }, 4000);
}

detailBtn.onclick = function () {
  detailModal.style.display = "flex";
};

closeBtns.forEach((btn) => {
  btn.onclick = function () {
    resultModal.style.display = "none";
    detailModal.style.display = "none";
  };
});

window.onclick = function (event) {
  if (event.target == resultModal || event.target == detailModal) {
    resultModal.style.display = "none";
    detailModal.style.display = "none";
  }
};

// --- ส่วนของการตกแต่งพื้นหลัง ---
const bgImages = [
  "images/background1.png",
  "images/background2.png",
  "images/background3.png",
  "images/background4.png",
];

function createBackgroundDecor() {
  const container = document.getElementById("bg-decorations");
  if (!container) return;

  const count = 16; // จำนวนรูปที่ต้องการสุ่ม

  for (let i = 0; i < count; i++) {
    const img = document.createElement("img");
    const randomImg = bgImages[Math.floor(Math.random() * bgImages.length)];
    img.src = randomImg;
    img.className = "bg-item";

    // สุ่มตำแหน่งโดยเว้นพื้นที่ตรงกลาง (30-70% แนวนอน และ 10-90% แนวตั้ง)
    let x, y;
    do {
      x = Math.random() * 100;
      y = Math.random() * 100;
    } while (x > 25 && x < 75 && y > 10 && y < 90);

    // สุ่มขนาด (60px - 140px)
    const size = 60 + Math.random() * 80;

    // สุ่มตัวแปรสำหรับ CSS Animation
    const rotation = Math.random() * 360;
    const duration = 6 + Math.random() * 10; // 6-16 วินาที
    const delay = Math.random() * 10; // 0-10 วินาที

    img.style.left = `${x}%`;
    img.style.top = `${y}%`;
    img.style.width = `${size}px`;

    // ส่งค่าผ่าน CSS Variables
    img.style.setProperty("--rot", `${rotation}deg`);
    img.style.setProperty("--duration", `${duration}s`);
    img.style.setProperty("--delay", `-${delay}s`); // ใช้ค่าลบเพื่อให้เริ่มแอนิเมชั่นทันทีแบบสุ่มเฟส

    container.appendChild(img);
  }
}

// เรียกใช้งานเมื่อโหลดหน้าเว็บ
createBackgroundDecor();
