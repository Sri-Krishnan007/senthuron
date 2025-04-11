# 🏡 AppCopilot

**AppCopilot** is a real estate assistant app built with **Cordova**, featuring user authentication, and a dashboard. It helps users make smarter property decisions — with plans to add building comparison features and analytics.

---

## 🚀 Features

- 🔐 **User Authentication**
  - Sign up, login, and secure access to the dashboard.

- 📊 **Dashboard**
  - User profile management.
  - Placeholder sections for future features.

- ❌ **Compare Buildings** *(Not Yet Implemented)*
  - Input and view multiple property listings.
  - Smart comparison based on features, pricing, and amenities.
  - Building statistics (e.g., number of entries, views, comparisons).
  - Website/app reach analytics.

- 📱 **Cross-Platform**
  - Built using **Cordova** — deployable as a web app and mobile app.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Cordova** | Cross-platform app development |
| **HTML, CSS, JS** | Frontend structure and logic |
| **Bootstrap 5** | Responsive UI design |
| **MongoDB** | Backend database for storing users |

---

## 📁 Folder Structure (Current)

```
AppCopilot/
│
├── www/
│   ├── css/
│   │   ├── login.css
│   │   ├── signup.css
│   │   └── main.css
│   ├── js/
│   │   ├── login.js
│   │   ├── signup.js
│   │   └── main.js
│   ├── login.html
│   ├── signup.html
│   └── main.html
│
└── config.xml
```

---

## 🔧 Setup & Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/appcopilot.git
   cd appcopilot
   ```

2. **Install Cordova:**
   ```bash
   npm install -g cordova
   ```

3. **Run the App:**
   ```bash
   cordova platform add browser
   cordova run browser
   ```

4. **MongoDB Configuration:**
   - Ensure your MongoDB instance is running and connected to the app.

---

## 📬 Contact

**Developer:** [Your Name]  
**Email:** [your.email@example.com]  
**GitHub:** [github.com/yourusername](https://github.com/yourusername)

---

> “Find. Compare. Decide.” — With AppCopilot by your side.