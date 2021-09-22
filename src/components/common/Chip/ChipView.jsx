import React from 'react';
import Chip from 'apollo-react/components/Chip';
import Check from 'apollo-react-icons/Check';
const ChipView = ({ bgcolor, label, size, answer }) => {
    return(
        <div>
           <Chip icon={answer ? <Check /> : '' }  size={size ? size : "small"} label={label} style={{
               backgroundColor: bgcolor ? bgcolor : '#0869fd',
               borderColor: bgcolor ? bgcolor : '#0869fd',
               fontFamily: "ProximaNova-Regular",
               paddingLeft: 10,
               paddingRight: 10
            }} />
        </div>
    )
}
export default ChipView;