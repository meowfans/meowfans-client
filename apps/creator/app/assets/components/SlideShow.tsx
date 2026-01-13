'use client';

import { Button } from '@workspace/ui/components/button';
import { motion } from 'framer-motion';
import { ChevronRight, Loader2 } from 'lucide-react';
import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

interface Props {
  slideUrls?: string[];
  onLoadMore: () => unknown;
}

export const SlideShow: React.FC<Props> = ({ slideUrls, onLoadMore }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLoadMore = async () => {
    setIsLoading(true);
    await onLoadMore();
    setIsLoading(false);
  };

  return (
    <div className="flex w-full h-full relative">
      <div className="w-full">
        <Slide indicators={true} autoplay={false} transitionDuration={500} easing="ease-out">
          <div className="flex flex-col md:flex-row overflow-y-auto md:overflow-x-auto w-full space-y-2 md:space-y-0 space-x-0 md:space-x-2 snap-y md:snap-x snap-mandatory scrollbar-hide scroll-smooth p-2">
            {slideUrls &&
              slideUrls.map((url, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative w-full h-[calc(100vh-136px)] snap-center rounded-xl overflow-hidden shadow-2xl group"
                >
                  <div
                    style={{ backgroundImage: `url(${url})` }}
                    className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {index + 1} / {slideUrls.length}
                  </div>
                </motion.div>
              ))}
            <div className="flex items-center justify-center w-full md:w-auto h-full md:min-w-50 rounded-xl border bg-background/70 backdrop-blur">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="my-auto bg-transparent justify-center w-fit h-fit md:-rotate-90 origin-center"
              >
                <Button
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  variant="default"
                  className="font-semibold shadow-sm transition-shadow hover:shadow-md px-6 py-6 text-lg"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      Load More
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </div>
        </Slide>
      </div>
    </div>
  );
};
