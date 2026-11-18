
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || "{}");

    // Contact form submission
    if (data.type === "contact") {
      return handleContact(data);
    }

    // Existing appointment booking submission
    return handleBooking(data);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: error.message
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// CONTACT FORM
function handleContact(data) {
  const requiredFields = [
    "name",
    "email",
    "phone",
    "subject",
    "message"
  ];

  requiredFields.forEach(function (field) {
    if (!data[field] || !String(data[field]).trim()) {
      throw new Error(field + " is required");
    }
  });

  const name = String(data.name).trim();
  const email = String(data.email).trim();
  const phone = String(data.phone).trim();
  const subject = String(data.subject).trim();
  const message = String(data.message).trim();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    throw new Error("Invalid email address");
  }

  const emailSubject = "New Contact Message - DittoPetCare";

  const emailBody =
    "A new contact form message has been received.\n\n" +
    "CUSTOMER INFORMATION\n" +
    "------------------------------\n" +
    "Name: " + name + "\n" +
    "Email: " + email + "\n" +
    "Phone: " + phone + "\n" +
    "Subject: " + subject + "\n\n" +
    "MESSAGE\n" +
    "------------------------------\n" +
    message + "\n\n" +
    "Submitted At: " +
    (data.submittedAt || new Date().toLocaleString());

  MailApp.sendEmail({
    to: ADMIN_EMAIL,
    subject: emailSubject,
    body: emailBody,
    replyTo: email
  });

  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      message: "Contact message sent successfully"
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// APPOINTMENT BOOKING FORM
function handleBooking(data) {
  const requiredFields = [
    "ownerName",
    "phone",
    "email",
    "petName",
    "petType",
    "service",
    "date",
    "message"
  ];

  requiredFields.forEach(function (field) {
    if (!data[field] || !String(data[field]).trim()) {
      throw new Error(field + " is required");
    }
  });

  const emailSubject = "New Appointment Booking - DittoPetCare";

  const emailBody =
    "A new appointment booking has been received.\n\n" +
    "OWNER INFORMATION\n" +
    "------------------------------\n" +
    "Owner Name: " + data.ownerName + "\n" +
    "Phone: " + data.phone + "\n" +
    "Email: " + data.email + "\n\n" +
    "PET INFORMATION\n" +
    "------------------------------\n" +
    "Pet Name: " + data.petName + "\n" +
    "Pet Type: " + data.petType + "\n\n" +
    "APPOINTMENT DETAILS\n" +
    "------------------------------\n" +
    "Service: " + data.service + "\n" +
    "Preferred Date: " + data.date + "\n\n" +
    "Additional Message:\n" + data.message + "\n\n" +
    "Submitted At: " +
    (data.bookingDate || new Date().toLocaleString());

  MailApp.sendEmail({
    to: ADMIN_EMAIL,
    subject: emailSubject,
    body: emailBody,
    replyTo: data.email
  });

  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      message: "Booking email sent successfully"
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
