import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import useAuthStore from "../../store/authStore";
import Logo from "../../utils/kicktok2.png";
import { createOrGetUser } from "../../utils";

const Navbar = () => {
  const { userProfile, addUser, removeUser } = useAuthStore();
  const [showDropdown, setShowDropdown] = useState(false);
  const refDropdown = useRef();
  const handleClickOutside = (event: any) => {
    if (refDropdown.current && !refDropdown.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
      <Link href="/">
        <div className="ml-7 w-[100px] md:w-[150px]">
          <Image
            className="cursor-pointer"
            src={Logo}
            alt="Logo"
            layout="responsive"
          />
        </div>
      </Link>
      <div>SEARCH</div>
      <div>
        {userProfile ? (
          <div className="flex gap- md:gap-10">
            <Link href="/upload">
              <button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2">
                <IoMdAdd className="text-xl font-bold" />
                {` `}
                <span className="hidden md:block">Upload</span>
              </button>
            </Link>
            {userProfile.image && (
              // <Link href={`/profile/${userProfile._id}`}>
              <div onClick={() => setShowDropdown((prev) => !prev)}>
                <Image
                  className="rounded-full cursor-pointer object-cover"
                  src={userProfile.image}
                  alt="user"
                  width={37}
                  height={37}
                />
              </div>
              // </Link>
            )}
            <div
              ref={refDropdown}
              style={{ display: showDropdown ? "block" : "none" }}
              className="absolute right-4 top-8 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <div className="py-1" role="none">
                <a
                  href="#"
                  className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-50"
                  role="menuitem"
                  id="menu-item-0"
                >
                  Account settings
                </a>
                <Link href={`/profile/${userProfile._id}`}>
                  <a
                    href="#"
                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-50"
                    role="menuitem"
                    id="menu-item-1"
                  >
                    Profile
                  </a>
                </Link>

                <form method="POST" action="#" role="none">
                  <button
                    type="submit"
                    className="text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-slate-50"
                    role="menuitem"
                    id="menu-item-3"
                    onClick={() => {
                      googleLogout();
                      removeUser();
                    }}
                  >
                    Sign out
                  </button>
                </form>
              </div>
            </div>
            {/* <button
              type="button"
              className="px-2"
              onClick={() => {
                googleLogout();
                removeUser();
              }}
            >
              <AiOutlineLogout color="#F51997" fontSize={21} />
            </button> */}
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(res) => createOrGetUser(res, addUser)}
            onError={() => {
              console.log("error");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
