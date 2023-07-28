'use client';

import { useState } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { IconButton } from '@mui/material';
import TVTPickerLayout from './TVTPickerLayout';
import SpinnerIcon from '@/icons/SpinnerIcon';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Randomizer = ({ shows }) => {
  const [randomShow, setRandomShow] = useState(
    shows[getRandomInt(0, shows.length - 1)]
  );
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleRandomize = () => {
    setImageLoaded(false);
    setRandomShow(shows[getRandomInt(0, shows.length - 1)]);
  };

  return (
    <TVTPickerLayout>
      <div className="randomizer">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          {randomShow?.name}
        </p>
        <div className="cover-image">
          <div
            style={{
              opacity: imageLoaded ? '1' : '0',
              transition: 'opacity 200ms ease'
            }}
          >
            <Image
              src={randomShow?.image}
              layout="fill"
              quality={60}
              priority
              onLoad={handleImageLoad}
              style={{
                borderRadius: '4px'
              }}
            />
          </div>
          <div
            style={{
              opacity: imageLoaded ? '0' : '1',
              transition: 'opacity 200ms ease'
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#181818',
                borderRadius: '4px'
              }}
            >
              <SpinnerIcon />
            </div>
          </div>
        </div>
        <IconButton onClick={handleRandomize}>
          <ShuffleIcon />
        </IconButton>
      </div>
      <style jsx>
        {`
          .randomizer {
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 10px;
            align-items: center;

            > .cover-image {
              position: relative;
              display: flex;
              justify-content: center;
              align-items: center;
              width: 300px;
              height: 440px;
            }
          }
        `}
      </style>
    </TVTPickerLayout>
  );
};

Randomizer.propTypes = {
  shows: PropTypes.array
};

export default Randomizer;
