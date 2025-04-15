# UrbioTech Blog Dashboard

## Overview

A fully functional blog dashboard built as part of the Urbio Technologies frontend developer assignment. The app allows users to browse, and create blog posts — using Next.js, Material-UI, TypeScript, and RTK Query.

## Features

- Next.js with SSR for blog listing and dynamic routing for individual posts
- State management and API handling with Redux Toolkit & RTK Query
- Responsive design with Material-UI
- Create, read, and view blog posts from MockAPI.io
- Graceful handling of loading and error states

## Tech Stack

- Next.js
- TypeScript
- Material-UI
- Redux Toolkit & RTK Query

---

## Running the Project Locally

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn

### Setup Instructions

```bash
# Clone the repository
git clone https://github.com/msayyaf1/urbio-blog.git
cd urbio-blog

# Install dependencies
npm install  # or yarn install

# Run the development server
npm run dev  # or yarn dev


## Design Decisions

### API Integration
- Used RTK Query for all API calls (fetching posts, single post details, creating posts).
- Data fetching optimized with caching and automatic refetching.

### UI/UX Approach
- Built fully responsive layouts using MUI's Grid & Box.
- Used MUI theming for consistent styling.
- Focused on clean, minimal, and user-friendly design.

##  Challenges Faced
- Handling SSR with RTK Query while fetching initial data.
```
