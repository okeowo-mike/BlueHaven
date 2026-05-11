import styles from './HouseRules.module.css';

const rules = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    title: 'Check-in & Check-out',
    description: 'Check-in after 3:00 PM, check-out before 11:00 AM. Early check-in or late check-out may be available upon request.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M18.36 6.64A9 9 0 1 1 5.64 6.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 2V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'No Smoking',
    description: 'Smoking is strictly prohibited inside the property. Designated outdoor smoking areas are available.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C7 2 3 6 3 10.5C3 15 7 20 12 22C17 20 21 15 21 10.5C21 6 17 2 12 2Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M9 10L11 12L15 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Security Deposit',
    description: 'A refundable security deposit of $200 is required. It will be returned within 7 days after check-out.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M4.93 4.93L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M7.76 7.76C6.67 8.85 6 10.35 6 12C6 15.31 8.69 18 12 18C13.65 18 15.15 17.33 16.24 16.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M19.07 4.93C21.14 6.99 22.5 9.35 22.5 12C22.5 17.52 17.52 22 12 22C9.35 22 6.99 21.14 4.93 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'No Parties',
    description: 'Parties or events are not permitted. Please be respectful of neighbors and keep noise levels reasonable.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
        <path d="M5 18C5 14.69 7.69 12 11 12H13C16.31 12 19 14.69 19 18V21H5V18Z" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    title: 'Maximum Guests',
    description: 'Maximum occupancy is 8 guests. Additional guests are not permitted without prior approval.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3.574C5 4.25 4 6.5 4 8.5C4 11.5 7 14 10 16C13 14 16 11.5 16 8.5C16 6.5 15 4.25 13.5 3.574C11.577 2.679 10 3.782 10 5.172Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 8.5C20 6.5 19 4.25 17.5 3.574" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M10 16V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M7 22H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Pet Policy',
    description: 'Pets are not allowed.',
  },
];

const amenities = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 21H18C18.5523 21 19 20.5523 19 20V10L21 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 21V15C9 14.4477 9.44772 14 10 14H14C14.5523 14 15 14.4477 15 15V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: '2 Bedrooms',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M4 12V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M6 12V6C6 4.89543 6.89543 4 8 4H16C17.1046 4 18 4.89543 18 6V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    label: '2½ Bathrooms',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M17 7V5C17 3.89543 16.1046 3 15 3H9C7.89543 3 7 3.89543 7 5V7" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="14" r="3" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    label: 'Free Parking',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M17 7V5C17 3.89543 16.1046 3 15 3H9C7.89543 3 7 3.89543 7 5V7" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="14" r="3" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    label: '24-hour electricity',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M8.111 16.404a5.5 5.5 0 0 1 7.778 0M12 20h.01M5.636 13.636a9 9 0 0 1 12.728 0M2.636 10.636C5.137 8.136 8.462 6.636 12 6.636s6.863 1.5 9.364 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: 'High-Speed WiFi',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="6" y="4" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M10 9H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M10 12H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12" cy="16" r="1" fill="currentColor"/>
      </svg>
    ),
    label: 'Smart TV',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="6" y="4" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M10 9H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M10 12H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12" cy="16" r="1" fill="currentColor"/>
      </svg>
    ),
    label: 'Wahsing Machine',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="6" y="4" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M10 9H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M10 12H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12" cy="16" r="1" fill="currentColor"/>
      </svg>
    ),
    label: ' Water heater',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="currentColor" strokeWidth="2"/>
        <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="9" cy="9" r="1" fill="currentColor"/>
        <circle cx="15" cy="9" r="1" fill="currentColor"/>
      </svg>
    ),
    label: 'Pool Access',
  },
];

export default function HouseRules() {
  return (
    <section id="rules" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>House Guide</span>
          <h2 className={styles.title}>House Rules & Amenities</h2>
          <p className={styles.description}>
            To ensure a comfortable stay for all our guests, please review our 
            house rules and explore the amenities we offer.
          </p>
        </div>

        {/* Amenities */}
        <div className={styles.amenities}>
          {amenities.map((amenity, index) => (
            <div key={index} className={styles.amenityItem}>
              <span className={styles.amenityIcon}>{amenity.icon}</span>
              <span className={styles.amenityLabel}>{amenity.label}</span>
            </div>
          ))}
        </div>

        {/* Rules Grid */}
        <div className={styles.rulesGrid}>
          {rules.map((rule, index) => (
            <div key={index} className={styles.ruleCard}>
              <div className={styles.ruleIcon}>{rule.icon}</div>
              <h3 className={styles.ruleTitle}>{rule.title}</h3>
              <p className={styles.ruleDescription}>{rule.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
