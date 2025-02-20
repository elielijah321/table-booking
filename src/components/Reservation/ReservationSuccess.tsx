import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStripeCheckoutSession } from '../../functions/fetchEntities';
import { CheckoutSession } from '../../types/Reservation/Reservation';
import { getDisplayDate } from '../../helpers/DateHelper';

function ReservationSuccess() {
    const { id } = useParams();
    const parsedId = id || '';

    const [selectedEntity, setSelectedEntity] = useState<CheckoutSession | null>(null);

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
                <p className="message">Thank you, <strong>{selectedEntity.customer_details.name}</strong>, for your reservation.</p>
                <p className="schedule">Your reservation is scheduled for:</p>
                <h2 className="date">{getDisplayDate(new Date(selectedEntity.metadata["Date"]))} @ {selectedEntity.metadata["Time"]}</h2>
                <p className="footer">We look forward to seeing you!</p>
                <a href="/Tola/reservation/new/edit" className="button">Return to Home</a>
            </div>
        </div>
    );
}

export default ReservationSuccess;

