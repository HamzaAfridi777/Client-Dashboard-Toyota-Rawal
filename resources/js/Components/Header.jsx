
import React, { useState } from "react";
import Dropdown from '@/Components/Dropdown';
import Sidebar from "./Sidebar";
import { Inertia } from '@inertiajs/inertia';

const Header = ({ user, header }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleLogout = (e) => {
        e.preventDefault();
        Inertia.post(route('logout'));
    };

    return (
        <> 
            <nav className="top-0 z-10 relative flex items-center justify-between bg-zinc-50 py-2 shadow-dark-mild dark:bg-neutral-700 lg:flex-wrap lg:justify-start lg:py-4">
                <div className="flex w-full flex-wrap items-center justify-between px-3">
                    <button
                        className="sm:block lg:hidden border-0 bg-transparent px-2 text-black/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200"
                        type="button"
                        onClick={toggleSidebar}
                        aria-controls="navbarSupportedContent1"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="[&>svg]:w-7 [&>svg]:stroke-black/50 dark:[&>svg]:stroke-neutral-200">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                    </button>

                    <div
                        className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
                        id="navbarSupportedContent1"
                        data-twe-collapse-item
                    >
                        <a
                            className="mb-4 me-5 ms-2 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0"
                            href="#"
                        >
                            <img
                                src="https://toyotarawal.com.pk/assets/images/logo.png"
                                style={{ height: "50px" }}
                                alt="TE Logo"
                                loading="lazy"
                            />
                           
                        </a>
                    </div> 
                    <div className="relative flex items-center">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <img
                                    src="https://tecdn.b-cdn.net/img/new/avatars/2.jpg"
                                    className="rounded-full"
                                    style={{ height: "35px", width: "35px" }}
                                    alt=""
                                    loading="lazy"
                                />
                            </Dropdown.Trigger>
                            <Dropdown.Content align="right" width="48">
                                <Dropdown.Link href="#" onClick={handleLogout}>
                                    Logout
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>
            </nav>
            <aside className={`fixed top-0 left-0 z-10 h-full w-64 bg-gray-300 p-4 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
                <div className="text-black">
                    <Sidebar />
                </div>
            </aside>
        </>
    );
};

export default Header;
