import { ThemeTypes } from '../../../Themes/Themes';
import { IReducerActionWithPayload, IReducerActionWithoutPayload } from '../../../Types';
import ActionTypes from './LayoutActionTypes';

export function ChangeTheme(themeId: ThemeTypes): IReducerActionWithPayload<{theme: string}> {
  return {
    type: ActionTypes.CHANGE_THEME,
    payload: { theme: themeId },
  };
}

export function ShowSidebar(uncollapsed = false): IReducerActionWithPayload<{uncollapsed: boolean}> {
  return {
    type: ActionTypes.SHOW_SIDEBAR,
    payload: { uncollapsed },
  };
}

export function HideSidebar(): IReducerActionWithoutPayload {
  return {
    type: ActionTypes.HIDE_SIDEBAR
  };
}

export function CollapseSidebar(): IReducerActionWithoutPayload {
  return {
    type: ActionTypes.COLLAPSE_SIDEBAR
  };
}

export function UncollapseSidebar(): IReducerActionWithoutPayload {
  return {
    type: ActionTypes.UNCOLLAPSE_SIDEBAR
  };
}
