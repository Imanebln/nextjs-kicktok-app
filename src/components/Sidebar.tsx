import React, { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import { IoClose, IoGameControllerOutline } from "react-icons/io5";
import GoogleLogin from "react-google-login";
import Discover from "./Discover";
import Footer from "./Footer";
import SuggestedAccounts from "./SuggestedAccounts";
const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const { pathname } = useRouter();
  const activeLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#DE3155] rounded";

  const normalLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold rounded";
  return (
    <div>
      <div
        className="block xl:hidden m-2 ml-4 mt-3 text-xl"
        onClick={() => setShowSidebar((prev) => !prev)}
      >
        {/* {showSidebar ? <IoClose /> : <AiOutlineMenu />} */}
      </div>
      {showSidebar && (
        <div className="xl:w-80 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3 ">
          <div className="xl:border-b-2 border-gray-200 xl:pb-4">
            <Link href="/">
              <div className={pathname === "/" ? activeLink : normalLink}>
                <p className="text-2xl">
                  <AiFillHome />
                </p>
                <span className="capitalize text-xl hidden xl:block">
                  For You
                </span>
              </div>
            </Link>
          </div>

          <Discover />
          <SuggestedAccounts />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
