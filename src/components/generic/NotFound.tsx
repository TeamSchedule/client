import { Link, useNavigate } from "react-router-dom";
import { startPagePath } from "../../routes/paths";

export default function NotFound() {
    /*
     * Страница 404 Not Found. Предлагает вернуться назад или на главную страницу.
     * */
    const navigate = useNavigate();

    return (
        <main className="p-3">
            <h1>There's nothing here!</h1>
            <p>
                You can get back to the
                {/*eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
                <a href="#" onClick={() => navigate(-1)}>
                    &nbsp;previous page&nbsp;
                </a>{" "}
                or move to&nbsp;
                <Link to={startPagePath}>main page</Link>.
            </p>
        </main>
    );
}
