import React, {useState, useEffect} from 'react';
import AutocompleteV2 from 'apollo-react/components/AutocompleteV2';
import { connect } from 'react-redux';
import { getLookupUsers } from '../../../../redux/selectors';

function extractEmails (str){
    let result =  String(str).match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
    return result && result.length ? result[0] : '' 
}

const Autocomplete = (props) => {
    const [value, setValue] = useState([]);
    const text = String(props?.text).trimStart().trimEnd();

    const handleChange = (event, newValue) => {
        setValue(newValue);
        const proposaluser = newValue.map(v=>{
            return v.email ? v.label+"("+v.email+")" : v.label+"("+extractEmails(v.label)+")"
        })
        if(proposaluser.length == 0)
            props.onChange(" ",text);
        else
            props.onChange(proposaluser.join(","),text);
    };
    const UserNameByEmail = {};
    const proposalusers = props?.users?.map(v=>{
        UserNameByEmail[v.email] = v.name.split(",").join(" ");
        return { label: v.name.split(",").join(" "), email: v.email}
    });
    useEffect(() => {
        if(Boolean(text.length)){
            let Val = text.split(",").map(v=>{
                let email = extractEmails(v) || v;
                return { label: UserNameByEmail[email] || email, email: email }
            });
            setValue(Val);
        }
    }, [text]);

    return (
        <div style={{ maxWidth: 500 }}>
            <AutocompleteV2
                fullWidth
                multiple
                source={proposalusers || []}
                value={value}
                chipColor="white"
                size="small"
                limitChips={5}
                matchFrom="any"
                onChange={handleChange}
                noOptionsText="No matches found"
                onFocus={e => {
                    props.onFocus();
                }}
                onBlur={e => {
                    props.onBlur();
                }}
            />
        </div>
    )
}
const mapStateToProps = state => ({
    users: getLookupUsers(state)
  });
  
export default connect(mapStateToProps)(Autocomplete);
