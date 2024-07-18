import "./AvatarPicker.css";
import AvatarDialog from "./AvatarDialog";
import Avatar from "./Avatar";
import useAvatars from "./useAvatars";

import AvatarList from "./AvatarList";

const AvatarPicker = () => {
  const {
    selectedAvatar,
    isDialogOpen,
    handleDialog,
    avatars,
    handleSelectedAvatar,
    containerRef,
  } = useAvatars();

  return (
    <div className="avatar-picker" ref={containerRef}>
      <span>pick your avatar!</span>
      <div className="selected-avatar" onClick={handleDialog}>
        <Avatar name={selectedAvatar.name} imgSrc={selectedAvatar.src} />
      </div>
      <div className="dialog">
        <AvatarDialog isDialogOpen={isDialogOpen}>
          <AvatarList
            avatars={avatars}
            selectedAvatar={selectedAvatar}
            handleSelectedAvatar={handleSelectedAvatar}
          />
        </AvatarDialog>
      </div>
    </div>
  );
};

export default AvatarPicker;
