import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineLogout, AiOutlineSetting } from "react-icons/ai";
import { BiSearch, BiUser } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import useAuthStore from "../../store/authStore";
import Logo from "../../utils/kicktok2.png";
import { createOrGetUser } from "../../utils";

const Navbar = () => {
  const { userProfile, addUser, removeUser } = useAuthStore();
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
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

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };

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
      <div className="relative hidden md:block">
        <form
          onSubmit={handleSearch}
          className="absolute md:static top-10 -left-20 bg-white"
        >
          <input
            className="bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full  md:top-0"
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search accounts and videos"
          />
          <button
            onClick={handleSearch}
            className="absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400"
          >
            <BiSearch />
          </button>
        </form>
      </div>
      <div>
        {userProfile ? (
          <div className="flex md:gap-10">
            <Link href="/upload">
              <button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2">
                <IoMdAdd className="text-xl font-bold" />
                {` `}
                <span className="md:block">Upload</span>
              </button>
            </Link>
            {userProfile.image && (
              // <Link href={`/profile/${userProfile._id}`}>
              <div
                onClick={() => setShowDropdown((prev) => !prev)}
                className="ml-4 md:mt-0"
              >
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
              className="absolute right-70 top-12 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <div className="py-1" role="none">
                <a
                  href="#"
                  className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-50 flex items-center gap-2"
                  role="menuitem"
                  id="menu-item-0"
                  onClick={() => setShowDropdown(false)}
                >
                  <AiOutlineSetting className="text-xl font-bold" />
                  <span>Account settings</span>
                </a>
                <Link href={`/profile/${userProfile._id}`}>
                  <a
                    href="#"
                    className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-50 flex items-center gap-2"
                    role="menuitem"
                    id="menu-item-1"
                    onClick={() => setShowDropdown(false)}
                  >
                    <BiUser className="text-xl font-bold" />
                    <span>Profile</span>
                  </a>
                </Link>

                <form method="POST" action="#" role="none">
                  <button
                    type="submit"
                    className="text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2"
                    role="menuitem"
                    id="menu-item-3"
                    onClick={() => {
                      googleLogout();
                      removeUser();
                    }}
                  >
                    <AiOutlineLogout className="text-xl font-bold" />
                    <span>Sign out</span>
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
