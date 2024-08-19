import React from "react";

const Footer = () => {
    return (
        <footer   className=" bg-zinc-50 text-center text-surface/75 
        dark:bg-neutral-700 dark:text-white/75 lg:text-left   w-full "
        >
            <div className="bg-black/5 p-6 text-center">
                <span>© 2024 Copyright: wriiten by{" "}</span>
                <a className="font-semibold" href="https://tkbench.com">
                Technology Bench
                </a>
                
                  All rights reserved.
            </div>
        </footer>
    );
};
{
    /* <footer className="main-footer">
            <div className="pull-right hidden-xs">
                <b>Version</b> 1.0
            </div>
            <strong>
                MYCAB &copy; 2024 wriiten by{" "}
                <a href="https://tkbench.com">Technology Bench</a>.
            </strong>{" "}
            All rights reserved.
        </footer>*/
}
export default Footer;
