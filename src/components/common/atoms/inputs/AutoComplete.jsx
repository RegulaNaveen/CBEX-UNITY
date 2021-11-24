import React, {useState, useEffect} from 'react';
import AutocompleteV2 from 'apollo-react/components/AutocompleteV2';
import { connect } from 'react-redux';
import { getLookupUsers } from '../../../../redux/selectors';

const Autocomplete = (props) => {
    const [value, setValue] = useState([]);
    const text = String(props?.text).trimStart().trimEnd();
    const handleChange = (event, newValue) => {
         setValue(newValue);
    };
    const proposalusers = props?.users?.map(v=>{
        return { label: v.name}
    });
    useEffect(() => {
        if(Boolean(text.length)){
            setValue([{ label: text }])
        }
    }, [text]);

    return (
        <div>
            <AutocompleteV2
                fullWidth
                multiple
                source={proposalusers || []}
                value={value}
                onChange={handleChange}
            />
        </div>
    )
}
const mapStateToProps = state => ({
    users: getLookupUsers(state)
  });
  
export default connect(mapStateToProps)(Autocomplete);
