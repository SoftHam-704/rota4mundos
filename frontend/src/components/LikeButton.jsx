import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { articlesApi } from "../api/articles.js";

export default function LikeButton({ articleId }) {
    const [liked, setLiked]   = useState(false);
    const [count, setCount]   = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!articleId) return;
        articlesApi.getLikes(articleId)
            .then(res => {
                const d = res.data?.data;
                setLiked(d?.liked ?? false);
                setCount(d?.count ?? 0);
            })
            .catch(() => {});
    }, [articleId]);

    const handleLike = async () => {
        if (loading) return;
        setLoading(true);
        const prevLiked = liked;
        const prevCount = count;
        setLiked(!liked);
        setCount(c => liked ? c - 1 : c + 1);
        try {
            const res = await articlesApi.toggleLike(articleId);
            const d = res.data?.data;
            setLiked(d?.liked ?? !prevLiked);
            setCount(d?.count ?? prevCount);
        } catch {
            setLiked(prevLiked);
            setCount(prevCount);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleLike}
            disabled={loading}
            style={{
                display: "inline-flex", alignItems: "center", gap: "7px",
                padding: "9px 20px", borderRadius: "50px",
                border: liked ? "1.5px solid #FCA5A5" : "1.5px solid #E2E8F0",
                background: liked ? "#FFF1F2" : "transparent",
                color: liked ? "#F43F5E" : "#94A3B8",
                fontSize: "14px", fontWeight: 600,
                cursor: loading ? "default" : "pointer",
                transition: "all 0.18s",
                fontFamily: "Inter, sans-serif",
                userSelect: "none",
            }}
        >
            <Heart
                style={{
                    width: "16px", height: "16px",
                    fill: liked ? "#F43F5E" : "none",
                    stroke: liked ? "#F43F5E" : "currentColor",
                    transition: "all 0.18s",
                    transform: loading ? "scale(0.9)" : "scale(1)",
                }}
            />
            {count > 0 ? count : "Curtir"}
        </button>
    );
}
