import React from 'react';
import { useScrollTrigger, Zoom } from "@material-ui/core";

/**
 * Hides the children JSX element whenever the user scolls down the window.
 * @param {Object} props window and children object to hide the children JSX element
 */
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