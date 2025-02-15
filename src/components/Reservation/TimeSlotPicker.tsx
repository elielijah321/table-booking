import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

export interface TimeSlotPickerProps {
  timeSlots: string[];
  disabledSlots: string[];
  onTimeSelect: (time: string | null) => void;
  highlightedSlot: string | null; // New prop to specify the highlighted time slot
}

const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({ timeSlots, disabledSlots, onTimeSelect, highlightedSlot }) => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [startIndex, setStartIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  const slotsPerView = 8;

  // Determine the index of the highlighted slot
  const highlightedIndex = timeSlots.indexOf(highlightedSlot || "");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (highlightedIndex !== -1) {
      // Calculate the startIndex to center the highlighted slot
      const centerIndex = Math.floor(slotsPerView / 2);
      const newStartIndex = Math.max(0, Math.min(highlightedIndex - centerIndex, timeSlots.length - slotsPerView));
      setStartIndex(newStartIndex);
    }
  }, [highlightedSlot, timeSlots]);

  const handleNext = () => {
    if (startIndex + slotsPerView < timeSlots.length) {
      setStartIndex(startIndex + 4);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 4);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-lg font-semibold">Choose an available time slot</h2>
      <Row>
        <Col md={2}>
          {!isMobile && (
            <button onClick={handlePrev} disabled={startIndex === 0} className="px-3 py-1 bg-gray-300 rounded">
              ◀
            </button>
          )}
        </Col>
        <Col md={8}>
          <div className="grid grid-cols-4 gap-4">
            {timeSlots.slice(startIndex, startIndex + slotsPerView).map((time) => (
              <button
                key={time}
                className={`px-4 py-2 border rounded text-center transition-all ${
                  disabledSlots.includes(time)
                    ? "bg-gray-300 cursor-not-allowed"
                    : time === highlightedSlot
                    ? "selected-time-slot" // Highlighted slot style
                    : selectedSlot === time
                    ? "bg-gray-200"
                    : "hover:bg-gray-100"
                }`}
                disabled={disabledSlots.includes(time)}
                onClick={() => {
                  setSelectedSlot(time); // Set selected slot
                  onTimeSelect(time);
                }}
              >
                {time}
              </button>
            ))}
          </div>
        </Col>
        <Col md={2}>
          {isMobile && (
            <button onClick={handlePrev} disabled={startIndex === 0} className="px-3 py-1 bg-gray-300 rounded">
              ◀
            </button>
          )}
          <button onClick={handleNext} disabled={startIndex + slotsPerView >= timeSlots.length} className="px-3 py-1 bg-gray-300 rounded">
            ▶
          </button>
        </Col>
      </Row>
      {/* <button
        className="px-6 py-2 bg-green-900 text-white rounded mt-4 disabled:opacity-50"
        disabled={!selectedSlot}
      >
        Reserve Now
      </button> */}
    </div>
  );
};

export default TimeSlotPicker;
