import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import useTranslation from "next-translate/useTranslation";
import NavLink from "../NavLink";

interface NavItem {
  name: string;
  href: string;
  current: boolean;
}
// TODO: should come from BE
const navigation: NavItem[] = [
  //   { name: "Parties", href: "/parties", current: true },
  //   { name: "Participants", href: "/participants", current: false },
];

function classNames(...classes: (false | null | undefined | string)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { t } = useTranslation();
  const signInText = t("home:nav-bar.signIn");
  const signOutText = t("home:nav-bar.signOut");
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center pl-2 sm:static sm:inset-auto sm:mr-6 sm:pl-0">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/">
                <img
                  className="h-8 w-auto "
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
              </Link>
            </div>
            <div className="sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item, i) => (
                  <NavLink key={`${item.name}-${i}`} href={item.href}>
                    {(isActive) => {
                      return (
                        <span
                          key={item.name}
                          className={classNames(
                            isActive
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={isActive ? "page" : undefined}
                        >
                          {item.name}
                        </span>
                      );
                    }}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {session ? (
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://lh3.googleusercontent.com/a/AGNmyxZDSaxRivvFbMMq9IpMqhAKxP2Ibew0dC2XHKWODcI=s96-c-rg-br100"
                      alt=""
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className=" absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item disabled>
                        {({ active }) => (
                          <Link
                            href="/profile"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 opacity-50"
                            )}
                          >
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item disabled>
                        {({ active }) => (
                          <Link
                            href="/setting"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 opacity-50"
                            )}
                          >
                            Settings
                          </Link>
                        )}
                      </Menu.Item>
                    </div>
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "flex w-full justify-start px-4 py-2 text-sm text-red-700"
                            )}
                            onClick={() => void signOut()}
                          >
                            {signOutText}
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <button
                className="transform py-2 font-bold text-blue-600 transition hover:text-blue-400"
                onClick={() => void signIn()}
              >
                {signInText}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
