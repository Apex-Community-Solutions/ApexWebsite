/**
 * Single source of truth for business facts used across the page.
 * Edit this file to change phone, services, gallery slides, or brand copy.
 */
window.SITE = {
  name: "Apex Community Solutions LLC",
  tagline: "Landscaping & Home Services",
  locationLine: "Landscaping & Home Services in the Greater Salt Lake Area",
  area: "Greater Salt Lake Area",
  areaServing: "Serving the Greater Salt Lake Area and surrounding communities",
  phone: "+14808095791",
  phoneDisplay: "(480) 809-5791",
  url: "https://www.apexcommunitysolutions.com/",
  image: "https://www.apexcommunitysolutions.com/images/og-cover.jpg",
  description: "Apex Community Solutions LLC provides landscaping, roofing, framing, decks, concrete, siding, and home repair services across the Greater Salt Lake Area.",
  priceRange: "$$",
  formAction: "https://formspree.io/f/xppzoknp",
  services: [
    "Landscaping",
    "Roofing",
    "Framing",
    "Decks, Porches, & Patios",
    "Concrete: Tear-Out & Replacement",
    "Hardie Board / Siding",
    "Soffit & Fascia",
    "Painting"
  ],
  otherServiceLabel: "Other / Not sure",
  // Each card shows one or two photos.
  // Add label: "Before" or label: "After" only when you want that tag on the picture.
  // A single photo stays the same size as one photo in a pair.
  // Add wide: true on a single-photo card to span the full width (for panoramic shots).
  gallery: [
    {
      title: "Concrete Stairs Installation",
      photos: [
        {
          src: "images/stairs_before_v2.jpeg",
          alt: "Cracked, worn concrete stairs before replacement — Apex Community Solutions concrete work",
          label: "Before"
        },
        {
          src: "images/stairs_after_v2.jpeg",
          alt: "New concrete stairs installed by Apex Community Solutions",
          label: "After"
        }
      ]
    },
    {
      title: "Driveway Installation",
      photos: [
        {
          src: "images/driveway_before.jpeg",
          alt: "Old, damaged driveway before replacement — Apex Community Solutions concrete driveway project",
          label: "Before"
        },
        {
          src: "images/driveway_after2.jpeg",
          alt: "Newly poured concrete driveway installed by Apex Community Solutions",
          label: "After"
        }
      ]
    },
    {
      title: "Garage Installation",
      photos: [
        {
          src: "images/garage_before.jpeg",
          alt: "Apex Community Solutions garage project",
          label: "Before"
        },
        {
          src: "images/garage_after.jpeg",
          alt: "In progress garage installation by Apex Community Solutions",
          label: "After"
        }
      ]
    },
    {
      title: "Landscaping",
      wide: true,
      photos: [
        {
          src: "images/landscaping_1.jpeg",
          alt: "Apex Community Solutions landscaping project"
        }
      ]
    },
    {
      title: "Landscaping",
      photos: [
        {
          src: "images/landscaping_2.jpeg",
          alt: "More landscaping installed by Apex Community Solutions"
        }
      ]
    },
    {
      title: "Basement Finishing",
      photos: [
        {
          src: "images/basement_1.jpeg",
          alt: "Apex Community Solutions basement finishing project"
        },
        {
          src: "images/basement_2.jpeg",
          alt: "More basement finishing installed by Apex Community Solutions"
        }
      ]
    },
    {
      title: "Foundation Work",
      photos: [
        {
          src: "images/foundation.jpeg",
          alt: "Wood foundation forms and rebar set on a gravel pad during a new build"
        }
      ]
    },
    {
      title: "Renovated Living Room",
      photos: [
        {
          src: "images/living_room.png",
          alt: "Finished and furnished living room"
        }
      ]
    },
    {
      title: "Outdoor Kitchen Installation",
      photos: [
        {
          src: "images/outdoor_kitchen.jpeg",
          alt: "In progress outdoor kitchen installation"
        }
      ]
    }
  ]
};
