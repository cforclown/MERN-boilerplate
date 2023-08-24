import { IAppState } from '../../index';

export const selectSidebarState = () => (state: IAppState) => state.layout.sidebarState;
