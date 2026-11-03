/* =========================================================
   PRADIN INFRAA — shared site scripts
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Mobile navigation ---------- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("siteNav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // close the menu after a link is tapped
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Enquiry form → opens the visitor's email app ---------- */
  var form = document.getElementById("enquiryForm");
  var status = document.getElementById("formStatus");
  var COMPANY_EMAIL = "pradininfraa@gmail.com";

  function showStatus(msg, ok) {
    if (!status) return;
    status.textContent = msg;
    status.classList.add("show");
    status.style.background = ok ? "rgba(30,111,196,.1)" : "rgba(201,64,64,.1)";
    status.style.borderColor = ok ? "rgba(30,111,196,.4)" : "rgba(201,64,64,.4)";
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = (form.name.value || "").trim();
      var phone = (form.phone.value || "").trim();
      var email = (form.email.value || "").trim();
      var service = form.service.value;
      var message = (form.message.value || "").trim();

      if (!name || !phone) {
        showStatus("Please enter at least your name and phone number.", false);
        return;
      }

      var subject = "Website Enquiry — " + service + " — " + name;
      var body =
        "Name: " + name + "\n" +
        "Phone: " + phone + "\n" +
        "Email: " + (email || "—") + "\n" +
        "Service: " + service + "\n\n" +
        "Project details:\n" + (message || "—") + "\n";

      window.location.href =
        "mailto:" + COMPANY_EMAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      showStatus("Thanks " + name + "! Your email app should open with the enquiry ready to send to " + COMPANY_EMAIL + ".", true);
    });
  }
})();
