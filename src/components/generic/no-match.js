import {Link} from "react-router-dom";
import {useNavigate} from "react-router";


export default function NoMatch() {
    const navigate = useNavigate();

    return (
        <main>
            <h1>There's nothing here!</h1>
            <p>You can get back to the
                <span onClick={() => navigate(-1)}>previous page</span> or move to
                <Link to="/">main page</Link>.
            </p>
        </main>
    );
}
