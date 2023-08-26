import { RowsIcon } from '@radix-ui/react-icons';

interface ILayoutHeader {
  showSidebarToggler: boolean;
  onToggleSidebar: ()=>void;
  className?: string;
}

export const HeaderBase = ({ showSidebarToggler, onToggleSidebar, className }: ILayoutHeader): JSX.Element => {
  function onToggleSidebarClick(): void {
    if (!onToggleSidebar) return;
    onToggleSidebar();
  }

  return (
    <div className={className}>
      <div id="cl-header">
        <div className="cl-header-left">
          {showSidebarToggler && (
            <div className="cl-header-sidebar-toggle-btn" onClick={onToggleSidebarClick}>
              <RowsIcon className='h-[24px]' />
            </div>
          )}
        </div>
        <div className="cl-header-center" />
        <div className="cl-header-right" />
      </div>
    </div>
  );
};

export default HeaderBase;
