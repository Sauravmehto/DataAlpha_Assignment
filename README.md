# 🏦 Loan Portfolio Dashboard

<div align="center">

![Dashboard Preview](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.0-38B2AC)
![License](https://img.shields.io/badge/License-MIT-yellow)

**A sophisticated, enterprise-grade web application for comprehensive loan portfolio management and analytics**

[🚀 Live Demo](https://dataalphaassignment.netlify.app/) • [📖 Documentation](#) • [🐛 Report Bug](#) • [✨ Request Feature](#)

</div>

---

## ✨ Key Features

### 🔍 **Advanced Analytics & Filtering**
- **Intelligent Data Table**: Multi-column sorting with visual indicators
- **Real-time Global Search**: Instant search across all loan data fields
- **Dynamic Filtering**: Filter by property state, ownership type, and loan status
- **Smart Pagination**: Efficient data loading with customizable page sizes

### 📊 **Professional Dashboard Interface**
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile
- **Modern UI/UX**: Clean, professional interface with glass-morphism effects
- **Interactive Tooltips**: Hover tooltips for truncated data with full details
- **Status Indicators**: Visual status badges with color-coded loan states

### ⚡ **Performance & Reliability**
- **Optimized Rendering**: Efficient data processing and display
- **Error Handling**: Graceful error states with retry mechanisms
- **Loading States**: Professional loading animations and feedback
- **Data Validation**: Robust data handling and validation

## 🛠️ Technology Stack

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Frontend Framework** | React | 18.2.0 | Component-based UI development |
| **Build Tool** | Vite | Latest | Fast development and optimized builds |
| **Styling** | Tailwind CSS | 3.4.0 | Utility-first CSS framework |
| **State Management** | TanStack Query | Latest | Server state management and caching |
| **Routing** | React Router DOM | Latest | Client-side routing |
| **Icons** | Lucide React | Latest | Beautiful, customizable icons |
| **Package Manager** | npm | Latest | Dependency management |

## 🚀 Quick Start Guide

### 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v16.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (v8.0.0 or higher) - Comes with Node.js
- **Git** - [Download here](https://git-scm.com/)

### ⚡ Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/loan-portfolio-dashboard.git
   cd loan-portfolio-dashboard
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Access the Application**
   - **Local Development**: Open your browser and navigate to: `http://localhost:5173`
   - **Live Demo**: Visit the deployed application at: [https://dataalphaassignment.netlify.app/](https://dataalphaassignment.netlify.app/)

### 📜 Available Scripts

| Command | Description | Environment |
|---------|-------------|-------------|
| `npm run dev` | Start development server with hot reload | Development |
| `npm run build` | Create optimized production build | Production |
| `npm run build:dev` | Create development build | Development |
| `npm run preview` | Preview production build locally | Production |
| `npm run lint` | Run ESLint for code quality checks | All |

## 📁 Project Architecture

```
loan-portfolio-dashboard/
├── 📁 public/                 # Static assets
│   ├── favicon.ico
│   └── robots.txt
├── 📁 src/
│   ├── 📁 components/         # Reusable UI components
│   │   └── LoanDataTable.jsx  # Main data table component
│   ├── 📁 hooks/              # Custom React hooks
│   │   └── useLoanData.js     # Data fetching hook
│   ├── 📁 pages/              # Page components
│   │   ├── Index.jsx          # Main dashboard page
│   │   └── NotFound.jsx       # 404 error page
│   ├── App.jsx                # Main application component
│   ├── main.jsx               # Application entry point
│   └── index.css              # Global styles
├── 📄 package.json            # Dependencies and scripts
├── 📄 tailwind.config.js      # Tailwind CSS configuration
├── 📄 vite.config.js          # Vite build configuration
└── 📄 README.md               # Project documentation
```

## 📊 Data Source & API

The application integrates with a comprehensive loan data API that provides:

### 🏠 **Property Information**
- Property state, city, and type classification
- Original property values and current assessments
- Geographic distribution and market analysis

### 💰 **Financial Data**
- Loan balances and payment schedules
- Interest rates and APR calculations
- Payment history and delinquency status

### 👥 **Ownership & Occupancy**
- Ownership type classification
- Occupancy status and verification
- Borrower information and demographics

### 📈 **Loan Portfolio Metrics**
- Portfolio performance indicators
- Risk assessment and scoring
- Regulatory compliance data

## 🤝 Contributing Guidelines

We welcome contributions from the community! Please follow these guidelines:

### 🔄 **Development Workflow**

1. **Fork the Repository**
   ```bash
   git fork https://github.com/your-username/loan-portfolio-dashboard.git
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**
   - Follow the existing code style
   - Add appropriate comments and documentation
   - Ensure responsive design principles

4. **Test Your Changes**
   ```bash
   npm run lint
   npm run build
   ```

5. **Submit Pull Request**
   - Provide clear description of changes
   - Include screenshots for UI changes
   - Reference any related issues

### 📝 **Code Standards**

- **ESLint**: Follow the configured linting rules
- **Prettier**: Maintain consistent code formatting
- **Conventional Commits**: Use semantic commit messages
- **Responsive Design**: Ensure mobile-first approach

## 📄 License & Legal

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### 🛡️ **Security & Privacy**

- No sensitive data is stored locally
- All API calls are made securely
- User privacy is protected and respected
- Regular security audits and updates

---

<div align="center">

**Built with ❤️ by the Development Team**

[🚀 Live Demo](https://dataalphaassignment.netlify.app/) • [⭐ Star this repo](https://github.com/your-username/loan-portfolio-dashboard) • [🐛 Report Issues](https://github.com/your-username/loan-portfolio-dashboard/issues) • [💬 Discussions](https://github.com/your-username/loan-portfolio-dashboard/discussions)

</div>