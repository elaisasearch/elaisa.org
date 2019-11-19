import React from 'react';
import { useScrollTrigger, Zoom } from "@material-ui/core";

export default function HideOnScroll(props){
    const { children, window } = props;
  
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
      disableHysteresis: true,
      threshold: 100,
    });
  
    return (
      <Zoom in={!trigger}>
        {children}
      </Zoom>
    );
}