import React, { useState, useEffect } from 'react';

export interface TimeSlotPickerProps {
  timeSlots: string[];
  disabledSlots: string[];
  onTimeSelect: (time: string | null) => void;
  highlightedSlot: string | null;
}

const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  timeSlots,
  disabledSlots,
  onTimeSelect,
  highlightedSlot
}) => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const slotsPerView = isMobile ? 9 : 15;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Only set initial page for highlighted slot, don't auto-update
  useEffect(() => {
    if (highlightedSlot && !selectedSlot) {
      const highlightedIndex = timeSlots.indexOf(highlightedSlot);
      if (highlightedIndex !== -1) {
        setCurrentPage(Math.floor(highlightedIndex / slotsPerView));
      }
    }
  }, [highlightedSlot, timeSlots, slotsPerView, selectedSlot]);

  const handleNext = () => {
    const maxPages = Math.ceil(timeSlots.length / slotsPerView) - 1;
    setCurrentPage(prev => Math.min(prev + 1, maxPages));
  };

  const handlePrev = () => {
    setCurrentPage(prev => Math.max(prev - 1, 0));
  };

  const handleTimeSelect = (time: string) => {
    setSelectedSlot(time);
    onTimeSelect(time);
  };

  const startIndex = currentPage * slotsPerView;
  const visibleTimeSlots = timeSlots.slice(startIndex, startIndex + slotsPerView);

  return (
    <div className="time-slot-container">
      <div className="time-slot-nav">
        <button 
          className="time-slot-nav-button"
          onClick={handlePrev} 
          disabled={currentPage === 0}
        >
          Prev
        </button>

        <div className="time-slot-grid-container">
          <div className="time-slot-grid">
            {visibleTimeSlots.map((time) => (
              <button
                key={time}
                className={`time-slot-button ${
                  selectedSlot === time ? 'selected' : ''
                } ${highlightedSlot === time ? 'highlighted' : ''}`}
                disabled={disabledSlots.includes(time)}
                onClick={() => handleTimeSelect(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <button 
          className="time-slot-nav-button"
          onClick={handleNext}
          disabled={currentPage >= Math.ceil(timeSlots.length / slotsPerView) - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TimeSlotPicker;