import { useState } from "react";
import axios from "axios";
import localForage from "localforage";

const UserProfile = () => {
  console.log("Render user profile");
  const apiBaseUrl = import.meta.env.VITE_API_URL;
  const [avatarUrl, setAvatarUrl] = useState("");
  const [userId, setUserId] = useState("");

  localForage.getItem("userId").then((id) => {
    setUserId(id as string);
  });

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) {
      console.error("No file selected");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "avatar");
    formData.append("userId", userId);

    try {
      const response = await axios.post(`${apiBaseUrl}/api/upload`, formData);
      console.log(response);
      setAvatarUrl(response.data.file);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h1>My Profile</h1>
      <input
        type="file"
        accept="image/jpg"
        onChange={(e) => handleAvatarUpload(e)}
      />
      <div>
        {avatarUrl && <img src={`${apiBaseUrl}${avatarUrl}`} alt="Avatar" />}
      </div>
    </div>
  );
};

export default UserProfile;
