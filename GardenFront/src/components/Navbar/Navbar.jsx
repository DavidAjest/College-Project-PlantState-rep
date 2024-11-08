import { Link, useLocation, useNavigate } from "react-router-dom";

import logo from "../../assets/logos.png";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [showingMenu, setShowingMenu] = useState(false);
  const nav = useNavigate();
  useEffect(() => {
    const triggerMenu = () => {
      setShowingMenu((showing) => false);
    };
    document.addEventListener("click", triggerMenu);
    return () => {
      document.removeEventListener("click", triggerMenu);
    };
  }, []);

  const AuthBox = useCallback(() => {
    if (!user) {
      return (
        <div className="flex flex-row gap-4 items-center">
          <Link to="/auth/login" className="text-[black] text-[12px] hover:text-[gray]">
            Login
          </Link>
          <Link to="/auth/register" className="text-[black] text-[12px] hover:text-[gray]">
            Register
          </Link>
        </div>
      );
    }
    return (
      <div
        id="auth-box"
        className="cursor-pointer relative"
        onClick={(e) => {
          e.stopPropagation();
          setShowingMenu((showing) => !showing);
        }}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          id="menu-authbox"
          style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
          className={`absolute overflow-hidden w-full flex flex-col items-center h-max rounded-br-xl rounded-bl-xl border-[1px] translate-y-[45px] bg-[white]%]${
            !showingMenu ? " hidden" : ""
          }`}
        >
          {user?.isAdmin && (
            <div>
              <div
                onClick={() => nav("/model-improvement")}
                className=" p-2 hover:bg-[lightgray] bg-white transition-all w-full text-center"
                style={{
                  color: location.pathname === "/model-improvement" ? "green" : "black",
                }}
              >
                Model improvement
              </div>
              <div
                onClick={() => nav("/queries")}
                className=" p-2 hover:bg-[lightgray] bg-white transition-all w-full text-center"
              >
                Queries
              </div>

              <div
                onClick={() => nav("/reviews")}
                className=" p-2 hover:bg-[lightgray] bg-white transition-all w-full text-center"
              >
                Reviews
              </div>
            </div>
          )}
          {user && !user.isAdmin && (
            <div onClick={() => nav("/review")} className=" p-2 hover:bg-[lightgray]  bg-white  transition-all w-full text-center">
              Add Review
            </div>
          )}
          <div
            className=" p-2 hover:bg-[lightgray]  bg-white  transition-all w-full text-center"
            onClick={() => {
              logout();
              toast("Logged out! See you next time");
              setShowingMenu(false);
            }}
          >
            Logout
          </div>
        </div>
        <span className="opacity-[0.7] font-bold md:text-[14px] text-[12px]">Logged in as:</span>{" "}
        <b>
          {user.name} ({user.isAdmin ? "Admin" : "User"})
        </b>{" "}
      </div>
    );
  }, [user, showingMenu, location]);

  const AdminButtons = useCallback(() => {
    if (user?.isAdmin) {
      return (
        <div className="flex flex-row gap-4">
          <Link
            to="/model-improvement"
            className="font-bold text-[14px]"
            style={{
              color: location.pathname === "/model-improvement" ? "green" : "black",
            }}
          >
            Model Improvement
          </Link>
          <Link
            to="/queries"
            className="font-bold text-[14px]"
            style={{
              color: location.pathname === "/queries" ? "green" : "black",
            }}
          >
            Queries
          </Link>
        </div>
      );
    }
    return null;
  }, [user, location]);

  return (
    <div className="bg-[white] p-2 flex flex-row justify-between items-center border-b-[1px] border-b-[lightgray]">
      <div className="flex flex-row items-center gap-4">
        <div
          className="flex flex-row items-center gap-2 cursor-pointer"
          onClick={() => {
            nav("/");
          }}
        >
          <img src={logo} width={50} height={50} />
          <div className="translate-x-2 hidden font-bold text-[13px] md:flex">Garden Pro</div>
        </div>
        <Link
          to="/about"
          className="ml-2 md:flex font-bold text-[14px]"
          style={{
            color: location.pathname === "/about" ? "green" : "black",
          }}
        >
          About
        </Link>

        {user && !user.isAdmin && (
          <Link
            to="/review"
            className="ml-2 md:flex font-bold text-[14px]"
            style={{
              color: location.pathname === "/review" ? "green" : "black",
            }}
          >
            Add Review
          </Link>
        )}

        {user && user.isAdmin && (
          <Link
            to="/reviews"
            className="ml-2 md:flex font-bold text-[14px]"
            style={{
              color: location.pathname === "/reviews" ? "green" : "black",
            }}
          >
            Reviews
          </Link>
        )}

        <AdminButtons />
      </div>
      <div className="pr-[2rem]">
        <AuthBox />
      </div>
    </div>
  );
}

export default Navbar;
