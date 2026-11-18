
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import {
  Menu,
  X,
  PawPrint,
  Heart,
  ShoppingCart,
  CalendarDays,
  MessageCircle,
} from "lucide-react";

import CartDrawer from "@/components/CartDrawer";
import WishlistDrawer from "@/components/WishlistDrawer";

const navLinks = [
  { name: "Home", href: "/#home", match: "/" },
  { name: "Our Story", href: "/about", match: "/about" },
  {
    name: "Pet Wellness",
    href: "/why-pet-care-matters",
    match: "/why-pet-care-matters",
  },
  {
    name: "Pet Care",
    href: "/service/all",
    match: "/service",
  },
  {
    name: "Pet Essentials",
    href: "/products",
    match: "/products",
  },
  { name: "Get in Touch", href: "/contact", match: "/contact" },
];

// WhatsApp number with country code, without + or spaces.
const WHATSAPP_NUMBER = "919894899690";

export default function Navbar() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  // UPDATE CART AND WISHLIST COUNTS
  useEffect(() => {
    const updateCounts = () => {
      try {
        const cart = JSON.parse(
          localStorage.getItem("dittopetcare-cart") || "[]"
        );

        const wishlist = JSON.parse(
          localStorage.getItem("dittopetcare-wishlist") || "[]"
        );

        const totalCartItems = Array.isArray(cart)
          ? cart.reduce(
              (total, item) => total + Number(item.quantity || 1),
              0
            )
          : 0;

        setCartCount(totalCartItems);

        setWishlistCount(
          Array.isArray(wishlist) ? wishlist.length : 0
        );
      } catch {
        setCartCount(0);
        setWishlistCount(0);
      }
    };

    updateCounts();

    window.addEventListener("storage", updateCounts);
    window.addEventListener("cartUpdated", updateCounts);
    window.addEventListener("wishlistUpdated", updateCounts);

    return () => {
      window.removeEventListener("storage", updateCounts);
      window.removeEventListener("cartUpdated", updateCounts);
      window.removeEventListener("wishlistUpdated", updateCounts);
    };
  }, []);

  // CLOSE MOBILE MENU AFTER NAVIGATION
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // ACTIVE PAGE CHECK
  const isActive = (link) => {
    if (link.match === "/") {
      return pathname === "/";
    }

    // PET CARE: Active on all service categories and service details
    if (link.name === "Pet Care") {
      return (
        pathname === "/service" ||
        pathname.startsWith("/service/") ||
        pathname.startsWith("/service-details")
      );
    }

    // PET ESSENTIALS
    if (link.name === "Pet Essentials") {
      return (
        pathname === "/products" ||
        pathname.startsWith("/products/") ||
        pathname.startsWith("/product/")
      );
    }

    return (
      pathname === link.match ||
      pathname.startsWith(`${link.match}/`)
    );
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* ================= MOBILE NAVBAR ================= */}

      <header className="sticky top-0 z-[100] w-full bg-[#287C78] px-3 py-2.5 shadow-md lg:hidden">
        <div className="flex items-center justify-between gap-2">

          {/* MENU + BRAND */}

          <div className="flex min-w-0 items-center gap-2">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white transition hover:bg-white/15"
            >
              {menuOpen ? <X size={23} /> : <Menu size={23} />}
            </button>

            <Link
              href="/"
              onClick={closeMenu}
              className="flex min-w-0 items-center gap-1.5"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FAF7EE] text-[#287C78]">
                <PawPrint size={18} />
              </div>

              <span className="truncate text-sm font-extrabold tracking-tight text-white">
                DittoPetCare
              </span>
            </Link>
          </div>

          {/* WISHLIST + CART + BOOKING */}

          <div className="flex shrink-0 items-center gap-1">

            {/* WISHLIST */}

            <button
              type="button"
              onClick={() => setWishlistOpen(true)}
              aria-label="Open wishlist"
              className="relative flex h-9 w-9 items-center justify-center rounded-xl text-white transition hover:bg-white/15"
            >
              <Heart size={19} />

              {wishlistCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#FAF7EE] px-1 text-[9px] font-bold text-[#287C78]">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* CART */}

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label="Open cart"
              className="relative flex h-9 w-9 items-center justify-center rounded-xl text-white transition hover:bg-white/15"
            >
              <ShoppingCart size={19} />

              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#FAF7EE] px-1 text-[9px] font-bold text-[#287C78]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* BOOKING */}

            <Link
              href="/booking"
              aria-label="Book appointment"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FAF7EE] text-[#287C78] shadow-sm transition hover:bg-[#DDEFEA]"
            >
              <CalendarDays size={19} />
            </Link>
          </div>
        </div>

        {/* MOBILE SLIDING MENU */}

        <AnimatePresence>
          {menuOpen && (
            <>
              {/* BACKDROP */}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.35 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={closeMenu}
                className="fixed inset-0 z-[110] bg-[#163B39]"
              />

              {/* MENU PANEL */}

              <motion.div
                initial={{ opacity: 0, x: -280 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -280 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute left-0 top-full z-[120] w-[65%] max-w-[260px] overflow-hidden rounded-br-2xl border border-[#DCE9E5] bg-[#FAF7EE] shadow-2xl"
              >
                <nav className="flex flex-col gap-1 p-3">
                  {navLinks.map((link) => {
                    const active = isActive(link);

                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={closeMenu}
                        className={`relative rounded-lg px-3 py-2.5 text-xs font-semibold transition-all duration-200 ${
                          active
                            ? "bg-[#DDEFEA] text-[#287C78]"
                            : "text-[#244B49] hover:bg-[#DDEFEA] hover:text-[#287C78]"
                        }`}
                      >
                        {link.name}

                        {active && (
                          <motion.span
                            layoutId="mobile-active-underline"
                            className="absolute bottom-1.5 left-3 right-3 h-[2px] rounded-full bg-[#287C78]"
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 30,
                            }}
                          />
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* ================= DESKTOP NAVBAR ================= */}

      <header className="sticky top-0 z-[100] hidden w-full border-b border-white/10 bg-[#287C78] shadow-md lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">

          {/* BRAND */}

          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FAF7EE] text-[#287C78]">
              <PawPrint size={24} />
            </div>

            <span className="text-xl font-extrabold tracking-tight text-white">
              DittoPetCare
            </span>
          </Link>

          {/* NAVIGATION LINKS */}

          <nav className="flex items-center gap-7">
            {navLinks.map((link) => {
              const active = isActive(link);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative py-2 text-xs font-semibold transition-colors duration-200 ${
                    active
                      ? "text-[#FAF7EE]"
                      : "text-white hover:text-[#B8D9D1]"
                  }`}
                >
                  {link.name}

                  {active && (
                    <motion.span
                      layoutId="desktop-active-underline"
                      className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-[#FAF7EE]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ACTION BUTTONS */}

          <div className="flex items-center gap-3">

            {/* WISHLIST */}

            <button
              type="button"
              onClick={() => setWishlistOpen(true)}
              aria-label="Open wishlist"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-white/15"
            >
              <Heart size={21} />

              {wishlistCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#FAF7EE] px-1 text-[10px] font-bold text-[#287C78]">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* CART */}

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label="Open cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-white/15"
            >
              <ShoppingCart size={21} />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#FAF7EE] px-1 text-[10px] font-bold text-[#287C78]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* BOOKING */}

            <Link
              href="/booking"
              className="ml-2 flex items-center gap-2 rounded-full bg-[#FAF7EE] px-5 py-3 text-xs font-bold text-[#287C78] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#DDEFEA]"
            >
              <CalendarDays size={17} />
              Book Appointment
            </Link>
          </div>
        </div>
      </header>

      {/* ================= WHATSAPP FLOATING BUTTON ================= */}

      <motion.a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{
          opacity: 1,
          scale: [1, 1.06, 1],
          y: [0, -5, 0],
        }}
        transition={{
          opacity: { duration: 0.4 },
          scale: {
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          },
          y: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        whileHover={{
          scale: 1.15,
          y: -3,
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-5 right-5 z-[95] flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/20 hover:bg-[#1DA851]"
      >
        <MessageCircle size={25} />
      </motion.a>

      {/* ================= DRAWERS ================= */}

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
      />

      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
      />
    </>
  );
}
