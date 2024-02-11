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
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);
  return (
    <nav className="fixed grid mx-auto border border-[#88acd7] top-0 left-0 right-0 z-10 bg-transparent bg-opacity-90">
      {/* Desktop Navigation */}
      {/* Desktop Navigation */}
      <div className="relative container lg:py-6 mx-auto px-4 py-2 hidden md:flex md:items-center md:justify-between">
        <Link
          className="flex items-center font-bold text-3xl text-center md:text-left px-4 mr-12 text-blue-500"
          href="/"
        >
          fundForge
        </Link>

        {/* Move the button outside of the div for the "fundForge" heading */}
        {session?.user ? (
          <div className="flex items-center font-semibold">
            <Link href="/Home" className="hover:text-slate-500 px-8">
              Home
            </Link>
            <Link href="/Stocks" className="hover:text-slate-500 px-8">
              Stocks
            </Link>
            <Link href="/Gold" className="hover:text-slate-500 px-8">
              Gold
            </Link>
            <Link href="/Fd" className="hover:text-slate-500 px-8">
              FD
            </Link>
            <Link href="/RealEstate" className="hover:text-slate-500 px-8">
              Real Estate
            </Link>
          </div>
        ) : (
          <div className="absolute top-6 right-5">
            {/* Add hidden md:block to hide the div on small screens */}
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="blue_btn"
                >
                  Sign in
                </button>
              ))}
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
              {/* Add hidden md:block to hide the div on small screens */}
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => {
                      signIn(provider.id);
                    }}
                    className="blue_btn"
                  >
                    Sign in
                  </button>
                ))}
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
            <Link
              href="/Home"
              onClick={() => setnavbarOpen((prev) => !prev)}
              className="hover:text-slate-500 mb-4 md:mb-0"
            >
              Home
            </Link>
            <Link
              href="/Stocks"
              onClick={() => setnavbarOpen((prev) => !prev)}
              className="hover:text-slate-500 mb-4 md:mb-0"
            >
              Stocks
            </Link>
            <Link
              href="/Gold"
              onClick={() => setnavbarOpen((prev) => !prev)}
              className="hover:text-slate-500 mb-4 md:mb-0"
            >
              Gold
            </Link>
            <Link
              href="/Fd"
              onClick={() => setnavbarOpen((prev) => !prev)}
              className="hover:text-slate-500 mb-4 md:mb-0"
            >
              FD
            </Link>
            <Link
              href="/RealEstate"
              className="hover:text-slate-500 mb-4 md:mb-0"
              onClick={() => setnavbarOpen((prev) => !prev)}
            >
              Real Estate
            </Link>
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
