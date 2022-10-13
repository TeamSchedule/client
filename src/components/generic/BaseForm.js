export default function BaseForm({ autoComplete, onSubmit, children }) {
    return (
        <>
            <form className="m-auto" onSubmit={onSubmit} autoComplete={autoComplete}>
                {children}
            </form>
        </>
    );
}
