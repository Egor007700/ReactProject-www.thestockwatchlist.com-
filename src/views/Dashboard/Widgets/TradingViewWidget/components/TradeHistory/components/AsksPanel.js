import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
    backgroundColor: '#12213f',
    height : '100%',
    width: '100%',
    padding: '0px'
  },
  
}));

const AsksPanel = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
        AsksPanel
    </div>
  );
};

AsksPanel.propTypes = {
  className: PropTypes.string
};

export default AsksPanel;
