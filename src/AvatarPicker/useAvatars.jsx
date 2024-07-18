import { useState, useEffect, useRef, useCallback } from "react";

import Avatar1 from "./../assets/avatar-1.svg";
import Avatar2 from "./../assets/avatar-2.svg";
import Avatar3 from "./../assets/avatar-3.svg";
import Avatar4 from "./../assets/avatar-4.svg";
import Avatar5 from "./../assets/avatar-5.svg";
import Avatar6 from "./../assets/avatar-6.svg";
import Avatar7 from "./../assets/avatar-7.svg";
import Avatar8 from "./../assets/avatar-8.svg";

const avatarList = [
  {
    name: "A",
    id: 1,
    src: Avatar1,
  },
  {
    name: "B",
    id: 2,
    src: Avatar2,
  },
  {
    name: "C",
    id: 3,
    src: Avatar3,
  },
  {
    name: "D",
    id: 4,
    src: Avatar4,
  },
  {
    name: "E",
    id: 5,
    src: Avatar5,
  },
  {
    name: "F",
    id: 6,
    src: Avatar6,
  },
  {
    name: "G",
    id: 7,
    src: Avatar7,
  },
  {
    name: "H",
    id: 8,
    src: Avatar8,
  },
];

const useAvatars = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(avatarList[0]);
  const [isDialogOpen, setDialog] = useState(false);
  const [avatars, setAvatars] = useState(avatarList);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef();

  const handleClickOutSide = useCallback((e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      console.log(`clicked outside`);
      setDialog(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutSide);

    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, []);

  const handleSelectedAvatar = (avatar) => {
    if (loading) {
      return;
    }

    let index = avatars.findIndex((av) => av.id === avatar.id);
    if (index !== -1 && selectedAvatar.id !== avatar.id) {
      setLoading(true);
      setAvatars([
        ...avatars.slice(0, index),
        {
          ...avatar,
          isLoading: true,
        },
        ...avatars.slice(index + 1),
      ]);

      setTimeout(() => {
        setAvatars([
          ...avatars.slice(0, index),
          {
            ...avatar,
            isLoading: false,
          },
          ...avatars.slice(index + 1),
        ]);
        setSelectedAvatar(avatar);
        setLoading(false);
        setDialog(false);
      }, 3000);
    }
  };

  const handleDialog = () => {
    setDialog((dialog) => !dialog);
  };

  const obj = {
    selectedAvatar,
    isDialogOpen,
    handleDialog,
    avatars,
    setSelectedAvatar,
    handleSelectedAvatar,
    containerRef,
  };

  return obj;
};

export default useAvatars;
