
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { productCategories } from "@/data/products/index";

import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  Check,
  ShieldCheck,
  Truck,
  RefreshCw,
  Package,
} from "lucide-react";

export default function ProductDetailsClient({ slug }) {
  const [selectedModelId, setSelectedModelId] = useState(null);
  const [selectedColorName, setSelectedColorName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState([]);
  const [added, setAdded] = useState(false);

  // FIND PRODUCT
  const productInfo = useMemo(() => {
    for (const category of productCategories) {
      const product = (category.products || []).find(
        (item) => item.slug === slug
      );

      if (product) {
        return { product, category };
      }
    }

    return null;
  }, [slug]);

  const product = productInfo?.product;
  const category = productInfo?.category;

  // SELECTED MODEL
  const selectedModel = useMemo(() => {
    if (!product?.models?.length) return null;

    return (
      product.models.find(
        (model) => String(model.id) === String(selectedModelId)
      ) || product.models[0]
    );
  }, [product, selectedModelId]);

  // COLOUR OPTIONS
  const colors = selectedModel?.colors || [];

  const selectedColor =
    colors.find((color) => color.name === selectedColorName) ||
    colors[0] ||
    null;

  // PRODUCT IMAGE
  const productImage =
    selectedColor?.image ||
    selectedModel?.image ||
    product?.image ||
    "/images/placeholder.png";

  const itemKey = selectedModel
    ? `${product.slug}-${selectedModel.id}-${(
        selectedColor?.name || "default"
      ).toLowerCase()}`
    : "";

  // LOAD WISHLIST
  useEffect(() => {
    const syncWishlist = () => {
      try {
        const saved = JSON.parse(
          localStorage.getItem("dittopetcare-wishlist") || "[]"
        );

        setWishlist(Array.isArray(saved) ? saved : []);
      } catch {
        setWishlist([]);
      }
    };

    syncWishlist();

    window.addEventListener("wishlistUpdated", syncWishlist);
    window.addEventListener("storage", syncWishlist);

    return () => {
      window.removeEventListener("wishlistUpdated", syncWishlist);
      window.removeEventListener("storage", syncWishlist);
    };
  }, []);

  const isWishlisted = wishlist.some(
    (item) => item.key === itemKey
  );

  // TOGGLE WISHLIST
  const toggleWishlist = () => {
    if (!selectedModel) return;

    let savedWishlist = [];

    try {
      const saved = JSON.parse(
        localStorage.getItem("dittopetcare-wishlist") || "[]"
      );

      savedWishlist = Array.isArray(saved) ? saved : [];
    } catch {
      savedWishlist = [];
    }

    const exists = savedWishlist.some(
      (item) => item.key === itemKey
    );

    const updatedWishlist = exists
      ? savedWishlist.filter((item) => item.key !== itemKey)
      : [
          ...savedWishlist,
          {
            key: itemKey,
            productSlug: product.slug,
            productName: product.name,
            modelId: selectedModel.id,
            modelName: selectedModel.name,
            color: selectedColor?.name || null,
            price: selectedModel.price,
            image: productImage,
          },
        ];

    localStorage.setItem(
      "dittopetcare-wishlist",
      JSON.stringify(updatedWishlist)
    );

    setWishlist(updatedWishlist);
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  // ADD TO CART
  const addToCart = () => {
    if (!selectedModel) return;

    let savedCart = [];

    try {
      const saved = JSON.parse(
        localStorage.getItem("dittopetcare-cart") || "[]"
      );

      savedCart = Array.isArray(saved) ? saved : [];
    } catch {
      savedCart = [];
    }

    const existingItem = savedCart.find(
      (item) => item.key === itemKey
    );

    const updatedCart = existingItem
      ? savedCart.map((item) =>
          item.key === itemKey
            ? {
                ...item,
                quantity: Number(item.quantity || 1) + quantity,
              }
            : item
        )
      : [
          ...savedCart,
          {
            key: itemKey,
            productSlug: product.slug,
            productName: product.name,
            modelId: selectedModel.id,
            modelName: selectedModel.name,
            color: selectedColor?.name || null,
            price: selectedModel.price,
            image: productImage,
            quantity,
          },
        ];

    localStorage.setItem(
      "dittopetcare-cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(new Event("cartUpdated"));

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // CHANGE MODEL
  const changeModel = (model) => {
    setSelectedModelId(model.id);
    setSelectedColorName("");
    setQuantity(1);
    setAdded(false);
  };

  // PRODUCT NOT FOUND
  if (!productInfo || !product) {
    return (
      <main className="min-h-screen bg-[#FAF7EE]">
        <Navbar />

        <div className="mx-auto max-w-6xl px-4 py-20 text-center">
          <Package
            size={35}
            className="mx-auto text-[#B8D9D1]"
          />

          <h1 className="mt-3 text-base font-bold text-[#244B49]">
            Product Not Found
          </h1>

          <p className="mt-2 text-xs text-[#526D68]">
            Sorry, this product is not available.
          </p>

          <Link
            href="/#products"
            className="mt-5 inline-flex rounded-lg bg-[#287C78] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#244B49]"
          >
            Back to Shop
          </Link>
        </div>

        <Footer />
      </main>
    );
  }

  // NO MODELS
  if (!selectedModel) {
    return (
      <main className="min-h-screen bg-[#FAF7EE]">
        <Navbar />

        <div className="mx-auto max-w-6xl px-4 py-20 text-center">
          <h1 className="text-base font-bold text-[#244B49]">
            Product models are not available yet.
          </h1>

          <Link
            href={`/products/${category.slug}`}
            className="mt-4 inline-block text-xs font-semibold text-[#287C78]"
          >
            Back to {category.title}
          </Link>
        </div>

        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF7EE]">
      <Navbar />

      {/* BREADCRUMB */}
      <section className="px-4 pb-3 pt-5 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <Link
            href={`/products/${category.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#287C78] hover:text-[#244B49]"
          >
            <ArrowLeft size={13} />
            Back to {category.title}
          </Link>
        </div>
      </section>

      {/* PRODUCT DETAILS */}
      <section className="px-4 pb-10 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">

          {/* LEFT IMAGE + RIGHT PRODUCT DETAILS */}
          <div className="grid items-start gap-5 md:grid-cols-2 lg:gap-8">

            {/* LEFT SIDE */}
            <div className="space-y-3">

              {/* PRODUCT IMAGE */}
              <div className="relative flex h-[210px] items-center justify-center overflow-hidden rounded-xl border border-[#DCE9E5] bg-white p-3 sm:h-[260px] lg:h-[290px]">

                <img
                  key={productImage}
                  src={productImage}
                  alt={`${product.name} ${selectedModel.name} ${selectedColor?.name || ""}`}
                  onError={(e) => {
                    e.currentTarget.src =
                      selectedModel.image ||
                      "/images/placeholder.png";
                  }}
                  className="h-full max-h-[220px] w-full max-w-[260px] object-contain transition-all duration-300"
                />

                {/* WISHLIST ICON */}
                <button
                  type="button"
                  onClick={toggleWishlist}
                  aria-label="Toggle wishlist"
                  className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full shadow-sm transition-all hover:scale-110 ${
                    isWishlisted
                      ? "bg-[#287C78] text-white"
                      : "bg-[#FAF7EE] text-[#526D68] hover:text-[#287C78]"
                  }`}
                >
                  <Heart
                    size={15}
                    fill={isWishlisted ? "currentColor" : "none"}
                  />
                </button>
              </div>

              <p className="text-center text-[10px] text-[#91A6A0]">
                Product image may vary slightly from the actual item.
              </p>

              {/* PRODUCT INFORMATION BELOW IMAGE */}
              <div className="rounded-xl border border-[#DCE9E5] bg-white p-4 sm:p-5">

                <p className="text-[10px] font-bold uppercase tracking-wider text-[#287C78]">
                  Product Information
                </p>

                <h2 className="mt-1.5 text-sm font-bold text-[#244B49]">
                  About {product.name}
                </h2>

                <p className="mt-2 text-xs leading-5 text-[#526D68]">
                  {product.description}
                </p>

                <div className="mt-3 border-t border-[#DCE9E5] pt-3">
                  <h3 className="text-xs font-bold text-[#244B49]">
                    {selectedModel.name}
                  </h3>

                  <p className="mt-1.5 text-xs leading-5 text-[#526D68]">
                    {selectedModel.description ||
                      "More details about this model will be available soon."}
                  </p>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <p className="text-[#526D68]">
                      Product:{" "}
                      <span className="font-semibold text-[#244B49]">
                        {product.name}
                      </span>
                    </p>

                    <p className="text-[#526D68]">
                      Model:{" "}
                      <span className="font-semibold text-[#244B49]">
                        {selectedModel.name}
                      </span>
                    </p>

                    {selectedColor && (
                      <p className="text-[#526D68]">
                        Colour:{" "}
                        <span className="font-semibold text-[#244B49]">
                          {selectedColor.name}
                        </span>
                      </p>
                    )}

                    <p className="text-[#526D68]">
                      Price:{" "}
                      <span className="font-semibold text-[#287C78]">
                        ₹{selectedModel.price}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="rounded-xl border border-[#DCE9E5] bg-white p-4 sm:p-5">

              {/* CATEGORY */}
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#287C78]">
                {category.title}
              </p>

              {/* PRODUCT NAME */}
              <h1 className="mt-1.5 text-lg font-bold text-[#244B49] sm:text-xl">
                {product.name}
              </h1>

              <p className="mt-2 text-xs leading-5 text-[#526D68]">
                {product.description}
              </p>

              <div className="my-4 border-t border-[#DCE9E5]" />

              {/* SELECTED MODEL */}
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#91A6A0]">
                Selected Model
              </p>

              <h2 className="mt-1.5 text-sm font-semibold text-[#244B49]">
                {selectedModel.name}
              </h2>

              <p className="mt-1.5 text-xs leading-5 text-[#526D68]">
                {selectedModel.description || product.description}
              </p>

              <p className="mt-3 text-lg font-bold text-[#287C78]">
                ₹{selectedModel.price}
              </p>

              {/* MODEL SELECTION */}
              {product.models.length > 1 && (
                <div className="mt-5">
                  <h3 className="mb-2 text-xs font-bold text-[#244B49]">
                    Choose Your Model
                  </h3>

                  <div className="grid grid-cols-2 gap-2">
                    {product.models.map((model) => {
                      const active =
                        String(selectedModel.id) === String(model.id);

                      return (
                        <button
                          key={model.id}
                          type="button"
                          onClick={() => changeModel(model)}
                          className={`rounded-lg border p-2.5 text-left transition-all ${
                            active
                              ? "border-[#287C78] bg-[#E5F1ED]"
                              : "border-[#DCE9E5] bg-white hover:border-[#B8D9D1]"
                          }`}
                        >
                          <span className="block text-xs font-semibold text-[#244B49]">
                            {model.name}
                          </span>

                          <span className="mt-1 block text-[11px] font-semibold text-[#287C78]">
                            ₹{model.price}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* COLOUR SELECTION */}
              {colors.length > 0 && (
                <div className="mt-5">
                  <h3 className="mb-2 text-xs font-bold text-[#244B49]">
                    Choose Colour:{" "}
                    <span className="font-medium text-[#287C78]">
                      {selectedColor?.name}
                    </span>
                  </h3>

                  <div className="flex flex-wrap gap-2.5">
                    {colors.map((color) => (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => {
                          setSelectedColorName(color.name);
                          setAdded(false);
                        }}
                        title={color.name}
                        aria-label={`Select ${color.name}`}
                        className={`h-6 w-6 rounded-full border-2 transition-all hover:scale-110 ${
                          selectedColor?.name === color.name
                            ? "scale-110 border-[#244B49] ring-2 ring-[#B8D9D1]"
                            : "border-white ring-1 ring-[#DCE9E5]"
                        }`}
                        style={{
                          backgroundColor: color.value,
                        }}
                      />
                    ))}
                  </div>

                  <p className="mt-2 text-[10px] text-[#526D68]">
                    Selected colour: {selectedColor?.name}
                  </p>
                </div>
              )}

              {/* QUANTITY */}
              <div className="mt-5">
                <h3 className="mb-2 text-xs font-bold text-[#244B49]">
                  Quantity
                </h3>

                <div className="inline-flex items-center gap-4 rounded-full border border-[#DCE9E5] bg-[#FAF7EE] px-3 py-1.5">
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((prev) => Math.max(1, prev - 1))
                    }
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                    className="text-[#287C78] disabled:opacity-30"
                  >
                    <Minus size={13} />
                  </button>

                  <span className="min-w-4 text-center text-xs font-bold text-[#244B49]">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => prev + 1)}
                    aria-label="Increase quantity"
                    className="text-[#287C78]"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>

              {/* CART AND WISHLIST */}
              <div className="mt-5 flex flex-wrap gap-2">

                <button
                  type="button"
                  onClick={addToCart}
                  className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-xs font-bold transition-colors sm:flex-none sm:min-w-[155px] ${
                    added
                      ? "bg-[#244B49] text-white"
                      : "bg-[#287C78] text-white hover:bg-[#244B49]"
                  }`}
                >
                  {added ? (
                    <>
                      <Check size={14} />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={14} />
                      Add to Cart
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={toggleWishlist}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#287C78] bg-white px-3 py-2.5 text-xs font-bold text-[#287C78] transition-colors hover:bg-[#E5F1ED]"
                >
                  <Heart
                    size={14}
                    fill={isWishlisted ? "currentColor" : "none"}
                  />
                  {isWishlisted ? "Wishlisted" : "Wishlist"}
                </button>
              </div>

              {/* BENEFITS */}
              <div className="mt-5 grid grid-cols-3 gap-2 border-t border-[#DCE9E5] pt-4">

                <div className="text-center">
                  <ShieldCheck
                    size={17}
                    className="mx-auto text-[#287C78]"
                  />
                  <p className="mt-1.5 text-[10px] font-semibold text-[#526D68]">
                    Quality Products
                  </p>
                </div>

                <div className="text-center">
                  <Truck
                    size={17}
                    className="mx-auto text-[#287C78]"
                  />
                  <p className="mt-1.5 text-[10px] font-semibold text-[#526D68]">
                    Safe Delivery
                  </p>
                </div>

                <div className="text-center">
                  <RefreshCw
                    size={17}
                    className="mx-auto text-[#287C78]"
                  />
                  <p className="mt-1.5 text-[10px] font-semibold text-[#526D68]">
                    Customer Support
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* EXPLORE MORE PRODUCTS */}
          <div className="mt-8">
            <h2 className="text-base font-bold text-[#244B49]">
              Explore More Products
            </h2>

            <p className="mt-1.5 text-xs text-[#526D68]">
              Discover more products from {category.title}.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {(category.products || [])
                .filter((item) => item.slug !== product.slug)
                .slice(0, 4)
                .map((item) => (
                  <Link
                    key={item.slug}
                    href={`/product/${item.slug}`}
                    className="rounded-lg border border-[#DCE9E5] bg-white p-2.5 transition-all hover:-translate-y-1 hover:border-[#B8D9D1]"
                  >
                    <div className="flex h-20 items-center justify-center rounded-lg bg-[#F3F7F4] sm:h-24">
                      <img
                        src={item.models?.[0]?.image || item.image}
                        alt={item.name}
                        className="h-full w-full object-contain p-1.5"
                      />
                    </div>

                    <h3 className="mt-2 text-xs font-bold text-[#244B49]">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-[10px] text-[#287C78]">
                      View Details
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
