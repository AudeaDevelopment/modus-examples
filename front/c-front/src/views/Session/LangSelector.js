import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { languages } from './assets';

export default class Selector extends Component {
  state = { open: false, selected: 'python' };

  handleToggle = () => this.setState(state => ({ open: !state.open }));

  handleClose = e => {
    const { innerText } = e.target;
    if (this.anchorEl.contains(e.target)) {
      return;
    }
    this.props.handleSelectLanguage(innerText);
    this.setState({ open: false, selected: innerText });
  };

  render() {
    const { open } = this.state;
    const { handleClose, handleToggle } = this;
    return (
      <div>
        <div style={{ display: 'flex' }}>
          <div style={{ fontSize: '20px' }}>Selected Language: </div>
          <Button
            variant="contained"
            color="primary"
            size="small"
            buttonRef={node => {
              this.anchorEl = node;
            }}
            aria-owns={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            {this.state.selected}
          </Button>
          <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{
                  transformOrigin:
                    placement === 'bottom' ? 'center top' : 'center bottom'
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList>
                      {languages.map((x, i) => (
                        <MenuItem key={i} name={x} onClick={handleClose}>
                          {x}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    );
  }
}
