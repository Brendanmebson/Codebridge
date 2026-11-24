# CodeBridge - Financial Empowerment Cooperative

![CodeBridge Logo](src/assets/logo.jpg)

CodeBridge is a professional, member-owned cooperative platform designed to promote financial security through disciplined savings, affordable credit facilities, and mutual community support. 

Built with a focus on transparency and accessibility, the site tells the cooperative's story and lets prospective members apply online.

## 🚀 Features

### **Public Presence**
-   **Dynamic Landing Page**: Modern, high-impact design featuring animated impact metrics and service overviews.
-   **Loan Calculator**: Interactive tool for prospective and current members to estimate loan repayments.
-   **Comprehensive Documentation**: Clear access to loan policies, membership terms, and governance information.
-   **Membership Application**: Prospective members fill in the application form and attach their documents; the submission is emailed to the cooperative via [FormSubmit](https://formsubmit.co) (recipient set in `src/config/forms.ts`).

## 🛠 Tech Stack

-   **Frontend**: React (Vite), TypeScript
-   **UI/UX**: Material UI (MUI), Emotion, MUI Icons
-   **Forms**: FormSubmit (membership applications), Supabase (newsletter and business directory submissions)
-   **Utilities**: Axios, React Hook Form, Date-fns

## 🏗 Project Structure

```text
src/
├── assets/          # Static assets (images, logos)
├── components/      # Shared reusable UI components
├── config/          # Service configurations (Supabase, etc.)
├── data/            # Exco profiles and the shared real-photo set (photos.ts)
├── pages/
│   └── public/      # Landing page and information pages
└── theme/           # Material UI theme customizations
```

## ⚙️ Getting Started

### **Prerequisites**
-   Node.js (v18+)
-   npm or yarn

### **Installation**

1.  **Clone the repository**:
    ```bash
    git clone [repository-url]
    cd codebridge-frontend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Create a `.env` file in the root directory and add your Supabase credentials:
    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_anon_key
    ```

4.  **Start the development server**:
    ```bash
    npm run dev
    ```

## 🔒 Security
-   **Environment Protection**: `.env` files are ignored by version control to protect sensitive keys.

---
*Built with ❤️ by the CodeBridge Team.*
