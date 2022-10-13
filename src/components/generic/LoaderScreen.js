import { CircularProgress } from "@mui/material";

export default function LoaderScreen({ loaded }) {
    if (loaded) return null;

    return (
        <>
            <div className="d-flex position-absolute w-100 left-0 right-0 top-0 bottom-0 loaderScreen">
                <CircularProgress className="m-auto" size={64} color="info" thickness={5} />
            </div>
        </>
    );
}
