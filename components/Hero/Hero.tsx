"use client";

import { useState } from "react";
import styles from "./Hero.module.css";
import { supabase } from "@/lib/supabase";

interface AvailabilityResult {
  available: boolean;
  pricePerNight: number;
  totalNights: number;
  totalPrice: number;
  cleaningFee: number;
  serviceFee: number;
}

export default function Hero() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [availability, setAvailability] = useState<AvailabilityResult | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckAvailability = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates");
      return;
    }

    setIsLoading(true);

    // TODO: Backend Integration
    // Replace this mock data with actual API call:
    // const response = await fetch('/api/check-availability', {
    //   method: 'POST',
    //   body: JSON.stringify({ checkIn, checkOut, guests })
    // });
    // const data = await response.json();

    // TODO: Calendar Sync Integration
    // Integrate with Airbnb/iCal calendar sync:
    // - Fetch blocked dates from external calendars
    // - Sync local availability with Airbnb, VRBO, etc.
    // Example: await syncWithAirbnbCalendar(propertyId);

    // Mock availability check
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const pricePerNight = 250;

    setAvailability({
      available: true,
      pricePerNight,
      totalNights: nights,
      totalPrice: nights * pricePerNight,
      cleaningFee: 75,
      serviceFee: Math.round(nights * pricePerNight * 0.12),
    });

    setShowResults(true);
    setIsLoading(false);
  };

  // ////////////////////////////////////////////////////////////////
  const handleReserveNow = async () => {
    if (!availability) return;

    try {
      setIsLoading(true);

      // FINAL SAFETY CHECK: Ensure dates didn't get taken in the last few minutes
      const { data: overlap } = await supabase
        .from("Bookings")
        .select("id")
        .lt("check_in", checkIn)
        .gt("check_out", checkOut);

      if (overlap && overlap.length > 0) {
        alert("Someone just booked these dates! Please refresh and try again.");
        return;
      }

      const { data, error } = await supabase.from("Bookings").insert([
        {
          guest_name: fullName, // Make sure this matches your DB exactly
          email: email,
          phone: phone,
          check_in: checkIn,
          check_out: checkOut,
          guests: guests,
          payment_status: "pending",
          booking_status: "pending",
        },
      ]);

      if (error) throw error;

      alert("Booking submitted successfully!");

      // Reset form
      setFullName("");
      setEmail("");
      setPhone("");
      setCheckIn("");
      setCheckOut("");
      setGuests(1);
      setShowResults(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save booking. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  // ///////////////////////////////////////////////////////////////

  // const handleReserveNow = async () => {
  //   if (!availability) return;

  //   try {
  //     setIsLoading(true);

  //     const totalAmount =
  //       availability.totalPrice +
  //       availability.cleaningFee +
  //       availability.serviceFee;

  //     const { data, error } = await supabase.from("Bookings").insert([
  //       {
  //         guest_name: fullName,
  //         email: email,
  //         phone: phone,
  //         check_in: checkIn,
  //         check_out: checkOut,
  //         guests: guests,
  //         payment_status: "pending",
  //         booking_status: "pending",
  //       },
  //     ]);

  //     if (error) {
  //       console.error(error);
  //       alert("Failed to save booking");
  //       return;
  //     }

  //     console.log("BOOKING SAVED:", data);

  //     alert("Booking submitted successfully!");

  //     // Reset form
  //     setFullName("");
  //     setEmail("");
  //     setPhone("");
  //     setCheckIn("");
  //     setCheckOut("");
  //     setGuests(1);
  //     setShowResults(false);
  //   } catch (err) {
  //     console.error(err);
  //     alert("Something went wrong");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // ///////////////////////////////////////////////////////

  // const handleBookNow = () => {
  //   // TODO: Payment Integration
  //   // Integrate with Stripe/Paystack for payment processing:
  //   //
  //   // Stripe Example:
  //   // const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
  //   // const session = await createCheckoutSession({
  //   //   amount: totalAmount,
  //   //   checkIn,
  //   //   checkOut,
  //   //   guests,
  //   //   propertyId
  //   // });
  //   // await stripe.redirectToCheckout({ sessionId: session.id });
  //   //
  //   // Paystack Example:
  //   // const handler = PaystackPop.setup({
  //   //   key: process.env.NEXT_PUBLIC_PAYSTACK_KEY,
  //   //   email: guestEmail,
  //   //   amount: totalAmount * 100, // in kobo
  //   //   callback: (response) => handlePaymentSuccess(response),
  //   //   onClose: () => handlePaymentClosed()
  //   // });
  //   // handler.openIframe();

  //   alert("Booking functionality will be integrated with payment provider");
  // };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const getMinCheckoutDate = () => {
    if (!checkIn) return getTodayDate();
    const date = new Date(checkIn);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split("T")[0];
  };

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.heroBackground}>
        <div className={styles.overlay}></div>
        {/* Hero background image - luxury property */}
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
          alt="Luxury villa with pool"
          className={styles.heroImage}
        />
      </div>

      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <h1 className={styles.title}>
            Home <span className={styles.titleAccent}>Away From</span> Home
          </h1>
          <p className={styles.subtitle}>
            Discover your perfect getaway in our meticulously designed
            accommodation, where comfort meets elegance.
          </p>
        </div>

        {/* Booking Card */}
        <div className={styles.bookingCard}>
          <form
            onSubmit={handleCheckAvailability}
            className={styles.bookingForm}
          >
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Full Name</label>

                <input
                  type="text"
                  className={styles.input}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Email</label>

                <input
                  type="email"
                  className={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@email.com"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Phone Number</label>

                <input
                  type="tel"
                  className={styles.input}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+234..."
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="checkIn" className={styles.label}>
                  Check-in
                </label>
                <input
                  type="date"
                  id="checkIn"
                  className={styles.input}
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  min={getTodayDate()}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="checkOut" className={styles.label}>
                  Check-out
                </label>
                <input
                  type="date"
                  id="checkOut"
                  className={styles.input}
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  min={getMinCheckoutDate()}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="guests" className={styles.label}>
                  Guests
                </label>
                <select
                  id="guests"
                  className={styles.input}
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={isLoading}
                >
                  {isLoading ? "Checking..." : "Check Availability"}
                </button>
              </div>
            </div>
          </form>

          {/* Availability Results */}
          {showResults && availability && (
            <div className={styles.results}>
              <div className={styles.resultsHeader}>
                <span className={styles.availableBadge}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M13.5 4.5L6 12L2.5 8.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Available
                </span>
                <span className={styles.priceHighlight}>
                  ${availability.pricePerNight}{" "}
                  <span className={styles.perNight}>/ night</span>
                </span>
              </div>

              <div className={styles.priceBreakdown}>
                <div className={styles.priceRow}>
                  <span>
                    ${availability.pricePerNight} x {availability.totalNights}{" "}
                    nights
                  </span>
                  <span>${availability.totalPrice}</span>
                </div>
                <div className={styles.priceRow}>
                  <span>Cleaning fee</span>
                  <span>${availability.cleaningFee}</span>
                </div>
                <div className={styles.priceRow}>
                  <span>Service fee</span>
                  <span>${availability.serviceFee}</span>
                </div>
                <div className={`${styles.priceRow} ${styles.totalRow}`}>
                  <span>Total</span>
                  <span>
                    $
                    {availability.totalPrice +
                      availability.cleaningFee +
                      availability.serviceFee}
                  </span>
                </div>
              </div>

              <button
                onClick={handleReserveNow}
                className={styles.bookNowBtn}
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Reserve Now"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={styles.scrollIndicator}>
        <span>Scroll to explore</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 5V19M12 19L5 12M12 19L19 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
