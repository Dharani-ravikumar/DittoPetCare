
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import Proceed from "@/components/Proceed";

const ITEMS_PER_PAGE = 3;

export default function CartDrawer({ isOpen, onClose }) {
  const [cartItems, setCartItems] = useState([]);
  const [showProceed, setShowProceed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Load cart
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = JSON.parse(
          localStorage.getItem("dittopetcare-cart") || "[]"
        );

        setCartItems(Array.isArray(savedCart) ? savedCart : []);
      } catch {
        setCartItems([]);
      }
    };

    loadCart();

    window.addEventListener("cartUpdated", loadCart);
    window.addEventListener("storage", loadCart);

    return () => {
      window.removeEventListener("cartUpdated", loadCart);
      window.removeEventListener("storage", loadCart);
    };
  }, []);

  // Reset when drawer opens
  useEffect(() => {
    if (isOpen) {
      setCurrentPage(1);
      setShowProceed(false);
    }
  }, [isOpen]);

  // Save cart
  const saveCart = (updatedCart) => {
    setCartItems(updatedCart);

    localStorage.setItem(
      "dittopetcare-cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Increase quantity
  const increaseQuantity = (key) => {
    const updatedCart = cartItems.map((item) =>
      item.key === key
        ? {
            ...item,
            quantity: Number(item.quantity || 1) + 1,
          }
        : item
    );

    saveCart(updatedCart);
  };

  // Decrease quantity
  const decreaseQuantity = (key) => {
    const updatedCart = cartItems.map((item) =>
      item.key === key
        ? {
            ...item,
            quantity: Math.max(
              1,
              Number(item.quantity || 1) - 1
            ),
          }
        : item
    );

    saveCart(updatedCart);
  };

  // Remove item
  const removeItem = (key) => {
    const updatedCart = cartItems.filter(
      (item) => item.key !== key
    );

    saveCart(updatedCart);
  };

  // Checkout
  const handleCheckout = () => {
    setShowProceed(true);
  };

  const handleCloseProceed = () => {
    setShowProceed(false);
  };

  // Cart calculations
  const cartCount = cartItems.reduce(
    (total, item) =>
      total + Number(item.quantity || 1),
    0
  );

  const cartTotal = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.quantity || 1),
    0
  );

  // Pagination
  const totalPages = Math.ceil(
    cartItems.length / ITEMS_PER_PAGE
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentItems = cartItems.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const goToPage = (page) => {
    setCurrentPage(
      Math.min(Math.max(page, 1), totalPages)
    );
  };

  // Keep page valid after removing products
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }

    if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [cartItems.length, totalPages, currentPage]);

  return (
    <>
      <AnimatePresence>
        {isOpen && !showProceed && (
          <>
            {/* BACKGROUND OVERLAY */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="
                fixed inset-x-0 bottom-0 top-[60px]
                z-[9998] bg-black/35
                backdrop-blur-[1px]
                md:top-[73px]
              "
            />

            {/* RIGHT SIDE CART DRAWER */}
            <motion.aside
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="
                fixed z-[9999]
                right-0
                top-[60px] bottom-0
                flex flex-col
                overflow-hidden
                rounded-l-[24px]
                border border-r-0 border-[#DCE9E5]
                bg-[#FAF7EE]
                shadow-2xl

                w-[90%] max-w-[400px]

                md:top-[73px]
                md:bottom-3
                md:right-0
                md:w-full
                md:max-w-[400px]
                md:rounded-l-[28px]
              "
            >
              {/* HEADER */}
              <div
                className="
                  relative z-20
                  flex shrink-0 items-center
                  justify-between
                  border-b border-[#DCE9E5]
                  bg-white
                  px-4 py-3
                  md:px-5 md:py-4
                "
              >
                <div>
                  <h2 className="text-sm font-bold text-[#244B49]">
                    Your Cart
                  </h2>

                  <p className="mt-1 text-xs text-[#526D68]">
                    {cartCount}{" "}
                    {cartCount === 1 ? "item" : "items"} in your bag
                  </p>
                </div>

                {/* CLOSE BUTTON */}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close cart"
                  className="
                    relative z-[10000]
                    flex h-10 w-10 shrink-0
                    items-center justify-center
                    rounded-full
                    border border-[#DCE9E5]
                    bg-[#E5F0EA]
                    text-[#244B49]
                    shadow-sm
                    transition
                    hover:bg-[#DDEFEA]
                    active:scale-95
                  "
                >
                  <X
                    size={21}
                    strokeWidth={2.5}
                    className="pointer-events-none"
                  />
                </button>
              </div>

              {/* CART PRODUCTS */}
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3 md:px-4 md:py-4">
                {cartItems.length === 0 ? (
                  <div className="flex min-h-full flex-col items-center justify-center text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#E5F0EA]">
                      <ShoppingBag
                        size={26}
                        className="text-[#287C78]"
                      />
                    </div>

                    <h3 className="text-sm font-bold text-[#244B49]">
                      Your cart is empty
                    </h3>

                    <p className="mt-2 max-w-[220px] text-xs leading-5 text-[#526D68]">
                      Looks like you haven't added anything to
                      your cart yet.
                    </p>

                    <Link
                      href="/products"
                      onClick={onClose}
                      className="mt-5 inline-block rounded-full bg-[#287C78] px-5 py-3 text-xs font-semibold text-white transition hover:bg-[#244B49]"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                ) : (
                  <>
                    {/* PRODUCT LIST */}
                    <div className="space-y-3">
                      <AnimatePresence mode="popLayout">
                        {currentItems.map((item) => (
                          <motion.div
                            key={item.key}
                            layout
                            initial={{ opacity: 0, x: 15 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -15 }}
                            className="
                              flex gap-3
                              rounded-[18px]
                              border border-[#DCE9E5]
                              bg-white p-3
                              shadow-sm
                              transition-colors
                              hover:border-[#B8D9D1]
                            "
                          >
                            {/* PRODUCT IMAGE */}
                            <div className="flex h-[68px] w-[68px] shrink-0 items-center justify-center overflow-hidden rounded-[14px] bg-[#F3F7F4]">
                              {item.image ? (
                                <img
                                  src={item.image}
                                  alt={
                                    item.modelName ||
                                    item.productName ||
                                    "Pet product"
                                  }
                                  className="h-full w-full object-contain p-1"
                                />
                              ) : (
                                <ShoppingBag
                                  size={24}
                                  className="text-[#B8D9D1]"
                                />
                              )}
                            </div>

                            {/* PRODUCT DETAILS */}
                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                  <h3 className="line-clamp-2 text-xs font-bold leading-4 text-[#244B49]">
                                    {item.modelName ||
                                      item.productName ||
                                      item.name}
                                  </h3>

                                  {item.color && (
                                    <p className="mt-1 text-xs text-[#526D68]">
                                      Colour: {item.color}
                                    </p>
                                  )}
                                </div>

                                <button
                                  type="button"
                                  onClick={() =>
                                    removeItem(item.key)
                                  }
                                  aria-label="Remove product"
                                  className="
                                    flex h-8 w-8 shrink-0
                                    items-center justify-center
                                    rounded-full
                                    text-[#9A7770]
                                    transition
                                    hover:bg-red-50
                                    hover:text-red-600
                                  "
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>

                              <p className="mt-2 text-xs font-bold text-[#287C78]">
                                ₹
                                {Number(item.price || 0).toFixed(2)}
                              </p>

                              {/* QUANTITY */}
                              <div className="mt-2 flex items-center justify-between gap-2">
                                <div className="flex items-center gap-1 rounded-full border border-[#DCE9E5] bg-[#FAF7EE] p-1">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      decreaseQuantity(item.key)
                                    }
                                    aria-label="Decrease quantity"
                                    className="
                                      flex h-6 w-6
                                      items-center justify-center
                                      rounded-full
                                      text-[#244B49]
                                      transition
                                      hover:bg-[#DDEFEA]
                                    "
                                  >
                                    <Minus size={11} />
                                  </button>

                                  <span className="min-w-5 text-center text-xs font-semibold text-[#244B49]">
                                    {item.quantity || 1}
                                  </span>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      increaseQuantity(item.key)
                                    }
                                    aria-label="Increase quantity"
                                    className="
                                      flex h-6 w-6
                                      items-center justify-center
                                      rounded-full
                                      text-[#244B49]
                                      transition
                                      hover:bg-[#DDEFEA]
                                    "
                                  >
                                    <Plus size={11} />
                                  </button>
                                </div>

                                <span className="text-xs font-semibold text-[#526D68]">
                                  ₹
                                  {(
                                    Number(item.price || 0) *
                                    Number(item.quantity || 1)
                                  ).toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>

                    {/* PAGINATION */}
                    {totalPages > 1 && (
                      <div className="mt-4 border-t border-[#DCE9E5] pt-3">
                        <div className="mb-2 text-center text-[10px] text-[#78908A]">
                          Showing {startIndex + 1}–
                          {Math.min(
                            startIndex + ITEMS_PER_PAGE,
                            cartItems.length
                          )}{" "}
                          of {cartItems.length} products
                        </div>

                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            aria-label="Previous page"
                            className="
                              flex h-8 w-8 items-center justify-center
                              rounded-full border border-[#DCE9E5]
                              bg-white text-[#287C78]
                              transition hover:bg-[#DDEFEA]
                              disabled:cursor-not-allowed
                              disabled:opacity-40
                            "
                          >
                            <ChevronLeft size={15} />
                          </button>

                          {Array.from(
                            { length: totalPages },
                            (_, index) => index + 1
                          ).map((page) => (
                            <button
                              key={page}
                              type="button"
                              onClick={() => goToPage(page)}
                              aria-label={`Go to page ${page}`}
                              aria-current={
                                currentPage === page
                                  ? "page"
                                  : undefined
                              }
                              className={`flex h-8 min-w-8 items-center justify-center rounded-full px-2 text-[10px] font-bold transition ${
                                currentPage === page
                                  ? "bg-[#287C78] text-white"
                                  : "border border-[#DCE9E5] bg-white text-[#526D68] hover:bg-[#DDEFEA]"
                              }`}
                            >
                              {page}
                            </button>
                          ))}

                          <button
                            type="button"
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            aria-label="Next page"
                            className="
                              flex h-8 w-8 items-center justify-center
                              rounded-full border border-[#DCE9E5]
                              bg-white text-[#287C78]
                              transition hover:bg-[#DDEFEA]
                              disabled:cursor-not-allowed
                              disabled:opacity-40
                            "
                          >
                            <ChevronRight size={15} />
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* CART FOOTER */}
              {cartItems.length > 0 && (
                <div
                  className="
                    shrink-0
                    border-t border-[#DCE9E5]
                    bg-white
                    px-4
                    pb-[max(12px,env(safe-area-inset-bottom))]
                    pt-3
                    md:px-5 md:pt-4
                  "
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#526D68]">
                      Subtotal
                    </span>

                    <span className="text-sm font-bold text-[#244B49]">
                      ₹{cartTotal.toFixed(2)}
                    </span>
                  </div>

                  <p className="mb-3 text-[11px] leading-4 text-[#78908A]">
                    Shipping and other charges will be calculated
                    at checkout.
                  </p>

                  {/* ACTION BUTTONS */}
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/products"
                      onClick={onClose}
                      className="
                        flex items-center justify-center
                        rounded-full
                        border border-[#287C78]
                        bg-white px-3 py-2.5
                        text-xs font-semibold
                        text-[#287C78]
                        transition hover:bg-[#E5F0EA]
                      "
                    >
                      Continue Shopping
                    </Link>

                    <button
                      type="button"
                      onClick={handleCheckout}
                      className="
                        flex items-center justify-center gap-1
                        rounded-full
                        bg-[#287C78]
                        px-3 py-2.5
                        text-xs font-semibold
                        text-white
                        transition hover:bg-[#244B49]
                      "
                    >
                      Proceed
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* PROCEED CHECKOUT */}
      <AnimatePresence>
        {isOpen && showProceed && (
          <Proceed onClose={handleCloseProceed} />
        )}
      </AnimatePresence>
    </>
  );
}
