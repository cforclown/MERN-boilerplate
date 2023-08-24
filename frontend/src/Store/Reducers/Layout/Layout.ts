import Themes, { ITheme, getTheme } from '../../../Themes/Themes';
import { IReducerAction } from '../../../Types';
import LayoutActionTypes from './LayoutActionTypes';

export interface ISidebarState {
  hidden: boolean;
  collapsed: boolean;
}

export interface ILayoutState {
  theme: ITheme,
  sidebarState: ISidebarState;
}

const layoutDefaultState: ILayoutState = {
  theme: Themes.PRIMARY,
  sidebarState: {
    collapsed: false,
    hidden: true
  },
};

const LayoutReducer = (state: ILayoutState = layoutDefaultState, action: IReducerAction<any>): any => {
  const newState = JSON.parse(JSON.stringify(state));

  switch(action.type) {
    case LayoutActionTypes.SHOW_SIDEBAR:
      newState.sidebarState.hidden = false;
      break;
    case LayoutActionTypes.HIDE_SIDEBAR:
      newState.sidebarState.hidden = true;
      break;
    case LayoutActionTypes.COLLAPSE_SIDEBAR:
      newState.sidebarState.collapsed = true;
      break;
    case LayoutActionTypes.UNCOLLAPSE_SIDEBAR:
      newState.sidebarState.collapsed = false;
      break;
    case LayoutActionTypes.CHANGE_THEME:
      newState.theme = getTheme(action.payload.theme) ?? newState.theme;
      break;
    default:
      break;
  }

  return newState;
};

export default LayoutReducer;
