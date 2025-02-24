import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getStripeCheckoutSession } from '../../functions/fetchEntities';
import { getDisplayDate } from '../../helpers/DateHelper';
import { ReservationSuccessModel } from '../../types/Reservation/Reservation';

function ReservationSuccess() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const parsedId = id || '';

    const [selectedEntity, setSelectedEntity] = useState<ReservationSuccessModel | null>(null);


    const returnToHome = () => {

        navigate(`/${selectedEntity?.businessName}/reservation/new/edit`, { replace: true });
        
    }

    useEffect(() => {
        if (parsedId !== "new") {
            getStripeCheckoutSession(parsedId).then((data) => {
                console.log(data);
                setSelectedEntity(data);
            });
        }
    }, [parsedId]);

    if (!selectedEntity) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="confirmation-page">
            <div className="confirmation-card">
                <h1 className="title">🎉 Booking Confirmed! 🎉</h1>
                <p className="message">Thank you, <strong>{selectedEntity.name}</strong>, for your reservation.</p>
                <p className="schedule">Your reservation is scheduled for:</p>
                <h2 className="date">{getDisplayDate(new Date(selectedEntity.reservationDate))} @ {selectedEntity.time}</h2>
                <p className="footer">We look forward to seeing you!</p>
                <span className='button' onClick={returnToHome}>Return to Home</span>
            </div>
        </div>
    );
}

export default ReservationSuccess;

