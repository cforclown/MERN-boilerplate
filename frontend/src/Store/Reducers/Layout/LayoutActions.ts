import { createAction } from '@reduxjs/toolkit';
import { IReducerActionWithPayload, IReducerActionWithoutPayload } from '../../../Types';

// export function ChangeTheme(themeId: ThemeTypes): IReducerActionWithPayload<{theme: string}> {
//   return {
//     type: ActionTypes.CHANGE_THEME,
//     payload: { theme: themeId },
//   };
// }

// export function ShowSidebar(uncollapsed = false): IReducerActionWithPayload<{uncollapsed: boolean}> {
//   return {
//     type: ActionTypes.SHOW_SIDEBAR,
//     payload: { uncollapsed },
//   };
// }

// export function HideSidebar(): IReducerActionWithoutPayload {
//   return {
//     type: ActionTypes.HIDE_SIDEBAR
//   };
// }

// export function CollapseSidebar(): IReducerActionWithoutPayload {
//   return {
//     type: ActionTypes.COLLAPSE_SIDEBAR
//   };
// }

// export function UncollapseSidebar(): IReducerActionWithoutPayload {
//   return {
//     type: ActionTypes.UNCOLLAPSE_SIDEBAR
//   };
// }

export type IChangeThemeAction = IReducerActionWithPayload<{theme: string}>
export const changeTheme = createAction('changeTheme');

export type IShowSidebarAction = IReducerActionWithPayload<{uncollapsed: boolean}>;
export const showSidebar = createAction('showSidebar');

export type IHideSidebarAction = IReducerActionWithoutPayload;
export const hideSidebar = createAction('hideSidebar');

export type ICollapseSidebarAction = IReducerActionWithoutPayload
export const collapseSidebar = createAction('collapseSidebar');

export type IUncollapseSidebarAction = IReducerActionWithoutPayload
export const uncollapseSidebar = createAction('uncollapseSidebar');
