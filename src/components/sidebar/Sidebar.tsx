import "./sidebar.scss";
// icons
import Home from "../../assets/icon/home.svg?react";
import Post from "../../assets/icon/post.svg?react";
import Search from "../../assets/icon/search.svg?react";
import Collection from "../../assets/icon/collection.svg?react";
import Bell from "../../assets/icon/bell.svg?react";
import Settings from "../../assets/icon/settings.svg?react";
import Signout from "../../assets/icon/signout.svg?react";
import { useAuth } from "../../contexts/AuthContext";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { logout } = useAuth();
  return (
    <aside className="sidebar">
      <div className="logo">
        <img src="logo.svg" alt="logo" />
      </div>
      <nav className="menu">
        <NavLink
          to="/home"
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          <Home />
        </NavLink>
        <NavLink
          to="/create-book"
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          <Post />
        </NavLink>
        <NavLink
          to="/categories"
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          <Search />
        </NavLink>
        <NavLink
          to="/collections"
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          <Collection />
        </NavLink>
        <NavLink
          to="/notifications"
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          <Bell />
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          <Settings />
        </NavLink>
        <button className="link" onClick={logout}>
          <Signout />
        </button>
        <NavLink to="/profile" className="avatar">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            alt="profile"
          />
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
