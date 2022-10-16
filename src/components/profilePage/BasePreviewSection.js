function BasePreviewSection({ children }) {
    return (
        <>
            <div
                className="p-3"
                style={{
                    background: "#ffffff",
                    borderRadius: "20px",
                    filter: "drop-shadow(1px 10px 30px rgba(43, 67, 115, 0.1))",
                }}
            >
                {children}
            </div>
        </>
    );
}

export default BasePreviewSection;
