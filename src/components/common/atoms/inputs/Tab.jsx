import React from 'react';
import Tab from 'apollo-react/components/Tab';
import Tabs from 'apollo-react/components/Tabs';
import Questions from '../../../screens/Proposal/Questions';
import Documents from '../../../screens/Proposal/Documents';
import Validate from '../../../screens/Proposal/Validate';

const UnityTab = ({id, enableValidateTab}) => {
    const [value, setValue] = React.useState(0);

    const handleChangeTab = (event, value) => {
        setValue(value);
    };
    const renderTab = (v)=>{
        if(v){
            return(
                <>
                    <Tabs value={value} onChange={handleChangeTab} truncate>
                        <Tab label="Questions" />
                        <Tab label="Documents" />
                        <Tab label="Validate" />
                    </Tabs>
                    <div style={{ padding: 24 }}>
                        {value === 0 &&  <Questions proposalID={id} />}
                        {value === 1 && <Documents />}
                        {value === 2 && <Validate />}
                    </div>
                </>
            )
        }else{
            return(
                <>
                    <Tabs value={value} onChange={handleChangeTab} truncate>
                        <Tab label="Questions" />
                        <Tab label="Documents" />
                    </Tabs>
                    <div style={{ padding: 24 }}>
                        {value === 0 &&  <Questions proposalID={id} />}
                        {value === 1 && <Documents />}
                    </div>
                </>
            )
        }
        
    }
    return (
        <div style={{paddingLeft: 10}}>
             {renderTab(enableValidateTab)}
        </div>
    )
}

export default UnityTab;