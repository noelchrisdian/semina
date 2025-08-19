import { useEffect, useRef } from "react";
import { DateRange } from 'react-date-range';

const InputDate = ({ date, onChangeDate, setShowed }) => {
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    })

    const refDate = useRef(null);
    const handleClickOutside = (e) => {
        if (refDate && !refDate.current.contains(e.target)) {
            setShowed(false);
        }
    }

    const check = (focus) => {
        if (!focus.includes(1)) setShowed(false);
    }
    
    return (
        <div
            className="position-absolute"
            style={{ zIndex: '1' }}
            ref={refDate}
        >
            <DateRange
                editableDateInputs={true}
                onChange={onChangeDate}
                moveRangeOnFirstSelection={false}
                onRangeFocusChange={check}
                ranges={[date]}
                maxDate={new Date()}
            />
        </div>
    )
}

export { InputDate };