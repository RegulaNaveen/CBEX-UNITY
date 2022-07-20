import React from 'react';
import StatusDotSolid from 'apollo-react-icons/StatusDotSolid';
import EmailRead from 'apollo-react-icons/EmailRead';
import Tooltip from 'apollo-react/components/Tooltip';
import './style.css';

const ListItem = ({ url, oppnum, data, id }) => {
  console.log({ url, oppnum, data, id });
  return (
    <div>
      <p
        style={{
          fontSize: '10px',
          margin: '5px 0',
          textAlign: 'left',
          color: '#747474',
          display: 'initial'
        }}
      >
        <span
          style={{
            display: 'inline-block',
            width: '50%',
            textAlign: 'right'
          }}
        />
      </p>
      <div
        style={{
          background: '#fff',
          padding: '5px'
        }}
        className='lineItmes'
      >
        {' '}
        <div className='notificitems' style={{ display: 'flex' }}>
          <StatusDotSolid
            style={{
              color: 'red',
              height: '15px'
            }}
          />
          <div>
            <div>
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#2b7efd'
                }}
                onClick={() => (window.location.href = `${url}`)}
                className='oppnum'
              ></span>
            </div>
            <span
              style={{
                display: 'grid',
                fontSize: '10px',
                fontWeight: 700,
                color: '#747474',
                paddingTop: '5px',
                paddingBottom: '5px'
              }}
            ></span>
            <div className='notificcontent'>{data}</div>
          </div>
          {true ? (
            <EmailRead
              style={{
                color: 'gray',
                height: '15px',
                marginLeft: 'auto'
              }}
            />
          ) : (
            <Tooltip
              variant='light'
              title='Mark as read'
              placement='top'
              style={{ marginRight: 48 }}
            >
              <Email
                style={{
                  color: 'gray',
                  height: '15px',
                  marginLeft: 'auto',
                  cursor: 'pointer'
                }}
                key={id}
                onClick={() => this.switchenvelope()}
              />
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListItem;
