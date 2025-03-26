# Inkspire

**Ignite Your Creativity with a Seamless Blog Management System**

Inkspire is a modern, open‐source blog management tool built with **Next.js**, **TypeScript**, and **Tailwind CSS**. It provides a two-pane editor (write on the left, preview on the right), along with features like metadata management, S3-based content storage, and SEO-friendly pages.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [Usage](#usage)
  - [Creating a New Blog](#creating-a-new-blog)
  - [Editing a Blog](#editing-a-blog)
  - [Publishing a Blog](#publishing-a-blog)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## Features

- **Two-Pane Editor**: Rich text or Markdown editor on the left, real-time preview on the right.  
- **Metadata & SEO**: Store blog metadata (title, description, keywords) for better search engine visibility.  
- **S3 Content Storage**: Keeps the heavy JSON content in AWS S3, while metadata resides in a PostgreSQL database (e.g., Neon).  
- **Simple API**: CRUD endpoints for creating, reading, updating, and deleting blogs.  
- **Responsive Design**: Tailwind CSS ensures a mobile-friendly layout.  
- **Open Source**: Easily extend or integrate with your own authentication, DB, or additional features.

---

## Tech Stack

- **Framework**: [Next.js 13](https://nextjs.org/docs/app) (App Router)  
- **Language**: [TypeScript](https://www.typescriptlang.org/)  
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)  
- **UI**: [Ant Design 5.0](https://ant.design/components/overview/)
- **Database**: PostgreSQL (hosted on [Neon](https://neon.tech/))  
- **Storage**: AWS S3 for blog content JSON  
- **Editor**: [Editor.js](https://editorjs.io/)

---

## Getting Started

### Prerequisites

1. **Node.js** (v16 or higher recommended)  
2. **Yarn** or **npm** (whichever you prefer)  
3. **PostgreSQL** database connection (Neon or local)  
4. **AWS S3** bucket (or another storage solution)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Leo-rq-yu/Blog-Management-System.git
   ```
2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

### Environment Variables

Create a `.env.local` file in the root directory (or `.env` if you prefer) and add the following variables:

```bash
# Public domain for your application (e.g., https://yourdomain.com)
NEXT_PUBLIC_DOMAIN=https://yourdomain.com

# Public URL for your CDN (e.g., https://your-cdn-url.com)
NEXT_PUBLIC_CDN_URL=https://your-cdn-url.com

# PostgreSQL connection string (e.g., postgres://username:password@host:port/database)
DATABASE_URL=postgres://user:password@localhost:5432/yourdatabase

# AWS S3 bucket configuration
# The name of your S3 bucket where content will be stored
NEXT_PUBLIC_S3_BUCKET_NAME=your-s3-bucket-name

# AWS S3 region where your bucket is hosted (e.g., us-east-1)
NEXT_PUBLIC_S3_REGION=us-east-1

# Public URL for your S3 bucket (e.g., https://your-s3-bucket-name.s3.amazonaws.com)
NEXT_PUBLIC_S3_URL=https://your-s3-bucket-name.s3.amazonaws.com

# AWS credentials for accessing S3 (Keep these secret and add your .env file to .gitignore)
AWS_ACCESS_KEY_ID=your-aws-access-key-id
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key

```

### Running the App

**Development mode**:
```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

---

## Usage

### Creating a New Blog

1. Go to the **Home** page (`/`).  
2. Click **Create New Post** (or the “+” card).  
3. Enter the **title**, **author**, **tag** (folder in S3), and optional **description** or **keywords**.  
4. Once created, you’ll be redirected to the editor page.

### Editing a Blog

1. In the **Home** page, select an existing blog to edit.  
2. Use the left pane to modify content (Editor.js JSON).  
3. The right pane updates in real-time to show a preview.  
4. Update metadata (title, description, etc.) in the top toolbar.  
5. Click **Save** to store changes (JSON uploaded to S3, metadata updated in DB).

### Publishing a Blog

1. From the editor page, change **status** to `published` or click a **Publish** button.  
2. The blog’s metadata updates in the DB with a `published_at` timestamp.  
3. The published blog can be displayed on a public route if you integrate a front-facing page.

---

## Project Structure

```
.
├─ src/
│  ├─ app/
│  │  ├─ page.tsx        # Home / Dashboard
│  │  ├─ layout.tsx      # Global layout (App Router)
│  │  ├─ api/
│  │  │  ├─ blogs/
│  │  │  │  └─ route.ts  # API endpoints (GET/POST)
│  │  │  └─ ...          # More routes
│  │  ├─ editor/
│  │  │  └─ [id]/
│  │  │     └─ page.tsx  # Editor page
│  ├─ components/        # Components
│  ├─ lib/               # Types
|  ├─ styles/            # Style sheets of preview and editor panes
|  ├─ utils/             # Utility function & EditorJS configurations
│  └─ ...
├─ public/
│  └─ ...                # Static assets
├─ .env.example          # Example environment variables
├─ README.md
├─ LICENSE
├─ package.json
└─ ...
```

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request:

1. **Fork** this repository.  
2. Create a new branch: `git checkout -b feature/my-feature`.  
3. Make your changes and **commit**: `git commit -m 'Add new feature'`.  
4. **Push** to the branch: `git push origin feature/my-feature`.  
5. Open a **Pull Request**.

---

## License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- [Next.js](https://nextjs.org/) for the React framework and App Router.  
- [Tailwind CSS](https://tailwindcss.com/) for rapid UI styling.  
- [Neon](https://neon.tech/) for hosting PostgreSQL.  
- [AWS S3](https://aws.amazon.com/s3/) for content storage.  
- [Editor.js](https://editorjs.io/) for the core editing experience.

Thank you for using **Inkspire**. Feel free to share feedback, report bugs, or suggest new features! Enjoy creating and managing your blogs.