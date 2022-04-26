import {Link} from "react-router-dom";
import {useNavigate} from "react-router";


export default function NotFound() {
    const navigate = useNavigate();

    return (
        <main className="p-3">
            <h1>There's nothing here!</h1>
            <p>You can get back to the
                <a href="../" onClick={() => navigate(-1)}>&nbsp;previous page&nbsp;</a> or move to&nbsp;
                <Link to="/">main page</Link>.
            </p>
        </main>
    );
}
