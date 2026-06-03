import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
   <div className="relative w-60 min-h-screen flex flex-col text-white">

  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: "url('/Images/sidebar_background.jpg')" }}
  />

  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/60" />

  {/* Content */}
  <div className="relative z-10 flex flex-col h-full">

    {/* Logo */}
    <div className="p-5 text-2xl font-bold border-b border-white/20 tracking-wide">
      ProposalHub
    </div>

    {/* Menu */}
    <div className="p-5 flex flex-col gap-5 text-[15px] font-medium">
      <Link to="/dashboard" className="text-white/70 hover:text-white">
        Dashboard
      </Link>

      <Link to="/proposals" className="text-white/70 hover:text-white">
        Proposals
      </Link>

      <Link to="/createproposal" className="text-white/70 hover:text-white">
        + New Proposal
      </Link>
    </div>

    {/* User */}
    <div className="mt-auto p-5 border-t border-white/20">
      <p className="text-sm font-semibold">Admin</p>
      <p className="text-xs text-white/60 mt-1">
        admin@company.com
      </p>
    </div>

  </div>
</div>
  );
}

export default Sidebar;