import React, { useState,useEffect } from "react";
import { Link, usePage  } from "@inertiajs/inertia-react";

const Sidebar = () => {
    const { auth   } = usePage().props;
    
    useEffect(() => {
    }, [auth.permissions]);

    useEffect(() => {
       // console.log("auth object:", auth);
    }, [auth.permissions]);
    
    // Use an object to store state for each category
    const [categoryStates, setCategoryStates] = useState({
        category1: false,
        category2: false,
        category3: false,
        category4: false,
        category5: false,
        category6: false,
        category7: false,
    });
  
    const toggleCategory = (category) => {

        setCategoryStates((prevState) => ({
            ...prevState,
            [category]: !prevState[category],
        }));
    };

    // const handleChildClick  = (e) => {
    //     console.log("Child link clicked. Event:", e);
    //     e.stopPropagation();
    // };

     // Function to check if the user has the required permission
    const normalizePermission = (permission) => permission.trim().toLowerCase();

// Check if the user has the required permission by name or ID

    //  const hasPermission = (permission) => {
    //      return auth.permissions.map(normalizePermission).includes(normalizePermission(permission));
    //  };

    const hasPermission = (permission) => {
        if (!auth.permissions || !Array.isArray(auth.permissions)) {
            return false;
        }
        return auth.permissions.map(normalizePermission).includes(normalizePermission(permission));
    };
    

    return (
        <>
            <nav
                id="sidenav-6"
                className="hidden lg:block  left-0 top-0 h-full fixed -translate-x-full overflow-hidden bg-white shadow-dark-mild data-[twe-sidenav-hidden='false']:translate-x-0 dark:bg-surface-dark"
                data-twe-sidenav-init
                data-twe-sidenav-hidden="false"
                data-twe-sidenav-accordion="true"
                style={{ width: "210px" }}
            >
                <ul
                    className="relative m-0 list-none px-[0.2rem] "
                    data-twe-sidenav-menu-ref
                >
                
                 {hasPermission("Manage Users") && (
                   <li className="relative ">
                        <a
                            className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-primary/5 hover:text-inherit hover:outline-none focus:bg-primary/5 focus:text-inherit focus:outline-none active:bg-primary/5 active:text-inherit active:outline-none data-[twe-sidenav-state-active]:text-inherit data-[twe-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-white"
                            onClick={(e) => { e.preventDefault(); toggleCategory("category2"); }}                    
                            data-twe-sidenav-link-ref
                        >
                            <span className="me-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                            <span>Users</span>
                            <span
                                className={`absolute end-0 me-[0.8rem] ms-auto transition-transform duration-300 ease-linear motion-reduce:transition-none [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-gray-400" ${
                                    categoryStates["category2"]
                                        ? "rotate-180"
                                        : ""
                                }`}
                                data-twe-sidenav-rotate-icon-ref
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                        </a>
                        <ul
                            className={`relative m-0 list-none p-0 ${
                                categoryStates["category2"] ? "block" : "hidden"
                            } data-[twe-collapse-show]:block `}
                            data-twe-sidenav-collapse-ref
                        >
                        {hasPermission('Manage Users') && (
                            <li className="relative">
                                <Link
                                    href={route("users.index")}
                                    className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pe-6 ps-[3.4rem] text-[0.78rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-primary/5 hover:text-inherit hover:outline-none focus:bg-primary/5 focus:text-inherit focus:outline-none active:bg-primary/5 active:text-inherit active:outline-none data-[twe-sidenav-state-active]:text-inherit data-[twe-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-white"
                                    data-twe-sidenav-link-ref
                                  //  onClick={handleChildClick} // Prevent event from bubbling up
                                >
                                    User List
                                </Link>
                            </li>
                        )}
                        {hasPermission('Manage Users') && (
                            <li className="relative">
                                <Link
                                    href={route("roles.index")}
                                    className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pe-6 ps-[3.4rem] text-[0.78rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-primary/5 hover:text-inherit hover:outline-none focus:bg-primary/5 focus:text-inherit focus:outline-none active:bg-primary/5 active:text-inherit active:outline-none data-[twe-sidenav-state-active]:text-inherit data-[twe-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-white"
                                    data-twe-sidenav-link-ref
                                 //   onClick={handleChildClick}
                                >
                                    RolesList
                                </Link>
                            </li>
                        )} 
                        {hasPermission('Manage Users') && (
                            <li className="relative">
                                <Link
                                    href={route("permissions.index")}
                                    className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pe-6 ps-[3.4rem] text-[0.78rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-primary/5 hover:text-inherit hover:outline-none focus:bg-primary/5 focus:text-inherit focus:outline-none active:bg-primary/5 active:text-inherit active:outline-none data-[twe-sidenav-state-active]:text-inherit data-[twe-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-white"
                                    data-twe-sidenav-link-ref
                                  //  onClick={handleChildClick}
                                >
                                    PermissionsList
                                </Link>
                            </li>
                )}
                        </ul>
                    </li>
             )}
            {hasPermission('Manage Master Data') && (
                    <li className="relative">
                        <a
                            className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-primary/5 hover:text-inherit hover:outline-none focus:bg-primary/5 focus:text-inherit focus:outline-none active:bg-primary/5 active:text-inherit active:outline-none data-[twe-sidenav-state-active]:text-inherit data-[twe-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-white"
                            data-twe-sidenav-link-ref
                            onClick={(e) =>{e.preventDefault(); toggleCategory("category1")}}
                        >
                            <span className="me-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                            <span>Master</span>
                            <span
                                className={`absolute end-0 me-[0.8rem] ms-auto transition-transform duration-300 ease-linear motion-reduce:transition-none [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-gray-400" ${
                                    categoryStates["category1"]
                                        ? "rotate-180"
                                        : ""
                                }`}
                                data-twe-sidenav-rotate-icon-ref
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                        </a>
                        <ul
                            className={`${
                                categoryStates["category1"] ? "block" : "hidden"
                            } relative m-0 list-none p-0 data-[twe-collapse-show]:block `}
                            data-twe-sidenav-collapse-ref
                        >
                        {hasPermission('Manage Master Data') && (
                            <li className="relative">
                                <Link
                                    href={route("site-credentials.create")}
                                    className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pe-6 ps-[3.4rem] text-[0.78rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-primary/5 hover:text-inherit hover:outline-none focus:bg-primary/5 focus:text-inherit focus:outline-none active:bg-primary/5 active:text-inherit active:outline-none data-[twe-sidenav-state-active]:text-inherit data-[twe-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-white"
                                    data-twe-sidenav-link-ref
                                   // onClick={handleChildClick}
                                >
                                    Side Credentials
                                </Link>
                            </li>
                        )}
                        </ul>
                    </li>
                            )}
                            {hasPermission('Manage New Arrivals') && (
                    <li className="relative">
                        <a
                            className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-primary/5 hover:text-inherit hover:outline-none focus:bg-primary/5 focus:text-inherit focus:outline-none active:bg-primary/5 active:text-inherit active:outline-none data-[twe-sidenav-state-active]:text-inherit data-[twe-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-white"
                            data-twe-sidenav-link-ref
                            onClick={() => toggleCategory("category5")}
                        >
                            <span className="me-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                            <span>New Arrivals</span>
                            <span
                                className={`absolute end-0 me-[0.8rem] ms-auto transition-transform duration-300 ease-linear motion-reduce:transition-none [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-gray-400" ${
                                    categoryStates["category5"]
                                        ? "rotate-180"
                                        : ""
                                }`}
                                data-twe-sidenav-rotate-icon-ref
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                        </a>
                        <ul
                            className={`${
                                categoryStates["category5"] ? "block" : "hidden"
                            } relative m-0 list-none p-0 data-[twe-collapse-show]:block `}
                            data-twe-sidenav-collapse-ref
                        >
                        {hasPermission('Manage New Arrivals') && (
                            <li className="relative">
                                <Link
                                    href={route("new-arrivals.index")}
                                    className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pe-6 ps-[3.4rem] text-[0.78rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-primary/5 hover:text-inherit hover:outline-none focus:bg-primary/5 focus:text-inherit focus:outline-none active:bg-primary/5 active:text-inherit active:outline-none data-[twe-sidenav-state-active]:text-inherit data-[twe-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-white"
                                    data-twe-sidenav-link-ref
                                >
                                    New Arrivals List
                                </Link>
                            </li>
                        )}
                        </ul>
                    </li>
                            )}
                    {hasPermission('Manage Services') && (
                    <li className="relative">
                        <a
                            className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-primary/5 hover:text-inherit hover:outline-none focus:bg-primary/5 focus:text-inherit focus:outline-none active:bg-primary/5 active:text-inherit active:outline-none data-[twe-sidenav-state-active]:text-inherit data-[twe-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-white"
                            onClick={() => toggleCategory("category6")}
                            data-twe-sidenav-link-ref
                        >
                            <span className="me-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                            <span>Services</span>
                            <span
                                className={`absolute end-0 me-[0.8rem] ms-auto transition-transform duration-300 ease-linear motion-reduce:transition-none [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-gray-400" ${
                                    categoryStates["category6"]
                                        ? "rotate-180"
                                        : ""
                                }`}
                                data-twe-sidenav-rotate-icon-ref
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                        </a>
                        <ul
                            className={`${
                                categoryStates["category6"] ? "block" : "hidden"
                            } relative m-0 list-none p-0 data-[twe-collapse-show]:block `}
                            data-twe-sidenav-collapse-ref
                        >  
                        {hasPermission('Manage Services') && (
                            <li className="relative">
                                <a
                                    href={route("service-categories.index")}
                                    className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pe-6 ps-[3.4rem] text-[0.78rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-primary/5 hover:text-inherit hover:outline-none focus:bg-primary/5 focus:text-inherit focus:outline-none active:bg-primary/5 active:text-inherit active:outline-none data-[twe-sidenav-state-active]:text-inherit data-[twe-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-white"
                                    data-twe-sidenav-link-ref
                                >
                                    Service Category List
                                </a>
                            </li>
                        )}
                        {hasPermission('Manage Services') && (
                            <li className="relative">
                                <a
                                    href={route("services.index")}
                                    className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pe-6 ps-[3.4rem] text-[0.78rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-primary/5 hover:text-inherit hover:outline-none focus:bg-primary/5 focus:text-inherit focus:outline-none active:bg-primary/5 active:text-inherit active:outline-none data-[twe-sidenav-state-active]:text-inherit data-[twe-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-white"
                                    data-twe-sidenav-link-ref
                                >
                                    Services List
                                </a>
                            </li>
                        )}
                        </ul>
                    </li>
                            )}
                </ul>
                <hr className="border-neutral-100 dark:border-white/10" />
                <ul
                    className="relative m-0 list-none px-[0.2rem]"
                    data-twe-sidenav-menu-ref
                >
                {hasPermission('Manage Parts') && (
                    <li className="relative">
                        <a
                            className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-primary/5 hover:text-inherit hover:outline-none focus:bg-primary/5 focus:text-inherit focus:outline-none active:bg-primary/5 active:text-inherit active:outline-none data-[twe-sidenav-state-active]:text-inherit data-[twe-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-white"
                            onClick={() => toggleCategory("category3")}
                            data-twe-sidenav-link-ref
                        >
                            <span className="me-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                            <span>Parts </span>
                            <span
                                className={`absolute end-0 me-[0.8rem] ms-auto transition-transform duration-300 ease-linear motion-reduce:transition-none [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-gray-400" ${
                                    categoryStates["category3"]
                                        ? "rotate-180"
                                        : ""
                                }`}
                                data-twe-sidenav-rotate-icon-ref
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                        </a>
                        <ul
                            className={`${
                                categoryStates["category3"] ? "block" : "hidden"
                            } relative m-0 list-none p-0 data-[twe-collapse-show]:block `}
                            data-twe-sidenav-collapse-ref
                        >
                        {hasPermission('Manage Parts') && (
                            <li className="relative">
                                <a
                                    href={route("parts.index")}
                                    className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pe-6 ps-[3.4rem] text-[0.78rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-primary/5 hover:text-inherit hover:outline-none focus:bg-primary/5 focus:text-inherit focus:outline-none active:bg-primary/5 active:text-inherit active:outline-none data-[twe-sidenav-state-active]:text-inherit data-[twe-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-white"
                                    data-twe-sidenav-link-ref
                                >
                                    Parts Category
                                </a>
                            </li>
                )}
                            {hasPermission('Manage Parts') && (
                            <li className="relative">
                                <a
                                    href={route("part-form-submissions.index")}
                                    className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pe-6 ps-[3.4rem] text-[0.78rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-primary/5 hover:text-inherit hover:outline-none focus:bg-primary/5 focus:text-inherit focus:outline-none active:bg-primary/5 active:text-inherit active:outline-none data-[twe-sidenav-state-active]:text-inherit data-[twe-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-white"
                                    data-twe-sidenav-link-ref
                                >
                                    PartFormSubmissionsList
                                </a>
                            </li>
                            )}
                        </ul>
                    </li>
                            )}
                            {hasPermission('Manage Customer Relations') && (
                    <li className="relative">
                        <a
                            className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-primary/5 hover:text-inherit hover:outline-none focus:bg-primary/5 focus:text-inherit focus:outline-none active:bg-primary/5 active:text-inherit active:outline-none data-[twe-sidenav-state-active]:text-inherit data-[twe-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-white"
                            onClick={() => toggleCategory("category4")}
                            data-twe-sidenav-link-ref
                        >
                            <span className="me-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                            <span>Customer<br/> Relations</span>
                            <span
                                className={`absolute end-0 me-[0.8rem] ms-auto transition-transform duration-300 ease-linear motion-reduce:transition-none [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-gray-400" ${
                                    categoryStates["category4"]
                                        ? "rotate-180"
                                        : ""
                                }`}
                                data-twe-sidenav-rotate-icon-ref
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                        </a>
                        <ul
                            className={`${
                                categoryStates["category4"] ? "block" : "hidden"
                            } relative m-0 list-none p-0 data-[twe-collapse-show]:block `}
                            data-twe-sidenav-collapse-ref
                        >
                        {hasPermission('Manage Customer Relations') && (
                            <li className="relative">
                                <a
                                    href={route("appointments.index")}
                                    className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pe-6 ps-[3.4rem] text-[0.78rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-primary/5 hover:text-inherit hover:outline-none focus:bg-primary/5 focus:text-inherit focus:outline-none active:bg-primary/5 active:text-inherit active:outline-none data-[twe-sidenav-state-active]:text-inherit data-[twe-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-white"
                                    data-twe-sidenav-link-ref
                                >
                                    Online Appointment List
                                </a>
                            </li>
                        )}
                        {hasPermission('Manage Customer Relations') && (
                            <li className="relative">
                                <a
                                    href={route("complaints.index")}
                                    className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pe-6 ps-[3.4rem] text-[0.78rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-primary/5 hover:text-inherit hover:outline-none focus:bg-primary/5 focus:text-inherit focus:outline-none active:bg-primary/5 active:text-inherit active:outline-none data-[twe-sidenav-state-active]:text-inherit data-[twe-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-white"
                                    data-twe-sidenav-link-ref
                                >
                                    Complaint List
                                </a>
                            </li>
                        )}
                        {hasPermission('Manage Customer Relations') && (
                            <li className="relative">
                                <a
                                    href={route("autoFinances.index")}
                                    className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pe-6 ps-[3.4rem] text-[0.78rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-primary/5 hover:text-inherit hover:outline-none focus:bg-primary/5 focus:text-inherit focus:outline-none active:bg-primary/5 active:text-inherit active:outline-none data-[twe-sidenav-state-active]:text-inherit data-[twe-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-white"
                                    data-twe-sidenav-link-ref
                                >
                                    Finance List
                                </a>
                            </li>
                        )}
                        {hasPermission('Manage Customer Relations') && (
                            <li className="relative">
                                <a
                                    href={route("contactUs.index")}
                                    className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pe-6 ps-[3.4rem] text-[0.78rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-primary/5 hover:text-inherit hover:outline-none focus:bg-primary/5 focus:text-inherit focus:outline-none active:bg-primary/5 active:text-inherit active:outline-none data-[twe-sidenav-state-active]:text-inherit data-[twe-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-white"
                                    data-twe-sidenav-link-ref
                                >
                                    ContactUs List
                                </a>
                            </li>
                        )}
                        </ul>
                    </li>
                            )}
                </ul>
                {hasPermission('Home') && (
                    <li className="relative">
                        <a style={{marginTop: "-26px"}}
                            className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-primary/5 hover:text-inherit hover:outline-none focus:bg-primary/5 focus:text-inherit focus:outline-none active:bg-primary/5 active:text-inherit active:outline-none data-[twe-sidenav-state-active]:text-inherit data-[twe-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-white"
                            onClick={() => toggleCategory("category7")}
                            data-twe-sidenav-link-ref
                        >
                            <span className="me-4 [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-gray-400">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                            <span>Home</span>
                            <span
                                className={`absolute end-0 me-[0.8rem] ms-auto transition-transform duration-300 ease-linear motion-reduce:transition-none [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-gray-400" ${
                                    categoryStates["category7"]
                                        ? "rotate-180"
                                        : ""
                                }`}
                                data-twe-sidenav-rotate-icon-ref
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                        </a>
                        <ul
                            className={`${
                                categoryStates["category7"] ? "block" : "hidden"
                            } relative m-0 list-none p-0 data-[twe-collapse-show]:block `}
                            data-twe-sidenav-collapse-ref
                        >
                        {hasPermission('Home') && (
                            <li className="relative">
                                <a
                                    href={route("car-bookings.index")}
                                    className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pe-6 ps-[3.4rem] text-[0.78rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-primary/5 hover:text-inherit hover:outline-none focus:bg-primary/5 focus:text-inherit focus:outline-none active:bg-primary/5 active:text-inherit active:outline-none data-[twe-sidenav-state-active]:text-inherit data-[twe-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-white"
                                    data-twe-sidenav-link-ref
                                >
                                   Car Booking
                                </a>
                            </li>
                )}
                            {hasPermission('Home') && (
                            <li className="relative">
                                <a
                                    href={route("toyota_sure.index")}
                                    className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pe-6 ps-[3.4rem] text-[0.78rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-primary/5 hover:text-inherit hover:outline-none focus:bg-primary/5 focus:text-inherit focus:outline-none active:bg-primary/5 active:text-inherit active:outline-none data-[twe-sidenav-state-active]:text-inherit data-[twe-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-white"
                                    data-twe-sidenav-link-ref
                                >
                                    ToyotaSure List
                                </a>
                            </li>
                           )}
                              {hasPermission('Home') && (
                                <li className="relative">
                                    <a
                                        href={route("value_time.index")}
                                        className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pe-6 ps-[3.4rem] text-[0.78rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-primary/5 hover:text-inherit hover:outline-none focus:bg-primary/5 focus:text-inherit focus:outline-none active:bg-primary/5 active:text-inherit active:outline-none data-[twe-sidenav-state-active]:text-inherit data-[twe-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-white"
                                        data-twe-sidenav-link-ref
                                    >
                                        ValueTime List
                                    </a>
                                </li>
                                 )}
                                 
                               {hasPermission('Home') && (
                               <li className="relative">
                               <a
                                   href={route("client_review.index")}
                                   className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pe-6 ps-[3.4rem] text-[0.78rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-primary/5 hover:text-inherit hover:outline-none focus:bg-primary/5 focus:text-inherit focus:outline-none active:bg-primary/5 active:text-inherit active:outline-none data-[twe-sidenav-state-active]:text-inherit data-[twe-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-white"
                                   data-twe-sidenav-link-ref
                               >
                                   Client Review List
                               </a>
                           </li>
                            )}
                            {hasPermission('Manage Parts') && (
                            <li className="relative">
                            <a
                                href={route("choose.index")}
                                className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pe-6 ps-[3.4rem] text-[0.78rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-primary/5 hover:text-inherit hover:outline-none focus:bg-primary/5 focus:text-inherit focus:outline-none active:bg-primary/5 active:text-inherit active:outline-none data-[twe-sidenav-state-active]:text-inherit data-[twe-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-white"
                                data-twe-sidenav-link-ref
                            >
                                Choose Us List
                            </a>
                        </li>
                         )}
                       {hasPermission('Home') && (
                         <li className="relative">
                         <a
                             href={route("car_care.index")}
                             className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pe-6 ps-[3.4rem] text-[0.78rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-primary/5 hover:text-inherit hover:outline-none focus:bg-primary/5 focus:text-inherit focus:outline-none active:bg-primary/5 active:text-inherit active:outline-none data-[twe-sidenav-state-active]:text-inherit data-[twe-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-white"
                             data-twe-sidenav-link-ref
                         >
                             Car Care List
                         </a>
                     </li>
                    )}
                           {hasPermission('Home') && (
                         <li className="relative">
                         <a
                             href={route("team.index")}
                             className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pe-6 ps-[3.4rem] text-[0.78rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-primary/5 hover:text-inherit hover:outline-none focus:bg-primary/5 focus:text-inherit focus:outline-none active:bg-primary/5 active:text-inherit active:outline-none data-[twe-sidenav-state-active]:text-inherit data-[twe-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-white"
                             data-twe-sidenav-link-ref
                         >
                             Expert Team List
                         </a>
                     </li>
                    )}
                  
                           {hasPermission('Home') && (
                            <li className="relative">
                            <a
                                href={route("calculator.index")}
                                className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pe-6 ps-[3.4rem] text-[0.78rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-primary/5 hover:text-inherit hover:outline-none focus:bg-primary/5 focus:text-inherit focus:outline-none active:bg-primary/5 active:text-inherit active:outline-none data-[twe-sidenav-state-active]:text-inherit data-[twe-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-white"
                                data-twe-sidenav-link-ref
                            >
                                Calculator List
                            </a>
                        </li>
                         )}
                        </ul>
                    </li>
                           )}
            </nav>
        </>
    );
};

export default Sidebar;
