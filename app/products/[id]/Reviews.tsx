// app/products/[id]/Reviews.tsx
"use client";

import { useState } from "react";

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  helpfulCount: number;
}

const mockReviews: Record<string, Review[]> = {
  default: [
    {
      id: "r1",
      author: "Alex Morgan",
      rating: 5,
      date: "2 days ago",
      title: "Exceeded all expectations!",
      comment:
        "The build quality and ergonomics are unmatched. Used this on my latest 15-mile trek and couldn't be happier with the performance.",
      verified: true,
      helpfulCount: 14,
    },
    {
      id: "r2",
      author: "Jordan Lee",
      rating: 5,
      date: "1 week ago",
      title: "Solid daily gear",
      comment:
        "Lightweight, durable, and battery life matches the advertised specs exactly. Definitely recommending this to my teammates.",
      verified: true,
      helpfulCount: 9,
    },
    {
      id: "r3",
      author: "Sam Rivera",
      rating: 4,
      date: "3 weeks ago",
      title: "Great value, minor quirk",
      comment:
        "Packaging was clean and delivery was fast. Takes a day or two to break in, but once adapted, it feels completely seamless.",
      verified: true,
      helpfulCount: 5,
    },
  ],
};

export default function Reviews({ productId }: { productId: string }) {
  const [filter, setFilter] = useState<"all" | "verified">("all");
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, number>>({});

  const reviews = mockReviews[productId] || mockReviews.default;
  const filtered =
    filter === "verified" ? reviews.filter((r) => r.verified) : reviews;

  const handleVote = (id: string) => {
    setHelpfulVotes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  return (
    <section className="reviews-section">
      <div className="section-head">
        <h2 className="section-title">Customer Reviews</h2>
        <span className="section-count">{reviews.length} verified reviews</span>
      </div>

      <div className="reviews-breakdown">
        <div className="rating-summary">
          <span className="big-rating">4.8</span>
          <div className="rating-stars">★★★★★</div>
          <p className="rating-caption">96% of customers recommend this item</p>
        </div>
        <div className="rating-bars">
          <div className="bar-row">
            <span>5★</span>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: "85%" }} />
            </div>
            <span>85%</span>
          </div>
          <div className="bar-row">
            <span>4★</span>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: "11%" }} />
            </div>
            <span>11%</span>
          </div>
          <div className="bar-row">
            <span>3★</span>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: "4%" }} />
            </div>
            <span>4%</span>
          </div>
          <div className="bar-row">
            <span>2★</span>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: "0%" }} />
            </div>
            <span>0%</span>
          </div>
          <div className="bar-row">
            <span>1★</span>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: "0%" }} />
            </div>
            <span>0%</span>
          </div>
        </div>
      </div>

      <div className="reviews-filter-bar">
        <button
          type="button"
          className={`filter-btn ${filter === "all" ? "filter-active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All Reviews ({reviews.length})
        </button>
        <button
          type="button"
          className={`filter-btn ${filter === "verified" ? "filter-active" : ""}`}
          onClick={() => setFilter("verified")}
        >
          Verified Buyers Only
        </button>
      </div>

      <div className="reviews-list">
        {filtered.map((rev) => (
          <div key={rev.id} className="review-card">
            <div className="review-header">
              <div>
                <span className="review-author">{rev.author}</span>
                {rev.verified && (
                  <span className="verified-badge">✓ Verified Buyer</span>
                )}
              </div>
              <span className="review-date">{rev.date}</span>
            </div>
            <div className="review-rating">
              {"★".repeat(rev.rating)}
              {"☆".repeat(5 - rev.rating)}
            </div>
            <h4 className="review-title">{rev.title}</h4>
            <p className="review-comment">{rev.comment}</p>
            <div className="review-footer">
              <button
                type="button"
                className="helpful-btn"
                onClick={() => handleVote(rev.id)}
              >
                Helpful ({rev.helpfulCount + (helpfulVotes[rev.id] || 0)})
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
