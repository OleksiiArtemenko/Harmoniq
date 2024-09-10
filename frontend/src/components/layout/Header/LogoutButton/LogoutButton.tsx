import { setLoginStatus, setLogoutButtonAction } from "../../../../redux/actions/tracksActions.ts";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './LogoutButton.scss'

const LogoutButton = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutButtonAction = useSelector((state: any) => state.logoutButtonAction);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        dispatch(setLoginStatus(false));
        dispatch(setLogoutButtonAction(false));
        navigate('/');
    }

    return (
        <div onClick={handleLogout} className={`logoutButton-container ${logoutButtonAction ? 'open' : ''}`}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
            <div className="logoutButton-container-text">
                Exit
            </div>
        </div>
    )
}

export default LogoutButton