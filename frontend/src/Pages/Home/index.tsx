import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';
import { collapseSidebar, hideSidebar, showSidebar, uncollapseSidebar } from '@/Store/Reducers/Layout/Layout';
import Sidebar from './Sidebar/Sidebar.style';
import Header from './Header/Header.style';
import Content from './Content';
import { selectSidebarState } from '../../Store/Reducers/Layout/LayoutSelector';
import { selectTheme } from '../../Store/Reducers/Layout/ThemeSelector';
import { useEffect, useRef } from 'react';
import { MD_BREAKPOINT } from '../../Utils/common';

interface IHome {
  className?:string
}

function Home({ className }: IHome): JSX.Element {
  const ismounted = useRef(false);
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();
  const sidebarState = useSelector(selectSidebarState());

  useEffect(() => {
    ismounted.current = true;

    window.addEventListener('resize', onresize);
    onresize();

    // UNMOUNT
    return () => {
      window.removeEventListener('resize', onresize);
      ismounted.current = false;
    };
  }, []);

  const onresize = (): void => {
    const currentWidth = window.innerWidth;
    setSidebarCollapsed(currentWidth <= MD_BREAKPOINT);
  };

  const setSidebarCollapsed = (collapsed: boolean): void => {
    dispatch(collapsed ? collapseSidebar() : uncollapseSidebar());
  };

  const setSidebarHidden = (hide: boolean): void => {
    dispatch(hide ? hideSidebar() : showSidebar());
  };

  return (
    <div 
      className={classnames(
        className, 
        'relative flex flex-row justify-start items-start h-screen overflow-hidden',
        `bg-${theme.body}`)
      }
    >
      <Sidebar 
        collapsed={sidebarState.hidden ? false : sidebarState.collapsed} 
        hidden={sidebarState.hidden} 
        onBreakpoint={setSidebarHidden} 
        onBackdropClick={() => setSidebarHidden(true)} 
      />

      <div className="relative h-full w-full flex flex-col justify-start items-center">
        <Header showSidebarToggler={!!sidebarState.hidden} onToggleSidebar={() => setSidebarHidden(false)} />
        <Content />
      </div>
    </div>
  );
}

export default Home;
