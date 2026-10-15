import Link from "next/link";

export default function NotFound() {
    return (
    <main className="site-not-found">
        <h1>404 - Page Not Found</h1>

        <p>Sorry, the page you are looking for does not exist.</p>

        <Link href="/" className="back-to-menu">Return Home</Link>
    </main>
    );
}