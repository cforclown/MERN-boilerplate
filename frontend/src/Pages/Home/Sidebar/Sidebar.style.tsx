import styled from 'styled-components';

import SidebarBase from './Sidebar';

export const SIDEBAR_SHOW_CLASSNAME = 'cl-home-sidebar-wrapper-show';

const Sidebar = styled(SidebarBase)`
  background-color: ${props => props.theme.sidebar.background};
  box-shadow: 1px 3px 6px #00000040;
`;

Sidebar.displayName = 'Sidebar';

export default Sidebar;
