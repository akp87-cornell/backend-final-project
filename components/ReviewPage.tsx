import { useState } from "react";
import "../styles/SpaceDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { reviews, studyspaces } from "../data";

function ReviewPage() {
    const { id } = useParams();
    const [name, setInputNameValue] = useState('');
    const [review, setInputReviewValue] = useState('');
    const [rating, setRating] = useState(0);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputNameValue(event.target.value);
    };
    const handleReviewChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputReviewValue(event.target.value);
    };

    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/room/' + id);
    };
    const handleSubmit = () => {
        const obj = studyspaces.find((o) => o.id.toString() === id);
        if (!obj) {
            return <h1>Study space with ID {id} not found</h1>;
        }

        addReview(Number(id), name, rating, review);
        
        const reviewsList = reviews.filter((o) => o.room_id.toString() === id);
        obj.rating = Number(((reviewsList.reduce((accumulator, current) => accumulator + current.rating, 0))/reviewsList.length).toFixed(3));
        handleBack();
    };

    const addReview = (
        room_id: number,
        name: string,
        rating: number,
        message?: string
    ): void => {
        const newReview = { room_id, name, rating, message };
        reviews.push(newReview);
    };

    return (
        <div>
            <h1>Leave a Review</h1>
            <div className="rating">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        onClick={() => setRating(star)}
                        style={{ color: rating >= star ? "gold" : "gray", cursor: "pointer" }}
                    >
                        ★
                    </span>
                ))}
            </div>
            <input
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="Enter name here"
            />
            <textarea
                value={review}
                onChange={handleReviewChange}
                placeholder="Enter Review here"
                className="review-textarea"
            />
            <button data-testid='backpage' onClick={handleBack}>
                Return to Home
            </button>
            <button data-testid='leavereview' onClick={handleSubmit}>
                Post Review
            </button>
        </div>
    );
}

export default ReviewPage;
