import React, { useState, useEffect } from 'react';
import DatePicker from 'apollo-react/components/DatePickerV2';
import moment from 'moment';
import { CloseCircle } from '../../../svg';
const date = moment();

const QuestionDatePicker = ({value, resetDate, handleDayChange}) => {
    const [inputValue, setInputValue] = useState(date.format('DD/MM/YYYY'));
    const [resetsubmit, setresetsubmit] = useState(false);
    useEffect(() => {
        value = String(value).trimStart().trimEnd();
        value = ((String(new Date(value)).includes('Invalid')) || !Boolean(String(value).length)) ? '' : moment(value).format('DD/MM/YYYY');
        setInputValue(value);
        if(value) setresetsubmit(true)
        else setresetsubmit(false)
    }, [value])
    return (
        <div className="date-picker">
            <DatePicker
                placeholder="DD/MM/YYYY"
                dateFormat="DD/MM/YYYY"
                fullWidth 
                inputValue={inputValue}
                error={false}
                style={{marginTop: 0}}
                value={inputValue}
                onInputChange={(dte) => {}}
                onChange={(dte) => {
                    if(dte && !moment(dte).isSame(value)){
                      setInputValue(moment(dte).format('DD/MM/YYYY'));
                      handleDayChange(dte,value);
                    }
                }}
              />
              {resetsubmit &&
                <button 
                 onClick={()=>{
                    setresetsubmit(false)
                    setInputValue('');
                    resetDate();
                 }}
                 style={{alignSelf: 'auto', position: 'absolute', right: '17%', marginTop: 15}} 
                 type="button" className="resetButton">
                <CloseCircle fill="#444" />
              </button>
              }
          </div>
    )
}
export default QuestionDatePicker;