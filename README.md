# 🛡️ JobNexus — Global Tech, Cyber & AI Career Marketplace

> A curated career acceleration marketplace designed for **CSE AI/ML and Cybersecurity students & freshers** to discover verified internships, remote opportunities, and entry-level positions worldwide.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://devserver-main--poetic-tarsier-a41276.netlify.app/)
[![React](https://img.shields.io/badge/Frontend-React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Bundler-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 🌐 Live Prototype Demo

Explore the working prototype hosted on Netlify:  
👉 **[Launch Live Demo](https://devserver-main--poetic-tarsier-a41276.netlify.app/)**

---

## 📌 Problem Statement

1. **Information Fragmentation:** Early-career candidates in specialized domains (SOC analysis, penetration testing, adversarial AI, cloud security) face search noise on generic job boards filled with senior-level postings.
2. **Currency Ambiguity:** Global remote listings publish compensation exclusively in local currencies, making financial evaluation confusing for international candidates.
3. **Skill Alignment Mismatch:** Entry-level applicants struggle to gauge if their academic toolset (e.g., Wireshark, Linux CLI, PyTorch, Splunk) satisfies real-world job requirements.

---

## 💡 Solution & Key Features

* **Tailored Sectors:** Specialized tracks across Cybersecurity & SOC, AI/ML Security, Systems & Networks, and Technical Troubleshooting.
* **Dynamic Skill-Matcher Engine:** Interactive skill selector that computes instant compatibility match scores against required job tags.
* **Dual Currency Display:** Real-time visibility of compensations in both **US Dollars ($ USD)** and **Indian Rupees (₹ INR / LPA)** with a global toggle switch.
* **15-Minute Smart Cache & Live Aggregation:** Integrates client-side TTL caching (`15 * 60 * 1000` ms) to poll live job streams while conserving bandwidth and API quotas.
* **Direct ATS Redirection:** Direct, deep-linked routing to official job boards (LinkedIn, Greenhouse, Lever, Cisco Careers, Indeed) with zero paywalls.
* **Fresher Career Blueprint:** An integrated roadmap featuring prerequisite core fundamentals, practical lab recommendations, and entry-level security certifications.

---

## 🛠️ Tech Stack

* **Framework:** React.js (Vite)
* **Styling:** Tailwind CSS (Cyberpunk dark aesthetic)
* **Icons:** Lucide React
* **Data Layer:** Resilient hybrid cache model (Client State + LocalStorage TTL + Public Remote APIs)
* **Deployment:** Netlify Continuous Deployment

---

## 🚀 Getting Started (Local Development)

### Prerequisites
* [Node.js](https://nodejs.org/) (version 18.x or higher recommended)
* `npm` or `yarn`

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/ItsVedantt/JobPortel.git](https://github.com/ItsVedantt/JobPortel.git)
   cd JobPortel
