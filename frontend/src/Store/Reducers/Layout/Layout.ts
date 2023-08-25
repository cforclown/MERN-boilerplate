
import { createSlice } from '@reduxjs/toolkit';
import Themes, { ITheme, getTheme } from '../../../Themes/Themes';

export interface ISidebarState {
  hidden: boolean;
  collapsed: boolean;
}

export interface ILayoutState {
  theme: ITheme,
  sidebarState: ISidebarState;
}

const layoutInitialState: ILayoutState = {
  theme: Themes.PRIMARY,
  sidebarState: {
    collapsed: false,
    hidden: true
  },
};


const layoutSlice = createSlice({
  name: 'layout',
  initialState: layoutInitialState,
  reducers: {
    showSidebar(state) {
      state.sidebarState.hidden = false;
    },
    hideSidebar(state) {
      state.sidebarState.hidden = true;
    },
    collapseSidebar(state) {
      state.sidebarState.collapsed = true;
    },
    uncollapseSidebar(state) {
      state.sidebarState.collapsed = false;
    },
    changeTheme(state, action) {
      state.theme = getTheme(action.payload.theme) ?? state.theme;
    }
  }
});

export const { showSidebar, hideSidebar, collapseSidebar, uncollapseSidebar, changeTheme } = layoutSlice.actions;
export default layoutSlice.reducer;
