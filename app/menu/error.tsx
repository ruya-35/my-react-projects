"use client";

type MenuErrorProps = {
    error: Error & { digest?: string };
    reset: () => void;
};

export default function MenuError({
    error,
    reset,
}: MenuErrorProps) {
    return (
    <section className="menu-error">
        <h2>Something went wrong!</h2>

        <p>We couldnt load the menu. Please try again.</p>

        <button type="button" onClick={() => reset()}>
            Try Again
        </button>
    </section>
    );
}