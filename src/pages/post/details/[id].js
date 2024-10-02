import { useRouter } from "next/router";
import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";
import Comment from "../../../components/layouts/CardLayout/Comment";
import UserInfo from "../../../components/layouts/CardLayout/UserInfo";
import CardActions from "../../../components/Card/cardAction";
import Post from "../index";
import Header from "@/components/head/header";
import { toast, ToastContainer } from "react-toastify";

// Card Detail Page
const CardDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [card, setCard] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isCommentsVisible, setIsCommentsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const cardRef = useRef(null);
  const [maxInputTop, setMaxInputTop] = useState(0);

  // Fetch post data by ID (unchanged)
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

  // Updated fetch comments logic
  const fetchComments = useCallback(async () => {
    if (!id) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/post/${id}/comment`,
        {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        const approvedComments = result.data.filter(
          (comment) => comment.is_approved === 1
        );
        setComments(approvedComments);
      } else {
        throw new Error(result.message || "Failed to fetch comments");
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // Rest of the component remains unchanged
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
        console.log("Comment added but awaiting approval:", result.data);
        // alert(
        //   "Komentar berhasil di tambahkan, mohon menunggu agar admin memvalidasi komentar anda"
        // );
        toast.success(
          "Komentar berhasil ditambahkan, menunggu persetujuan admin!"
        );
        setNewComment("");
        // Optionally, you can call fetchComments() here to refresh the comments
        // fetchComments();
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
    <>
      <Header
        title="Detail Post"
        meta_description="Halaman detail postingan user"
      />
      <div className="bg-white md:px-32 p-0 mx-auto max-w-7xl">
        <ToastContainer position="top-center" hideProgressBar />
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
              className="mr-2 hover:bg-slate-100 rounded-full"
            />
          </button>
          <div
            ref={cardRef}
            className="flex flex-col md:flex-row justify-center w-full max-h-[100rem] rounded-3xl relative"
          >
            {/* Card content */}
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
                      {isLoading ? (
                        <p>Loading comments...</p>
                      ) : error ? (
                        <p>Error: {error}</p>
                      ) : comments.length > 0 ? (
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
    </>
  );
};

export default CardDetail;
