interface PreviewProps {
    text: string;
    className?: string;
    styles?: object;
}
function PrimaryPreviewText({ className, text, styles }: PreviewProps) {
    return (
        <>
            <p className={className + " " + "fw-bold fs-4"} style={{ color: "black", ...styles }}>
                {text}
            </p>
        </>
    );
}

function SecondaryPreviewText({ className, styles, text }: PreviewProps) {
    return (
        <>
            <p className={className + " " + "fs-5 m-0"} style={{ color: "#6c6c6c", ...styles }}>
                {text}
            </p>
        </>
    );
}

export { PrimaryPreviewText, SecondaryPreviewText };
