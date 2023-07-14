import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import ImageCard from './ImageCard';
import InputImage from '../assets/Input_image.png';
import OutputImage from '../assets/Output_image.png';
import CardLayout from './CardLayout';
import CloseButton from '../assets/closeIcon.svg';

const items = [
  {
    id: '1',
    src: InputImage,
    text: 'Input'
  },
  {
    id: '2',
    src: OutputImage,
    text: 'Output'
  }
];

const SegmentationResultsCard = ({ isHighContrast }) => {
  const [selectedId, setSelectedId] = useState('');
  const [direction, setDirection] = useState(null);
  const x = useMotionValue(0);

  const handleDragEnd = (_, info) => {
    const { offset } = info;
    if (offset.x > 50 && direction !== 'right') {
      setDirection('right');
      showPreviousImage();
    } else if (offset.x < -50 && direction !== 'left') {
      setDirection('left');
      showNextImage();
    }
  };

  const showNextImage = () => {
    const currentIndex = items.findIndex((item) => item.id === selectedId);
    const nextIndex = (currentIndex + 1) % items.length;
    setSelectedId(items[nextIndex].id);
    setDirection(null);
  };

  const showPreviousImage = () => {
    const currentIndex = items.findIndex((item) => item.id === selectedId);
    const previousIndex = (currentIndex - 1 + items.length) % items.length;
    setSelectedId(items[previousIndex].id);
    setDirection(null);
  };

  return (
    <div className=' z-[150]'>
     
        <CardLayout Text="Segmentation">
          <motion.div className="flex flex-row gap-x-7 items-center justify-center">
            <div className="flex flex-row gap-x-7 items-center justify-center">
              {items.map((item) => (
                <motion.div
                  layoutId={`card-container-${item.id}`}
                  onClick={() => setSelectedId(item.id)}
                  key={item.id}
                  initial={{ scale: 1 }}
                  animate={{ scale: selectedId === item.id ? 1.1 : 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex"
                >
                  <ImageCard key={item.id} src={item.src} text={item.text} onClick={() => setSelectedId(item.id)} />
                </motion.div>
              ))}
            </div>

            <AnimatePresence>
              {selectedId && (
                <motion.div
                  className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center 
                  scale-[2]
                    cursor-move
                  "
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {items.map((item) => (
                    item.id === selectedId && (
                      <motion.div
                        className="rounded-lg p-4 shadow-md max-w-lg mx-auto"
                        layoutId={`card-container-${item.id}`}
                        key={item.id}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        drag="x"
                        dragConstraints={{ left: 50, right: 50 }}
                        dragElastic={1}
                        dragMomentum={false}
                        onDragEnd={handleDragEnd}
                        style={{ x }}
                      >
                        <motion.div className="relative">
                          <img
                            src={CloseButton}
                            alt=""
                            className="absolute top-3 right-5 cursor-pointer z-[100] w-[25px] h-[25px]"
                            onClick={() => setSelectedId('')}
                          />

                          <motion.img
                            src={item.src}
                            alt={item.text}
                            className="w-full rounded-t-lg z-50 scale-[2]"
                            layoutId={`card-image-${item.id}`}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            dragMomentum={false}
                            onDragEnd={handleDragEnd}
                            style={{ x }}
                          />
                        </motion.div>
                      </motion.div>
                    )
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </CardLayout>
      
    </div>
  );
};

export default SegmentationResultsCard;
