# Contributing to MeowFans Client

Thank you for your interest in contributing to MeowFans! This document provides guidelines and instruction for contributing

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/meowfans/meowfans-client.git
    cd meowfans-client
    ```

2.  **Install dependencies**:
    We use [PNPM](https://pnpm.io/) for package management.

    ```bash
    pnpm install
    ```

3.  **Create a new branch**:

    ```bash
    git checkout -b feature/my-new-feature
    ```

4.  **Make your changes**.

5.  **Test your changes**:
    Ensure the development server runs correctly and your changes work as expected.

    ```bash
    pnpm dev
    pnpm run build
    ```

6.  **Lint and Format**:
    Run linting to ensure code quality.

    ```bash
    pnpm lint
    pnpm format
    ```

7.  **Commit your changes**:

    ```bash
    git commit -m "feat: Add some amazing feature"
    ```

8.  **Push to the branch**:

    ```bash
    git push origin feature/my-new-feature
    ```

9.  **Open a Pull Request**.

## Pull Request Process

1. Update documentation if needed
2. Follow existing code style and conventions
3. Write clear commit messages
4. Test your changes thoroughly
5. Create a pull request with a clear description

## Code Style

- Use ESLint and Prettier configurations
- Follow TypeScript best practices
- Write meaningful comments
- Keep functions small and focused

We encourage the use of [Conventional Commits](https://www.conventionalcommits.org/).

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools and libraries such as documentation generation

## Join The Project Team

If you are interested in becoming a long-term maintainer, please [reach](https://discord.gg/KBVk543u) out to us!
