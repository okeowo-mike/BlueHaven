"use client";

import { useState, useEffect } from "react";
import type { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
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

// Converts a Date to a "YYYY-MM-DD" string (matches Supabase date column format)
function toISODate(date: Date) {
  return date.toISOString().split("T")[0];
}

export default function Hero() {
  // checkIn / checkOut stay as plain "YYYY-MM-DD" strings, same as before —
  // only where they come from changes (the calendar, instead of two <input> fields).
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [blockedRanges, setBlockedRanges] = useState<
    { from: Date; to: Date }[]
  >([]);
  const [guests, setGuests] = useState(1);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [availability, setAvailability] = useState<AvailabilityResult | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  // Load existing (non-cancelled) bookings once, so the calendar can grey them out
  useEffect(() => {
    const loadBlockedDates = async () => {
      const { data, error } = await supabase
        .from("Bookings")
        .select("check_in, check_out")
        .neq("booking_status", "cancelled");

      if (error) {
        console.error("Failed to load blocked dates:", error);
        return;
      }

      const ranges = (data || []).map((b: any) => ({
        from: new Date(b.check_in),
        to: new Date(b.check_out),
      }));
      setBlockedRanges(ranges);
    };

    loadBlockedDates();
  }, []);

  const handleRangeSelect = (range: DateRange | undefined) => {
    setDateRange(range);
    setCheckIn(range?.from ? toISODate(range.from) : "");
    setCheckOut(range?.to ? toISODate(range.to) : "");
    // Selecting new dates invalidates any previous availability result
    setShowResults(false);
    setAvailability(null);
  };

  const handleCheckAvailability = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates");
      return;
    }

    setIsLoading(true);

    try {
      // Real availability check: does any non-cancelled booking overlap these dates?
      const { data: overlap, error } = await supabase
        .from("Bookings")
        .select("id")
        .neq("booking_status", "cancelled")
        .lt("check_in", checkOut)
        .gt("check_out", checkIn);

      if (error) throw error;

      const isAvailable = !overlap || overlap.length === 0;

      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const nights = Math.ceil(
        (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      const pricePerNight = 250;

      setAvailability({
        available: isAvailable,
        pricePerNight,
        totalNights: nights,
        totalPrice: nights * pricePerNight,
        cleaningFee: 75,
        serviceFee: Math.round(nights * pricePerNight * 0.12),
      });

      setShowResults(true);
    } catch (err) {
      console.error(err);
      alert("Failed to check availability. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  // ////////////////////////////////////////////////////////////////
  const handleReserveNow = async () => {
    if (!availability) return;

    try {
      setIsLoading(true);

      // FINAL SAFETY CHECK: Ensure dates didn't get taken in the last few minutes
      // Two date ranges overlap if: existing.check_in < newCheckOut AND existing.check_out > newCheckIn
      const { data: overlap } = await supabase
        .from("Bookings")
        .select("id")
        .neq("booking_status", "cancelled")
        .lt("check_in", checkOut)
        .gt("check_out", checkIn);

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
              <div
                className={styles.formGroup}
                style={{ gridColumn: "1 / -1" }}
              >
                <label className={styles.label}>Select your dates</label>
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={handleRangeSelect}
                  disabled={[{ before: new Date() }, ...blockedRanges]}
                  numberOfMonths={1}
                />
                <p style={{ fontSize: "0.85rem", marginTop: "4px" }}>
                  {checkIn && checkOut
                    ? `Check-in: ${checkIn}  →  Check-out: ${checkOut}`
                    : "Tap a start date, then an end date. Greyed-out dates are booked by other guests."}
                </p>
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
          {showResults && availability && !availability.available && (
            <div className={styles.results}>
              <p style={{ color: "#b91c1c", fontWeight: 600 }}>
                Sorry, these dates are not available. Please try different
                dates.
              </p>
            </div>
          )}

          {showResults && availability && availability.available && (
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
