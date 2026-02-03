export default function Section({ id, className = "", children }) {
    return (
        <section id={id} className={`py-20 px-6 ${className}`}>
            <div className="max-w-4xl mx-auto">{children}</div>
        </section>
    );
}
