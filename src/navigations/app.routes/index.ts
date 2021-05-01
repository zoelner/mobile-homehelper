import MainTabs, { MainParamList } from './main.routes';
import RootRoutes, { RootParamList } from './root.routes';

import PositionsScreens, {
  PositionScreensNavigatorParamList,
} from '~/navigations/app.routes/positions.routes';

import ServiceScreens, {
  ServiceScreensNavigatorParamList,
} from '~/navigations/app.routes/services.routes';

export type { ServiceScreensNavigatorParamList };
export type { PositionScreensNavigatorParamList };
export type { RootParamList, MainParamList };

export { PositionsScreens, ServiceScreens, MainTabs };

export default RootRoutes;
