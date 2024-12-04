import { useNavigate } from "react-router-dom";
import { reviews } from "../data";
import "../styles/SpaceDetails.css";

function SpaceDetails({id, name, rating}: {
    id: number;
    name: string;
    campus?: string;
    hall?: string;
    floor?: number;
    rating?: number;
}) {

    const reviewList = reviews.filter((o) => o.room_id === id);

    const navigate = useNavigate();

    const handleReview = () => {
        navigate('/room/' + id + '/review');
    };

    const handleHome = () => {
        navigate('/');
    };

    return (
        <>
            <h1>{name}</h1>
            <h3>Rating: {rating}/5</h3>
            <div>
                <button data-testid='reviewpage' onClick={handleReview}>
                    Leave a Review
                </button>
                <button data-testid='homepage' onClick={handleHome}>
                    Return to Home
                </button>
            </div>
            <div>
                <h2>User Reviews</h2>
                {reviewList.map((review) => (
                    <div className='review' key={review.name} data-testid='review'>
                        <p><b>{review.name}</b>: {review.rating}/5</p>
                        <p>{review.message}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default SpaceDetails;