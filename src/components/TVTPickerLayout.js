'use client';

import theme from '@/theme';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import PropTypes from 'prop-types';

const TVTPickerLayout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

TVTPickerLayout.propTypes = {
  children: PropTypes.any
};

export default TVTPickerLayout;
