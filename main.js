// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  // 1. Hero Animations
  const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
  
  heroTl.to(".hero-title", {
    opacity: 1,
    y: 0,
    duration: 1.5,
  })
  .to(".hero-statement", {
    opacity: 1,
    y: 0,
    duration: 1,
  }, "-=1")
  .to(".scroll-indicator", {
    opacity: 1,
    duration: 1,
  }, "-=0.5");

  // Remove Parallax Fading. Implement Scroll-Scrubbed Scramble Effect.
  const scrambleElements = document.querySelectorAll(".scramble-text");
  const originalTexts = Array.from(scrambleElements).map(el => el.innerText);
  const chars = "!<>-_\\/[]{}—=+*^?#_";
  let lastProgress = -1;

  ScrollTrigger.create({
    trigger: "#hero",
    start: "top top",
    end: "bottom top",
    scrub: true,
    onUpdate: (self) => {
      const p = self.progress;
      
      // Update only every 5% progress to slow down the scramble flicker
      const steppedProgress = Math.floor(p * 20) / 20; 
      
      if (steppedProgress === lastProgress && p !== 0 && p !== 1) return;
      lastProgress = steppedProgress;
      
      const scramble = (text) => {
        // Ensure it's perfectly readable at exactly 0 progress
        if (p === 0) return text;
        
        let res = "";
        for (let i = 0; i < text.length; i++) {
          if (text[i] === " " || text[i] === "\n") {
            res += text[i];
          } else {
            // Scale the randomness intensity with the scroll progress
            if (Math.random() < p) {
              res += chars[Math.floor(Math.random() * chars.length)];
            } else {
              res += text[i];
            }
          }
        }
        return res;
      };

      scrambleElements.forEach((el, index) => {
        el.innerText = scramble(originalTexts[index]);
      });
    }
  });

  // 2. The Toxic Toll (Sticky Section Card Stack)
  const problemItems = gsap.utils.toArray(".problem-item");
  
  if (problemItems.length > 0) {
    // Initialize items 2 and 3 off-screen bottom
    gsap.set(problemItems.slice(1), { yPercent: 100 });

    const problemTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#problem",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    });

    // Slide up Card 2 over Card 1
    problemTl.to(problemItems[1], { yPercent: 0, duration: 1, ease: "none" })
             // Scale Card 1 slightly to emphasize stacking
             .to(problemItems[0], { scale: 0.95, duration: 1, ease: "none" }, "<")
             
             // Slide up Card 3 over Card 2
             .to(problemItems[2], { yPercent: 0, duration: 1, ease: "none" })
             // Scale Card 2 slightly to emphasize stacking
             .to(problemItems[1], { scale: 0.95, duration: 1, ease: "none" }, "<");
  }


  // 3. The Blueprint (Horizontal Scroll)
  const horizontalContainer = document.querySelector(".horizontal-scroll-container");
  
  // Get the total scrollable width (total width minus viewport width)
  const scrollWidth = horizontalContainer.scrollWidth - window.innerWidth;

  gsap.to(horizontalContainer, {
    x: () => -scrollWidth,
    ease: "none",
    scrollTrigger: {
      trigger: "#blueprint",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      invalidateOnRefresh: true, // Recalculate on resize
    }
  });

  // 4. Beyond The Peel — Immersive Full-Screen Rolodex
  const beyondCards = gsap.utils.toArray(".beyond-card");
  const beyondTexts = gsap.utils.toArray(".beyond-text");
  const beyondImgs = gsap.utils.toArray(".beyond-img");
  const beyondTitle = document.querySelector(".beyond-title");
  const beyondCounterWrap = document.querySelector(".beyond-counter-wrap");
  const beyondCounter = document.querySelector(".beyond-counter");
  const beyondProgress = document.querySelector(".beyond-progress");
  const totalCards = beyondCards.length;

  if (totalCards > 0) {
    // Initialize: stack all cards. First card visible and in color, rest below in grayscale.
    beyondCards.forEach((card, i) => {
      const img = card.querySelector(".beyond-img");
      const text = card.querySelector(".beyond-text");
      if (i === 0) {
        gsap.set(card, { yPercent: 0, zIndex: totalCards - i });
        gsap.set(img, { filter: "grayscale(0%)", scale: 1 });
        gsap.set(text, { opacity: 1, y: 0 });
      } else {
        gsap.set(card, { yPercent: 100, zIndex: totalCards - i });
        gsap.set(img, { filter: "grayscale(100%)", scale: 1.1 });
        gsap.set(text, { opacity: 0, y: 40 });
      }
    });

    // Master timeline
    const beyondTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#innovations",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
        onUpdate: (self) => {
          // Progress bar
          if (beyondProgress) {
            beyondProgress.style.width = (self.progress * 100) + "%";
          }
          // Counter
          if (beyondCounter) {
            const adjustedProgress = Math.max(0, (self.progress - 0.1) / 0.9);
            const idx = Math.min(Math.floor(adjustedProgress * totalCards), totalCards - 1);
            beyondCounter.textContent = String(idx + 1).padStart(2, "0");
          }
        }
      }
    });

    // Phase 0: Title holds for 1 viewport, then slides UP like it's being dragged away
    beyondTl.to(beyondTitle, {
      yPercent: -100,
      duration: 0.7,
      ease: "none"
    }, 0.8);

    // Fade in the counter after the title clears
    beyondTl.to(beyondCounterWrap, {
      opacity: 1,
      duration: 0.3,
      ease: "none"
    }, 1.3);

    // Phase 1+: Card transitions with dwell/hold zones
    const cardDuration = 1;     // Time for the actual slide transition
    const holdDuration = 0.5;   // Dwell time where card sits still (~half viewport)
    const stepSize = cardDuration + holdDuration; // Total time per card
    const startOffset = 1.5;    // Start cards after title has fully cleared

    for (let i = 0; i < totalCards - 1; i++) {
      // Each transition starts AFTER the previous card's hold zone
      const pos = startOffset + (i * stepSize);
      const currentImg = beyondCards[i].querySelector(".beyond-img");
      const currentText = beyondCards[i].querySelector(".beyond-text");
      const nextImg = beyondCards[i + 1].querySelector(".beyond-img");
      const nextText = beyondCards[i + 1].querySelector(".beyond-text");

      // Current card: scroll up and fade into oblivion
      beyondTl.to(beyondCards[i], {
        yPercent: -100,
        duration: cardDuration,
        ease: "none"
      }, pos)
      // Current image: go grayscale as it exits
      .to(currentImg, {
        filter: "grayscale(100%)",
        scale: 0.95,
        duration: cardDuration * 0.6,
        ease: "none"
      }, pos)
      // Current text: fade out
      .to(currentText, {
        opacity: 0,
        y: -30,
        duration: cardDuration * 0.4,
        ease: "none"
      }, pos)

      // Next card: slide up from below
      .to(beyondCards[i + 1], {
        yPercent: 0,
        duration: cardDuration,
        ease: "none"
      }, pos)
      // Next image: transition to full color with slight scale-down for focus
      .to(nextImg, {
        filter: "grayscale(0%)",
        scale: 1,
        duration: cardDuration * 0.6,
        ease: "none"
      }, pos + (cardDuration * 0.3))
      // Next text: fade in
      .to(nextText, {
        opacity: 1,
        y: 0,
        duration: cardDuration * 0.5,
        ease: "none"
      }, pos + (cardDuration * 0.4));
    }

    // Hold zone for the LAST card — same dwell as all others before section unpins
    const lastHoldPos = startOffset + ((totalCards - 1) * stepSize);
    beyondTl.to({}, { duration: holdDuration }, lastHoldPos);
  }

});

