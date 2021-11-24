import React, { useState, useEffect } from 'react';
import DatePicker from 'apollo-react/components/DatePickerV2';
import moment from 'moment';
import { CloseCircle } from '../../../svg';
const date = moment();

const QuestionDatePicker = ({value, resetDate, handleDayChange}) => {
    const [inputValue, setInputValue] = useState('');
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
                dateFormat='DD/MM/YYYY'
                fullWidth 
                style={{marginTop: 0}}
                inputValue={inputValue}
                onInputChange={(dte) => {
                  let dateregx = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
                  setInputValue(dte);
                  if(dte && dateregx.test(dte)){
                    console.log(dte)
                    dte = String(dte).split('/');
                    dte = `${dte[1]}/${dte[0]}/${dte[2]}`
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