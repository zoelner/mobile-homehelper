import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '~/core/store/modules/rootReducer';

import AuthRoutes from './auth.routes';
import RootRoutes from './app.routes';

const Navigations: React.FC = () => {
  const signed = useSelector((state: RootState) => state.auth.signed);

  return signed ? <RootRoutes /> : <AuthRoutes />;
};

export default Navigations;
