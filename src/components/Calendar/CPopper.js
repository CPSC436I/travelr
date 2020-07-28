import React from 'react';
import {Popper, IconButton, Slide} from '@material-ui/core';
import TodayIcon from '@material-ui/icons/Today';
import MiniCalendar from './MiniCalendar';
import './MiniCalendar.css';

/* Snippets copied from
https://material-ui.com/components/popper/
https://material-ui.com/components/transitions/
*/
export default function CPopper() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [placement, setPlacement] = React.useState();

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    // setPlacement('left-start');
  };

  const open = Boolean(anchorEl);
  const id = open ? 'transitions-popper' : undefined;
  const buttonCssID = open ? 'PopUp' : 'PopDown';

  return (
    <div id='CPopper'>
      <IconButton id={buttonCssID} aria-describedby={id} type="button" onClick={handleClick} variant="contained">
        <TodayIcon />
      </IconButton>
      <Popper id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Slide {...TransitionProps} direction='up' mountOnEnter unmountOnExit>
            <div id='MiniCal'>
              <MiniCalendar/>
            </div>
          </Slide>
        )}
      </Popper>
    </div>
  );
}
