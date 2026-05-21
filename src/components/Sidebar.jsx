import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-60 bg-black text-white min-h-screen flex flex-col">

      {/* Logo */}
      <div className="p-5 text-2xl font-bold border-b border-white/20 tracking-wide">
        ProposalHub
      </div>

      {/* Menu */}
      <div className="p-5 flex flex-col gap-5 text-[15px] font-medium">

        <Link
          to="/dashboard"
          className="text-white/70 hover:text-white transition-all duration-200 tracking-wide"
        >
          Dashboard
        </Link>

        <Link
          to="/proposals"
          className="text-white/70 hover:text-white transition-all duration-200 tracking-wide"
        >
          Proposals
        </Link>

        

        <Link
          to="/createproposal"
          className="text-white/70 hover:text-white transition-all duration-200 tracking-wide"
        >
          + New Proposal
        </Link>

      </div>

      {/* User */}
      <div className="mt-auto p-5 border-t border-white/20">
        <p className="text-sm font-semibold tracking-wide">Admin</p>
        <p className="text-xs text-white/60 mt-1 tracking-wide">
          admin@company.com
        </p>
      </div>

    </div>
  );
}

export default Sidebar;