import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';

function AnimatedTabs({ tabs }) {
  let [activeTab, setActiveTab] = useState(tabs[0].id);
  let location = useLocation();

  useEffect(() => {
    // Update activeTab state when the route changes
    const currentTab = tabs.find(tab => tab.link === location.pathname);

    currentTab && setActiveTab(currentTab.id);

  }, [location.pathname, tabs]);

  return (
    <div className="flex space-x-2">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        className= {`relative rounded-full py-1.5 outline-sky-400 transition focus-visible:outline-2x `}
        
        style={{
          WebkitTapHighlightColor: "transparent",
        }}
     >
      {activeTab === tab.id && (
        <motion.span 
        layoutId='underline'
        className='absolute bottom-0 left-0 w-full h-1 bg-primary rounded-full'
        transition={{type: 'spring', bounce: 0.2}}

        />
      )}

       
        <Link className=" px-3 py-1.5 " to={tab.link}>{tab.name}</Link>
      </button>
))}
</div>
  );
}

export default AnimatedTabs;
