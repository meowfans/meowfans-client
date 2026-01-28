# MeowFans Client

This is the frontend monorepo for MeowFans, built with [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/), and [Turborepo](https://turbo.build/).

## Tech Stack

- **Framework:** Next.js 15 (App Router), React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS, Radix UI (via shared UI package)
- **State Management:** Zustand
- **Data Fetching:** Apollo Client (GraphQL)
- **Monorepo Tooling:** Turborepo, PNPM Workspaces
- **Validation:** Zod
- **Icons:** Lucide React, Tabler Icons

## Project Structure

This project uses a monorepo structure organized as follows:

### Apps (`/apps`)

- **`client`**: The main user-facing application.
- **`admin`**: The administrative dashboard.
- **`creator`**: The creator portal and tools.
- **`auth`**: Authentication flow application.

### Packages (`/packages`)

- **`ui`** (`@workspace/ui`): Shared UI library containing reusable components based on Radix UI.
- **`gql`** (`@workspace/gql`): Shared GraphQL configuration, Apollo Client setup, and generated types.
- **`eslint-config`** (`@workspace/eslint-config`): Shared ESLint configurations.
- **`typescript-config`** (`@workspace/typescript-config`): Shared `tsconfig.json` bases.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (>= 20.x)
- [PNPM](https://pnpm.io/) (v10.x)

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository-url>
    cd meowfans-client
    ```

2.  Install dependencies:
    ```bash
    pnpm install
    ```

### Development

To start the development server for all applications simultaneously:

```bash
pnpm dev
# or
turbo run dev
```

To run a specific application:

```bash
pnpm dev:client   # Starts the Client app
pnpm dev:admin    # Starts the Admin app
pnpm dev:creator  # Starts the Creator app
pnpm dev:auth     # Starts the Auth app
```

### Build

To build all applications and packages:

```bash
pnpm build
```

To build a specific application:

```bash
pnpm build:client
```

### Linting & Formatting

To run linting across the workspace:

```bash
pnpm lint
```

To format code with Prettier:
Be aware of this as this will format the gql generated file which might cause error

```bash
pnpm format
```

## Environment Variables

Check the `.env.example` files in each application directory for required environment variables. You typically need to set standard Next.js and Apollo Client variables (e.g., API endpoints).

## Contributing

1.  Make sure you have the latest dependencies (`pnpm i`).
2.  Create a branch for your feature or fix.
3.  Ensure linting passes (`pnpm lint`).
4.  Commit your changes and push to the repository.
