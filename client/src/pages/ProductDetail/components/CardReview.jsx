import RatingIcons from "../../../components/RatingIcons";

export default function CardReview({styles, reviewer}) {


    return (
        <div className="d-flex align-items-center border-bottom border-1 border-secondary">
            <img style={{
                width: "50px",
                height: "50px",
                objectFit: "cover",
                borderRadius: "50%"

            }}
             src={reviewer.avatar} alt="" />

             <div className="d-flex flex-column">
                <span>from :{reviewer.nguoiDanhGia.ho_ten}</span>
                <RatingIcons rating={reviewer.so_sao} />
                <span>{reviewer.noi_dung}</span>
             </div>
        </div>
    )
}