import { useSelector, useDispatch } from 'react-redux';
import { collapseSidebar, hideSidebar, setIsSM, showSidebar, uncollapseSidebar } from '@/Store/Reducers/Layout/Layout';
import Sidebar from './Sidebar/Sidebar.style';
import Header from './Header/Header.style';
import Content from './Content';
import { selectLayoutState } from '../../Store/Reducers/Layout/LayoutSelector';
import { selectTheme } from '../../Store/Reducers/Layout/ThemeSelector';
import { useEffect, useRef } from 'react';
import { MD_BREAKPOINT, SM_BREAKPOINT } from '../../Utils/common';
import { twMerge } from 'tailwind-merge';

interface IHome {
  className?:string
}

function Home({ className }: IHome): JSX.Element {
  const ismounted = useRef(false);
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();
  const layoutState = useSelector(selectLayoutState());

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
    if(currentWidth <= SM_BREAKPOINT && !layoutState.isSM) {
      setLayoutIsSM(true);
    } else if(currentWidth > SM_BREAKPOINT && layoutState.isSM) {
      setLayoutIsSM(false);
    }
  };

  const setLayoutIsSM = (isSM: boolean): void => {
    dispatch(setIsSM(isSM));
  };

  const setSidebarCollapsed = (collapsed: boolean): void => {
    dispatch(collapsed ? collapseSidebar() : uncollapseSidebar());
  };

  const setSidebarHidden = (hide: boolean): void => {
    dispatch(hide ? hideSidebar() : showSidebar());
  };

  return (
    <div 
      className={twMerge(
        className, 
        'relative flex flex-row justify-start items-start h-screen overflow-hidden',
        `bg-${theme.body}`)
      }
    >
      <Sidebar 
        collapsed={layoutState.isSM ? false : layoutState.sidebarState.collapsed} 
        hidden={layoutState.sidebarState.hidden} 
        onBreakpoint={setSidebarHidden} 
        onBackdropClick={() => setSidebarHidden(true)} 
      />

      <div className="relative h-full w-full flex flex-col justify-start items-center">
        <Header showSidebarToggler={!!layoutState.sidebarState.hidden} onToggleSidebar={() => setSidebarHidden(false)} />
        <Content />
      </div>
    </div>
  );
}

export default Home;
