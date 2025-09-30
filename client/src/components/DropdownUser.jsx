import {
    FiEdit,
    FiChevronDown,
    FiTrash,
    FiShare,
    FiPlusSquare,
    FiLogOut,
    
  } from "react-icons/fi";
  import { HiTrophy } from "react-icons/hi2";
  import { motion } from "framer-motion";
  import { Dispatch, SetStateAction, useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
  
  const StaggeredDropDown = () => {
    const [open, setOpen] = useState(false);
    const { user, handleLogout } = useContext(AppContext)
  
    return (
      <div className=" flex items-center justify-center ">
        <motion.div animate={open ? "open" : "closed"} className="relative">
          <button
            onClick={() => setOpen((pv) => !pv)}
            className="flex items-center gap-2 px-2 py-2 rounded-md text-indigo-50 hover:bg-yellow-100 transition-colors"
          >
            <span className="font-medium text-black text-sm">{user && user.username }</span>
            <motion.span  variants={iconVariants}>
              < FiChevronDown color="black" />
            </motion.span>
          </button>
  
          <motion.ul
            initial={wrapperVariants.closed}
            variants={wrapperVariants}
            style={{ originY: "top", translateX: "-50%" }}
            className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden"
          >
            <Option setOpen={setOpen} logout={handleLogout} Icon={HiTrophy} text={`Games Won: ${user && user.games_won } `} />
            <Option setOpen={setOpen} logout={handleLogout} Icon={FiLogOut} text="Logout" />
          </motion.ul>
        </motion.div>
      </div>
    );
  };
  
  const Option = ({ text, Icon, setOpen, logout }) => {
    return (
      <motion.li
        variants={itemVariants}
        onClick={() => {setOpen(false); if(text==='Logout') { logout() } }}
        className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer"
      >
        <motion.span variants={actionIconVariants}>
          <Icon />
        </motion.span>
        <span>{text}</span>
      </motion.li>
    );
  };
  
  export default StaggeredDropDown;
  
  const wrapperVariants = {
    open: {
      scaleY: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    closed: {
      scaleY: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.1,
      },
    },
  };
  
  const iconVariants = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
  };
  
  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
      },
    },
    closed: {
      opacity: 0,
      y: -15,
      transition: {
        when: "afterChildren",
      },
    },
  };
  
  const actionIconVariants = {
    open: { scale: 1, y: 0 },
    closed: { scale: 0, y: -7 },
  };