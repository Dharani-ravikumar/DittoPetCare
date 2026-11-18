
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  PawPrint,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Heart,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyjRto4EHRcSZXjrW7E8UxtDZASSfOTpd6vY6QoPxXjIvJ2wVa-wmQMZ6KcgCcLwhwj/exec"

const initialForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const contactDetails = [
  {
    icon: Mail,
    title: "Email Us",
    value: "dittopetcare@gmail.com",
    link: "mailto:dittopetcare@gmail.com",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "8610093520",
    link: "tel:8610093520",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    value: "New Street, Near Salembridge, Salem",
    link: null,
  },
  {
    icon: Clock,
    title: "Opening Hours",
    value: "Monday – Saturday, 9:00 AM – 6:00 PM",
    link: null,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const inputClass =
  "w-full rounded-lg border border-[#DCE9E5] bg-[#FAF7EE]/50 px-3 py-2 text-xs text-[#244B49] outline-none transition placeholder:text-[#91A8A1] focus:border-[#287C78] focus:ring-2 focus:ring-[#287C78]/10";

const labelClass =
  "mb-1 block text-xs font-medium text-[#244B49]";

// ==========================================
// ERROR MESSAGE COMPONENT
// ==========================================

function ErrorMessage({ errors, field }) {
  return errors[field] ? (
    <div className="mt-1.5 flex items-center gap-1.5 rounded-md border border-red-200 bg-red-50 px-2 py-1.5 text-[10px] text-red-600">
      <AlertCircle size={12} className="shrink-0" />
      <span>{errors[field]}</span>
    </div>
  ) : null;
}


// ==========================================
// CONTACT PAGE
// ==========================================

export default function ContactPage() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // ========================================
  // FORM VALIDATION
  // ========================================

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (
      !/^[a-zA-Z\s.'-]{2,50}$/.test(formData.name.trim())
    ) {
      newErrors.name = "Enter a valid name";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email.trim())
    ) {
      newErrors.email = "Enter a valid email address";
    }

    const phone = formData.phone.replace(/[\s()+-]/g, "");

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^(91)?[6-9]\d{9}$/.test(phone)) {
      newErrors.phone = "Enter a valid 10-digit mobile number";
    }

    if (!formData.subject) {
      newErrors.subject = "Please select a subject";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must contain at least 10 characters";
    } else if (formData.message.trim().length > 500) {
      newErrors.message = "Message cannot exceed 500 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


  // ========================================
  // HANDLE INPUT CHANGES
  // ========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    if (errors.form) {
      setErrors((prev) => ({
        ...prev,
        form: "",
      }));
    }
  };


  // ========================================
  // SUBMIT CONTACT FORM
  // ========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      // READ ACTUAL VALUES DIRECTLY FROM THE FORM
      const submittedForm = new FormData(e.currentTarget);

      const contactData = {
        type: "contact",

        name: String(
          submittedForm.get("name") || ""
        ).trim(),

        email: String(
          submittedForm.get("email") || ""
        ).trim(),

        phone: String(
          submittedForm.get("phone") || ""
        ).trim(),

        subject: String(
          submittedForm.get("subject") || ""
        ).trim(),

        message: String(
          submittedForm.get("message") || ""
        ).trim(),

        submittedAt: new Date().toISOString(),
      };

      // CHECK ACTUAL CUSTOMER MESSAGE
      console.log("CONTACT FORM SUBMISSION:", contactData);
      console.log("ACTUAL CUSTOMER MESSAGE:", contactData.message);

      if (!contactData.message) {
        throw new Error("Customer message is empty.");
      }

      // SEND DATA TO GOOGLE APPS SCRIPT
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(contactData),
      });

      // RESET FORM AFTER REQUEST
      setFormData(initialForm);
      setErrors({});
      setSubmitted(true);

    } catch (error) {
      console.error("Contact form submission failed:", error);

      setErrors({
        form: "Unable to submit your message. Please try again.",
      });

    } finally {
      setIsSubmitting(false);
    }
  };


  // ========================================
  // PAGE UI
  // ========================================

  return (
    <>
      <Navbar />

      <main className="overflow-hidden bg-[#FAF7EE]">

        {/* HERO SECTION */}

        <section className="relative px-5 pb-5 pt-12 sm:px-8 sm:pt-14 lg:px-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#B8D9D1]/30 blur-3xl" />

          <div className="relative mx-auto max-w-7xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mx-auto max-w-2xl text-center"
            >
              <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#B8D9D1] bg-white px-3 py-1.5 text-[10px] font-semibold text-[#287C78]">
                <PawPrint size={13} />
                WE'D LOVE TO HEAR FROM YOU
              </span>

              <h1 className="text-xl font-bold leading-tight text-[#244B49] sm:text-2xl lg:text-3xl">
                Let's Talk About Your
                <span className="block text-[#287C78]">
                  Furry Family
                </span>
              </h1>
            </motion.div>
          </div>
        </section>


        {/* CONTACT CONTENT */}

        <section className="px-5 pb-12 pt-3 sm:px-8 lg:px-16">
          <div className="mx-auto grid max-w-6xl items-start gap-5 lg:grid-cols-[0.85fr_1.15fr]">

            {/* CONTACT INFORMATION */}

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.08 },
                },
              }}
              className="rounded-2xl bg-[#244B49] p-5 text-white sm:p-6"
            >
              <motion.div variants={fadeUp}>
                <span className="text-[10px] font-semibold uppercase tracking-[1.5px] text-[#B8D9D1]">
                  Contact Information
                </span>

                <h2 className="mt-2 text-lg font-bold sm:text-xl">
                  Get in Touch
                </h2>

                <p className="mt-2 text-xs leading-5 text-[#D5E5DF]">
                  We're here to answer your questions and help you find the
                  best care and products for your beloved pets.
                </p>
              </motion.div>

              <div className="mt-6 space-y-5">
                {contactDetails.map((item) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      variants={fadeUp}
                      key={item.title}
                      className="flex items-start gap-3"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#B8D9D1]/15 text-[#B8D9D1]">
                        <Icon size={16} />
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-xs font-semibold text-white">
                          {item.title}
                        </h3>

                        {item.link ? (
                          <a
                            href={item.link}
                            className="mt-1 block break-words text-xs leading-5 text-[#D5E5DF] transition-colors hover:text-[#B8D9D1]"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="mt-1 text-xs leading-5 text-[#D5E5DF]">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                variants={fadeUp}
                className="mt-6 rounded-xl border border-white/15 bg-white/5 p-3"
              >
                <div className="flex items-center gap-2 text-[#B8D9D1]">
                  <Heart size={15} />
                  <span className="text-xs font-semibold">
                    Every Pet Matters
                  </span>
                </div>

                <p className="mt-1.5 text-xs leading-5 text-[#D5E5DF]">
                  Your pet's happiness and well-being are always our priority.
                  Reach out to us during our working hours.
                </p>
              </motion.div>
            </motion.div>


            {/* CONTACT FORM */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-2xl rounded-2xl border border-[#DCE9E5] bg-white p-5 shadow-sm sm:p-6"
            >

              {!submitted ? (
                <>
                  <span className="text-[10px] font-semibold uppercase tracking-[1.5px] text-[#287C78]">
                    Send Us a Message
                  </span>

                  <h2 className="mt-2 text-lg font-bold text-[#244B49] sm:text-xl">
                    How Can We Help?
                  </h2>

                  <p className="mt-1.5 text-xs leading-5 text-[#526D68]">
                    Fill in the details below. We'd love to hear from you!
                  </p>

                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="mt-5 space-y-3"
                  >

                    {/* FORM ERROR */}

                    {errors.form && (
                      <div className="flex items-center gap-2 rounded-lg border border-red-300 bg-red-50 p-3 text-xs text-red-600">
                        <AlertCircle size={15} />
                        {errors.form}
                      </div>
                    )}


                    {/* NAME AND EMAIL */}

                    <div className="grid gap-3 sm:grid-cols-2">

                      <div>
                        <label className={labelClass}>
                          Your Name *
                        </label>

                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your name"
                          maxLength={50}
                          className={inputClass}
                        />

                        <ErrorMessage errors={errors} field="name" />
                      </div>

                      <div>
                        <label className={labelClass}>
                          Email Address *
                        </label>

                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          maxLength={100}
                          className={inputClass}
                        />

                        <ErrorMessage errors={errors} field="email" />
                      </div>
                    </div>


                    {/* PHONE AND SUBJECT */}

                    <div className="grid gap-3 sm:grid-cols-2">

                      <div>
                        <label className={labelClass}>
                          Phone Number *
                        </label>

                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter your phone number"
                          maxLength={20}
                          className={inputClass}
                        />

                        <ErrorMessage errors={errors} field="phone" />
                      </div>

                      <div>
                        <label className={labelClass}>
                          Subject *
                        </label>

                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className={`${inputClass} text-[#526D68]`}
                        >
                          <option value="">Select a subject</option>
                          <option value="Pet Products">Pet Products</option>
                          <option value="Grooming Services">
                            Grooming Services
                          </option>
                          <option value="Veterinary & Health">
                            Veterinary & Health
                          </option>
                          <option value="Boarding & Training">
                            Boarding & Training
                          </option>
                          <option value="Appointment Enquiry">
                            Appointment Enquiry
                          </option>
                          <option value="Other">Other</option>
                        </select>

                        <ErrorMessage errors={errors} field="subject" />
                      </div>
                    </div>


                    {/* CUSTOMER MESSAGE */}

                    <div>
                      <label className={labelClass}>
                        Your Message *
                      </label>

                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                        maxLength={500}
                        placeholder="Tell us how we can help..."
                        className={`${inputClass} resize-none`}
                      />

                      <div className="mt-1 flex items-center justify-between">
                        <ErrorMessage errors={errors} field="message" />

                        <span className="ml-auto text-[10px] text-[#91A8A1]">
                          {formData.message.length}/500
                        </span>
                      </div>
                    </div>


                    {/* SUBMIT BUTTON */}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#287C78] px-5 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:bg-[#244B49] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}

                      <Send
                        size={13}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </button>

                    <p className="text-[10px] text-[#91A8A1]">
                      All fields are required. Our team will get back to you.
                    </p>

                  </form>
                </>
              ) : (

                // SUCCESS MESSAGE

                <div className="flex min-h-[380px] flex-col items-center justify-center px-3 text-center">

                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#DDEFEA] text-[#287C78]">
                    <CheckCircle2 size={30} />
                  </div>

                  <h2 className="text-lg font-bold text-[#244B49]">
                    Message Submitted!
                  </h2>

                  <p className="mt-2 max-w-sm text-xs leading-5 text-[#526D68]">
                    Thank you for contacting DittoPetCare. Your submission
                    has been sent. Our team will get in touch with you soon.
                  </p>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-5 rounded-lg bg-[#287C78] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#244B49]"
                  >
                    Send Another Message
                  </button>

                </div>
              )}
            </motion.div>
          </div>
        </section>


        {/* BOTTOM CTA */}

        <section className="px-5 pb-12 sm:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 rounded-2xl bg-[#DDEFEA] px-5 py-6 text-center sm:flex-row sm:text-left sm:px-7"
          >
            <div>
              <h2 className="text-base font-bold text-[#244B49] sm:text-lg">
                Need Care for Your Pet?
              </h2>

              <p className="mt-1 text-xs leading-5 text-[#526D68]">
                Book an appointment and let us take care of your furry friend.
              </p>
            </div>

            <a
              href="/booking"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#287C78] px-5 py-2.5 text-xs font-semibold text-white transition-all hover:bg-[#244B49]"
            >
              <MessageCircle size={13} />
              Book Appointment
            </a>
          </motion.div>
        </section>

      </main>

      <Footer />
    </>
  );
}
