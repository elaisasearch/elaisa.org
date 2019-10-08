import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

const WikipediaSkeleton = () => (
    <div>
        {/* Wikipedia Skeleton */}
        <Skeleton variant='text' width='25vw' height={15} />
        <Skeleton variant='text' width='35vw' height={20} />
        <Skeleton variant='rect' width='90vw' height={118} />
        <Skeleton variant='text' width='30vw' height={35} />
        <br />
        <br />
    </div>
)

export default WikipediaSkeleton;