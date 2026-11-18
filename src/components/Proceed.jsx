
"use client";

import { useEffect, useState } from "react";
import {
  X,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShoppingBag,
  User,
  MapPin,
  Phone,
  Mail,
  Package,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const CART_KEY = "dittopetcare-cart";
const ORDER_KEY = "dittopetcare-orders";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyjRto4EHRcSZXjrW7E8UxtDZASSfOTpd6vY6QoPxXjIvJ2wVa-wmQMZ6KcgCcLwhwj/exec";

const initialForm = {
  customerName: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  pincode: "",
};

function Field({
  label,
  name,
  placeholder,
  type = "text",
  icon: Icon,
  value,
  onChange,
  inputClass,
  error,
  maxLength,
}) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={name}
        className="mb-1 block text-xs font-medium text-[#244B49]"
      >
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <Icon
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#78918A]"
          />
        )}

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`${inputClass} ${Icon ? "pl-8" : ""}`}
        />
      </div>

      {error && (
        <p className="mt-1 text-[10px] text-red-500">{error}</p>
      )}
    </div>
  );
}

export default function Proceed({ onClose }) {
  const [cartItems, setCartItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
      setCartItems(Array.isArray(savedCart) ? savedCart : []);
    } catch {
      setCartItems([]);
    }
  }, []);

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + Number(item.quantity || 1),
    0
  );

  const formatPrice = (price) =>
    `₹${Number(price || 0).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })}`;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]:
        name === "pincode"
          ? value.replace(/\D/g, "").slice(0, 6)
          : value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.customerName.trim()) {
      newErrors.customerName = "Please enter your full name.";
    } else if (form.customerName.trim().length < 2) {
      newErrors.customerName = "Name must contain at least 2 characters.";
    }

    const phone = form.phone.replace(/[\s-]/g, "");

    if (!phone) {
      newErrors.phone = "Please enter your phone number.";
    } else if (!/^(?:\+91)?[6-9]\d{9}$/.test(phone)) {
      newErrors.phone = "Please enter a valid Indian mobile number.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!form.address.trim()) {
      newErrors.address = "Please enter your delivery address.";
    } else if (form.address.trim().length < 5) {
      newErrors.address = "Please enter a complete address.";
    }

    if (!form.city.trim()) {
      newErrors.city = "Please enter your city.";
    }

    if (!/^\d{6}$/.test(form.pincode.trim())) {
      newErrors.pincode = "Please enter a valid 6-digit PIN code.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (loading) return;
    if (!validateForm()) return;

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setLoading(true);

    try {
      const newOrderId = `DPC-${Date.now()}`;

      const order = {
        orderId: newOrderId,
        customer: {
          customer_name: form.customerName.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          address: form.address.trim(),
          city: form.city.trim(),
          pincode: form.pincode.trim(),
        },
        items: cartItems.map((item) => ({
          product_id: item.id || item.key || "",
          name:
            item.modelName ||
            item.productName ||
            item.name ||
            "Pet Product",
          image: item.image || item.image_url || "",
          color: item.color || "",
          quantity: Number(item.quantity || 1),
          unit_price: Number(item.price || 0),
        })),
        total_amount: subtotal,
        status: "Pending",
        payment_status: "Payment to be confirmed",
        created_at: new Date().toISOString(),
      };

      // Send order details to Google Apps Script.
      // Apps Script sends the admin and customer emails.
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          type: "order",
          order: order,
        }),
      });

      // Save order locally after submitting the email request.
      const previousOrders = JSON.parse(
        localStorage.getItem(ORDER_KEY) || "[]"
      );

      localStorage.setItem(
        ORDER_KEY,
        JSON.stringify([order, ...previousOrders])
      );

      localStorage.removeItem(CART_KEY);
      window.dispatchEvent(new Event("cartUpdated"));

      setCartItems([]);
      setOrderId(newOrderId);
      setOrderPlaced(true);
    } catch (error) {
      console.error("Order placement failed:", error);
      alert(
        "We could not submit your order request. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full rounded-lg border px-3 py-2 text-xs outline-none transition ${
      errors[field]
        ? "border-red-400 bg-red-50"
        : "border-[#DCE9E5] bg-[#FAFCFB] focus:border-[#287C78] focus:bg-white"
    }`;

  return (
    <div className="fixed inset-0 z-[150]">
      <button
        type="button"
        aria-label="Close checkout"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-black/40 backdrop-blur-[1px]"
      />

      <section className="absolute right-0 top-0 flex h-full w-full max-w-[380px] flex-col overflow-hidden rounded-l-[28px] border-l border-[#DCE9E5] bg-[#FAF7EE] shadow-2xl">
        <div className="flex shrink-0 items-center justify-between border-b border-[#DCE9E5] bg-white px-4 py-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F0F6F3] text-[#287C78] transition hover:bg-[#DDEFEA]"
            >
              <ArrowLeft size={15} />
            </button>

            <div>
              <h2 className="text-sm font-bold text-[#244B49]">
                Proceed to Order
              </h2>
              <p className="text-[10px] text-[#78918A]">
                Complete your purchase
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#526D68] transition hover:bg-[#F3F8F5]"
          >
            <X size={16} />
          </button>
        </div>

        {orderPlaced ? (
          <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto px-5 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#DDEFEA] text-[#287C78]">
              <CheckCircle2 size={30} />
            </div>

            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#287C78]">
              Order successful
            </p>

            <h2 className="mb-2 text-xl font-bold text-[#244B49]">
              Thank you!
            </h2>

            <p className="mb-5 text-xs leading-5 text-[#526D68]">
              Your order request has been submitted. An order confirmation
              email will be sent to your registered email address. Our team
              will contact you to confirm delivery and payment details.
            </p>

            <div className="mb-5 w-full rounded-xl bg-white p-4">
              <p className="mb-1 text-[10px] text-[#78918A]">
                Your Order ID
              </p>
              <p className="text-sm font-bold text-[#287C78]">{orderId}</p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-full bg-[#287C78] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#244B49]"
            >
              Continue Shopping
            </button>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-5 text-center">
            <ShoppingBag size={34} className="mb-3 text-[#A5BDB4]" />

            <h3 className="text-sm font-bold text-[#244B49]">
              Your cart is empty
            </h3>

            <p className="mt-1 text-xs text-[#78918A]">
              Add products before proceeding.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-5 rounded-full bg-[#287C78] px-5 py-2.5 text-xs font-semibold text-white"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <form
            onSubmit={handlePlaceOrder}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="flex-1 space-y-3 overflow-y-auto px-3 py-3">
              <div className="rounded-xl border border-[#DCE9E5] bg-white p-3">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#DDEFEA] text-[#287C78]">
                    <User size={15} />
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-[#244B49]">
                      Customer Details
                    </h3>
                    <p className="text-[10px] text-[#78918A]">
                      Enter your delivery information
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <Field
                    label="Full Name"
                    name="customerName"
                    placeholder="Enter your full name"
                    icon={User}
                    value={form.customerName}
                    onChange={handleChange}
                    inputClass={inputClass("customerName")}
                    error={errors.customerName}
                  />

                  <Field
                    label="Phone Number"
                    name="phone"
                    placeholder="Enter your mobile number"
                    type="tel"
                    icon={Phone}
                    value={form.phone}
                    onChange={handleChange}
                    inputClass={inputClass("phone")}
                    error={errors.phone}
                  />

                  <Field
                    label="Email Address"
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                    icon={Mail}
                    value={form.email}
                    onChange={handleChange}
                    inputClass={inputClass("email")}
                    error={errors.email}
                  />

                  <div>
                    <label
                      htmlFor="address"
                      className="mb-1 block text-xs font-medium text-[#244B49]"
                    >
                      Delivery Address
                    </label>

                    <div className="relative">
                      <MapPin
                        size={13}
                        className="absolute left-3 top-3 text-[#78918A]"
                      />

                      <textarea
                        id="address"
                        name="address"
                        rows={2}
                        value={form.address}
                        onChange={handleChange}
                        placeholder="House number, street, area..."
                        className={`${inputClass("address")} resize-none pl-8`}
                      />
                    </div>

                    {errors.address && (
                      <p className="mt-1 text-[10px] text-red-500">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Field
                      label="City"
                      name="city"
                      placeholder="Your city"
                      value={form.city}
                      onChange={handleChange}
                      inputClass={inputClass("city")}
                      error={errors.city}
                    />

                    <Field
                      label="PIN Code"
                      name="pincode"
                      placeholder="6-digit PIN"
                      type="text"
                      maxLength={6}
                      value={form.pincode}
                      onChange={handleChange}
                      inputClass={inputClass("pincode")}
                      error={errors.pincode}
                    />
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border border-[#DCE9E5] bg-white">
                <button
                  type="button"
                  onClick={() => setShowSummary(!showSummary)}
                  className="flex w-full items-center justify-between gap-2 p-3 text-left transition hover:bg-[#FAFCFB]"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#DDEFEA] text-[#287C78]">
                      <Package size={15} />
                    </div>

                    <div>
                      <h3 className="text-xs font-bold text-[#244B49]">
                        View Order Summary
                      </h3>
                      <p className="text-[10px] text-[#78918A]">
                        {totalItems} {totalItems === 1 ? "product" : "products"}{" "}
                        · {formatPrice(subtotal)}
                      </p>
                    </div>
                  </div>

                  {showSummary ? (
                    <ChevronUp size={16} className="text-[#287C78]" />
                  ) : (
                    <ChevronDown size={16} className="text-[#287C78]" />
                  )}
                </button>

                {showSummary && (
                  <div className="space-y-3 border-t border-[#E6EFEB] p-3">
                    {cartItems.map((item, index) => {
                      const name =
                        item.modelName ||
                        item.productName ||
                        item.name ||
                        "Pet Product";

                      const image = item.image || item.image_url || "";
                      const quantity = Number(item.quantity || 1);
                      const price = Number(item.price || 0);

                      return (
                        <div
                          key={item.key || item.id || index}
                          className="flex gap-2.5"
                        >
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#F3F8F5]">
                            {image ? (
                              <img
                                src={image}
                                alt={name}
                                className="h-full w-full object-contain p-1"
                              />
                            ) : (
                              <ShoppingBag
                                size={18}
                                className="text-[#A5BDB4]"
                              />
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold text-[#244B49]">
                              {name}
                            </p>

                            {item.color && (
                              <p className="mt-0.5 text-[10px] text-[#78918A]">
                                Colour: {item.color}
                              </p>
                            )}

                            <p className="mt-0.5 text-[10px] text-[#78918A]">
                              Qty: {quantity}
                            </p>

                            <p className="mt-0.5 text-xs font-bold text-[#287C78]">
                              {formatPrice(price * quantity)}
                            </p>
                          </div>
                        </div>
                      );
                    })}

                    <div className="space-y-2 border-t border-dashed border-[#DCE9E5] pt-3">
                      <div className="flex justify-between text-xs text-[#526D68]">
                        <span>Subtotal</span>
                        <span className="font-semibold text-[#244B49]">
                          {formatPrice(subtotal)}
                        </span>
                      </div>

                      <div className="flex justify-between text-xs text-[#526D68]">
                        <span>Delivery Charges</span>
                        <span className="font-semibold text-[#287C78]">
                          To be confirmed
                        </span>
                      </div>

                      <div className="flex justify-between border-t border-[#E6EFEB] pt-2 text-xs font-bold text-[#244B49]">
                        <span>Total Amount</span>
                        <span className="text-[#287C78]">
                          {formatPrice(subtotal)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="rounded-xl bg-[#EAF3EF] p-3">
                <div className="flex items-start gap-2">
                  <ShieldCheck
                    size={15}
                    className="mt-0.5 shrink-0 text-[#287C78]"
                  />

                  <p className="text-[10px] leading-4 text-[#526D68]">
                    Our team will contact you to confirm product availability,
                    delivery charges and payment details. An order confirmation
                    email will also be sent to your email address.
                  </p>
                </div>
              </div>
            </div>

            <div className="shrink-0 border-t border-[#DCE9E5] bg-white px-3 py-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-[#526D68]">Order Total</span>
                <span className="text-sm font-bold text-[#287C78]">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#287C78] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#244B49] disabled:opacity-60"
              >
                {loading ? "Placing Order..." : "Place Order"}
                {!loading && <ArrowRight size={14} />}
              </button>

              <p className="mt-1.5 text-center text-[10px] text-[#78918A]">
                No online payment required at this step.
              </p>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
