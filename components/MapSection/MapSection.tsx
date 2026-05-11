"use client";

import { useState } from "react";
import styles from "./MapSection.module.css";

const locations = [
  {
    id: "home",
    name: "Our Property",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 21H18C18.5523 21 19 20.5523 19 20V10L21 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 21V15C9 14.4477 9.44772 14 10 14H14C14.5523 14 15 14.4477 15 15V21"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    description: "Your luxury stay awaits",
    distance: "0 min",
    coordinates: { lat: 25.7617, lng: -80.1918 },
  },
  {
    id: "hospital",
    name: "Orchid General Hospital",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 6V18M6 12H18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
    description: "24/7 Emergency Care",
    distance: "5 min drive",
    coordinates: { lat: 6.437, lng: 3.522 },
  },
  {
    id: "shopping",
    name: "Excel Plus Supermarket",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M6 2L3 6V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V6L18 2H6Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M3 6H21" stroke="currentColor" strokeWidth="2" />
        <path
          d="M16 10C16 12.2091 14.2091 14 12 14C9.79086 14 8 12.2091 8 10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    description: "Luxury shopping destination",
    distance: "10 min drive",
    coordinates: { lat: 6.447, lng: 3.548 },
  },
  {
    id: "restaurant",
    name: "Ocean Drive Dining",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M18 8H19C20.1046 8 21 8.89543 21 10V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V10C3 8.89543 3.89543 8 5 8H6"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M15 5C15 3.34315 13.6569 2 12 2C10.3431 2 9 3.34315 9 5V8H15V5Z"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
    description: "Fine dining & waterfront views",
    distance: "8 min drive",
    coordinates: { lat: 25.7808, lng: -80.13 },
  },
  {
    id: "fun",
    name: "South Beach",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
        <path
          d="M12 2V4M12 20V22M2 12H4M20 12H22"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M4.93 19.07L6.34 17.66M17.66 6.34L19.07 4.93"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    description: "Beach, nightlife & entertainment",
    distance: "15 min drive",
    coordinates: { lat: 25.7825, lng: -80.134 },
  },
];

export default function MapSection() {
  const [activeLocation, setActiveLocation] = useState(locations[0]);

  const handleOpenInMaps = () => {
    const { lat, lng } = activeLocation.coordinates;
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(mapsUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="location" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>Location</span>
          <h2 className={styles.title}>Explore the Area</h2>
          <p className={styles.description}>
            Discover what makes our location perfect for your stay, with easy
            access to essential services and exciting attractions.
          </p>
        </div>

        <div className={styles.content}>
          {/* Map Area */}
          <div className={styles.mapArea}>
            <div className={styles.mapContainer}>
              {/* Interactive Map Placeholder */}
              <div className={styles.mapPlaceholder}>
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14364.784!2d${activeLocation.coordinates.lng}!3d${activeLocation.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Property location map"
                ></iframe>
              </div>
              <button className={styles.mapButton} onClick={handleOpenInMaps}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 3H21V9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 14L21 3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Open in Google Maps
              </button>
            </div>
          </div>

          {/* Location List */}
          <div className={styles.locationList}>
            {locations.map((location) => (
              <button
                key={location.id}
                className={`${styles.locationItem} ${
                  activeLocation.id === location.id ? styles.active : ""
                }`}
                onClick={() => setActiveLocation(location)}
              >
                <div className={styles.locationIcon}>{location.icon}</div>
                <div className={styles.locationInfo}>
                  <h3 className={styles.locationName}>{location.name}</h3>
                  <p className={styles.locationDesc}>{location.description}</p>
                </div>
                <span className={styles.locationDistance}>
                  {location.distance}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
