This is a *Cloning Pinterest* project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

This is a Pinterest website cloning project. If you want to try using it, please clone the repository and following this steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/hanifrobbani/cloning-pinterest.git
    cd cloning-pinterest
    ```
2. Instal Dependencies:
    ```bash
    npm install
    ```
3. Clone my Api Pinterest:
    ```bash
    git clone https://github.com/hanifrobbani/api-pinterest.git
    cd api-pinterest
    ```
5. Instal Dependencies for the Api:
    ```bash
    composer install
    ```
6. Copy the .env file and configure your environment:
    ```bash
    cp .env.example .env
    php artisan key:generate
    ```
7. Install Node.js dependencies (for the Api):
    ```bash
   npm install
    ```
8. Run database migrations:
    ```bash
   php artisan migrate
    ```


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.