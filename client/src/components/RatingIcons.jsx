import { memo } from "react";

export default memo(function RatingIcons({rating}){

        let ratingIcons = [];
    for (let i = 1; i <= 5; i++) {
        const diff = rating - i;
        if (diff >= 0) {
            ratingIcons.push(<i key={i} className="bi bi-star-fill"></i>);
        } else if (diff >= -0.5) {
            ratingIcons.push(<i key={i} className="bi bi-star-half"></i>);
        } else {
            ratingIcons.push(<i key={i} className="bi bi-star"></i>);
        }
    }

    return (
            <div className="d-flex">
                    {ratingIcons}    &nbsp; {rating} star
            </div>
    )
})