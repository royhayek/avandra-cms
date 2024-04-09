// Packages
import _ from 'lodash';
import React from 'react';

// Components
import { Chip } from '@mui/material';

// Utilities
import useStyles from './styles';

// Interfaces
import { StatusProps } from 'shared/types/Status';
import { statusesList } from 'shared/constants/statuses';

interface StatusCellProps {
  value: any;
  statuses?: StatusProps[];
}

// Component

const StatusCell: React.FC<StatusCellProps> = ({ value, statuses }) => {
  // Statics
  const classes = useStyles();

  const status = _.find(statuses ?? statusesList, { value });

  // Renderers
  return (
    <Chip
      size="small"
      label={status?.label}
      sx={{ backgroundColor: status?.color }}
      classes={{ label: classes.statusLabel }}
    />
  );
};

export default StatusCell;
