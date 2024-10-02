import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import ActionButton from "../../components/layouts/CardLayout/ActionButton";


const CardActions = ({ postId }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
  
    useEffect(() => {
      const fetchLikeStatus = async () => {
        try {
          const response = await fetch(
            `http://127.0.0.1:8000/api/post/${postId}/likes`
          );
          const data = await response.json();
          setIsLiked(data.is_liked);
          setLikeCount(data.likes_count);
        } catch (error) {
          console.error("Error fetching like status:", error);
        }
      };
  
      fetchLikeStatus();
    }, [postId]);
  
    const handleLike = async () => {
      try {
        const token = Cookies.get("token");
  
        const response = await fetch(
          `http://127.0.0.1:8000/api/post/${postId}/like`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Sertakan token dalam header
            },
          }
        );
        const data = await response.json();
        setIsLiked(data.like_status);
        setLikeCount(data.total_likes);
      } catch (error) {
        console.error("Error toggling like:", error);
      }
    };
  
    return (
      <div className="w-full flex px-5 justify-between mb-2 mt-5 md:mt-0">
        <div className="flex gap-5 items-center">
          <ActionButton
            iconSrc={isLiked ? "/like-filled.svg" : "/like.svg"}
            altText="Like"
            onClick={handleLike}
            isActive={isLiked}
          />
          <span>{likeCount} likes</span>
          <ActionButton iconSrc="/share.svg" altText="Share" />
          <ActionButton iconSrc="/option.svg" altText="Options" />
        </div>
        <div>
          <button className="md:px-4 md:py-3 px-3 py-2 bg-red-500 rounded-3xl text-sm md:text-base text-white font-semibold hover:bg-red-600">
            Simpan
          </button>
        </div>
      </div>
    );
  };

  export default CardActions;