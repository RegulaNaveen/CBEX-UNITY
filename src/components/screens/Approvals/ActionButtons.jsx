import React from 'react';
import Trash from 'apollo-react-icons/Trash';
import Email from 'apollo-react-icons/Email';
import Button from 'apollo-react/components/Button';


const ActionButtons = () => {
  return <div style={{float:'right'}}>
    <Button variant="text" size="small" icon={<Trash fontSize="extraSmall" />} style={{ marginRight: 10 }}>Delete</Button>
    <Button variant="secondary" size="small" style={{ marginRight: 10 }}>Duplicate</Button>
    <Button variant="primary" size="small" icon={<Email fontSize="extraSmall" />} style={{ marginRight: 10 }}>Email</Button>
  </div> ;
};


export default ActionButtons;
