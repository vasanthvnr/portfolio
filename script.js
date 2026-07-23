// =======================================================
// --- TYPING EFFECT (Hero Role Text) ---
// =======================================================
document.addEventListener("DOMContentLoaded", function() {
  const roles = ["App Developer", "Web Developer", "Salesforce Developer"];
  const changingTextElement = document.querySelector(".text");
  let currentIndex = 0;

  if (changingTextElement) {
    function typeText(text, callback) {
      let index = 0;
      changingTextElement.textContent = '';
      changingTextElement.style.width = 'auto';

      const typingInterval = setInterval(() => {
        if (index < text.length) {
          changingTextElement.textContent += text[index++];
        } else {
          clearInterval(typingInterval);
          setTimeout(() => {
            changingTextElement.textContent = '';
            changingTextElement.style.width = 'auto';
            callback();
          }, 1000);
        }
      }, 100);
    }

    function startTyping() {
      if (roles.length > 0) {
        typeText(roles[currentIndex], () => {
          currentIndex = (currentIndex + 1) % roles.length;
          startTyping();
        });
      }
    }

    startTyping();
  }

  // Smooth scrolling
  document.querySelectorAll('.nav-links a, .side-nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const targetSection = document.querySelector(href);
      if (!targetSection) return;
      e.preventDefault();
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
});

// =======================================================
// --- ABOUT SECTION REVEAL + TYPED BIO ---
// =======================================================
document.addEventListener("DOMContentLoaded", function() {
  const aboutSection = document.querySelector("#about");
  if (!aboutSection) return;

  function animateAboutSection() {
    aboutSection.classList.add("visible");
  }

  document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function() {
      if (this.getAttribute('href') === '#about') {
        animateAboutSection();
      }
    });
  });

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
  const aboutText = "I'm a passionate and versatile developer specializing in web, mobile app, Salesforce and IoT development. With a strong foundation in software engineering, my background spans building intuitive interfaces, robust backend services, and CRM integrations across 12+ shipped projects. I've represented my college at four national-level hackathons (GENESIZ'S, SIH, TEXUS, AAVISHKAAR) and completed a full-stack mobile development internship at Blakspire Pvt. Ltd. I enjoy tackling coding challenges, contributing to open-source, and exploring new tech — always aiming to build innovative, user-centered solutions.";

  if (!aboutSection || !aboutTextElement) return;

  let textIndex = 0;
  let typingStarted = false;

  function typeText() {
    if (textIndex < aboutText.length) {
      aboutTextElement.textContent += aboutText.charAt(textIndex);
      textIndex++;
      setTimeout(typeText, 12);
    }
  }

  function handleScroll() {
    const sectionPosition = aboutSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (sectionPosition < screenPosition && !typingStarted) {
      typingStarted = true;
      aboutSection.classList.add('show');
      window.removeEventListener('scroll', handleScroll);
      typeText();
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // in case already in view on load
});

// =======================================================
// --- MOBILE NAV TOGGLE ---
// =======================================================
function toggleNav() {
  var sideNav = document.getElementById("side-nav");
  var hamburger = document.querySelector(".hamburger-menu");
  var body = document.body;

  sideNav.classList.toggle("open");
  if (hamburger) hamburger.classList.toggle("active");

  if (sideNav.classList.contains("open")) {
    body.classList.add("side-nav-open");
  } else {
    body.classList.remove("side-nav-open");
  }
}

function closeNav() {
  var sideNav = document.getElementById("side-nav");
  var hamburger = document.querySelector(".hamburger-menu");
  var body = document.body;

  sideNav.classList.remove("open");
  if (hamburger) hamburger.classList.remove("active");
  body.classList.remove("side-nav-open");
}

// =======================================================
// --- THEME SWITCHER LOGIC ---
// =======================================================
document.addEventListener("DOMContentLoaded", function() {
  const themeToggleBtn = document.getElementById("theme-toggle");
  const sideThemeToggleBtn = document.getElementById("side-theme-toggle");
  const body = document.body;

  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "light") {
    body.classList.add("light-mode");
    updateToggleIcons(true);
  } else {
    updateToggleIcons(false);
  }

  function toggleTheme() {
    body.classList.toggle("light-mode");
    const isLight = body.classList.contains("light-mode");
    localStorage.setItem("theme", isLight ? "light" : "dark");
    updateToggleIcons(isLight);
  }

  function updateToggleIcons(isLight) {
    const iconClass = isLight ? "fas fa-sun" : "fas fa-moon";
    if (themeToggleBtn) {
      const icon = themeToggleBtn.querySelector("i");
      if (icon) icon.className = iconClass;
    }
    if (sideThemeToggleBtn) {
      const icon = sideThemeToggleBtn.querySelector("i");
      if (icon) icon.className = iconClass;
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", toggleTheme);
  }
  if (sideThemeToggleBtn) {
    sideThemeToggleBtn.addEventListener("click", function(e) {
      e.preventDefault();
      toggleTheme();
      setTimeout(closeNav, 300);
    });
  }
});

