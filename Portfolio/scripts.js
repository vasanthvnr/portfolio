document.addEventListener("DOMContentLoaded", function() {
  const roles = ["App Developer","Web Designer", "YouTuber",];
  const changingTextElement = document.querySelector(".text");
  let currentIndex = 0;

  function typeText(text, callback) {
      let index = 0;
      changingTextElement.textContent = ''; // Clear previous text
      changingTextElement.style.width = 'auto'; // Ensure width adjusts to text

      const typingInterval = setInterval(() => {
          if (index < text.length) {
              changingTextElement.textContent += text[index++];
          } else {
              clearInterval(typingInterval);
              setTimeout(() => {
                  // Clear text before starting next role
                  changingTextElement.textContent = '';
                  changingTextElement.style.width = 'auto'; // Reset width
                  callback();
              }, 1000); // Pause before starting next role
          }
      }, 100); // Speed of typing
  }

  function startTyping() {
      if (roles.length > 0) {
          typeText(roles[currentIndex], () => {
              currentIndex = (currentIndex + 1) % roles.length; // Move to the next role
              startTyping(); // Continue typing the next role
          });
      }
  }

  startTyping(); // Initiate typing effect

  // Smooth scrolling code
  document.querySelectorAll('.nav-links a').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const targetSection = document.querySelector(this.getAttribute('href'));
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const aboutSection = document.querySelector("#about");

  function animateAboutSection() {
    aboutSection.classList.add("visible");
  }

  // Smooth scrolling code
  document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetSection = document.querySelector(this.getAttribute('href'));
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

      if (targetSection.id === 'about') {
        animateAboutSection();
      }
    });
  });

  // Trigger animation if already in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateAboutSection();
      }
    });
  }, { threshold: 0.1 });

  observer.observe(aboutSection);
});
document.addEventListener("DOMContentLoaded", function () {
  const aboutSection = document.querySelector(".about-section");
  const aboutTextElement = document.getElementById("about-text");
  const aboutText = "I'm an undergraduate student of B.Tech Information Technology. I am a passionate and versatile developer specializing in web, app, and IoT development. With a strong foundation in software technology, my background includes creating intuitive web interfaces, robust mobile apps, and cutting-edge IoT solutions. My passion for innovation drives me to deliver quality software that meets user needs. I enjoy participating in coding challenges, contributing to open-source projects, and exploring tech trends. I am eager to explore new opportunities in software development, aiming to continue building innovative solutions that enhance user experience.";

  let textIndex = 0;

  function typeText() {
      if (textIndex < aboutText.length) {
          aboutTextElement.textContent += aboutText.charAt(textIndex);
          textIndex++;
          setTimeout(typeText, 50); // Typing speed (in milliseconds)
      }
  }

  function handleScroll() {
      const sectionPosition = aboutSection.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;

      if (sectionPosition < screenPosition) {
          aboutSection.classList.add('show');
          window.removeEventListener('scroll', handleScroll);
          typeText();
      }
  }

  window.addEventListener('scroll', handleScroll);
});
// Initialize EmailJS with your User ID
(function() {
  emailjs.init("txaCN5WAM5EZRs-z1");  // Replace with your EmailJS user ID
})();

document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault();  // Prevent the default form submission

  // Send the form data using EmailJS
  emailjs.sendForm("service_rgdmuvl", "template_n0oo7oa", this)
      .then(function() {
          // Show success message
          alert("Your message has been sent successfully!");
          document.getElementById("contact-form").reset();  // Reset the form after submission
      }, function(error) {
          // Show error message
          alert("There was an error sending your message. Please try again.");
      });
});
function toggleNav() {
  var sideNav = document.getElementById("side-nav");
  var body = document.body;

  // Toggle the side-nav
  sideNav.classList.toggle("open");

  // Disable or enable body scrolling based on the side-nav state
  if (sideNav.classList.contains("open")) {
    body.classList.add("side-nav-open");
  } else {
    body.classList.remove("side-nav-open");
  }
}

// Function to close the side navigation when a link is clicked
function closeNav() {
  var sideNav = document.getElementById("side-nav");
  var body = document.body;

  // Close the side navigation
  sideNav.classList.remove("open");
  body.classList.remove("side-nav-open");
}
