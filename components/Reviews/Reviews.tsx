'use client';

import { useState, useRef } from 'react';
import styles from './Reviews.module.css';

const reviews = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    avatar: 'SM',
    rating: 5,
    date: 'March 2024',
    text: 'Absolutely stunning property! The attention to detail is remarkable. From the moment we arrived, we felt like royalty. The pool area is breathtaking and the kitchen is fully equipped. Will definitely be coming back!',
  },
  {
    id: 2,
    name: 'James Rodriguez',
    avatar: 'JR',
    rating: 5,
    date: 'February 2024',
    text: 'Perfect getaway for our anniversary. The views are spectacular and the amenities exceeded our expectations. The host was incredibly responsive and helpful throughout our stay.',
  },
  {
    id: 3,
    name: 'Emily Chen',
    avatar: 'EC',
    rating: 5,
    date: 'January 2024',
    text: 'We hosted a small family reunion here and everyone was impressed. The space is even more beautiful in person than in the photos. Highly recommend for anyone looking for a luxury experience.',
  },
  {
    id: 4,
    name: 'Michael Thompson',
    avatar: 'MT',
    rating: 4,
    date: 'December 2023',
    text: 'Great location, beautiful interiors, and fantastic service. The only minor issue was the WiFi speed during peak hours, but otherwise a perfect stay. Would definitely recommend to friends.',
  },
  {
    id: 5,
    name: 'Lisa Anderson',
    avatar: 'LA',
    rating: 5,
    date: 'November 2023',
    text: 'This was our third time staying here and it never disappoints. The property is always immaculately maintained and the host goes above and beyond. Our go-to vacation spot!',
  },
  {
    id: 6,
    name: 'David Kim',
    avatar: 'DK',
    rating: 5,
    date: 'October 2023',
    text: 'Exceeded all expectations! The photos do not do this place justice. Woke up every morning to stunning views. The bed was incredibly comfortable and the bathroom was spa-like. 10/10!',
  },
];

export default function Reviews() {
  const [showModal, setShowModal] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 400;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleLeaveReview = () => {
    // TODO: Guest Authentication
    // Before allowing a review, verify the guest has completed a stay:
    //
    // const { user, isAuthenticated } = useAuth();
    // const hasCompletedStay = await checkGuestStayHistory(user.id);
    //
    // if (!isAuthenticated) {
    //   redirect('/login?returnTo=/reviews');
    // }
    //
    // if (!hasCompletedStay) {
    //   showError('Only guests who have completed a stay can leave reviews');
    //   return;
    // }

    setShowModal(true);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={i < rating ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        className={i < rating ? styles.starFilled : styles.starEmpty}
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ));
  };

  const averageRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <section id="reviews" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <span className={styles.label}>Testimonials</span>
            <h2 className={styles.title}>Guest Reviews</h2>
            <p className={styles.description}>
              Read what our guests have to say about their experience staying with us.
            </p>
          </div>

          <div className={styles.ratingOverview}>
            <span className={styles.ratingNumber}>{averageRating}</span>
            <div className={styles.ratingStars}>
              {renderStars(Math.round(parseFloat(averageRating)))}
            </div>
            <span className={styles.ratingCount}>{reviews.length} reviews</span>
          </div>
        </div>

        {/* Carousel Navigation */}
        <div className={styles.carouselNav}>
          <button
            className={styles.navBtn}
            onClick={() => scroll('left')}
            aria-label="Previous reviews"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            className={styles.navBtn}
            onClick={() => scroll('right')}
            aria-label="Next reviews"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Reviews Carousel */}
        <div className={styles.carousel} ref={carouselRef}>
          {reviews.map((review) => (
            <div key={review.id} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <div className={styles.avatar}>{review.avatar}</div>
                <div className={styles.reviewerInfo}>
                  <h3 className={styles.reviewerName}>{review.name}</h3>
                  <span className={styles.reviewDate}>{review.date}</span>
                </div>
                <div className={styles.reviewRating}>
                  {renderStars(review.rating)}
                </div>
              </div>
              <p className={styles.reviewText}>{review.text}</p>
            </div>
          ))}
        </div>

        {/* Leave Review Button */}
        <div className={styles.leaveReviewWrapper}>
          <button className={styles.leaveReviewBtn} onClick={handleLeaveReview}>
            Leave a Review
          </button>
        </div>
      </div>

      {/* Review Modal */}
      {showModal && (
        <div className={styles.modal} onClick={() => setShowModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.modalClose}
              onClick={() => setShowModal(false)}
              aria-label="Close modal"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <h3 className={styles.modalTitle}>Share Your Experience</h3>
            <p className={styles.modalDescription}>
              We value your feedback! Please log in to verify your stay before leaving a review.
            </p>

            <form className={styles.reviewForm} onSubmit={(e) => e.preventDefault()}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Your Rating</label>
                <div className={styles.ratingInput}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} type="button" className={styles.ratingBtn}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Your Review</label>
                <textarea
                  className={styles.textarea}
                  placeholder="Tell us about your stay..."
                  rows={4}
                ></textarea>
              </div>

              <button type="submit" className={styles.submitBtn}>
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
