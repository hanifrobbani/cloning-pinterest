import { useRouter } from "next/router";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Comment from "../../../components/layouts/CardLayout/Comment";
import UserInfo from "../../../components/layouts/CardLayout/UserInfo";
import ActionButton from "../../../components/layouts/CardLayout/ActionButton";
import Post from "../index";

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
      const response = await fetch(
        `http://127.0.0.1:8000/api/post/${postId}/like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setIsLiked(data.is_liked);
      setLikeCount(data.like_count);
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

// Card Detail Page
const CardDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [card, setCard] = useState(null); // State for fetched post data
  const [comments, setComments] = useState([]); // State for comments
  const [newComment, setNewComment] = useState(""); // State for new comment
  const [isCommentsVisible, setIsCommentsVisible] = useState(true);
  const cardRef = useRef(null);
  const [maxInputTop, setMaxInputTop] = useState(0);

  // Fetch post data by ID
  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/post/${id}`);
        const result = await response.json();
        setCard(result.data.post);
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };

    if (id) {
      fetchCardData();
    }
  }, [id]);

  // Fetch comments by post ID
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/post/${id}/comment`
        );
        const result = await response.json();

        if (result.success) {
          // Filter comments where is_approved is true
          const approvedComments = result.data.filter(
            (comment) => comment.is_approved === 1
          );

          setComments(approvedComments); // Update the state with approved comments
        } else {
          console.error("Error fetching comments:", result.message);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [id]);

  // Handle adding new comment
  const handleAddComment = async () => {
    if (newComment.trim() === "") return;

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/post/${id}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ body: newComment }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setComments((prevComments) => [...prevComments, result.data]); // Add new comment to list
        setNewComment(""); // Clear input
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleBackClick = () => {
    router.push("/");
  };

  const toggleComments = () => {
    setIsCommentsVisible(!isCommentsVisible);
  };

  // Calculate input position relative to screen
  useEffect(() => {
    const updateMaxInputTop = () => {
      if (cardRef.current) {
        const cardBottom = cardRef.current.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        setMaxInputTop(cardBottom - windowHeight);
      }
    };

    updateMaxInputTop();
    window.addEventListener("resize", updateMaxInputTop);

    return () => {
      window.removeEventListener("resize", updateMaxInputTop);
    };
  }, []);

  if (!card) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white md:px-32 p-0 mx-auto max-w-7xl">
      <div className="md:mt-36 mt-0 flex items-start max-w-7xl mx-auto">
        <button
          onClick={handleBackClick}
          className="mb-4 md:flex hidden items-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
        >
          <Image
            src="/arrow-back.svg"
            alt="Back"
            width={28}
            height={28}
            className="mr-2"
          />
        </button>

        <div
          ref={cardRef}
          className="flex flex-col md:flex-row justify-center w-full max-h-[100rem] rounded-3xl relative"
        >
          <div className="relative w-full">
            <img
              src={card.image_url}
              alt={card.title}
              className="object-cover w-full rounded-lg"
            />
          </div>
          <div className="w-full h-auto">
            <CardActions postId={id} />
            <div className="w-full px-5 pt-5 pb-2 text-2xl font-bold">
              <h1>{card.title}</h1>
            </div>
            <div
              className="flex flex-col mb-20 overflow-y-auto"
              style={{ maxHeight: "calc(100vh - 200px)" }}
            >
              <div className="w-full py-2 px-5">
                <UserInfo username={card.user} followers="11,5rb" />
                <div className="mt-20">
                  <div className="flex justify-between items-center">
                    <h1 className="font-semibold">
                      {comments.length} Komentar
                    </h1>
                    <button
                      onClick={toggleComments}
                      className="focus:outline-none"
                    >
                      <Image
                        src="/dropdown.svg"
                        alt="Dropdown Logo"
                        width={30}
                        height={30}
                        className={`cursor-pointer transition-transform duration-300 ${
                          isCommentsVisible ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isCommentsVisible
                      ? "max-h-[calc(150vh-180px)] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="flex flex-col gap-2 mt-4">
                    {comments.length > 0 ? (
                      comments.map((comment) => (
                        <Comment
                          key={comment.id}
                          username={comment.username}
                          comment={comment.body}
                        />
                      ))
                    ) : (
                      <p>No comments yet.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="sticky bottom-0 bg-white p-4 border-t border-gray-200"
              style={{ top: `max(0px, ${maxInputTop}px)` }}
            >
              <input
                type="text"
                placeholder="Tambahkan komentar..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddComment();
                  }
                }}
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-5">
        <h1 className="text-center font-bold text-xl">
          Lainnya untuk di jelajahi
        </h1>
        <Post padding="pt-10" />
      </div>
    </div>
  );
};

export default CardDetail;
