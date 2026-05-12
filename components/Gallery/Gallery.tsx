"use client";

import { useState } from "react";
import styles from "./Gallery.module.css";

const galleryImages = [
  {
    id: 1,
    src: "living-2.webp",
    alt: "Elegant living room with modern furniture",
    title: "Living Room",
  },
  {
    id: 2,
    src: "living-1.webp",
    alt: "Elegant living room with modern furniture",
    title: "Living Room",
  },
  {
    id: 3,
    src: "master.webp",
    alt: "Luxurious master bedroom",
    title: "Master Bedroom",
  },
  {
    id: 4,
    src: "master-2.webp",
    alt: "Luxurious master bedroom",
    title: "Master Bedroom",
  },
  {
    id: 5,
    src: "guest-1.webp",
    alt: "Second bedroom with balcony",
    title: "Guest Room",
  },
  {
    id: 6,
    src: "kitchenn.jpeg",
    alt: "Modern kitchen with island",
    title: "Kitchen",
  },
  {
    id: 7,
    src: "pool.webp",
    alt: "Infinity pool with ocean view",
    title: "Pool",
  },
  {
    id: 8,
    src: "bathroom.webp",
    alt: "Luxurious bathroom with soaking tub",
    title: "Bathroom",
  },
  // {
  //   id: 9,
  //   src: "/guest-2.jpeg",
  //   alt: "Spacious dining area",
  //   title: "Dining Area",
  // },
  // {
  //   id: 10,
  //   src: 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800&q=80',
  //   alt: 'Outdoor terrace with seating',
  //   title: 'Terrace',
  // },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<
    (typeof galleryImages)[0] | null
  >(null);

  const openLightbox = (image: (typeof galleryImages)[0]) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "";
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (!selectedImage) return;
    const currentIndex = galleryImages.findIndex(
      (img) => img.id === selectedImage.id
    );
    let newIndex;
    if (direction === "prev") {
      newIndex =
        currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1;
    } else {
      newIndex =
        currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1;
    }
    setSelectedImage(galleryImages[newIndex]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") navigateImage("prev");
    if (e.key === "ArrowRight") navigateImage("next");
  };

  return (
    <section id="gallery" className={styles.gallery}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>Gallery</span>
          <h2 className={styles.title}>Explore Our Space</h2>
          {/* <p className={styles.description}>
            Every corner of our property has been thoughtfully designed to provide 
            you with an unforgettable experience.
          </p> */}
        </div>

        <div className={styles.grid}>
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className={`${styles.gridItem} ${
                index === 0 ? styles.featured : ""
              }`}
              onClick={() => openLightbox(image)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && openLightbox(image)}
            >
              <img src={image.src} alt={image.alt} className={styles.image} />
              <div className={styles.imageOverlay}>
                <span className={styles.imageTitle}>{image.title}</span>
                <span className={styles.viewText}>Click to view</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className={styles.lightbox}
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          tabIndex={0}
        >
          <button
            className={styles.closeBtn}
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            className={`${styles.navBtn} ${styles.prevBtn}`}
            onClick={(e) => {
              e.stopPropagation();
              navigateImage("prev");
            }}
            aria-label="Previous image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className={styles.lightboxImage}
            />
            <div className={styles.lightboxCaption}>
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.alt}</p>
            </div>
          </div>

          <button
            className={`${styles.navBtn} ${styles.nextBtn}`}
            onClick={(e) => {
              e.stopPropagation();
              navigateImage("next");
            }}
            aria-label="Next image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
