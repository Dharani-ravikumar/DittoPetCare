
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  PawPrint,
  CalendarDays,
  CheckCircle2,
  Heart,
  ShieldCheck,
  Sparkles,
  AlertCircle,
} from "lucide-react";

const initialForm = {
  ownerName: "",
  phone: "",
  email: "",
  petName: "",
  petType: "",
  petTypeOther: "",
  service: "",
  date: "",
  message: "",
};

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyjRto4EHRcSZXjrW7E8UxtDZASSfOTpd6vY6QoPxXjIvJ2wVa-wmQMZ6KcgCcLwhwj/exec";

export default function BookingSection() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const today = new Date().toLocaleDateString("en-CA");

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.ownerName.trim()) {
      newErrors.ownerName = "Owner name is required";
    } else if (!/^[a-zA-Z\s.'-]{2,50}$/.test(formData.ownerName.trim())) {
      newErrors.ownerName = "Enter a valid name";
    }

    const phone = formData.phone.replace(/[\s()+-]/g, "");

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^(91)?[6-9]\d{9}$/.test(phone)) {
      newErrors.phone = "Enter a valid 10-digit mobile number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email.trim())
    ) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.petName.trim()) {
      newErrors.petName = "Pet name is required";
    } else if (formData.petName.trim().length < 2) {
      newErrors.petName = "Pet name must have at least 2 characters";
    } else if (formData.petName.trim().length > 40) {
      newErrors.petName = "Pet name cannot exceed 40 characters";
    }

    if (!formData.petType) {
      newErrors.petType = "Please select your pet type";
    }

    // Other pet type is mandatory when selected
    if (formData.petType === "Other") {
      if (!formData.petTypeOther.trim()) {
        newErrors.petTypeOther = "Please enter your pet type";
      } else if (formData.petTypeOther.trim().length < 2) {
        newErrors.petTypeOther = "Please enter at least 2 characters";
      } else if (formData.petTypeOther.trim().length > 40) {
        newErrors.petTypeOther = "Pet type cannot exceed 40 characters";
      }
    }

    if (!formData.service) {
      newErrors.service = "Please select a service";
    }

    if (!formData.date) {
      newErrors.date = "Please select an appointment date";
    } else if (formData.date < today) {
      newErrors.date = "Past dates are not allowed";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please enter a message";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must contain at least 10 characters";
    } else if (formData.message.trim().length > 500) {
      newErrors.message = "Message cannot exceed 500 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "petType" && value !== "Other"
        ? { petTypeOther: "" }
        : {}),
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    if (name === "petType" && value !== "Other") {
      setErrors((prev) => ({
        ...prev,
        petTypeOther: "",
      }));
    }

    if (errors.form) {
      setErrors((prev) => ({
        ...prev,
        form: "",
      }));
    }
  };

  // Submit booking and notify admin through Google Apps Script
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    const booking = {
      ...formData,
      ownerName: formData.ownerName.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      petName: formData.petName.trim(),
      petTypeOther:
        formData.petType === "Other"
          ? formData.petTypeOther.trim()
          : "",
      message: formData.message.trim(),
      bookingDate: new Date().toISOString(),
    };

    try {
      // Send booking details to Google Apps Script
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(booking),
      });

      // Save booking details in localStorage
      const existingBookings = JSON.parse(
        localStorage.getItem("dittopetcare-bookings") || "[]"
      );

      if (!Array.isArray(existingBookings)) {
        throw new Error("Invalid booking data in localStorage");
      }

      localStorage.setItem(
        "dittopetcare-bookings",
        JSON.stringify([...existingBookings, booking])
      );

      // Reset form and show success screen
      setFormData(initialForm);
      setErrors({});
      setSubmitted(true);
    } catch (error) {
      console.error("Booking submission failed:", error);

      setErrors({
        form: "Unable to save your booking. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Input styling
  const inputStyle = (field) =>
    `w-full rounded-lg border px-3 py-2 text-xs text-[#244B49] outline-none transition-all placeholder:text-[#91A7A1] ${
      errors[field]
        ? "border-red-500 bg-red-50 focus:ring-2 focus:ring-red-100"
        : "border-[#DCE9E5] bg-[#FAFCFA] focus:border-[#287C78] focus:ring-2 focus:ring-[#287C78]/10"
    }`;

  const labelStyle = "mb-1 block text-xs font-medium text-[#244B49]";

  // Error message
  const ErrorMessage = ({ field }) =>
    errors[field] ? (
      <p className="mt-1 flex items-center gap-1 text-[10px] text-red-600">
        <AlertCircle size={11} />
        {errors[field]}
      </p>
    ) : null;

  return (
    <section
      id="booking"
      className="relative overflow-hidden bg-[#FAF7EE] px-4 pb-12 pt-8 sm:px-8 sm:pt-10 lg:px-12"
    >
      {/* Background decorations */}
      <div className="pointer-events-none absolute -right-24 top-10 h-64 w-64 rounded-full bg-[#B8D9D1]/30 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#DDEFEA]/70 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6 text-center"
        >
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#DDEFEA] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#287C78]">
            <PawPrint size={13} />
            Appointment Booking
          </span>

          <h2 className="text-xl font-bold leading-tight text-[#244B49] sm:text-2xl lg:text-3xl">
            Your Pet Deserves
            <span className="block text-[#287C78]">
              The Best Care
            </span>
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-xs leading-5 text-[#526D68]">
            Schedule a visit with our caring team. We are here to make every
            moment healthier, happier and more comfortable for your furry friend.
          </p>
        </motion.div>

        {/* Main content */}
        <div className="grid items-stretch gap-5 lg:grid-cols-[0.85fr_1.15fr]">

          {/* Booking form */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-1 flex h-full w-full flex-col rounded-2xl border border-[#DCE9E5] bg-white p-4 shadow-[0_12px_35px_rgba(36,75,73,0.06)] sm:p-5 lg:order-2"
          >
            {submitted ? (
              <div className="flex min-h-[380px] flex-1 flex-col items-center justify-center px-3 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#DDEFEA] text-[#287C78]">
                  <CheckCircle2 size={30} />
                </div>

                <h3 className="text-lg font-bold text-[#244B49]">
                  Booking Saved Successfully!
                </h3>

                <p className="mt-2 max-w-sm text-xs leading-5 text-[#526D68]">
                  Thank you for choosing DittoPetCare. Your appointment details
                  have been saved successfully. Our team will contact you to
                  confirm your appointment.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-5 rounded-lg bg-[#287C78] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#244B49]"
                >
                  Book Another Appointment
                </button>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[#287C78]">
                    Let's get started
                  </p>

                  <h3 className="mt-1.5 text-lg font-bold text-[#244B49] sm:text-xl">
                    Book Your Visit
                  </h3>

                  <p className="mt-1 text-xs text-[#526D68]">
                    Fill in your details to schedule an appointment.
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="flex flex-1 flex-col space-y-3"
                >
                  {/* Form-level error */}
                  {errors.form && (
                    <div className="rounded-lg border border-red-300 bg-red-50 p-2.5 text-xs text-red-600">
                      {errors.form}
                    </div>
                  )}

                  {/* Owner details */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className={labelStyle}>
                        Owner Name *
                      </label>

                      <input
                        type="text"
                        name="ownerName"
                        value={formData.ownerName}
                        onChange={handleChange}
                        placeholder="Your full name"
                        maxLength={50}
                        className={inputStyle("ownerName")}
                      />

                      <ErrorMessage field="ownerName" />
                    </div>

                    <div>
                      <label className={labelStyle}>
                        Phone Number *
                      </label>

                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Your phone number"
                        maxLength={20}
                        className={inputStyle("phone")}
                      />

                      <ErrorMessage field="phone" />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className={labelStyle}>
                      Email Address *
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      maxLength={100}
                      className={inputStyle("email")}
                    />

                    <ErrorMessage field="email" />
                  </div>

                  {/* Pet details */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className={labelStyle}>
                        Pet Name *
                      </label>

                      <input
                        type="text"
                        name="petName"
                        value={formData.petName}
                        onChange={handleChange}
                        placeholder="Your pet's name"
                        maxLength={40}
                        className={inputStyle("petName")}
                      />

                      <ErrorMessage field="petName" />
                    </div>

                    <div>
                      <label className={labelStyle}>
                        Pet Type *
                      </label>

                      <select
                        name="petType"
                        value={formData.petType}
                        onChange={handleChange}
                        className={inputStyle("petType")}
                      >
                        <option value="">Select pet</option>
                        <option value="Dog">Dog</option>
                        <option value="Cat">Cat</option>
                        <option value="Other">Other</option>
                      </select>

                      <ErrorMessage field="petType" />
                    </div>
                  </div>

                  {/* OTHER PET TYPE - CONDITIONAL MANDATORY INPUT */}
                  {formData.petType === "Other" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <label className={labelStyle}>
                        Please Specify Your Pet Type *
                      </label>

                      <input
                        type="text"
                        name="petTypeOther"
                        value={formData.petTypeOther}
                        onChange={handleChange}
                        placeholder="Enter your pet type "
                        maxLength={40}
                        required
                        aria-required="true"
                        aria-invalid={Boolean(errors.petTypeOther)}
                        className={inputStyle("petTypeOther")}
                      />

                      <ErrorMessage field="petTypeOther" />
                    </motion.div>
                  )}

                  {/* Service */}
                  <div>
                    <label className={labelStyle}>
                      Select Service *
                    </label>

                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={inputStyle("service")}
                    >
                      <option value="">Choose a service</option>
                      <option value="Grooming & Hygiene">
                        Grooming & Hygiene
                      </option>
                      <option value="Veterinary & Health">
                        Veterinary & Health
                      </option>
                      <option value="Nutrition & Pet Spa">
                        Nutrition & Pet Spa
                      </option>
                      <option value="Boarding & Training">
                        Boarding & Training
                      </option>
                    </select>

                    <ErrorMessage field="service" />
                  </div>

                  {/* Preferred Date */}
                  <div>
                    <label className={labelStyle}>
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays size={12} />
                        Preferred Date *
                      </span>
                    </label>

                    <input
                      type="date"
                      name="date"
                      min={today}
                      value={formData.date}
                      onChange={handleChange}
                      className={inputStyle("date")}
                    />

                    <ErrorMessage field="date" />
                  </div>

                  {/* Message */}
                  <div>
                    <label className={labelStyle}>
                      Additional Message *
                    </label>

                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your pet..."
                      rows={2}
                      maxLength={500}
                      className={`${inputStyle("message")} resize-none`}
                    />

                    <div className="mt-1 flex items-center justify-between">
                      <ErrorMessage field="message" />

                      <span className="ml-auto text-[10px] text-[#91A7A1]">
                        {formData.message.length}/500
                      </span>
                    </div>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group flex w-full items-center justify-center gap-2 rounded-lg bg-[#287C78] px-4 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:bg-[#244B49] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <CalendarDays size={14} />
                    {isSubmitting
                      ? "Submitting..."
                      : "Save & Book Appointment"}
                  </button>

                  <p className="text-center text-[10px] text-[#829791]">
                    We look forward to welcoming your furry friend!
                  </p>
                </form>
              </>
            )}
          </motion.div>

          {/* Left information panel */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-2 relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-[#287C78] p-5 text-white sm:p-6 lg:order-1"
          >
            <div>
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-white/15">
                <PawPrint size={19} />
              </div>

              <h3 className="max-w-sm text-lg font-bold leading-tight sm:text-xl">
                A Little Care,
                <br />
                A Lot of Love.
              </h3>

              <p className="mt-2 max-w-sm text-xs leading-5 text-white/80">
                From playful grooming sessions to expert health checkups, we
                make pet care easy and enjoyable.
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/15">
                    <Heart size={15} />
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold">
                      Loving Pet Care
                    </h4>
                    <p className="mt-0.5 text-[10px] text-white/70">
                      Care with patience and kindness
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/15">
                    <ShieldCheck size={15} />
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold">
                      Trusted Professionals
                    </h4>
                    <p className="mt-0.5 text-[10px] text-white/70">
                      Your pet is in caring hands
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/15">
                    <Sparkles size={15} />
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold">
                      Personalized Services
                    </h4>
                    <p className="mt-0.5 text-[10px] text-white/70">
                      Care designed for your pet
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom message */}
            <div className="mt-8 rounded-xl border border-white/20 bg-white/10 p-3">
              <div className="flex items-center gap-2">
                <CalendarDays size={17} />

                <div>
                  <p className="text-xs font-semibold">
                    Ready to visit us?
                  </p>

                  <p className="mt-0.5 text-[10px] text-white/75">
                    Choose your preferred appointment date.
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative paw */}
            <PawPrint
              size={130}
              className="pointer-events-none absolute -bottom-8 -right-6 rotate-[-20deg] text-white/[0.06]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
