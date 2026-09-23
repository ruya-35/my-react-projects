import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function DishDetail() {
    const { id } = useParams();
    const [overview, setOverview] = useState("");

    useEffect(() => {
        async function fetchDishOverview() {
            try {
                const response = await fetch("/Dish.json");
                const dishes = await response.json();
                
                const foundDish = dishes.find((dish) => dish.id === Number(id));
                
                if (foundDish) {
                    setOverview(foundDish.overview || foundDish.description);
                }
            } catch (error) {
                console.log("Error loading dish overview:", error);
            }
        }

        fetchDishOverview();
    }, [id]);

    return (
        <div className="dish-detail-container">
            <h2>Dish Overview</h2>
            <p>Item Reference ID: <strong>{id}</strong></p>
            <p className="overview-text">{overview}</p>

            <div className="actions">
                <Link to="/menu" className="back-link">Back to Full Menu</Link>
            </div>
        </div>
    );
}

export default DishDetail;