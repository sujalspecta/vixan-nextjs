// src/utils/utils.js

export const animationCreate = async () => {
  if (typeof window === "undefined") return;

  const module = await import("wowjs");
  const WOW = module.default;

  if (typeof WOW === "function") {
    new WOW({
      live: false,
    }).init();
  }
};
