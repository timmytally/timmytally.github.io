document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu elements
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const bars = document.querySelectorAll(".bar");
  const navOverlay = document.createElement("div");
  navOverlay.className = "nav-overlay";
  document.body.appendChild(navOverlay);

  // Theme toggle
  const themeToggle = document.getElementById("themeToggle");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  const currentTheme = localStorage.getItem("theme");

  // Set current year in footer
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  // Toggle mobile menu function
  function toggleMenu() {
    const isOpening = !navLinks.classList.contains("active");
    
    if (isOpening) {
      // Open menu
      navLinks.classList.add("active");
      navOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
      
      // Force reflow to enable transition
      void navLinks.offsetWidth;
      navLinks.classList.add("show");
      
      // Add active class to hamburger with delay for better UX
      setTimeout(() => {
        navToggle.classList.add("active");
      }, 10);
    } else {
      // Close menu
      navLinks.classList.remove("show");
      navOverlay.classList.remove("active");
      document.body.style.overflow = "";
      navToggle.classList.remove("active");
      
      // Remove active class after transition
      setTimeout(() => {
        navLinks.classList.remove("active");
      }, 300);
    }
  }

  // Mobile menu toggle click handler
  if (navToggle) {
    navToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleMenu();
    });
  }

  // Close menu when clicking on overlay
  navOverlay.addEventListener("click", function () {
    toggleMenu();
  });

  // Close menu when clicking outside on mobile
  document.addEventListener("click", function (e) {
    if (window.innerWidth <= 992 && navLinks.classList.contains("active") && 
        !e.target.closest('.nav-links') && !e.target.closest('.nav-toggle')) {
      toggleMenu();
    }
  });

  // Close menu when clicking on a link
  const navItems = document.querySelectorAll(".nav-links a");
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) {
        toggleMenu();
      }
    });
  });

  // Close menu on window resize if it goes above mobile breakpoint
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      if (window.innerWidth > 992 && navLinks.classList.contains("active")) {
        toggleMenu();
      }
    }, 250);
  });

  // Theme toggle functionality
  if (currentTheme === "dark" || (!currentTheme && prefersDarkScheme.matches)) {
    document.documentElement.setAttribute("data-theme", "dark");
    if (themeToggle) themeToggle.checked = true;
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    if (themeToggle) themeToggle.checked = false;
  }

  if (themeToggle) {
    themeToggle.addEventListener("change", function () {
      if (this.checked) {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
      }
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Form submission with EmailJS
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("form-message");
  const submitButton = document.getElementById("submit-button");
  const buttonText = document.getElementById("button-text");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Show loading state
      submitButton.classList.add("loading");
      formMessage.className = "form-message";
      formMessage.textContent = "";

      // Get form data
      const formData = {
        from_name: contactForm.name.value,
        from_email: contactForm.email.value,
        message: contactForm.message.value,
        to_email: "okeritimothy@gmail.com", // Your email address
      };

      // Send email using EmailJS
      emailjs
        .send("service_4t10y6c", "template_qaap8so", formData)
        .then(
          function (response) {
            console.log("SUCCESS!", response.status, response.text);
            // Show success message
            formMessage.textContent =
              "Thank you for your message! I will get back to you soon.";
            formMessage.className = "form-message success visible";
            // Reset form
            contactForm.reset();
          },
          function (error) {
            console.error("FAILED...", error);
            // Show error message
            formMessage.textContent =
              "Failed to send message. Please try again later or contact me directly at okeritimothy@gmail.com";
            formMessage.className = "form-message error visible";
          }
        )
        .finally(() => {
          // Remove loading state
          submitButton.classList.remove("loading");
          // Scroll to message
          formMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });
        });
    });
  }

  // Add animation on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(
      ".project-card, .about-content, .contact-content"
    );

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight - 100) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };

  // Set initial styles for animation
  document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(
      ".project-card, .about-content, .contact-content"
    );
    elements.forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(20px)";
      element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });

    // Initial check for elements in viewport
    setTimeout(animateOnScroll, 100);
  });

  // Check for elements in viewport on scroll
  window.addEventListener("scroll", animateOnScroll);
});
