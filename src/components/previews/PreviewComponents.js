function PrimaryPreviewText({ className, text }) {
    return (
        <>
            <p className={className + " " + "fw-bold fs-4"} style={{ color: "black" }}>
                {text}
            </p>
        </>
    );
}

function SecondaryPreviewText({ className, styles, text }) {
    return (
        <>
            <p className={className + " " + "fs-5 m-0"} style={{ color: "#6c6c6c", ...styles }}>
                {text}
            </p>
        </>
    );
}

export { PrimaryPreviewText, SecondaryPreviewText };