// =======================================================
// --- COPY TO CLIPBOARD LOGIC ---
// =======================================================
document.addEventListener("DOMContentLoaded", function() {
  const copyButtons = document.querySelectorAll(".copy-btn[data-copy]");
  const toast = document.getElementById("toast-copied");

  copyButtons.forEach(btn => {
    btn.addEventListener("click", function() {
      const textToCopy = this.getAttribute("data-copy");

      navigator.clipboard.writeText(textToCopy).then(() => {
        if (toast) {
          toast.classList.add("show");
          setTimeout(() => {
            toast.classList.remove("show");
          }, 2000);
        }

        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
          this.innerHTML = originalText;
        }, 2000);
      }).catch(err => {
        console.error("Could not copy text: ", err);
      });
    });
  });
});

// =======================================================
// --- BACK TO TOP BUTTON ---
// =======================================================
document.addEventListener("DOMContentLoaded", function() {
  const backToTopBtn = document.getElementById("back-to-top");
  if (!backToTopBtn) return;

  function toggleVisibility() {
    if (window.scrollY > 400) {
      backToTopBtn.classList.remove("hidden");
    } else {
      backToTopBtn.classList.add("hidden");
    }
  }

  window.addEventListener("scroll", toggleVisibility);
  toggleVisibility();

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// =======================================================
// --- LIVE GITHUB REPOSITORIES (auto-syncs all public repos) ---
// =======================================================
document.addEventListener("DOMContentLoaded", function() {
  const GITHUB_USERNAME = "vasanthvnr";
  const reposContainer = document.getElementById("github-repos");
  const filterContainer = document.getElementById("github-filter");
  const fallback = document.getElementById("github-fallback");

  if (!reposContainer) return;

  const LANG_COLORS = {
    JavaScript: "#f1e05a", HTML: "#e34c26", CSS: "#563d7c", Python: "#3572A5",
    Java: "#b07219", Dart: "#00B4AB", TypeScript: "#3178c6", "C++": "#f34b7d",
    C: "#555555", PHP: "#4F5D95", Shell: "#89e051", Jupyter: "#DA5B0B",
    Apex: "#1797c0", Ruby: "#701516", Go: "#00ADD8"
  };

  function langColor(lang) {
    return LANG_COLORS[lang] || "#8b949e";
  }

  function timeAgo(dateStr) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days < 1) return "today";
    if (days === 1) return "1 day ago";
    if (days < 30) return `${days} days ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} mo ago`;
    return `${Math.floor(months / 12)} yr ago`;
  }

  function renderRepos(repos) {
    reposContainer.innerHTML = "";

    if (!repos.length) {
      reposContainer.innerHTML = `<div class="github-loading"><span>No repositories to show for this filter.</span></div>`;
      return;
    }

    repos.forEach(repo => {
      const card = document.createElement("a");
      card.href = repo.html_url;
      card.target = "_blank";
      card.rel = "noopener";
      card.className = "github-repo-card";
      card.dataset.lang = repo.language || "Other";

      card.innerHTML = `
        <div class="repo-title">
          <i class="fas ${repo.fork ? 'fa-code-fork' : 'fa-book'}"></i>
          <span>${escapeHTML(repo.name)}</span>
        </div>
        <p class="repo-desc">${repo.description ? escapeHTML(repo.description) : 'No description provided.'}</p>
        <div class="repo-meta">
          ${repo.language ? `<span><span class="repo-lang-dot" style="background-color:${langColor(repo.language)}"></span>${escapeHTML(repo.language)}</span>` : ''}
          <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
          <span><i class="fas fa-code-fork"></i> ${repo.forks_count}</span>
          <span>Updated ${timeAgo(repo.updated_at)}</span>
        </div>
      `;
      reposContainer.appendChild(card);
    });
  }

  function buildFilters(repos) {
    if (!filterContainer) return;
    const languages = ["All", ...new Set(repos.map(r => r.language).filter(Boolean))];

    filterContainer.innerHTML = "";
    languages.forEach((lang, i) => {
      const btn = document.createElement("button");
      btn.className = "github-filter-btn" + (i === 0 ? " active" : "");
      btn.textContent = lang;
      btn.addEventListener("click", () => {
        filterContainer.querySelectorAll(".github-filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        if (lang === "All") {
          renderRepos(repos);
        } else {
          renderRepos(repos.filter(r => r.language === lang));
        }
      });
      filterContainer.appendChild(btn);
    });
  }

  function escapeHTML(str) {
    return String(str).replace(/[&<>'"]/g,
      tag => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
      }[tag] || tag)
    );
  }

  fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`)
    .then(res => {
      if (!res.ok) throw new Error("GitHub API error: " + res.status);
      return res.json();
    })
    .then(repos => {
      if (!Array.isArray(repos) || repos.length === 0) {
        throw new Error("No repos returned");
      }
      repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
      buildFilters(repos);
      renderRepos(repos);
      window.__vasanthRepoCount = repos.length;
    })
    .catch(err => {
      console.warn("Could not load GitHub repos live:", err);
      reposContainer.innerHTML = "";
      if (fallback) fallback.classList.remove("hidden");
    });
});

// =======================================================
// --- SMART CHATBOT WIDGET (intent-scoring engine) ---
// =======================================================
document.addEventListener("DOMContentLoaded", function() {
  const chatbotFab = document.getElementById("chatbot-fab");
  const chatbotWindow = document.getElementById("chatbot-window");
  const chatbotClose = document.getElementById("chatbot-close");
  const chatbotMessages = document.getElementById("chatbot-messages");
  const chatbotInput = document.getElementById("chatbot-input");
  const chatbotSend = document.getElementById("chatbot-send");
  const suggestions = document.querySelectorAll(".suggestion-chip");

  if (!chatbotFab || !chatbotWindow) return;

  chatbotFab.addEventListener("click", () => {
    chatbotWindow.classList.toggle("hidden");
    if (!chatbotWindow.classList.contains("hidden")) {
      chatbotInput.focus();
    }
  });

  chatbotClose.addEventListener("click", () => {
    chatbotWindow.classList.add("hidden");
  });

  suggestions.forEach(chip => {
    chip.addEventListener("click", () => {
      const text = chip.textContent;
      sendUserMessage(text);
      generateBotResponse(text);
    });
  });

  if (chatbotSend) {
    chatbotSend.addEventListener("click", handleSend);
  }

  if (chatbotInput) {
    chatbotInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        handleSend();
      }
    });
  }

  function handleSend() {
    const text = chatbotInput.value.trim();
    if (!text) return;
    chatbotInput.value = "";
    sendUserMessage(text);
    generateBotResponse(text);
  }

  function sendUserMessage(text) {
    const msgDiv = document.createElement("div");
    msgDiv.className = "message user";
    msgDiv.innerHTML = `<div class="message-content">${escapeHTML(text)}</div>`;
    chatbotMessages.appendChild(msgDiv);
    scrollToBottom();
  }

  function showTypingIndicator() {
    const indicatorDiv = document.createElement("div");
    indicatorDiv.className = "message assistant typing-indicator-msg";
    indicatorDiv.innerHTML = `
      <div class="message-content">
        <div class="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>`;
    chatbotMessages.appendChild(indicatorDiv);
    scrollToBottom();
    return indicatorDiv;
  }

  function sendAssistantMessage(text, indicator = null) {
    if (indicator) {
      indicator.remove();
    }
    const msgDiv = document.createElement("div");
    msgDiv.className = "message assistant";
    msgDiv.innerHTML = `<div class="message-content">${text}</div>`;
    chatbotMessages.appendChild(msgDiv);
    scrollToBottom();
  }

  function scrollToBottom() {
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g,
      tag => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
      }[tag] || tag)
    );
  }

  const LINK = (label, url) => `<a href='${url}' target='_blank' rel='noopener' style='color: var(--accent-cyan); font-weight: bold;'>${label}</a>`;

  // ---------------------------------------------------
  // Knowledge base — grouped, reusable answer fragments
  // ---------------------------------------------------
  const KB = {
    about: "Vasanth S is a final-year <b>B.Tech Information Technology</b> student at Vel Tech High Tech Dr Rangarajan Dr Sakunthala Engineering College (CGPA: 8.34). He's a passionate web, mobile app, and Salesforce developer who has shipped 12+ projects and competed in 4 national-level hackathons.",

    education: "<b>Education:</b><br>&bull; B.Tech Information Technology — Vel Tech High Tech Dr Rangarajan Dr Sakunthala Engineering College (2022–2026), CGPA: <b>8.34</b><br>&bull; HSC — Model Government School (2022), <b>83.1%</b><br>&bull; SSLC — Sri Vidyaa Mandhir Matric Higher Secondary School (2020), <b>94.2%</b>",

    experience: `<b>Internship:</b> Full-Stack Mobile App Development at <b>Blakspire Pvt. Ltd</b> (Dec 2024) — built a full-stack mobile app end-to-end (frontend + backend + API integration) using Flutter, Spring Boot, MySQL and Gemini AI.<br><br><b>Volunteer:</b> Secretary of the National Service Scheme (NSS) for 2 years (2022–24), managing events and initiatives.`,

    achievements: "<b>Achievements:</b><br>&bull; GENESIZ'S 2K24 @ Kongu<br>&bull; Smart India Hackathon (SIH) 2024 @ Vel Tech<br>&bull; TEXUS '24 @ SRM<br>&bull; AAVISHKAAR 2024 @ Vel Tech<br><br><b>Certification:</b> Java (PrepInsta)",

    contact: `You can reach Vasanth via:<br>&#x1F4E7; Email: ${LINK('vasanthvnr31@gmail.com', 'mailto:vasanthvnr31@gmail.com')}<br>&#x1F4DE; Mobile: ${LINK('+91 8838383300', 'tel:+918838383300')}<br>&#x1F4BC; LinkedIn: ${LINK('vasanth-s-5a1556246', 'https://www.linkedin.com/in/vasanth-s-5a1556246/')}`,

    resume: "You can download Vasanth's resume directly by clicking here: <br><a href='./Vasanth_IT_Resume.pdf' download class='btn' style='display:inline-block; margin-top:8px; padding:6px 12px; font-size:0.85em; text-decoration:none;'>Download CV / Resume</a>",

    linkedin: `Connect with Vasanth on LinkedIn: ${LINK('linkedin.com/in/vasanth-s-5a1556246', 'https://www.linkedin.com/in/vasanth-s-5a1556246/')}`,

    github: `Explore all of Vasanth's repositories on GitHub: ${LINK('github.com/vasanthvnr', 'https://github.com/vasanthvnr')} — or scroll to the "Live From GitHub" section on this page, which pulls every public repo automatically.`,

    skills: "<b>Technical Skills:</b><br>- Salesforce Admin & Developer<br>- Flutter (App Dev)<br>- MERN Stack &amp; Spring Boot<br>- Languages: Java, Python, SQL<br>- MySQL, MongoDB, IoT<br><br><b>Tools:</b> Git, Postman, Android Studio, Gemini AI<br><br><b>Soft Skills:</b><br>- Adaptability<br>- Logical Thinking<br>- Team Management<br>- Complex Problem Solving",

    projects: "Vasanth has worked on several key projects:<br>" +
      "1. <b>One Snap Mista</b> - Scans food/skincare ingredients for harmful substances (Flutter, Spring Boot)<br>" +
      "2. <b>Mechanic Garage Platform</b> - Full-stack garage booking platform (" + LINK("MERN", "https://github.com/vasanthvnr") + ")<br>" +
      "3. <b>Weather Detection App</b> - Live weather via OpenWeatherMap API (" + LINK("GitHub", "https://github.com/vasanthvnr/Weather-identify") + ")<br>" +
      "4. <b>Smart ServiceHub</b> - Salesforce Service &amp; Expense Management (" + LINK("GitHub", "https://github.com/vasanthvnr/Smart-ServiceHub-Salesforce") + ")<br>" +
      "5. <b>Mileage Tracker</b> - Salesforce Lightning Application (" + LINK("LinkedIn", "https://www.linkedin.com/posts/vasanth-s-5a1556246_lightninguiapplication-salesforce-salesforcedeveloper-activity-7340769983829811200-o_sw") + ")<br>" +
      "6. <b>Healthcare Analyzer</b> - Flutter mobile app (" + LINK("GitHub", "https://github.com/vasanthvnr/health_care") + ")<br>" +
      "7. <b>Web Analyze &amp; Debug</b> - Article-to-audio web tool (" + LINK("GitHub", "https://github.com/vasanthvnr/Analysis-and-Debugging-Web-Page") + ")<br>" +
      "8. <b>Indian Food Recipe</b> - Web cookbook (" + LINK("GitHub", "https://github.com/vasanthvnr/Indian-Receipe-Book") + ")<br>" +
      "9. <b>Med-Bridge Connections</b> - Healthcare resource network (" + LINK("GitHub", "https://github.com/vasanthvnr/Med-Bridge-Connecting-Networks") + ")<br>" +
      "10. <b>To-Do-List</b> - Flutter productivity app (" + LINK("GitHub", "https://github.com/vasanthvnr/To-Do-App-using-Flutter") + ")<br>" +
      "11. <b>Instant Safety Alert</b> - Women's safety network app (" + LINK("GitHub", "https://github.com/vasanthvnr/Women_Safety_App") + ")<br><br>" +
      "Scroll to the <b>Projects</b> section for details, or check the <b>Live From GitHub</b> section for every repo automatically.",

    salesforce: "<b>Salesforce Projects:</b><br>" +
      "&bull; <i>Smart ServiceHub</i>: Service &amp; Expense Management App (" + LINK("GitHub", "https://github.com/vasanthvnr/Smart-ServiceHub-Salesforce") + ")<br>" +
      "&bull; <i>Mileage Tracker</i>: Built with Lightning Web Components (" + LINK("LinkedIn", "https://www.linkedin.com/posts/vasanth-s-5a1556246_lightninguiapplication-salesforce-salesforcedeveloper-activity-7340769983829811200-o_sw") + ")",

    flutter: "<b>Flutter Mobile Apps:</b><br>" +
      "&bull; <i>One Snap Mista</i>: Scans food/skincare ingredients (Flutter + Spring Boot)<br>" +
      "&bull; <i>Healthcare Analyzer App</i>: Analyzes health metrics (" + LINK("GitHub", "https://github.com/vasanthvnr/health_care") + ")<br>" +
      "&bull; <i>To-Do-List App</i>: Task scheduler &amp; management (" + LINK("GitHub", "https://github.com/vasanthvnr/To-Do-App-using-Flutter") + ")",

    ml: "<b>Web &amp; Data Tools:</b><br>&bull; <i>Web Analyze &amp; Debug</i>: Extracts and filters article content, removes ads, converts pages into audio (" + LINK("GitHub", "https://github.com/vasanthvnr/Analysis-and-Debugging-Web-Page") + ")<br>&bull; <i>Weather Detection App</i>: Live weather data via OpenWeatherMap API (" + LINK("GitHub", "https://github.com/vasanthvnr/Weather-identify") + ")",

    webdev: "<b>Web Development:</b><br>" +
      "&bull; <i>Med-Bridge Connecting Networks</i>: Full-stack healthcare resource platform (" + LINK("GitHub", "https://github.com/vasanthvnr/Med-Bridge-Connecting-Networks") + ")<br>" +
      "&bull; <i>Indian Food Recipe Book</i>: Interactive cookbook (" + LINK("GitHub", "https://github.com/vasanthvnr/Indian-Receipe-Book") + ")<br>" +
      "&bull; <i>Mechanic Garage Platform</i>: MERN-stack booking platform with chat",

    hire: "Vasanth is open to <b>full-time roles and internships</b> in Web Development, Mobile App Development, and Salesforce. Feel free to reach out via email, phone, or LinkedIn — check the Contact section below, or just ask me for his contact info!",

    greeting: "Hello! &#x1F44B; How can I help you today? Feel free to ask about Vasanth's projects, skills, education, internship, achievements, contact info, or resume.",

    thanks: "You're welcome! &#x1F60A; Let me know if there's anything else you'd like to know about Vasanth.",

    bye: "Thanks for stopping by! &#x1F44B; Feel free to reach out anytime via the Contact section.",

    fallback: "I'm not sure I understood that fully. &#x1F605;<br><br>Try asking about <b>projects</b>, <b>skills</b>, <b>education</b>, <b>internship</b>, <b>achievements</b>, <b>LinkedIn/GitHub</b>, <b>contact info</b>, or <b>resume</b>."
  };

  // ---------------------------------------------------
  // Intent definitions: each has keyword/phrase weights.
  // Score-based matching (instead of brittle if/else chain)
  // so typos, word order, and phrasing variations still work.
  // ---------------------------------------------------
  const INTENTS = [
    { name: "greeting", reply: KB.greeting, keywords: ["hello", "hi", "hey", "hai", "greetings", "good morning", "good evening", "good afternoon", "yo"] },
    { name: "thanks", reply: KB.thanks, keywords: ["thank", "thanks", "thank you", "thx", "appreciate"] },
    { name: "bye", reply: KB.bye, keywords: ["bye", "goodbye", "see you", "later", "farewell"] },

    { name: "resume", reply: KB.resume, keywords: ["resume", "cv", "download", "pdf", "download cv", "download resume"] },

    { name: "linkedin", reply: KB.linkedin, keywords: ["linkedin", "linked in", "profile link"] },
    { name: "github", reply: KB.github, keywords: ["github", "git hub", "repo", "repository", "repositories", "source code"] },

    { name: "education", reply: KB.education, keywords: ["education", "degree", "college", "cgpa", "hsc", "sslc", "school", "study", "studies", "qualification", "academics", "university"] },

    { name: "experience", reply: KB.experience, keywords: ["experience", "internship", "intern", "blakspire", "work history", "job history", "volunteer", "nss", "worked"] },

    { name: "achievements", reply: KB.achievements, keywords: ["achievement", "achievements", "hackathon", "hackathons", "certificate", "certification", "certifications", "award", "genesiz", "aavishkaar", "texus", "smart india hackathon", "sih"] },

    { name: "hire", reply: KB.hire, keywords: ["hire", "hiring", "job opportunity", "available", "open to work", "looking for", "recruit", "opportunity", "collaborate", "freelance"] },

    { name: "salesforce", reply: KB.salesforce, keywords: ["salesforce", "crm", "servicehub", "lightning", "apex", "lwc", "mileage tracker", "mileage"] },
    { name: "flutter", reply: KB.flutter, keywords: ["flutter", "dart", "mobile app", "mobile", "android app", "to-do", "todo", "one snap", "snap mista", "healthcare app"] },
    { name: "ml", reply: KB.ml, keywords: ["machine learning", "ml", "debug", "debugging", "ai", "weather", "weather app", "weather detection", "openweathermap", "audio"] },
    { name: "webdev", reply: KB.webdev, keywords: ["med-bridge", "medbridge", "mechanic", "garage", "recipe", "food", "mern", "react", "web platform"] },

    { name: "projects", reply: KB.projects, keywords: ["project", "projects", "portfolio", "work", "show projects", "built", "made", "apps", "applications"] },

    { name: "skills", reply: KB.skills, keywords: ["skill", "skills", "languages", "language", "java", "python", "tech stack", "technologies", "expert", "expertise", "tools", "proficient"] },

    { name: "contact", reply: KB.contact, keywords: ["contact", "email", "phone", "call", "reach", "number", "mail", "whatsapp", "connect", "get in touch"] },

    { name: "about", reply: KB.about, keywords: ["about", "who is", "who's", "vasanth", "profile", "yourself", "introduce", "bio", "background"] }
  ];

  // Normalizes text: lowercase, strips punctuation, collapses whitespace
  function normalize(str) {
    return str.toLowerCase().replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
  }

  // Simple Levenshtein distance for typo tolerance on short words
  function levenshtein(a, b) {
    const m = a.length, n = b.length;
    if (m === 0) return n;
    if (n === 0) return m;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        dp[i][j] = a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
    return dp[m][n];
  }

  function scoreIntent(inputNorm, inputWords, intent) {
    let score = 0;
    intent.keywords.forEach(kw => {
      if (kw.includes(" ")) {
        // Multi-word phrase — direct substring match
        if (inputNorm.includes(kw)) score += 3;
      } else {
        // Single word — exact word match, or close-typo match for longer words
        if (inputWords.includes(kw)) {
          score += 2;
        } else if (kw.length > 3) {
          for (const w of inputWords) {
            if (w.length > 3 && levenshtein(w, kw) <= 1) {
              score += 1.5;
              break;
            }
          }
        }
      }
    });
    return score;
  }

  function generateBotResponse(userInput) {
    const indicator = showTypingIndicator();
    const inputNorm = normalize(userInput);
    const inputWords = inputNorm.split(" ");

    setTimeout(() => {
      let bestIntent = null;
      let bestScore = 0;

      INTENTS.forEach(intent => {
        const score = scoreIntent(inputNorm, inputWords, intent);
        if (score > bestScore) {
          bestScore = score;
          bestIntent = intent;
        }
      });

      const reply = (bestIntent && bestScore > 0) ? bestIntent.reply : KB.fallback;
      sendAssistantMessage(reply, indicator);
    }, 700);
  }
});
