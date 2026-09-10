export type Project = {
  slug: string;
  name: string;
  location?: string;
  description: string;
  longDescription: string;
  role: string;
  tags: string[];
  year: string;
  bg: string;
  images: string[]; // needs at least 7 — first 3 are reused for the hover preview
  liveUrl: string;
};

export const projects: Project[] = [
  {
    slug: "The Good Fit",
    name: "The Good Fit",
    description: "A fashion e-commerce platform built on Shopify, designed to turn The Good Fit's brand into a clean, conversion-focused online shopping experience.",
    longDescription:
      "The Good Fit is a fashion e-commerce store built to give the brand a strong digital presence while keeping the shopping experience simple and intuitive. I worked on the storefront, product presentation, collection structure, and overall user experience, creating a responsive Shopify experience where customers can easily discover new releases, explore collections, and move from browsing to checkout. The result is a storefront that balances strong visual branding with the practical systems needed to run a real online fashion business.",
    role: "Shopify Developer",
    tags: ["Shopify", "E-commerce", "Web Development", "UI/UX"],
    year: "2026",
    bg: "#3A2E2A",
    images: [
  "/projects/good-fit/1.png",
  "/projects/good-fit/2.png",
  "/projects/good-fit/3.png",
  "/projects/good-fit/4.png",
  "/projects/good-fit/5.png",
  "/projects/good-fit/6.png",
  "/projects/good-fit/7.png",
],
    liveUrl: "https://thegoodfiteg.com/",
  },
  {
    slug: "Endlestudios",
    name: "Endlestudios",
    description: "A fashion-focused e-commerce platform built to bring a distinctive brand identity into a seamless online store.",
    longDescription:
      "Endless Studios is a fashion e-commerce experience built around the idea that the store should feel like an extension of the brand itself. From the visual direction and product presentation to the shopping experience and responsive interface, every part was designed to feel intentional, fast, and easy to navigate. The project combines strong digital branding with a practical e-commerce system, turning the brand's identity into a storefront that is made to convert without losing its character.",
    role: "Developer",
    tags: ["Shopify", "CSS"],
    year: "2026",
    bg: "#1F2937",
    images: [
  "/projects/endless/1.png",
  "/projects/endless/2.png",
  "/projects/endless/3.png",
  "/projects/endless/4.png",
  "/projects/endless/5.png",
  "/projects/endless/6.png",
  "/projects/endless/7.png",
],
    liveUrl: "https://endlestudios.com/",
  },
  {
    slug: "Trenk",
    name: "Trenk",
    description: "A bold streetwear e-commerce store built on Shopify for a young, expressive fashion brand.",
    longDescription:
      "TRENK is a Shopify-powered streetwear store built around bold graphics, clean cuts, and a strong youthful identity. The project focused on creating an e-commerce experience that makes the clothing the main focus while keeping browsing and purchasing simple across devices. From product presentation and collection structure to the overall storefront experience, the site was built to capture TRENK's energetic personality and turn it into a practical online fashion store.",
    role: "Shopify Developer",
    tags: ["Shopify", "E-commerce", "Web Development", "Fashion"],
    year: "2025",
    bg: "#2F3B2C",
    images: [
  "/projects/trenk/1.png",
  "/projects/trenk/2.png",
  "/projects/trenk/3.png",
  "/projects/trenk/4.png",
  "/projects/trenk/5.png",
  "/projects/trenk/6.png",
  "/projects/trenk/7.png",
],
    liveUrl: "https://trenk-eg.myshopify.com/",
  },
  {
    slug: "WrongInitals",
    name: "WrongInitals",
    description: "A fashion e-commerce store built to turn WrongIntials' visual identity into a clean, seamless online shopping experience.",
    longDescription:
      "WrongIntials is a fashion e-commerce experience designed around a simple, product-first approach. The site brings together the brand's collections, product presentation, and shopping experience into a storefront that feels clean and intentional across devices. Built on Shopify, the project focuses on making browsing, discovering collections, and purchasing products feel effortless while keeping the visual identity of the brand at the center of the experience.",
    role: "Developer",
    tags: ["Shopify", "C++"],
    year: "2025",
    bg: "#3B2A1F",
    images: [
  "/projects/wronginitials/1.png",
  "/projects/wronginitials/2.png",
  "/projects/wronginitials/3.png",
  "/projects/wronginitials/4.png",
  "/projects/wronginitials/5.png",
  "/projects/wronginitials/6.png",
  "/projects/wronginitials/7.png",
],
    liveUrl: "https://wrongintials.shop/",
  },
];