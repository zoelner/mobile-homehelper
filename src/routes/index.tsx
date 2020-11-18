import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/modules/rootReducer';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

const Routes: React.FC = () => {
  const signed = useSelector((state: RootState) => state.auth.signed);

  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
