# CodeBridge - Financial Empowerment Cooperative

![CodeBridge Logo](src/assets/logo.jpg)

CodeBridge is a professional, member-owned cooperative platform designed to promote financial security through disciplined savings, affordable credit facilities, and mutual community support. 

Built with a focus on transparency and accessibility, the platform provides members with powerful tools to manage their financial growth and administrators with robust management capabilities.

## 🚀 Features

### **Public Presence**
-   **Dynamic Landing Page**: Modern, high-impact design featuring animated impact metrics and service overviews.
-   **Loan Calculator**: Interactive tool for prospective and current members to estimate loan repayments.
-   **Comprehensive Documentation**: Clear access to loan policies, membership terms, and governance information.
-   **Membership Application**: Secure, document-backed application flow for prospective members.

### **Member Dashboard**
-   **Savings Tracking**: Real-time visualization of accumulated savings and dividends.
-   **Loan Management**: Apply for loans, track approval status, and view detailed repayment schedules.
-   **Secure Portal**: Personalized experience with secure authentication and account management.

### **Administrative Portal**
-   **Application Review**: Streamlined interface for reviewing member applications and documents.
-   **Native Email Invitations**: Automated onboarding flow that sends secure invitations to approved members.
-   **Member Management**: Full oversight of the cooperative's membership base, including status updates and role management.

## 🛠 Tech Stack

-   **Frontend**: React (Vite), TypeScript
-   **UI/UX**: Material UI (MUI), Emotion, MUI Icons
-   **Backend & Auth**: Supabase (PostgreSQL, GoTrue, Edge Functions)
-   **Utilities**: Axios, React Hook Form, Date-fns

## 🏗 Project Structure

```text
src/
├── assets/          # Static assets (images, logos)
├── components/      # Shared reusable UI components
├── config/          # Service configurations (Supabase, etc.)
├── contexts/        # React Contexts (Auth, UI state)
├── hooks/           # Custom React hooks (useCounter, etc.)
├── pages/
│   ├── Admin/       # Administrative management pages
│   ├── auth/        # Authentication pages (Login, SignUp)
│   ├── dashboard/   # Member-specific dashboard pages
│   └── public/      # Landing page and information pages
├── theme/           # Material UI theme customizations
└── types/           # TypeScript interfaces and types
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
    VITE_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key (optional, for admin features)
    ```

4.  **Start the development server**:
    ```bash
    npm run dev
    ```

## 🔒 Security
-   **Authentication**: Secured by Supabase Auth with PKCE and Email verification.
-   **Administrative Actions**: Protected by Service Role validation and secure invitation flows.
-   **Environment Protection**: `.env` files are ignored by version control to protect sensitive keys.

---
*Built with ❤️ by the CodeBridge Team.*
