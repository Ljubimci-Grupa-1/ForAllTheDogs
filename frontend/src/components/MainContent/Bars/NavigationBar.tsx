import './NavigationBar.css';

const NavigationBar = () => {
    return (
        <nav className="navbar">
            <ul className="nav-list">
                <li className="nav-item">
                    <a href="/map">Map</a>
                </li>
                <li className="nav-item">
                    <a href="/account">Account</a>
                </li>
                <li className="nav-item">
                    <a href="/inbox">Inbox</a>
                </li>
            </ul>
        </nav>
    );
};

export default NavigationBar;
