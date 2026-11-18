import { walkingSafetyProducts } from "./walking-safety";
import { feedingHydration } from "./feeding-hydration";
import { comfortSleep } from "./comfort-sleep";
import { cleanCare } from "./clean-care";
import { toys } from "./toys";

export const productCategories = [
  {
    title: "Walking & Safety",
    slug: "walking-safety",
    description: "Collars, leashes, harnesses and more.",
    image: "/images/services/walk.png",
    products: walkingSafetyProducts,
  },
  feedingHydration,
  comfortSleep,
  cleanCare,
  toys,
];