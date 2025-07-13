import axios from "axios";
import MediumImg from "../assets/Medium.png";
import RedditImg from "../assets/Reddit.png";
import TwitterImg from "../assets/X.png";
import YoutubeImg from "../assets/Youtube.png";
import DefaultImg from "../assets/default.png";
import { BACKEND_URL } from "../config";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube" | "medium" | "reddit";
  contentId: string;
  onDelete?: (id: string) => void;
}

export function Card({ title, link, type, contentId, onDelete }: CardProps) {
  const getImagePath = (type: string) => {
    switch (type) {
      case "twitter": return TwitterImg;
      case "youtube": return YoutubeImg;
      case "medium": return MediumImg;
      case "reddit": return RedditImg;
      default: return DefaultImg;
    }
  };

  const getBorderColor = (type: string) => {
    switch (type) {
      case "twitter": return "border-[#1DA1F2] hover:shadow-[4px_4px_0px_#1DA1F2]";
      case "youtube": return "border-[#FF0000] hover:shadow-[4px_4px_0px_#cc0000]";
      case "medium": return "border-black hover:shadow-[4px_4px_0px_#333333]";
      case "reddit": return "border-[#FF5700] hover:shadow-[4px_4px_0px_#cc4400]";
      default: return "border-black hover:shadow-[4px_4px_0px_black]";
    }
  };

  const handleImageClick = () => {
    window.open(link, "_blank");
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: localStorage.getItem("token") || ""
        },
        data: {
          contentId
        }
      });

      if (onDelete) onDelete(contentId);
    } catch (err) {
      console.error("Error deleting content", err);
    }
  };

  return (
    <div className="p-2 m-5">
      <div
        className={`relative p-4 bg-white rounded-2xl border-2 border-dashed max-w-72 min-w-72 min-h-48 transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md ${getBorderColor(type)}`}
      >
        {/* Delete Button (top right) */}
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 text-sm text-red-500 hover:text-red-700 font-semibold"
        >
          ✕
        </button>

        <div className="text-md font-medium text-gray-800 line-clamp-2">
          {title}
        </div>

        <div className="pt-4">
          <img
            src={getImagePath(type)}
            alt={`${type} content`}
            className="w-full h-48 object-cover rounded-md cursor-pointer transition-transform duration-300 hover:brightness-95 hover:scale-[1.01]"
            onClick={handleImageClick}
          />
        </div>
      </div>
    </div>
  );
}
