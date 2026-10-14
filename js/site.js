(function () {
  var site = window.SITE;
  if (!site) return;

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function setText(selector, value) {
    document.querySelectorAll(selector).forEach(function (el) {
      el.textContent = value;
    });
  }

  function telHref(phone) {
    return "tel:" + String(phone).replace(/[^\d+]/g, "");
  }

  function schemaTelephone(phone) {
    var digits = String(phone).replace(/\D/g, "");
    if (digits.length === 11 && digits.charAt(0) === "1") {
      return "+1-" + digits.slice(1, 4) + "-" + digits.slice(4, 7) + "-" + digits.slice(7);
    }
    return phone;
  }

  function photosFor(slide) {
    if (Array.isArray(slide.photos) && slide.photos.length) {
      return slide.photos.slice(0, 2);
    }

    if (slide.image || slide.src) {
      return [{
        src: slide.image || slide.src,
        alt: slide.alt || "",
        label: slide.label || ""
      }];
    }

    var tagged = slide.labels !== false;
    var photos = [];
    if (slide.before || slide.placeholder) {
      photos.push({
        src: slide.before,
        alt: slide.beforeAlt || "",
        label: tagged ? "Before" : "",
        placeholder: !slide.before
      });
    }
    if (slide.after) {
      photos.push({
        src: slide.after,
        alt: slide.afterAlt || "",
        label: tagged ? "After" : "",
        placeholder: false
      });
    }
    if (!photos.length) {
      photos.push({ placeholder: true, alt: "", label: "" });
    }
    return photos;
  }

  function figureHtml(photo, lazy, wide) {
    var src = photo.src;
    var alt = photo.alt || "";
    var inner;
    var width = wide ? 800 : 400;

    if (photo.placeholder || !src) {
      inner = '<div class="ba-placeholder">Photo coming soon</div>';
    } else {
      inner =
        '<img src="' + escapeHtml(src) + '" alt="' + escapeHtml(alt) +
        '" width="' + width + '" height="300"' + (lazy ? ' loading="lazy"' : "") + ">";
    }

    var caption = photo.label
      ? "<figcaption>" + escapeHtml(photo.label) + "</figcaption>"
      : "";

    return "<figure>" + inner + caption + "</figure>";
  }

  document.querySelectorAll("[data-phone-link]").forEach(function (el) {
    el.setAttribute("href", telHref(site.phone));
  });

  setText("[data-bind='name']", site.name);
  setText("[data-bind='tagline']", site.tagline);
  setText("[data-bind='location']", site.locationLine);
  setText("[data-bind='area']", site.areaServing);
  setText("[data-phone-display]", site.phoneDisplay);
  setText("[data-phone-cta]", "Call " + site.phoneDisplay);

  var countWords = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"];
  setText("[data-service-count]", countWords[site.services.length] || String(site.services.length));

  var logo = document.querySelector("[data-bind='logo-alt']");
  if (logo) logo.setAttribute("alt", site.name + " logo");

  var list = document.querySelector("[data-service-list]");
  if (list) {
    list.innerHTML = site.services.map(function (name) {
      return '<li class="service-row"><span class="service-mark"></span><span>' +
        escapeHtml(name) + "</span></li>";
    }).join("");
  }

  var select = document.querySelector("[data-service-select]");
  if (select) {
    var options = ['<option value="" disabled selected>Select a service</option>'];
    site.services.forEach(function (name) {
      options.push("<option>" + escapeHtml(name) + "</option>");
    });
    options.push("<option>" + escapeHtml(site.otherServiceLabel) + "</option>");
    select.innerHTML = options.join("");
  }

  var viewport = document.querySelector("[data-carousel-viewport]");
  if (viewport && site.gallery) {
    viewport.innerHTML = site.gallery.map(function (slide, i) {
      var photos = photosFor(slide);
      var wide = photos.length === 1 && !!(slide.wide || photos[0].wide);
      var hint = slide.placeholder
        ? '<span class="edit-hint">Photos coming soon</span>'
        : "";
      var pairClass = "ba-pair" + (photos.length === 1 ? " ba-single" : "") + (wide ? " ba-wide" : "");
      return (
        '<article class="carousel-slide">' +
          '<div class="gallery-card">' +
            '<div class="' + pairClass + '">' +
              photos.map(function (photo) {
                return figureHtml(photo, i > 0, wide);
              }).join("") +
            "</div>" +
            '<div class="gallery-caption">' + escapeHtml(slide.title) + hint + "</div>" +
          "</div>" +
        "</article>"
      );
    }).join("");
  }

  var form = document.querySelector("[data-quote-form]");
  if (form && site.formAction) form.setAttribute("action", site.formAction);

  var year = String(new Date().getFullYear());
  setText("[data-copyright]", "© " + year + " " + site.name + ". All rights reserved.");

  var jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: site.name,
    image: site.image,
    telephone: schemaTelephone(site.phone),
    priceRange: site.priceRange,
    description: site.description,
    areaServed: [{ "@type": "Place", name: site.area }],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: site.services.map(function (name) {
        return {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: name }
        };
      })
    },
    url: site.url
  };

  var existing = document.getElementById("jsonld-business");
  if (existing) existing.remove();
  var script = document.createElement("script");
  script.id = "jsonld-business";
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(jsonLd);
  document.head.appendChild(script);
})();
