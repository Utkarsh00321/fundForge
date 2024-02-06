"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToogleDropdown] = useState(false);
  const [toggle, setToggle] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);
  return (
    <nav className="w-full flex-between mb-16 pt-3">
      <Link className="font-bold text-3xl px-4 mr-12 text-blue-500" href="/">
        fundForge
      </Link>
      {/* Desktop Navigation */}
      {session?.user ? (
        <div className="w-full flex gap-24 md:gap-20  items-center  font-semibold">
          <Link href="/Home" className="hover:text-slate-500">
            Home
          </Link>
          <Link href="/Stocks" className="hover:text-slate-500">
            Stocks
          </Link>
          <Link href="/Gold" className="hover:text-slate-500">
            Gold
          </Link>
          <Link href="/Fd" className="hover:text-slate-500">
            FD
          </Link>
          <Link href="/RealEstate" className="hover:text-slate-500">
            Real Estate
          </Link>
          <button type="button" onClick={signOut} className="blue_btn">
            Sign Out
          </button>
          <Image
            src={session?.user.image}
            width={37}
            height={37}
            className="rounded-full"
          />
        </div>
      ) : (
        <div className="flex">
          <button
            type="button"
            onClick={() => setToggle((prev) => !prev)}
            className="bg-blue-500 px-4 py-2 text-white rounded-lg hover:bg-blue-800 hover:text-slate-400"
          >
            Sign In
          </button>
          {toggle && providers && (
            <div className="dropdown1">
              {Object.values(providers).map((provider) => (
                <>
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => {
                      signIn(provider.id);
                    }}
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
    </nav>
  );
};

export default Nav;
