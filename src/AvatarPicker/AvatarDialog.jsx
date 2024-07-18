import "./AvatarDialog.css";

const AvatarDialog = ({ children, isDialogOpen }) => {
  let classNames = `avatar-dialog`;
  classNames = isDialogOpen ? `${classNames} visible` : classNames;
  return (
    <div className={classNames}>
      <span className="avatar-dialog-arrow"></span>
      <div>{children}</div>
    </div>
  );
};

export default AvatarDialog;
