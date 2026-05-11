import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-56 bg-black text-white min-h-screen flex flex-col">

      {/* Logo */}
      <div className="p-4 text-lg font-semibold border-b border-white/20">
        ProposalHub
      </div>

      {/* Menu */}
      <div className="p-4 space-y-3">

        <Link to="/dashboard">
          <p className="text-white/70 hover:text-white cursor-pointer">
            Dashboard
          </p>
        </Link>

        <Link to="/proposals">
          <p className="text-white/70 hover:text-white cursor-pointer">
            Proposals
          </p>
        </Link>

    

      </div>

      {/* User */}
      <div className="mt-auto p-4 border-t border-white/20">
        <p className="text-sm">Admin</p>
        <p className="text-xs text-white/70">
          admin@company.com
        </p>
      </div>

    </div>
  );
}

export default Sidebar;