import "./AvatarList.css";

import Avatar from "./Avatar";
const AvatarList = (props) => {
  const { avatars, selectedAvatar, handleSelectedAvatar } = props;

  console.log(selectedAvatar);
  return (
    <div className="avatars-list">
      {avatars.map((avatar) => (
        <div onClick={() => handleSelectedAvatar(avatar)}>
          <Avatar
            name={avatar.name}
            key={avatar.id}
            isSelected={avatar.id === selectedAvatar.id}
            imgSrc={avatar.src}
            isLoading={avatar.isLoading}
          />
        </div>
      ))}
    </div>
  );
};

export default AvatarList;
