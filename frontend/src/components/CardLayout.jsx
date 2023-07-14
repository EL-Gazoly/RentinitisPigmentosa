import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CloseButton from '../assets/closeIcon.svg';

const CardLayout = ({ Text, children }) => {
  const cardRef = useRef(null);
  const [isCardVisible, setIsCardVisible] = useState(true);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setIsCardVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [cardRef]);

  const handleRemoveCard = () => {
    setIsCardVisible(false);
  };

  const cardVariants = {
    initial: {
      opacity: 0,
      y: '-100vh',
    },
    visible: {
      opacity: 1,
      y: '-65vh',
      transition: {
        duration: 0.5,
        type: 'spring',
        damping: 15,
        stiffness: 80,
      },
    },
    hidden: {
      opacity: 0,
      y: '-100vh',
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div style={{ zIndex: 100 }}
    
    >
      <AnimatePresence>
        {isCardVisible && (
          <>
            <motion.div
              className="fixed top-[690px] left-[180px] transform -translate-x-1/2 -translate-y-1/2 rounded-[50px] flex justify-center items-center
               bg-[#4379A1] w-[1532px] h-[814px] z-50
               "
              initial="initial"
              animate="visible"
              exit="hidden"
              variants={cardVariants}
              ref={cardRef}
              onAnimationComplete={() => !isCardVisible && setIsCardVisible(true)}
            >
              <div className="w-[1480px] h-[770px] rounded-[50px] bg-[#B2D4EE] flex justify-center items-center">
                <div className="w-[1430px] h-[720px] rounded-[50px] bg-white flex justify-center items-center">
                  <div className="flex flex-col items-center gap-y-16">
                    <h1 className="text-[70px] font-nunito font-black text-primary relative top-0">
                      {Text} Results
                    </h1>
                    <div className="center flex flex-row gap-x-14 mb-16">{children}</div>
                  </div>
                </div>
              </div>
            </motion.div>
            <img
              src={CloseButton}
              alt=""
              className="absolute top-[102px] right-[240px] mt-10 mr-10 cursor-pointer z-[200]"
              onClick={handleRemoveCard}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CardLayout;
