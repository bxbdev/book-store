import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import localForage from "localforage";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";
import imageCompression, { Options } from "browser-image-compression";
import "../UserProfile.scss";

// icons
import RemovePhoto from "../assets/icon/remove-photo.svg?react";
import AddPhoto from "../assets/icon/photo.svg?react";
import Spinner from "../assets/icon/infinite-spinner.svg";

const UserProfileSchema = z.object({
  avatar_url: z.string().optional(),
  nickname: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .min(6, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  bio: z.string().max(200, { message: "Bio is too long" }).optional(),
  website: z.string().url().optional().or(z.literal("")),
  facebook: z.string().url().optional().or(z.literal("")),
  instagram: z.string().url().optional().or(z.literal("")),
  x: z.string().url().optional().or(z.literal("")),
  threads: z.string().url().optional().or(z.literal("")),
  linkedin: z.string().url().optional().or(z.literal("")),
  language: z.string().optional(),
});

type UserProfile = z.infer<typeof UserProfileSchema>;

const UserProfile = () => {
  console.log("Render user profile");
  const apiBaseUrl = import.meta.env.VITE_API_URL;
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserProfile>({
    defaultValues: {
      nickname: "",
      email: "",
      bio: "",
      website: "",
      facebook: "",
      instagram: "",
      x: "",
      threads: "",
      linkedin: "",
      language: "",
    },
    resolver: zodResolver(UserProfileSchema),
  });

  localForage.getItem("userId").then((id) => {
    setUserId(id as string);
  });

  useEffect(() => {
    if (userId) {
      getUserProfile(userId);
    }
  }, [userId]);

  useEffect(() => {
    console.log(userProfile);
    if (!userProfile) return;

    if (userProfile.avatar_url) {
      setAvatarUrl(userProfile.avatar_url);
    }

    reset({
      nickname: userProfile.nickname,
      email: userProfile.email,
      bio: userProfile.bio || "",
      website: userProfile.website || "",
      facebook: userProfile.facebook || "",
      instagram: userProfile.instagram || "",
      x: userProfile.x || "",
      threads: userProfile.threads || "",
      linkedin: userProfile.linkedin || "",
      language: userProfile.language || "",
    });
  }, [userProfile]);

  const getUserProfile = async (userId: string) => {
    try {
      const response = await axios.get(`${apiBaseUrl}/api/user-profile`, {
        params: {
          userId,
        },
      });

      if (response.status === 200) {
        return setUserProfile(response.data.userProfile);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.response?.data.message);
      }
    }
  };

  const onUpdateUserProfile: SubmitHandler<UserProfile> = async (data) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("nickname", data.nickname);
      formData.append("email", data.email);
      formData.append("bio", data.bio || "");
      formData.append("website", data.website || "");
      formData.append("facebook", data.facebook || "");
      formData.append("instagram", data.instagram || "");
      formData.append("x", data.x || "");
      formData.append("threads", data.threads || "");
      formData.append("language", data.language || "");
      formData.append("type", "avatar");
      formData.append("file", file || "");

      // 將資料打印
      // for (const [key, value] of formData.entries()) {
      //   console.log(key, value);
      // }

      const response = await axios.patch(
        `${apiBaseUrl}/api/user-profile`,
        formData
      );

      if (response.status === 200) {
        toast.success(response.data.message);
      }

      if (response.status === 400) {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) {
      console.error("No file selected");
      return;
    }
    const options: Options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 640,
      initialQuality: 1,
      useWebWorker: true,
    };

    const compressedFile = await imageCompression(file, options);
    setFile(compressedFile);

    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      setAvatarUrl(e.target?.result as string);
    };
    reader.readAsDataURL(compressedFile);
  };

  return (
    <div className="page-contaienr user-profile">
      <form className="form" onSubmit={handleSubmit(onUpdateUserProfile)}>
        <h1 className="title">My Profile</h1>
        <div className="form-group user-info">
          <div className="upload-avatar">
            {avatarUrl && (
              <button
                className="btn-circle remove-photo"
                onClick={() => setAvatarUrl("")}
              >
                <RemovePhoto />
              </button>
            )}

            {avatarUrl && (
              <div className="preview">
                {avatarUrl.startsWith("/uploads") ? (
                  <img src={`${apiBaseUrl}${avatarUrl}`} alt="Avatar preview" />
                ) : (
                  <img src={avatarUrl} alt="Avatar preview" />
                )}
              </div>
            )}
            <div className="upload-avatar-input-container">
              <span className="add-photo">
                <AddPhoto />
              </span>
              <input
                className="upload-avatar-input"
                type="file"
                accept="image/jpeg, image/png, image/jpg"
                onChange={(e) => handleAvatarUpload(e)}
              />
            </div>
          </div>

          {/* Nickname start */}
          <div className="form-group">
            <div className="form-control">
              <label>Nickname</label>
              <div className="form-input">
                <input
                  {...register("nickname", { required: true })}
                  type="text"
                />
              </div>
              {errors.nickname && (
                <p className="error-message">Nickname is required</p>
              )}
            </div>

            <div className="form-control">
              <label>Email</label>
              <div className="form-input">
                <input {...register("email", { required: true })} type="text" />
              </div>
              {errors.nickname && (
                <p className="error-message">{errors.nickname.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="form-group">
          {/* Bio start */}
          <div className="form-control">
            <label>Bio</label>
            <div className="form-textarea">
              <textarea {...register("bio")}></textarea>
            </div>
          </div>

          {/* Website start */}
          <div className="form-control">
            <label>Website</label>
            <div className="form-input">
              <input {...register("website")} type="text" />
            </div>
            {errors.website && (
              <p className="error-message">{errors.website.message}</p>
            )}
          </div>

          {/* Facebook start */}
          <div className="form-control">
            <label>Facebook</label>
            <div className="form-input">
              <input {...register("facebook")} type="text" />
            </div>
            {errors.facebook && (
              <p className="error-message">{errors.facebook.message}</p>
            )}
          </div>

          {/* Instagram start */}
          <div className="form-control">
            <label>Instagram</label>
            <div className="form-input">
              <input {...register("instagram")} type="text" />
            </div>
            {errors.instagram && (
              <p className="error-message">{errors.instagram.message}</p>
            )}
          </div>

          {/* X start */}
          <div className="form-control">
            <label>X</label>
            <div className="form-input">
              <input {...register("x")} type="text" />
            </div>
            {errors.x && <p className="error-message">{errors.x.message}</p>}
          </div>

          {/* Threads start */}
          <div className="form-control">
            <label>Threads</label>
            <div className="form-input">
              <input {...register("threads")} type="text" />
            </div>
            {errors.threads && (
              <p className="error-message">{errors.threads.message}</p>
            )}
          </div>

          {/* Language start */}
          <div className="form-control">
            <label>Language</label>
            <div className="form-input">
              <input {...register("language")} type="text" />
            </div>
          </div>
        </div>

        <div className="actions">
          <button className="btn-primary w-full">
            {isLoading ? (
              <div className="spinner">
                <img src={Spinner} width={30} height={30} alt="Loading" />{" "}
                Loading
              </div>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </form>

      <Toaster
        position="top-right"
        gutter={8}
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </div>
  );
};

export default UserProfile;
