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
             // Dim Card 1 slightly to emphasize stacking
             .to(problemItems[0], { scale: 0.95, opacity: 0.3, duration: 1, ease: "none" }, "<")
             
             // Slide up Card 3 over Card 2
             .to(problemItems[2], { yPercent: 0, duration: 1, ease: "none" })
             // Dim Card 2 slightly to emphasize stacking
             .to(problemItems[1], { scale: 0.95, opacity: 0.3, duration: 1, ease: "none" }, "<");
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

  // 4. Bento Box Reveal
  gsap.from(".bento-item", {
    scrollTrigger: {
      trigger: "#innovations",
      start: "top 80%",
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "power3.out"
  });

});
