import React, {useState, useEffect} from 'react';
import AutocompleteV2 from 'apollo-react/components/AutocompleteV2';
import { connect } from 'react-redux';
import { getLookupUsers } from '../../../../redux/selectors';

function extractEmails (str){
    let result =  String(str).match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
    return result.length ? result[0] : '' 
}

const Autocomplete = (props) => {
    const [value, setValue] = useState([]);
    const text = String(props?.text).trimStart().trimEnd();
    
    
    const handleChange = (event, newValue) => {
         setValue(newValue);
         const proposaluser = newValue.map(v=>{
             return v.email ? v.email : extractEmails(v.label)
         })
         props.onChange(proposaluser,text);
    };
    const proposalusers = props?.users?.map(v=>{
        return { label: v.name, email: v.email}
    });
    useEffect(() => {
        if(Boolean(text.length)){
            setValue([{ label: text }]);
        }
    }, [text]);

    return (
        <div>
            <AutocompleteV2
                fullWidth
                multiple
                source={proposalusers || []}
                value={value}
                chipColor="white"
                size="small"
                onChange={handleChange}
            />
        </div>
    )
}
const mapStateToProps = state => ({
    users: getLookupUsers(state)
  });
  
export default connect(mapStateToProps)(Autocomplete);
