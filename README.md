# Social UI Frontend

A modern web application built with Next.js 15 and React 19.

## Overview

This repository contains the frontend application for **Social**, built using **Next.js 15** and **React 19**. The project leverages modern libraries and tools such as **Shadcn/UI** for accessible component primitives, **Server Components** for data fetching and state management, **React Hook Form** and **Zod** for form handling and validation.

## Technologies

- **Framework**: [Next.js 15](https://nextjs.org/)

- **UI Library**: [React 19](https://react.dev/)

- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

- **Authentication**: [NextAuth.js](https://next-auth.js.org/)

- **Form Handling**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation

- **Data Fetching**: [React Server components](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching)

- **UI Components**: [Shadcn/ui](https://ui.shadcn.com/)

- **Icons**: [Lucide React](https://lucide.dev/)

- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)

## Features

- Modern UI with responsive design

- Server-side rendering and static site generation

- Authentication and authorization

- Form validation

- Data fetching and caching

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)

- pnpm or yarn or npm

### Set up environment variables

NEXT_PUBLIC_API_URL="http://localhost:3001/"
AUTH_SECRET="P4ymxCy1AF9QIK5OHhcO6AM6kVazSyMJ0eIfI5AAsqY="

### Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/zawzawmyint/social-ui-nextjs.git
   cd social-ui-nextjs
   ```
2. **Install dependencies**:
   ```bash
   pnpm install
   ```
3. **Start the development server**:
   ```bash
   pnpm run dev
   ```
4. **Build the project for production**:
   ```bash
   pnpm run build
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Social backend repository

Open [https://github.com/zawzawmyint/social-api-nestjs](https://github.com/zawzawmyint/social-api-nestjs)
