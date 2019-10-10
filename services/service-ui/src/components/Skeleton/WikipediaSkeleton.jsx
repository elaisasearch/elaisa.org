import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { isMobile } from 'react-device-detect';

const WikipediaSkeleton = () => (
    isMobile
        ?
        <div>
            {/* Wikipedia Skeleton */}
            <Skeleton variant='text' width='25vw' height={15} />
            <Skeleton variant='text' width='35vw' height={20} />
            <Skeleton variant='rect' width='90vw' height={118} />
            <Skeleton variant='text' width='30vw' height={35} />
            <br />
            <br />
        </div>
        :
        <div style={{
            position: 'absolute',
            margin: 'auto',
            top: '16vh',
            right: '10vh',
        }}>
            {/* Wikipedia Skeleton */}
            <Skeleton variant='text' width='275px' height='310px' />
            <br />
            <br />
        </div>
)

export default WikipediaSkeleton;