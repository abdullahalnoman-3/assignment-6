# 🏋️‍♂️ FitLog - Train with intent. Log every set.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

FitLog is a dark, no-nonsense gym companion that helps you pick a lift, lock it into today's plan, and watch the week's work add up. Designed with a sleek, modern, and fully responsive UI.

🌐 **Live Demo:** [https://assignment.hmnoman.com](https://assignment.hmnoman.com) 

---

## ✨ Key Features

- 📱 **Fully Responsive Design:** A beautiful dark theme optimized for mobile, tablet, and desktop screens.
- 📚 **Workout Library:** Browse a comprehensive list of workouts fetched from an external API.
- 🗓️ **Daily Planner & Saved List:** Add up to **5 exercises** to your "Today's Plan", or save them for later. Smart validation prevents adding duplicates.
- 💾 **Local Storage Persistence:** Your plans and saved workouts are saved in the browser. You won't lose your data even if you refresh or close the tab!
- 🔄 **Dynamic Sorting:** Sort your saved/planned workouts by **Duration**, **Calories**, or **Rating** instantly.
- 🔔 **Interactive UI:** Smooth toast notifications for adding, removing, or completing workouts.

---

## 🚀 Technologies Used

- **Framework:** [Next.js (App Router)](https://nextjs.org/)
- **Library:** [React](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Notifications:** [React Hot Toast](https://react-hot-toast.com/)

---

## 🛠️ Installation & Setup

Follow these steps to run the project locally on your machine:

**1. Clone the repository**
```bash
git clone <your-repo-link>
cd assignment-6
```

**2. Install dependencies**
```bash
npm install
```

**3. Run the development server**
```bash
npm run dev
```

**4. Open the app**
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📦 Building for Production

To create an optimized production build (e.g., for cPanel Node.js hosting):

```bash
npm run build
```
The project uses `output: "standalone"` to generate an optimized build inside the `.next/standalone` folder, making server deployments incredibly easy.

---

<p align="center">Made with ❤️ for Fitness Enthusiasts</p>
