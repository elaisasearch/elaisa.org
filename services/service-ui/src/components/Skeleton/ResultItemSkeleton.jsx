import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { isMobile } from 'react-device-detect';

const ResultItemSkeleton = () => (
    isMobile
        ?
        <div>
            < Skeleton variant='text' width='89vw' height={20} />
            <Skeleton variant='rect' width='90vw' height={118} />
        </div >
        :
        <div>
            < Skeleton variant='text' width='39vw' height={20} />
            <Skeleton variant='rect' width='40vw' height={118} />
        </div >

)

export default ResultItemSkeleton;