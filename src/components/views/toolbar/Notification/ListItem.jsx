import React from 'react';
import './style.css';

const ListItem = ({ item }) => {
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
                onClick={() => (window.location.href = `${item.url}`)}
                className='oppnum'
              >
                {totalCount > 0 ? `${item.oppnum}` : null}
              </span>
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
            >
              {item.date === systemdate ? `${item.time}` : `${item.date}`}
            </span>
            <div className='notificcontent'>{item.data}</div>
          </div>
          {switchenvelope === true ? (
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
                key={item.id}
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
