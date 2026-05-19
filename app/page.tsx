/**
 * Luxury Stays - Premium Accommodation Booking Website
 *
 * This is the main page that assembles all components into a cohesive
 * single-page website with smooth scrolling between sections.
 *
 * BACKEND INTEGRATION NOTES:
 * - Connect booking system to your backend API for real availability checks
 * - Integrate with Airbnb/VRBO iCal feeds for calendar synchronization
 * - Set up Stripe/Paystack for payment processing
 * - Connect reviews section to database for verified guest reviews
 * - Add admin dashboard connection for property management
 */

import Navigation from "@/components/Navigation/Navigation";
import Hero from "@/components/Hero/Hero";
import Gallery from "@/components/Gallery/Gallery";
import HouseRules from "@/components/HouseRules/HouseRules";
import Reviews from "@/components/Reviews/Reviews";
import InstagramFeed from "@/components/InstagramFeed/InstagramFeed";
import MapSection from "@/components/MapSection/MapSection";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <main>
      {/* Sticky Navigation */}
      <Navigation />

      {/* Hero Section with Booking System */}
      <Hero />

      {/* Image Gallery with Lightbox */}
      <Gallery />

      {/* House Rules & Amenities */}
      <HouseRules />

      {/* Guest Reviews Carousel */}
      <Reviews />

      {/* Instagram Feed with Auto-Scroll */}
      <InstagramFeed />

      {/* Interactive Map & Nearby Locations */}
      <MapSection />

      {/* Footer with Contact & Links */}
      <Footer />
    </main>
  );
}
