import Header from './Header';

const DrawerContent = ({
  title,
  onClose,
  children
}) => {
  return (
    <div className="drawer-content-wrapper">
      { title && <Header onClose={onClose} title={title} /> }
      <div id="drawer-content" className="drawer-content">{children}</div>
    </div>
  );
};

export default DrawerContent;
