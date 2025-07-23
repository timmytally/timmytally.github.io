// DOM Elements
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navLinksItems = document.querySelectorAll(".nav-links li");
const header = document.querySelector('header');
const sections = document.querySelectorAll('section');
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Initialize Intersection Observer for scroll animations
function initScrollObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optional: Unobserve after first trigger
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections
  sections.forEach(section => observer.observe(section));
}

// Navbar scroll effect
function setupNavbarScroll() {
  if (!header) return;
  
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove scrolled class to header
    if (currentScroll > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll
    if (currentScroll <= 0) {
      header.classList.remove('scroll-up');
      return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
      // Scroll Down
      header.classList.remove('scroll-up');
      header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
      // Scroll Up
      header.classList.remove('scroll-down');
      header.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
  });
}

// Mobile menu functionality
function setupMobileMenu() {
  if (!hamburger || !navLinks) return;
  
  // Toggle mobile menu
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  // Close mobile menu when clicking on a nav link
  navLinksItems.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
      document.body.style.overflow = '';
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !e.target.closest('.nav-links') && 
        !e.target.closest('.hamburger')) {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// Enhanced smooth scrolling for anchor links
function setupSmoothScrolling() {
  if (!header || !navLinks || !hamburger) return;
  
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = header.offsetHeight;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const scrollPosition = elementPosition + window.pageYOffset - headerHeight;
        
        // Smooth scroll to target
        window.scrollTo({
          top: scrollPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          hamburger.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
    });
  });
}

// Update year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Add scroll animation for sections
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});

// Form submission handling
const contactForm = document.querySelector(".contact-form form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const formObject = {};

    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    // Here you would typically send the form data to a server
    console.log("Form submitted:", formObject);

    // Show success message
    alert("Thank you for your message! I will get back to you soon.");
    this.reset();
  });
}

// Add animation class to hero section on load
document.addEventListener("DOMContentLoaded", () => {
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    heroContent.classList.add("animate");
  }
});

// Add scroll reveal animation
window.addEventListener("scroll", revealOnScroll);

function revealOnScroll() {
  const elements = document.querySelectorAll(
    ".project-card, .about-content > div, .contact-content > div"
  );

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("reveal");
    }
  });
}

// Theme Management
function initTheme() {
  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set theme based on saved preference or system preference
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    html.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    html.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    // Only update if user hasn't set a preference
    if (!localStorage.getItem('theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      html.setAttribute('data-theme', newTheme);
    }
  });
  
  // Toggle theme on button click
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      // Update theme
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Add transition class for smooth transition
      document.body.classList.add('theme-transition');
      setTimeout(() => document.body.classList.remove('theme-transition'), 300);
    });
  }
}

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
  // Initialize theme first
  initTheme();
  
  // Add visible class to hero section immediately
  const hero = document.querySelector('.hero');
  if (hero) hero.classList.add('visible');
  
  // Initialize all animations and event listeners
  initScrollObserver();
  setupSmoothScrolling();
  initScrollReveal();
  setupNavbarScroll();
  setupMobileMenu();
});

function initSmoothScroll() {
  // Smooth scroll for anchor links with offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

function initScrollReveal() {
  // Add any scroll reveal animations here
  const fadeElements = document.querySelectorAll('.fade-in, [class*="fade-in-"]');
  
  fadeElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    
    // Staggered delay for elements with fade-in class
    if (el.classList.contains('fade-in')) {
      el.style.transitionDelay = `${0.1 * (index % 5)}s`;
    }
  });
  
  const revealOnScroll = () => {
    fadeElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Initial check
  revealOnScroll();
  
  // Check on scroll
  window.addEventListener('scroll', revealOnScroll);
}

// 3D Tilt Effect
function addTiltEffect(element) {
  element.addEventListener("mousemove", (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  });

  element.addEventListener("mouseleave", () => {
    element.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
  });
}

// Apply 3D tilt to elements
document.addEventListener("DOMContentLoaded", () => {
  // Apply to project cards
  document.querySelectorAll(".project-card").forEach((card) => {
    addTiltEffect(card);
    card.style.transition = "transform 0.3s ease-out";
  });

  // Apply to testimonials
  document.querySelectorAll(".testimonial").forEach((testimonial) => {
    addTiltEffect(testimonial);
    testimonial.style.transition =
      "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
  });

  // Add parallax effect to hero section
  const hero = document.querySelector(".hero");
  if (hero) {
    window.addEventListener("mousemove", (e) => {
      const x = (window.innerWidth / 2 - e.pageX) / 50;
      const y = (window.innerHeight / 2 - e.pageY) / 50;
      hero.style.backgroundPosition = `${x}px ${y}px`;
    });
  }
});

// Add subtle 3D effect to skill tags
document.querySelectorAll(".skill-tags span").forEach((tag) => {
  tag.addEventListener("mousemove", (e) => {
    const rect = tag.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    tag.style.transform = `translateY(-3px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  tag.addEventListener("mouseleave", () => {
    tag.style.transform = "translateY(0) rotateX(0) rotateY(0)";
  });
});

// Add 3D effect to buttons
const buttons = document.querySelectorAll(".cta-button, .submit-btn");
buttons.forEach((button) => {
  button.addEventListener("mousemove", (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    button.style.transform = `translateY(-3px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "translateY(0) rotateX(0) rotateY(0)";
  });
});
