import { Link } from 'react-router-dom';
import './NotFoundPage.scss'

const NotFoundPage = () => {
    return (
        <div className="NotFoundPage">
            <div className="NotFoundPage-text1">
                Error 404
            </div>
            <div className="NotFoundPage-text2">
                The page was not found or has been deleted.<br/>
                Go to <Link to="/">main page.</Link>
            </div>
        </div>
    )
}

export default NotFoundPage