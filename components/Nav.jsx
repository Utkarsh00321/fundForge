"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

import HamBuger from "./Ham";
import Xmark from "./Xmark";

import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const navLinks = [
  {
    title: "Home",
    path: "/Home",
  },
  {
    title: "Stocks",
    path: "/Stocks",
  },
  {
    title: "Gold",
    path: "/Gold",
  },
  {
    title: "Fd",
    path: "/Fd",
  },
  {
    title: "RealEstate",
    path: "/RealEstate",
  },
];

const Nav = () => {
  const [navbarOpen, setnavbarOpen] = useState(false);
  const [showProvidersDropdown, setShowProvidersDropdown] = useState(false);
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);

  const handleSignInButtonClick = () => {
    setShowProvidersDropdown(true);
  };

  return (
    <nav className="fixed grid mx-auto border border-[#88acd7] top-0 left-0 right-0 z-10 bg-white bg-opacity-90">
      {/* Desktop Navigation */}
      <div className="relative container lg:py-6 mx-auto px-4 py-2 hidden md:flex md:items-center md:justify-between">
        <Link
          className="flex items-center font-bold text-3xl text-center md:text-left px-4 mr-12 text-blue-500"
          href="/"
        >
          fundForge
        </Link>

        {session?.user ? (
          <div className="flex items-center font-semibold">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="hover:text-slate-500 px-8"
              >
                {link.title}
              </Link>
            ))}
          </div>
        ) : (
          <div className="absolute top-12 right-5">
            {!showProvidersDropdown ? (
              <button
                type="button"
                onClick={handleSignInButtonClick}
                className="blue_btn"
              >
                Sign in
              </button>
            ) : (
              <div className="flex">
                <button
                  type="button"
                  onClick={() => setShowProvidersDropdown(false)}
                  className="blue_btn"
                >
                  Cancel
                </button>
                {providers && (
                  <div className="dropdown1">
                    {Object.values(providers).map((provider) => (
                      <>
                        <button
                          type="button"
                          key={provider.name}
                          onClick={() => signIn(provider.id)}
                          className="dropdown_link"
                        >
                          Sign in with {provider.name}
                        </button>
                      </>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Button and Image */}
        {session?.user && (
          <div className="flex items-center">
            <button type="button" onClick={signOut} className="blue_btn px-4">
              Sign Out
            </button>
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              alt="profile-image"
              className="rounded-full ml-4"
            />
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <div className="flex flex-wrap">
          <Link
            className="font-bold text-4xl py-10 px-4 mr-12 text-blue-500"
            href="/"
          >
            fundForge
          </Link>
          {session?.user ? (
            <div className="absolute top-12 right-5">
              {!navbarOpen ? (
                <button
                  onClick={() => setnavbarOpen(true)}
                  className="flex items-center px-3 py-2 border rounded border-blue-500 text-blue-500 hover:text-white hover:border-white"
                >
                  <HamBuger />
                </button>
              ) : (
                <button
                  onClick={() => setnavbarOpen(false)}
                  className="flex items-center px-3 py-2 border rounded border-blue-500 text-blue-500 hover:text-white hover:border-white"
                >
                  <Xmark />
                </button>
              )}
            </div>
          ) : (
            <div className="absolute top-12 right-5">
              {!showProvidersDropdown ? (
                <button
                  type="button"
                  onClick={handleSignInButtonClick}
                  className="blue_btn"
                >
                  Sign in
                </button>
              ) : (
                <div className="flex">
                  <button
                    type="button"
                    onClick={() => setShowProvidersDropdown(false)}
                    className="blue_btn"
                  >
                    Cancel
                  </button>
                  {providers && (
                    <div className="dropdown1">
                      {Object.values(providers).map((provider) => (
                        <>
                          <button
                            type="button"
                            key={provider.name}
                            onClick={() => signIn(provider.id)}
                            className="dropdown_link"
                          >
                            Sign in with {provider.name}
                          </button>
                        </>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {navbarOpen && (
        <div
          className="menu w-[410px] md:w-auto text-center bg-gray-200"
          id="navbar"
        >
          <ul className="flex flex-col p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setnavbarOpen((prev) => !prev)}
                className="hover:text-slate-500 mb-4 md:mb-0"
              >
                {link.title}
              </Link>
            ))}
            <button
              type="button"
              onClick={signOut}
              className="blue_btn md:mb-0"
            >
              Sign Out
            </button>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Nav;
