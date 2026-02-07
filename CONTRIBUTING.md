# Contributing to MADslides

We want to make contributing to this project as easy and transparent as possible.

## Pull Request Process

1.  **Fork the repo** and create your branch from `main`.
2.  **Clone the repo** to your local machine.
3.  **Install dependencies** using `./setup.sh` or `npm install`.
4.  **Make your changes**.
5.  **Run verification** using `./verify.sh` to ensure your code builds and passes checks.
6.  **Commit your changes** with clear, descriptive commit messages.
7.  **Push your branch** to your fork.
8.  **Submit a Pull Request** to the `main` branch.

## Branching Strategy

- `main`: The main branch containing the latest stable code.
- `feature/your-feature`: For new features.
- `fix/your-fix`: For bug fixes.

## Coding Standards

- Use **TypeScript** for all new logic.
- Follow the existing project structure.
- Ensure components are clean and reusable.
- Use **Tailwind CSS** for styling.

## Verification

Always run `./verify.sh` before submitting a PR. This script runs the build process to check for TypeScript errors and build failures.

## License

By contributing, you agree that your contributions will be licensed under its MIT License.
