import React from 'react';
import { Link } from 'react-router-dom';
import config from '../../../config'

class TopNav extends React.Component {

    logOut = async ()=> {
        //console.log('logOut');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('error');
        await fetch('http://' + config.serverUrl +':'+ config.serverPort + '/logout',{
            method:'post',
            headers:{'Content-Type': 'application/json',},
        });
        return false;
    };
    render() {
        //console.log('topNav props:',this.props.title);
        return (
            <nav className="navbar-header">
                <ul className="nav-list">
                    {!this.props.user ?
                        <li><Link to="/">MAIN</Link></li>
                        : ""
                    }
                    {this.props.user ?
                    <li>
                        <Link to="/chat">CHAT</Link>
                        <Link to="/userPage">MY PROFILE</Link>
                    </li>
                     : ""
                    }
                    {this.props.user && this.props.user.username === 'Administrator' ?
                        <li><Link to="/users">ADMIN PAGE</Link></li>
                        : ""
                    }
                </ul>
                <ul className="nav-list">
                    {!this.props.user ?

                            <li>
                                <Link to="/login" className={`${this.props.title === "REGISTRATION PAGE" ? "active" :""}`}>LOGIN</Link>
                                <Link to="/register" className={`${this.props.title === "LOGIN PAGE" ? "active" :""}`}>JOIN</Link>
                            </li>


                     :
                        <li>
                            <Link to="/" onClick={this.logOut}>SIGN OUT</Link>
                        </li>
                    }
                </ul>
            </nav>
        )
    }
}
export default TopNav;