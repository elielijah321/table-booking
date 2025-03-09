import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getStripeCheckoutSession } from '../../functions/fetchEntities';
import { ReservationSuccessModel } from '../../types/Reservation/Reservation';
import { getDisplayDate } from '@/helpers/DateHelper';
import classes from './ReservationSuccess.module.css';

function ReservationSuccess() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const parsedId = id || '';

    const [selectedEntity, setSelectedEntity] = useState<ReservationSuccessModel | null>(null);


    const returnToHome = () => {

        navigate(`/${selectedEntity?.businessName}`, { replace: true });
        
    }

    useEffect(() => {
        if (parsedId !== "new") {
            getStripeCheckoutSession(parsedId).then((data) => {
                setSelectedEntity(data);
            });
        }
    }, [parsedId]);

    if (!selectedEntity) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className={classes.confirmationPage}>
            <div className={classes.confirmationCard}>
                <h1 className={classes.title}>🎉 Booking Confirmed! 🎉</h1>
                <p className={classes.message}>Thank you, <strong>{selectedEntity?.name}</strong>, for your reservation.</p>
                <p className={classes.schedule}>Your reservation is scheduled for:</p>
                <h2 className={classes.date}>{getDisplayDate(new Date(selectedEntity?.reservationDate ?? new Date()))} @ {selectedEntity?.time}</h2>
                <p className={classes.footer}>We look forward to seeing you!</p>
                <span className={classes.button} onClick={returnToHome}>Return to Home</span>
            </div>
        </div>
    );
}

export default ReservationSuccess;

