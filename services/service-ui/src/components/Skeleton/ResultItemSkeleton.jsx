import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { isMobile } from 'react-device-detect';

const ResultItemSkeleton = () => (
    isMobile
        ?
        <div>
            < Skeleton variant='text' width='89vw' height={20} />
            <Skeleton variant='rect' width='90vw' height={118} />
            <br />
            <br />
        </div >
        :
        <div style={{
            display: 'flex',
            alignItems: 'center'
        }}>
            <Skeleton variant='circle' width={40} height={40} style={{
                marginRight: '2%'
            }}/>
            <div>
                < Skeleton variant='text' width='49vw' height={20} />
                <Skeleton variant='rect' width='50vw' height={70} />
                <br />
                <br />
            </div >
        </div>

)

export default ResultItemSkeleton;