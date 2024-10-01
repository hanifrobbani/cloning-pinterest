import { useState, useEffect } from 'react';

const Post = ({ postId }) => {
    const [likesCount, setLikesCount] = useState(0);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const fetchLikesData = async () => {
            try {
                // Fetch jumlah likes saat halaman dibuka
                const likesResponse = await fetch(`/api/posts/${postId}/likes`);
                const likesData = await likesResponse.json();
                setLikesCount(likesData.likes_count);

                // Fetch apakah user sudah like post ini atau belum
                const likedResponse = await fetch(`/api/posts/${postId}/liked`);
                const likedData = await likedResponse.json();
                setLiked(likedData.liked);
            } catch (error) {
                console.error('Error fetching likes data:', error);
            }
        };

        fetchLikesData();
    }, [postId]);

    const handleLike = async () => {
        try {
            const response = await fetch(`/api/posts/${postId}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();

            if (data.message === 'Post liked') {
                setLikesCount(prevCount => prevCount + 1);
                setLiked(true);
            } else {
                setLikesCount(prevCount => prevCount - 1);
                setLiked(false);
            }
        } catch (error) {
            console.error('Error handling like:', error);
        }
    };

    return (
        <div>
            <button onClick={handleLike}>
                {liked ? 'Unlike' : 'Like'} ({likesCount})
            </button>
        </div>
    );
};

export default Post;