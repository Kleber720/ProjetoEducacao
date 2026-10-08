import { NavLink, useNavigate } from 'react-router-dom';
import { FiBookOpen, FiLogOut } from 'react-icons/fi';
import loginService from '../services/loginService';
import './SideBar.css';

function SideBar() {
    const navigate = useNavigate();

    function handleLogout() {
        loginService.logout();
        navigate('/login', { replace: true });
    }

    return (
        <aside
            className="sideBar"
            aria-label="Menu lateral"
            tabIndex={0}
            onPointerDown={(event) => {
                if (event.pointerType === 'touch') {
                    event.currentTarget.focus();
                }
            }}
        >
            <nav className="sideBarNavigation" aria-label="Cadernos">
                <NavLink className="sideBarAction sideBarNotebook" to="/cadernos">
                    <FiBookOpen className="sideBarIcon" aria-hidden="true" />
                    Cadernos
                </NavLink>
            </nav>

            <button className="sideBarAction sideBarLogout" type="button" onClick={handleLogout}>
                <FiLogOut className="sideBarLogoutIcon" aria-hidden="true" />
                Sair
            </button>
        </aside>
    );
}

export default SideBar;
