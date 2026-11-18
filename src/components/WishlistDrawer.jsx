
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  X,
  ShoppingCart,
  Trash2,
  ShoppingBag,
  Check,
} from "lucide-react";

export default function WishlistDrawer({ isOpen, onClose }) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [addedKey, setAddedKey] = useState("");

  // Load and synchronize wishlist
  useEffect(() => {
    const loadWishlist = () => {
      try {
        const saved = JSON.parse(
          localStorage.getItem("dittopetcare-wishlist") || "[]"
        );
        setWishlistItems(Array.isArray(saved) ? saved : []);
      } catch {
        setWishlistItems([]);
      }
    };

    loadWishlist();
    window.addEventListener("wishlistUpdated", loadWishlist);
    window.addEventListener("storage", loadWishlist);

    return () => {
      window.removeEventListener("wishlistUpdated", loadWishlist);
      window.removeEventListener("storage", loadWishlist);
    };
  }, []);

  const saveWishlist = (updated) => {
    setWishlistItems(updated);
    localStorage.setItem(
      "dittopetcare-wishlist",
      JSON.stringify(updated)
    );
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  const removeItem = (key) => {
    saveWishlist(wishlistItems.filter((item) => item.key !== key));
  };

  // Add a wishlist item to the cart
  const addToCart = (item) => {
    let cart = [];

    try {
      const saved = JSON.parse(
        localStorage.getItem("dittopetcare-cart") || "[]"
      );
      cart = Array.isArray(saved) ? saved : [];
    } catch {
      cart = [];
    }

    const existing = cart.find((cartItem) => cartItem.key === item.key);

    const updatedCart = existing
      ? cart.map((cartItem) =>
          cartItem.key === item.key
            ? {
                ...cartItem,
                quantity: Number(cartItem.quantity || 1) + 1,
              }
            : cartItem
        )
      : [
          ...cart,
          {
            ...item,
            quantity: 1,
          },
        ];

    localStorage.setItem(
      "dittopetcare-cart",
      JSON.stringify(updatedCart)
    );
    window.dispatchEvent(new Event("cartUpdated"));

    setAddedKey(item.key);
    setTimeout(() => {
      setAddedKey((current) => current === item.key ? "" : current);
    }, 1600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay below Navbar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-x-0 bottom-0 top-[73px] z-[60] bg-black/40"
          />

          {/* Floating Wishlist Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-[73px] z-[70] flex h-[calc(100dvh-73px)] w-full max-w-[380px] flex-col rounded-l-[28px] bg-[#FAF7EE] shadow-2xl sm:max-w-[400px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between rounded-tl-[28px] border-b border-[#DCE9E5] bg-white px-4 py-4">
              <div>
                <div className="flex items-center gap-2">
                  <Heart size={17} className="text-[#287C78]" />
                  <h2 className="text-sm font-bold text-[#244B49]">
                    My Wishlist
                  </h2>
                </div>
                <p className="mt-1 text-xs text-[#526D68]">
                  {wishlistItems.length} saved{" "}
                  {wishlistItems.length === 1 ? "product" : "products"}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close wishlist"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E5F0EA] text-[#244B49] hover:bg-[#DDEFEA]"
              >
                <X size={16} />
              </button>
            </div>

            {/* Wishlist products */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              {wishlistItems.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#E5F0EA]">
                    <Heart size={27} className="text-[#287C78]" />
                  </div>
                  <h3 className="text-sm font-bold text-[#244B49]">
                    Your wishlist is empty
                  </h3>
                  <p className="mt-2 max-w-[230px] text-xs leading-5 text-[#526D68]">
                    Tap the heart on a product to save your favourites here.
                  </p>
                  <Link
  href="/products"
  onClick={onClose}
  className="mt-5 inline-flex rounded-full bg-[#287C78] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#244B49]"
>
  Explore Products
</Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {wishlistItems.map((item) => (
                    <div
                      key={item.key}
                      className="flex gap-3 rounded-[20px] border border-[#DCE9E5] bg-white p-3 shadow-sm"
                    >
                      {/* Image */}
                      <div className="flex h-[76px] w-[76px] shrink-0 items-center justify-center overflow-hidden rounded-[16px] bg-[#F3F7F4]">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.modelName || item.productName}
                            className="h-full w-full object-contain p-1"
                          />
                        ) : (
                          <ShoppingBag
                            size={24}
                            className="text-[#B8D9D1]"
                          />
                        )}
                      </div>

                      {/* Details */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h3 className="line-clamp-2 text-xs font-bold leading-4 text-[#244B49]">
                              {item.modelName || item.productName}
                            </h3>
                            {item.color && (
                              <p className="mt-1 text-xs text-[#526D68]">
                                Colour: {item.color}
                              </p>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(item.key)}
                            aria-label="Remove from wishlist"
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#9A7770] hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>

                        <p className="mt-2 text-xs font-bold text-[#287C78]">
                          ₹{Number(item.price || 0).toFixed(2)}
                        </p>

                        <button
                          type="button"
                          onClick={() => addToCart(item)}
                          className="mt-2 flex items-center justify-center gap-1.5 rounded-full bg-[#287C78] px-3 py-1.5 text-[10px] font-semibold text-white transition hover:bg-[#244B49]"
                        >
                          {addedKey === item.key ? (
                            <>
                              <Check size={12} />
                              Added to Cart
                            </>
                          ) : (
                            <>
                              <ShoppingCart size={12} />
                              Add to Cart
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {wishlistItems.length > 0 && (
              <div className="border-t border-[#DCE9E5] bg-white px-4 py-4">
                <p className="text-center text-xs leading-5 text-[#78908A]">
                  Keep your favourite pet essentials close at hand.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-3 w-full rounded-full border border-[#287C78] bg-[#287C78] px-4 py-2.5 text-xs font-semibold text-white hover:border-[#244B49] hover:bg-[#244B49]"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
} 
