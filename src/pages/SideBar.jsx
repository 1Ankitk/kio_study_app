import { NavLink } from "react-router-dom";
import { FaBars, FaHome } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { MdAccessTime } from 'react-icons/md';
import { BiSearch } from "react-icons/bi";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import { useNavigate } from 'react-router-dom';

const routes = [
  {
    path: "/",
    name: "Home",
    icon: <FaHome />,
  },
  {
    path: "/todo",
    name: "TodoList",
    icon: <MdMessage />,
  },
  {
    path: "/pomodoro",
    name: "Pomodoro",
    icon: <MdAccessTime />,
  },

];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [isSets, setIsSets] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (event) => {
    if (event.key === 'Enter' || event.type === 'click') {
      const searchQuery = event.target.value;
      handleSearchQuery(searchQuery);
    }
  };

  const handleSearchQuery = (searchQuery) => {
    if (searchQuery.toLowerCase() === 'home') {
      navigate('/');
    } else if (searchQuery.toLowerCase() === 'todo') {
      navigate('/todo');
    } else if (searchQuery.toLowerCase() === 'pomodoro') {
      navigate('/pomodoro');
    } else {
      navigate('*')
    }
  };


  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  Study!!
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          <div className="search">
            <div className="search_icon" onClick={() => setIsSets(!isSets)}>
              <BiSearch />
            </div>
            <AnimatePresence initial={false} mode='wait'>
              {isOpen && (
                <motion.input
                  key="searchInput"
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                  onKeyDown={handleSearch}
                />
              )}
            </AnimatePresence>
          </div>
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeclassname="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
