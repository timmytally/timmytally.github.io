document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const bars = document.querySelectorAll(".bar");

  // Theme toggle
  const themeToggle = document.getElementById("themeToggle");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  const currentTheme = localStorage.getItem("theme");

  // Set current year in footer
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  // Mobile menu functionality
  if (navToggle) {
    navToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active");

      // Animate hamburger to X
      bars[0].classList.toggle("rotate-45");
      bars[0].classList.toggle("translate-y-1.5");
      bars[1].classList.toggle("opacity-0");
      bars[2].classList.toggle("rotate--45");
      bars[2].classList.toggle("translate-y--1.5");
    });
  }

  // Close mobile menu when clicking on a link
  const navItems = document.querySelectorAll(".nav-links a");
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        // Reset hamburger icon
        bars[0].classList.remove("rotate-45", "translate-y-1.5");
        bars[1].classList.remove("opacity-0");
        bars[2].classList.remove("rotate--45", "translate-y--1.5");
      }
    });
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
