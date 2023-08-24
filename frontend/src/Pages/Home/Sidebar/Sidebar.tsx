import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Sidebar } from 'react-pro-sidebar';
import { selectTheme } from '../../../Store/Reducers/Layout/ThemeSelector';

export interface ISidebar {
  collapsed: boolean;
  hidden: boolean;
  onBreakpoint(onBreakpoint: boolean): void;
  onBackdropClick(): void;
  className?: string;
}

function SidebarBase({ collapsed, onBreakpoint, onBackdropClick, hidden }: ISidebar): JSX.Element {
  const theme = useSelector(selectTheme);
  const ismounted = useRef(false);

  useEffect(() => {
    ismounted.current = true;
    return () => {
      ismounted.current = false;
    };
  }, []);

  return (
    <Sidebar 
      width='220px'
      collapsed={collapsed} 
      toggled={!hidden}
      onBreakPoint={onBreakpoint}
      onBackdropClick={onBackdropClick}
      breakPoint='sm'
      backgroundColor={theme.sidebar.background}
    >
      <div className='h-screen flex flex-col justify-start items-start'>
        {/* HEADER */}
        <div className="w-full overflow-hidden flex justify-center items-center my-1" style={{height: '56px'}}>
          <img
            className='h-[90%]'
            src={`/images/${collapsed ? 'sidebar-collapsed-banner.png' : 'sidebar-banner.png'}`}
            style={{ 
              objectFit: 'cover'
            }}
            alt="/images/sidebar-collapsed-banner.png"
          />
        </div>
      </div>
    </Sidebar>
  );
}

export default SidebarBase;
