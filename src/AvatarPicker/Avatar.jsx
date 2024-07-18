import "./Avatar.css";

const Avatar = (props) => {
  const { imgSrc, isSelected, isLoading } = props;

  let classNames = `avatar`;
  classNames = isSelected ? `${classNames} selected` : classNames;
  classNames = isLoading ? `${classNames} loading` : classNames;

  return (
    <div className={classNames}>
      <div className="avatar-img">
        <img src={imgSrc} width={"60px"} height={"60px"} />
      </div>
      {/* <div className="avatar-info">
        <span>{name}</span>
      </div> */}
    </div>
  );
};

export default Avatar;
