"use client";

import { useRef, useEffect, useState } from "react";
import styles from "./InstagramFeed.module.css";

const instagramPosts = [
  {
    id: 1,
    image: "kitchen.webp",
    link: "https://www.instagram.com/lekkiservicedapartment?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
  {
    id: 2,
    image: "gym.webp",
    link: "https://www.instagram.com/lekkiservicedapartment?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
  {
    id: 3,
    image: "bathroom.webp",
    link: "https://www.instagram.com/lekkiservicedapartment?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
  {
    id: 4,
    image: "master.webp",
    link: "https://www.instagram.com/lekkiservicedapartment?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
  {
    id: 5,
    image: "master-2.webp",
    link: "https://www.instagram.com/lekkiservicedapartment?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
  {
    id: 6,
    image: "guest-1.webp",
    link: "https://www.instagram.com/lekkiservicedapartment?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
  {
    id: 7,
    image: "living-1.webp",
    link: "https://www.instagram.com/lekkiservicedapartment?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
  {
    id: 8,
    image: "living-2.webp",
    link: "https://www.instagram.com/lekkiservicedapartment?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
  {
    id: 9,
    image: "pool.webp",
    link: "https://www.instagram.com/lekkiservicedapartment?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
];

export default function InstagramFeed() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<number | null>(null);
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollWidth = scrollContainer.scrollWidth / 2;

    const animate = () => {
      if (!isPaused) {
        scrollPositionRef.current += 0.5;
        if (scrollPositionRef.current >= scrollWidth) {
          scrollPositionRef.current = 0;
        }
        scrollContainer.scrollLeft = scrollPositionRef.current;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused]);

  // Duplicate posts for infinite scroll effect
  const allPosts = [...instagramPosts, ...instagramPosts];

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className={styles.instagramIcon}
          >
            <rect
              x="2"
              y="2"
              width="20"
              height="20"
              rx="5"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle
              cx="12"
              cy="12"
              r="4"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="18" cy="6" r="1" fill="currentColor" />
          </svg>
          <span className={styles.handle}>@lekkiservicedapartment</span>
        </div>
        <a
          href="https://www.instagram.com/lekkiservicedapartment?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          target="_blank"
          rel="noopener noreferrer"
          className={styles.followBtn}
        >
          Follow Us
        </a>
      </div>

      <div
        className={styles.scrollContainer}
        ref={scrollRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className={styles.scrollContent}>
          {allPosts.map((post, index) => (
            <a
              key={`${post.id}-${index}`}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.postItem}
            >
              <img
                src={post.image}
                alt="Instagram post"
                className={styles.postImage}
              />
              <div className={styles.postOverlay}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="5"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle cx="18" cy="6" r="1" fill="currentColor" />
                </svg>
                <span>View on Instagram</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
