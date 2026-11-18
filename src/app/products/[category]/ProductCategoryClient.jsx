
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { productCategories } from "@/data/products/index";

import {
  Heart,
  Minus,
  Plus,
  Check,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

export default function ProductCategoryClient({ category }) {
  const isAllProductsPage = !category || category.slug === "all";

  const pageCategory = isAllProductsPage
  ? {
      slug: "all",
      title: "All Products",
      description:
        "Explore our complete collection of pet essentials. Find everything your furry friend needs in one place.",
      image: category?.image || "/images/products/accesjpg.jpg",
      products: [],
    }
  : category;

  const [activeFilter, setActiveFilter] = useState("all");
  const [quantities, setQuantities] = useState({});
  const [selectedColors, setSelectedColors] = useState({});
  const [selectedFilterColors, setSelectedFilterColors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceLimit, setPriceLimit] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [addedProduct, setAddedProduct] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const shouldScrollAfterPageChange = useRef(false);
  const PRODUCTS_PER_PAGE = 8;

  // Keep the product grid at the top of the screen on smaller devices.
  const scrollToProducts = () => {
    requestAnimationFrame(() => {
      document.getElementById("product-list")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  // ALL PRODUCTS PAGE: COLLECT PRODUCTS FROM EVERY MAIN CATEGORY
  // CATEGORY PAGE: SHOW ONLY PRODUCTS BELONGING TO THAT CATEGORY
  const allProducts = isAllProductsPage
    ? productCategories.flatMap((mainCategory) =>
        (mainCategory.products || []).map((product) => ({
          ...product,
          mainCategorySlug: mainCategory.slug,
          mainCategoryTitle: mainCategory.title,
        }))
      )
    : (pageCategory.products || []).map((product) => ({
        ...product,
        mainCategorySlug: pageCategory.slug,
        mainCategoryTitle: pageCategory.title,
      }));

  const allModels = allProducts.flatMap((product) =>
    (product.models || []).map((model) => ({ product, model }))
  );

  const maxAvailablePrice = Math.max(
    1,
    ...allModels.map(({ model }) => Number(model.price) || 0)
  );

  const currentPriceLimit = priceLimit ?? maxAvailablePrice;

  const availableColors = Array.from(
    new Map(
      allModels.flatMap(({ model }) =>
        (model.colors || []).map((color) => [
          color.name.toLowerCase(),
          color,
        ])
      )
    ).values()
  );

  // AUTOMATICALLY SCROLL TO CHOOSE YOUR PRODUCT
  // AFTER SELECTING ANOTHER CATEGORY
  useEffect(() => {
    const shouldScroll = sessionStorage.getItem(
      "scrollToChooseProduct"
    );

    if (shouldScroll === "true") {
      sessionStorage.removeItem("scrollToChooseProduct");

      requestAnimationFrame(() => {
        document
          .getElementById("product-list")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      });
    }
  }, [pageCategory.slug]);

  // LOAD AND SYNCHRONIZE WISHLIST
  useEffect(() => {
    const syncWishlist = () => {
      try {
        const savedWishlist = JSON.parse(
          localStorage.getItem("dittopetcare-wishlist") || "[]"
        );

        setWishlist(
          Array.isArray(savedWishlist) ? savedWishlist : []
        );
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

  // CATEGORY FILTER
  const categoryFilteredProducts =
    activeFilter === "all"
      ? allProducts
      : isAllProductsPage
        ? allProducts.filter(
            (product) => product.mainCategorySlug === activeFilter
          )
        : allProducts.filter(
            (product) => product.slug === activeFilter
          );

  // SEARCH, PRICE AND COLOUR FILTERING
  const displayedModels = categoryFilteredProducts
    .flatMap((product) =>
      (product.models || []).map((model) => ({
        product,
        model,
      }))
    )
    .filter(({ product, model }) => {
      const matchesSearch =
        `${product.name} ${model.name}`
          .toLowerCase()
          .includes(searchQuery.trim().toLowerCase());

      const matchesPrice =
        Number(model.price) <= currentPriceLimit;

      const matchesColor =
        selectedFilterColors.length === 0 ||
        (model.colors || []).some((color) =>
          selectedFilterColors.includes(color.name)
        );

      return matchesSearch && matchesPrice && matchesColor;
    });

  // PAGINATION: DISPLAY 8 PRODUCTS PER PAGE
  const totalPages = Math.ceil(displayedModels.length / PRODUCTS_PER_PAGE);
  const paginatedModels = displayedModels.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  // Reset to page 1 whenever a filter changes.
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchQuery, priceLimit, selectedFilterColors]);

  // SCROLL BACK TO THE PRODUCT SECTION AFTER CHANGING PAGES
  useEffect(() => {
    if (!shouldScrollAfterPageChange.current) return;

    shouldScrollAfterPageChange.current = false;
    scrollToProducts();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page === currentPage) return;
    shouldScrollAfterPageChange.current = true;
    setCurrentPage(page);
  };

  // CLEAR FILTERS
  const clearFilters = () => {
    setActiveFilter("all");
    setSearchQuery("");
    setPriceLimit(null);
    setSelectedFilterColors([]);
  };

  // TOGGLE COLOUR FILTER
  const toggleColorFilter = (colorName) => {
    setSelectedFilterColors((prev) =>
      prev.includes(colorName)
        ? prev.filter((color) => color !== colorName)
        : [...prev, colorName]
    );
  };

  // QUANTITY CONTROLS
  const increaseQuantity = (key) => {
    setQuantities((prev) => ({
      ...prev,
      [key]: (prev[key] || 1) + 1,
    }));
  };

  const decreaseQuantity = (key) => {
    setQuantities((prev) => ({
      ...prev,
      [key]: Math.max(1, (prev[key] || 1) - 1),
    }));
  };

  // SELECT PRODUCT COLOUR
  const selectColor = (baseKey, colorName) => {
    setSelectedColors((prev) => ({
      ...prev,
      [baseKey]: colorName,
    }));
  };

  // TOGGLE WISHLIST
  const toggleWishlist = (
    product,
    model,
    key,
    selectedColor,
    productImage
  ) => {
    let latestWishlist = [];

    try {
      const saved = JSON.parse(
        localStorage.getItem("dittopetcare-wishlist") || "[]"
      );

      latestWishlist = Array.isArray(saved) ? saved : [];
    } catch {
      latestWishlist = [];
    }

    const exists = latestWishlist.some(
      (item) => item.key === key
    );

    const updatedWishlist = exists
      ? latestWishlist.filter((item) => item.key !== key)
      : [
          ...latestWishlist,
          {
            key,
            productSlug: product.slug,
            productName: product.name,
            modelId: model.id,
            modelName: model.name,
            color: selectedColor?.name || null,
            price: model.price,
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
  const addToCart = (
    product,
    model,
    key,
    selectedColor,
    productImage
  ) => {
    const quantity = quantities[key] || 1;

    let latestCart = [];

    try {
      const savedCart = JSON.parse(
        localStorage.getItem("dittopetcare-cart") || "[]"
      );

      latestCart = Array.isArray(savedCart) ? savedCart : [];
    } catch {
      latestCart = [];
    }

    const existingItem = latestCart.find(
      (item) => item.key === key
    );

    const updatedCart = existingItem
      ? latestCart.map((item) =>
          item.key === key
            ? {
                ...item,
                quantity: Number(item.quantity || 1) + quantity,
              }
            : item
        )
      : [
          ...latestCart,
          {
            key,
            productSlug: product.slug,
            productName: product.name,
            modelId: model.id,
            modelName: model.name,
            color: selectedColor?.name || null,
            price: model.price,
            image: productImage,
            quantity,
          },
        ];

    localStorage.setItem(
      "dittopetcare-cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(new Event("cartUpdated"));

    setAddedProduct(key);

    setTimeout(() => {
      setAddedProduct((current) =>
        current === key ? "" : current
      );
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-[#FAF7EE]">
      <Navbar />

      {/* CATEGORY HERO */}
      <section className="px-4 pb-7 pt-7 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-7xl">

          <div className="grid items-center gap-5 rounded-2xl bg-[#E5F1ED] p-5 sm:grid-cols-2 sm:p-7">

            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#287C78]">
                Explore Our Collection
              </p>

              <h1 className="text-2xl font-bold text-[#244B49] sm:text-3xl lg:text-4xl">
                {pageCategory.title}
              </h1>

              <p className="mt-3 max-w-md text-xs leading-6 text-[#526D68]">
                {pageCategory.description}
              </p>

              <p className="mt-3 text-[11px] text-[#526D68]">
                Quality essentials for your furry friends.
              </p>
            </div>

            {/* CATEGORY IMAGE */}
          {/* CATEGORY IMAGE */}
<div className="flex justify-center">
  {pageCategory.image && (
    <img
      src={pageCategory.image}
      alt={pageCategory.title}
      className="h-36 w-full max-w-xs rounded-xl object-contain sm:h-40"
    />
  )}
</div>

          </div>
        </div>
      </section>

     {/* CATEGORY NAVIGATION */}
<section className="px-4 pb-6 sm:px-6 lg:px-12">
  <div className="mx-auto max-w-7xl">
    <h2 className="mb-4 text-xs font-bold text-[#244B49]">
      Explore Other Categories
    </h2>

    <div className="flex flex-wrap items-center gap-3">
      {/* ALL PRODUCTS */}
      <Link
        href="/products"
        onClick={() => {
          if (!isAllProductsPage) {
            sessionStorage.setItem("scrollToChooseProduct", "true");
          } else {
            sessionStorage.removeItem("scrollToChooseProduct");
          }
        }}
        className={`inline-flex items-center justify-center rounded-xl border px-5 py-3 text-[10px] font-semibold transition-all duration-300 ${
          isAllProductsPage
            ? "border-[#287C78] bg-[#287C78] text-white shadow-sm"
            : "border-[#DCE9E5] bg-white text-[#526D68] hover:border-[#287C78] hover:bg-[#E8F2EC] hover:text-[#287C78]"
        }`}
      >
        All Products
      </Link>

      {productCategories.map((item) => (
        <Link
          key={item.slug}
          href={`/products/${item.slug}`}
          onClick={() => {
            if (item.slug !== pageCategory.slug) {
              sessionStorage.setItem("scrollToChooseProduct", "true");
            } else {
              sessionStorage.removeItem("scrollToChooseProduct");
            }
          }}
          className={`inline-flex items-center justify-center rounded-xl border px-5 py-3 text-[10px] font-semibold transition-all duration-300 ${
            item.slug === pageCategory.slug
              ? "border-[#287C78] bg-[#287C78] text-white shadow-sm"
              : "border-[#DCE9E5] bg-white text-[#526D68] hover:border-[#287C78] hover:bg-[#E8F2EC] hover:text-[#287C78]"
          }`}
        >
          {item.title}
        </Link>
      ))}
    </div>
  </div>
</section>

      {/* PRODUCT COLLECTION */}
      <section
        id="choose-your-product"
        className="scroll-mt-24 px-4 pb-12 pt-3 sm:px-6 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">

          {/* SECTION HEADING */}
          <div className="mb-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#287C78]">
              Choose Your Product
            </p>

            <h2 className="mt-1 text-xl font-bold text-[#244B49]">
              {isAllProductsPage ? "Explore All Products" : `${pageCategory.title} Collection`}
            </h2>
          </div>

         {/* PRODUCT FILTER BUTTONS */}
{(isAllProductsPage
  ? productCategories.length > 0
  : pageCategory.products?.length > 0) && (
  <div className="mb-6 flex flex-wrap items-center gap-3">
    <button
      type="button"
      onClick={() => {
        setActiveFilter("all");
        setCurrentPage(1);
        scrollToProducts();
      }}
      className={`rounded-xl border px-5 py-3 text-[10px] font-semibold transition-all duration-300 ${
        activeFilter === "all"
          ? "border-[#287C78] bg-[#287C78] text-white shadow-sm"
          : "border-[#DCE9E5] bg-white text-[#526D68] hover:border-[#287C78] hover:bg-[#E8F2EC]"
      }`}
    >
      All Products
    </button>

    {isAllProductsPage
      ? productCategories.map((item) => (
          <button
            key={item.slug}
            type="button"
            onClick={() => {
              setActiveFilter(item.slug);
              setCurrentPage(1);
              scrollToProducts();
            }}
            className={`rounded-xl border px-5 py-3 text-[10px] font-semibold transition-all duration-300 ${
              activeFilter === item.slug
                ? "border-[#287C78] bg-[#287C78] text-white shadow-sm"
                : "border-[#DCE9E5] bg-white text-[#526D68] hover:border-[#287C78] hover:bg-[#E8F2EC]"
            }`}
          >
            {item.title}
          </button>
        ))
      : pageCategory.products.map((product) => (
          <button
            key={product.slug}
            type="button"
            onClick={() => {
              setActiveFilter(product.slug);
              setCurrentPage(1);
              scrollToProducts();
            }}
            className={`rounded-xl border px-5 py-3 text-[10px] font-semibold transition-all duration-300 ${
              activeFilter === product.slug
                ? "border-[#287C78] bg-[#287C78] text-white shadow-sm"
                : "border-[#DCE9E5] bg-white text-[#526D68] hover:border-[#287C78] hover:bg-[#E8F2EC]"
            }`}
          >
            {product.name}
          </button>
        ))}
  </div>
)}

          <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[230px_minmax(0,1fr)]">

            {/* FILTER SIDEBAR */}
            <aside className="rounded-xl border border-[#DCE9E5] bg-white p-4">

              <div className="mb-5 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-sm font-bold text-[#244B49]">
                  <SlidersHorizontal size={16} />
                  Filters
                </h3>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-[10px] font-semibold text-[#287C78] hover:text-[#244B49]"
                >
                  Clear All
                </button>
              </div>

              {/* SEARCH */}
              <div>
                <h4 className="mb-2 text-xs font-bold text-[#244B49]">
                  Search Products
                </h4>

                <div className="flex items-center gap-2 rounded-lg border border-[#DCE9E5] bg-[#FAF7EE] px-3">
                  <Search
                    size={15}
                    className="shrink-0 text-[#287C78]"
                  />

                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full bg-transparent py-2.5 text-xs text-[#244B49] outline-none placeholder:text-[#91A6A0]"
                  />

                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      aria-label="Clear search"
                    >
                      <X size={14} className="text-[#526D68]" />
                    </button>
                  )}
                </div>
              </div>

              <div className="my-5 border-t border-[#DCE9E5]" />

              {/* PRICE FILTER */}
              <div>
                <h4 className="mb-3 text-xs font-bold text-[#244B49]">
                  Filter by Price
                </h4>

                <div className="mb-3 flex items-center justify-between text-[11px] text-[#526D68]">
                  <span>₹0</span>

                  <span className="font-bold text-[#287C78]">
                    Up to ₹{currentPriceLimit}
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max={maxAvailablePrice}
                  step="10"
                  value={currentPriceLimit}
                  onChange={(e) =>
                    setPriceLimit(Number(e.target.value))
                  }
                  className="w-full cursor-pointer accent-[#287C78]"
                  aria-label="Maximum product price"
                />

                <p className="mt-2 text-[10px] text-[#526D68]">
                  Showing products up to ₹{currentPriceLimit}
                </p>
              </div>

              <div className="my-5 border-t border-[#DCE9E5]" />

              {/* COLOUR FILTER */}
              <div>
                <h4 className="mb-3 text-xs font-bold text-[#244B49]">
                  Filter by Colour
                </h4>

                {availableColors.length > 0 ? (
                  <div className="space-y-3">
                    {availableColors.map((color) => (
                      <label
                        key={color.name}
                        className="flex cursor-pointer items-center gap-3"
                      >
                        <input
                          type="checkbox"
                          checked={selectedFilterColors.includes(
                            color.name
                          )}
                          onChange={() =>
                            toggleColorFilter(color.name)
                          }
                          className="h-3.5 w-3.5 accent-[#287C78]"
                        />

                        <span
                          className="h-4 w-4 rounded-full border border-[#DCE9E5]"
                          style={{
                            backgroundColor: color.value,
                          }}
                        />

                        <span className="text-xs text-[#526D68]">
                          {color.name}
                        </span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <p className="text-[10px] text-[#91A6A0]">
                    No colour options available yet.
                  </p>
                )}
              </div>

            </aside>

            {/* PRODUCT AREA */}
            <div id="product-list" className="scroll-mt-24">

              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs text-[#526D68]">
                  Showing{" "}
                  <span className="font-bold text-[#244B49]">
                    {displayedModels.length}
                  </span>{" "}
                  products
                </p>

                {(searchQuery ||
                  priceLimit !== null ||
                  selectedFilterColors.length > 0) && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-[10px] font-semibold text-[#287C78] hover:underline"
                  >
                    Reset filters
                  </button>
                )}
              </div>

              {/* PRODUCT CARDS */}
              {displayedModels.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4">

                  {paginatedModels.map(({ product, model }) => {
                    const baseKey = `${product.slug}-${model.id}`;
                    const colors = model.colors || [];

                    const preferredColor =
                      colors.find(
                        (color) =>
                          color.name === selectedColors[baseKey]
                      ) ||
                      (selectedFilterColors.length > 0
                        ? colors.find((color) =>
                            selectedFilterColors.includes(
                              color.name
                            )
                          )
                        : null);

                    const selectedColor =
                      preferredColor || colors[0];

                    const colorName =
                      selectedColor?.name || "default";

                    const key =
                      `${baseKey}-${colorName.toLowerCase()}`;

                    const productImage =
                      selectedColor?.image || model.image;

                    const quantity = quantities[key] || 1;

                    const isWishlisted = wishlist.some(
                      (item) => item.key === key
                    );

                    const isAdded = addedProduct === key;

                    const detailsLink =
                      `/product/${product.slug}?model=${model.id}`;

                    return (
                      <div
                        key={key}
                        className="rounded-xl border border-[#DCE9E5] bg-white p-2.5 transition-all duration-200 hover:-translate-y-1 hover:border-[#B8D9D1] sm:p-3"
                      >

                        {/* CLICKABLE PRODUCT IMAGE */}
                        <div className="relative flex h-28 items-center justify-center overflow-hidden rounded-lg bg-[#F3F7F4] sm:h-36">

                          <Link
                            href={detailsLink}
                            aria-label={`View ${model.name} details`}
                            className="absolute inset-0 z-0 flex items-center justify-center"
                          >
                            <img
                              src={productImage}
                              alt={`${model.name}${
                                selectedColor
                                  ? ` - ${selectedColor.name}`
                                  : ""
                              }`}
                              className="h-full w-full object-contain p-2 transition-transform duration-300 hover:scale-105"
                            />
                          </Link>

                          {/* WISHLIST HEART */}
                          <button
                            type="button"
                            onClick={() =>
                              toggleWishlist(
                                product,
                                model,
                                key,
                                selectedColor,
                                productImage
                              )
                            }
                            aria-label={
                              isWishlisted
                                ? "Remove from wishlist"
                                : "Add to wishlist"
                            }
                            className={`absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full shadow-sm transition-all duration-200 hover:scale-110 ${
                              isWishlisted
                                ? "bg-[#287C78] text-white"
                                : "bg-white text-[#526D68] hover:text-[#287C78]"
                            }`}
                          >
                            <Heart
                              size={15}
                              fill={
                                isWishlisted
                                  ? "currentColor"
                                  : "none"
                              }
                            />
                          </button>

                        </div>

                        {/* PRODUCT DETAILS */}
                        <div className="px-1 pb-1 pt-2">

                          {isAllProductsPage && (
                            <p className="mb-1 text-[9px] font-semibold uppercase tracking-wide text-[#287C78]">
                              {product.mainCategoryTitle}
                            </p>
                          )}

                          <div className="flex min-h-10 items-start justify-between gap-2">

                            {/* CLICKABLE PRODUCT NAME */}
                            <Link
                              href={detailsLink}
                              className="text-xs font-bold leading-4 text-[#244B49] transition-colors hover:text-[#287C78] sm:text-[13px]"
                            >
                              {model.name}
                            </Link>

                            <p className="shrink-0 text-xs font-bold text-[#287C78] sm:text-[13px]">
                              ₹{model.price}
                            </p>

                          </div>

                          {/* COLOUR SELECTION */}
                          {colors.length > 0 && (
                            <div className="mt-2">
                              <p className="mb-2 text-[10px] font-semibold text-[#526D68]">
                                Colour:{" "}
                                <span className="text-[#287C78]">
                                  {selectedColor?.name}
                                </span>
                              </p>

                              <div className="flex flex-wrap items-center gap-2">
                                {colors.map((color) => (
                                  <button
                                    key={color.name}
                                    type="button"
                                    onClick={() =>
                                      selectColor(
                                        baseKey,
                                        color.name
                                      )
                                    }
                                    aria-label={`Select ${color.name}`}
                                    title={color.name}
                                    className={`h-5 w-5 rounded-full border-2 transition-all duration-200 ${
                                      selectedColor?.name ===
                                      color.name
                                        ? "scale-110 border-[#244B49] ring-2 ring-[#B8D9D1]"
                                        : "border-white ring-1 ring-[#DCE9E5] hover:scale-110"
                                    }`}
                                    style={{
                                      backgroundColor: color.value,
                                    }}
                                  />
                                ))}
                              </div>
                            </div>
                          )}

                          {/* QUANTITY */}
                          <div className="mt-3 flex items-center justify-between">
                            <span className="text-[10px] font-semibold text-[#526D68]">
                              Qty
                            </span>

                            <div className="flex items-center gap-2 rounded-full border border-[#DCE9E5] bg-[#FAF7EE] px-2 py-1">

                              <button
                                type="button"
                                onClick={() => decreaseQuantity(key)}
                                disabled={quantity <= 1}
                                aria-label="Decrease quantity"
                                className="text-[#287C78] disabled:opacity-30"
                              >
                                <Minus size={11} />
                              </button>

                              <span className="min-w-3 text-center text-[10px] font-bold text-[#244B49]">
                                {quantity}
                              </span>

                              <button
                                type="button"
                                onClick={() => increaseQuantity(key)}
                                aria-label="Increase quantity"
                                className="text-[#287C78]"
                              >
                                <Plus size={11} />
                              </button>

                            </div>
                          </div>

                          {/* ADD TO CART */}
                          <div className="mt-3 flex justify-center">
                            <button
                              type="button"
                              onClick={() =>
                                addToCart(
                                  product,
                                  model,
                                  key,
                                  selectedColor,
                                  productImage
                                )
                              }
                              className={`flex w-full max-w-[125px] items-center justify-center gap-1.5 rounded-lg border px-2 py-2 text-[10px] font-semibold transition-all duration-200 sm:max-w-[140px] sm:text-[11px] ${
                                isAdded
                                  ? "border-[#244B49] bg-[#244B49] text-white"
                                  : "border-[#287C78] bg-[#287C78] text-white hover:border-[#244B49] hover:bg-[#244B49]"
                              }`}
                            >
                              {isAdded ? (
                                <>
                                  <Check size={12} />
                                  Added
                                </>
                              ) : (
                                "Add to Cart"
                              )}
                            </button>
                          </div>

                        </div>
                      </div>
                    );
                  })}

                </div>
              ) : (
                /* NO PRODUCTS FOUND */
                <div className="rounded-2xl border border-dashed border-[#B8D9D1] bg-white px-5 py-12 text-center">

                  <Search
                    size={28}
                    className="mx-auto text-[#B8D9D1]"
                  />

                  <h3 className="mt-3 text-base font-bold text-[#244B49]">
                    No Products Found
                  </h3>

                  <p className="mt-2 text-xs text-[#526D68]">
                    Try changing your search or filters.
                  </p>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-4 rounded-lg bg-[#287C78] px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#244B49]"
                  >
                    Clear All Filters
                  </button>

                </div>
              )}

              {/* PAGINATION */}
              {displayedModels.length > 0 && totalPages > 1 && (
                <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      handlePageChange(Math.max(1, currentPage - 1))
                    }
                    disabled={currentPage === 1}
                    className="rounded-lg border border-[#DCE9E5] bg-white px-3 py-2 text-xs font-semibold text-[#287C78] transition-colors hover:border-[#287C78] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                    (page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => handlePageChange(page)}
                        aria-current={currentPage === page ? "page" : undefined}
                        className={`h-9 min-w-9 rounded-lg border px-3 text-xs font-semibold transition-colors ${
                          currentPage === page
                            ? "border-[#287C78] bg-[#287C78] text-white"
                            : "border-[#DCE9E5] bg-white text-[#526D68] hover:border-[#287C78] hover:text-[#287C78]"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      handlePageChange(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="rounded-lg border border-[#DCE9E5] bg-white px-3 py-2 text-xs font-semibold text-[#287C78] transition-colors hover:border-[#287C78] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
