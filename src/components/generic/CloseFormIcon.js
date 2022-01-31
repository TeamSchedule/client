import {useNavigate} from "react-router";


export default function CloseFormIcon() {
    const navigate = useNavigate();

    return (
        <button type="button" className="btn-close" aria-label="Close" onClick={() => navigate(-1)}></button>
    );
}
