import { LayoutProps } from "@/models/Layout";
import React from "react";

const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default Layout;
