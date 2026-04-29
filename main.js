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

  // Hero Parallax on Scroll
  gsap.to(".hero-title", {
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
    y: 200,
    opacity: 0,
  });

  gsap.to(".hero-statement", {
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
    y: 100,
    opacity: 0,
  });

  // 2. The Toxic Toll (Sticky Section Crossfades)
  const problemItems = gsap.utils.toArray(".problem-item");
  const totalItems = problemItems.length;
  
  // Create a timeline mapped to the scroll progress of the #problem section
  const problemTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#problem",
      start: "top top",
      end: "bottom bottom",
      scrub: 1, // Smooth scrubbing
    }
  });

  // We have 3 items. Item 1 is already visible (opacity 1).
  // We fade out Item 1, fade in Item 2, fade out Item 2, fade in Item 3.
  problemItems.forEach((item, i) => {
    if (i !== 0) {
      // Fade in current item
      problemTl.to(item, { opacity: 1, duration: 1 }, `+=${i * 0.5}`);
    }
    if (i !== totalItems - 1) {
      // Fade out current item
      problemTl.to(item, { opacity: 0, duration: 1 }, `+=${(i + 1) * 0.5}`);
    }
  });


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
