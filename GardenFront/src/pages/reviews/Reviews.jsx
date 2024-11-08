import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "../../firebase";

export default function Reviews() {
  // function to show all Reviews
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(collection(database, "reviews"), (snapshot) => {
      setReviews(snapshot.docs.map((doc) => doc.data()));
    });

    return unsub;
  }, []);

  return (
    <div>
      <h2 className="text-[24px] p-2">
        <b>Customer Reviews</b>
      </h2>
      {reviews.map((review) => (
        <div
          key={review.review + review.rating}
          style={{
            borderRadius: "5px",
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            padding: "1rem",
            margin: "1rem",
            maxWidth: "500px",
          }}
        >
          <h2 className="font-bold">Reviewer: {review.user.name}</h2>
          <span className="text-[12px]" style={{fontWeight:200, margin:0}}> Email: {review.user.email}</span>
          <h2 style={{
            borderTop: '1px solid lightgray',
            borderBottom: '1px solid lightgray',
            paddingBlock: '1rem',
            marginBottom: '1rem'
          }}>{review.review}</h2>
          <p
            style={{
              fontSize: "1rem",
              color: "green",
              marginTop:'1rem'
            }}
          >
            Rating: {review.rating}/10
          </p>
        </div>
      ))}
    </div>
  );
}
