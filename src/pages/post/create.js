import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [user, setUser] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const addPost = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    // formData.append("description", description);
    formData.append("user", user.name); // Asumsikan user sudah ada di localStorage
    if (file) {
      formData.append("image", file);
    }

    try {
      const token = Cookies.get("token");
      const response = await fetch("http://127.0.0.1:8000/api/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "application/json",
        },
        body: formData,
        credentials: "include",
      });
      if (response.ok) {
        const result = await response.json();
        console.log("Post created:", result.data);
        // Reset form atau arahkan user setelah sukses
        setTitle("");
        setDescription("");
        setFile(null);
      } else {
        const errorData = await response.json();
        console.error("Failed to create post:", errorData.message);
      }
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 md:pt-28 pb-20">
      <form
        className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
        onSubmit={addPost}
        encType="multipart/form-data"
      >
        <div className="flex flex-wrap md:flex-nowrap">
          <div className="md:w-2/3 border-r border-gray-200 p-4 w-full">
            <label className="h-96 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer">
              {file ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="Uploaded Preview"
                  className="h-full w-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="mx-auto text-gray-400 mb-4"
                    style={{ width: "48px", height: "48px" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v1.125A2.625 2.625 0 005.625 20.25h12.75A2.625 2.625 0 0021 17.625V16.5M7.5 10.5L12 6m0 0l4.5 4.5M12 6v10.5"
                    />
                  </svg>
                  <p className="text-gray-600">Click to upload</p>
                  <p className="text-sm text-gray-400">
                    Recommendation: Use high-quality .jpg files less than 5MB
                  </p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="md:w-1/2 p-6 w-full">
            <div className="mb-6">
              <label htmlFor="title" className="font-light mb-1">
                Title Post
              </label>
              <input
                type="text"
                placeholder="Add your title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-2 py-3 focus:ring-4 rounded-2xl border border-gray-500 outline-none"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="description" className="font-light mb-1">
                Description Post
              </label>
              <textarea
                placeholder="Add Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="h-28 w-full px-2 py-3 focus:ring-4 rounded-2xl border border-gray-500 outline-none resize-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-white border-t border-gray-200 p-4 flex justify-end items-center">
          <div>
            <a
              href="/"
              className="cursor-pointer px-4 py-2 bg-gray-200 text-gray-700 rounded-full mr-2 hover:bg-gray-300"
            >
              Cancel
            </a>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600"
              type="submit"
            >
              Publish
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