// 5. Back to top arrow — show after scrolling past hero
document.addEventListener("DOMContentLoaded", () => {
  const backToTop = document.getElementById("back-to-top");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > window.innerHeight * 0.8) {
        backToTop.style.opacity = "1";
        backToTop.style.pointerEvents = "auto";
        backToTop.style.cursor = "pointer";
      } else {
        backToTop.style.opacity = "0";
        backToTop.style.pointerEvents = "none";
      }
    });

    backToTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});


// 6. Fullscreen Map Overlay
document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("open-map-btn");
  const closeBtn = document.getElementById("close-map-btn");
  const overlay = document.getElementById("map-fullscreen");
  if (!openBtn || !closeBtn || !overlay) return;

  let fullscreenMap = null;

  const hubs = [
    // Lagos
    { coords: [6.6194, 3.5105], name: "Ikorodu Processing Hub", desc: "Lagos — Major garri hub" },
    { coords: [6.5568, 3.2590], name: "Alimosho Peel Depot", desc: "Lagos — Urban collection point" },
    { coords: [6.4579, 3.1580], name: "Ojo Industrial Hub", desc: "Lagos — Industrial processing" },
    // South-West
    { coords: [6.7980, 3.3515], name: "Sagamu Cluster", desc: "Ogun — Cassava processing corridor" },
    { coords: [7.1475, 3.3619], name: "Abeokuta Processing Zone", desc: "Ogun — Regional hub" },
    { coords: [7.3775, 3.9470], name: "Ibadan Agri-Hub", desc: "Oyo — Largest SW processing center" },
    { coords: [7.2571, 5.2103], name: "Akure Processing Center", desc: "Ondo — Peel collection depot" },
    // South-South
    { coords: [6.3350, 5.6037], name: "Benin City Hub", desc: "Edo — Cross-state processing" },
    { coords: [5.5167, 5.7500], name: "Warri Collection Point", desc: "Delta — Niger Delta hub" },
    { coords: [4.9517, 7.7227], name: "Uyo Agro-Industrial Zone", desc: "Akwa Ibom — Emerging hub" },
    { coords: [4.9757, 8.3417], name: "Calabar Processing Facility", desc: "Cross River — Export-ready" },
    // South-East
    { coords: [6.2094, 7.0684], name: "Onitsha Collection Hub", desc: "Anambra — Commercial corridor" },
    { coords: [5.4921, 7.0335], name: "Owerri Processing Center", desc: "Imo — High-volume peel supply" },
    // North-Central (cassava belt extension)
    { coords: [7.7337, 8.5213], name: "Makurdi Agri-Zone", desc: "Benue — Food basket of the nation" },
    { coords: [8.4899, 8.5137], name: "Lafia Processing Hub", desc: "Nasarawa — Emerging cassava zone" },
    { coords: [7.7969, 6.7333], name: "Lokoja Collection Point", desc: "Kogi — Central Nigeria hub" },
    { coords: [8.4799, 4.5418], name: "Ilorin Processing Center", desc: "Kwara — North-South link" },
    // North-East
    { coords: [8.0000, 11.3600], name: "Jalingo Pilot Hub", desc: "Taraba — Expansion pilot" }
  ];

  const markerStyle = {
    radius: 10,
    fillColor: "#D9480F",
    color: "#D9480F",
    weight: 2,
    opacity: 0.9,
    fillOpacity: 0.6
  };

  function openFullscreen() {
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";

    if (!fullscreenMap) {
      fullscreenMap = L.map("fullscreen-map", {
        center: [8.0, 7.5],  // Center of Nigeria
        zoom: 6,
        zoomControl: false,
        attributionControl: false
      });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        subdomains: "abcd",
        maxZoom: 19
      }).addTo(fullscreenMap);

      hubs.forEach(hub => {
        L.circleMarker(hub.coords, markerStyle)
          .addTo(fullscreenMap)
          .bindPopup(
            `<div style="font-family: 'JetBrains Mono', monospace; font-size: 13px;">
              <strong style="color: #D9480F;">${hub.name}</strong><br>
              <span style="color: #888;">${hub.desc}</span>
            </div>`
          );
      });

      L.control.zoom({ position: "bottomright" }).addTo(fullscreenMap);
    }

    // Recalculate after the transition completes
    setTimeout(() => fullscreenMap.invalidateSize(), 450);
  }

  function closeFullscreen() {
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  openBtn.addEventListener("click", openFullscreen);
  closeBtn.addEventListener("click", closeFullscreen);

  // Escape key closes
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("active")) {
      closeFullscreen();
    }
  });
});

// 7. Hero title glitch — swap between CYANIDE ZERO and CYAN_0
document.addEventListener("DOMContentLoaded", () => {
  const title = document.getElementById("hero-glitch-title");
  if (!title) return;

  const names = ["CYANIDE ZERO", "CYAN_0"];
  let current = 0;

  setInterval(() => {
    // Trigger glitch animation
    title.classList.add("glitching");

    // Swap text mid-glitch
    setTimeout(() => {
      current = current === 0 ? 1 : 0;
      title.textContent = names[current];
      title.setAttribute("data-text", names[current]);
    }, 150);

    // Remove glitch class after animation
    setTimeout(() => {
      title.classList.remove("glitching");
    }, 350);
  }, 4000);
});
