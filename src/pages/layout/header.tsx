import NavItem from "../../components/NavItem";
import logo from "../../assets/images/logo.svg";
import { Bell, User } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";

type RefProps = HTMLDivElement | null;

function Header() {
  const navRef = useRef<RefProps>(null);

  const showNavbar = () => {
    if (navRef.current) {
      navRef.current.classList.toggle("responsive_nav");
    }
  };
  return (
    <div className="">
      <section className="max-container lg:w-[80%] w-[90%] mx-auto flex justify-between items-center gap-6">
        <div className="w-16 h-fit">
          <img src={logo} alt="Urban logo" className="w-full h-full " />
        </div>
        <div className="hidden md:flex justify-center items-center gap-4">
          <NavItem label="Dashboard" link="/app/home" />
          <NavItem label="Products" link="/app/products" />
          <NavItem label="Invoices" link="/app/orders" />
          <NavItem label="Transactions" link="/app/stocks" />
        </div>
        <div className="flex justify-end items-center gap-3">
          <div className="text-white">
            <Bell size={22} />
          </div>
          <Link to="/app/profile" className="text-white">
            <div className="text-white">
              <User size={23} />
            </div>
          </Link>
          <div
            onClick={showNavbar}
            className="nav-btn md:hidden block text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
        </div>
      </section>
      <nav ref={navRef} className="w-full md:hidden flex justify-between gap-0">
        <div
          onClick={showNavbar}
          className="xs:w-[50%] w-[30%] bg-black opacity-[0.7]"
        ></div>
        <div className="flex-1 bg-white">
          <div className="w-full px-10 py-6 flex justify-between items-center">
            <div className="w-[60px] h-full">
              <Link onClick={showNavbar} to="/">
                <img
                  src={logo}
                  alt="Rent Stream logo"
                  className="w-full h-full"
                />
              </Link>
            </div>
            <div onClick={showNavbar}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
          </div>
          <div className="w-[80%] mx-auto py-4 flex flex-col gap-6">
            <NavItem label="Dashboard" link="/app/home" />
            <NavItem label="Products" link="/app/products" />
            <NavItem label="Orders" link="/app/orders" />
            <NavItem label="Stocks" link="/app/stocks" />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
