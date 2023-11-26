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

const Sidebar = () => {
  const { logout } = useAuth();
  return (
    <aside className="sidebar">
      <nav className="menu">
        <a href="/home" className="link">
          <Home />
        </a>
        <a href="/create-new-book" className="link">
          <Post />
        </a>
        <a href="/search" className="link">
          <Search />
        </a>
        <a href="/collections" className="link">
          <Collection />
        </a>
        <a href="/notifications" className="link">
          <Bell />
        </a>
        <a href="/settings" className="link">
          <Settings />
        </a>
        <button className="link" onClick={logout}>
          <Signout />
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
