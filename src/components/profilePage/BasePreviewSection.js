function BasePreviewSection({ children }) {
    return (
        <>
            <div className="p-3" style={{ background: "#eeeeff", borderRadius: "20px" }}>
                {children}
            </div>
        </>
    );
}

export default BasePreviewSection;
