import React, { useRef, useEffect, useState, createRef } from 'react';
import { connect } from 'react-redux';
import Bell from 'apollo-react-icons/Bell';
import './Notification/style.css';
import StatusDotSolid from 'apollo-react-icons/StatusDotSolid';
import Email from 'apollo-react-icons/Email';
import Cog from 'apollo-react-icons/Cog';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import classnames from 'classnames';
import EmailRead from 'apollo-react-icons/EmailRead';
import Tooltip from 'apollo-react/components/Tooltip';
import { tempDummyData } from '../../../api/notification';
import MatomoHOC from '../../HOC/MatomoHOC';
import { getUnreadNotifications } from '../../../redux/selectors';
import * as notificationActions from '../../../redux/actions/notification-actions';

type State = { toggleNotification: boolean };

class Notification extends React.Component<{}, State> {
  wrapperRef: { current: any | HTMLDivElement };

  constructor(props) {
    super(props);
    this.my_refs = {};
    this.focusByID.bind(this);
    this.wrapperRef = createRef();
    this.state = {
      toggleNotification: false,
      notificationOptions: false,
      switchenvelope: false,
      hoverEnvelope: false
    };
  }

  componentDidMount() {
    this.props.setNotifications();
    // this.setState({ unreadNotifications: this.props.unreadNotifications });
  }

  componentDidUpdate(previousProps) {
    // if (previousProps.unreadNotifications !== this.props.unreadNotifications) {
    // this.setState({ unreadNotifications: this.props.unreadNotifications });
    // }
  }

  toggleNotification = () => {
    const { toggleNotification } = this.state;
    this.setState({ toggleNotification: !toggleNotification });
    this.focusByID('notificationBar');
    // console.log(tempDummyData);
  };

  notificationOptions = () => {
    const { notificationOptions } = this.state;
    this.setState({ notificationOptions: !notificationOptions });
    this.focusByID('notificationOptions');
    // console.log(this.state, 'opened');
  };

  handleOutsideClick = () => {
    this.setState({ toggleNotification: false });
    // console.log(this.state, 'state');
  };

  handleClickAwayEvent = () => {
    setOpen(false);
  };

  switchenvelope = () => {
    this.setState({ switchenvelope: true });
    // console.log(this.state);
  };

  hoverEnvelope = () => {
    this.setState({ hoverEnvelope: true });
  };

  closeNotificationOptions = () => {
    this.setState({ notificationOptions: false });
    // console.log(this.state, 'state');
  };

  clearAllMessage = () => {
    this.props.onClearAll && this.props.onClearAll();
  };

  generateDate = timeStamp => {
    const d = new Date(timeStamp * 1000);
    const n = d.getDate();
    const m = d.getMonth();
    const monthNames = [
      'JAN',
      'FEB',
      'MAR',
      'APR',
      'MAY',
      'JUN',
      'JUL',
      'AUG',
      'SEP',
      'OCT',
      'NOV',
      'DEC'
    ];
    return { date: `${n} ${monthNames[m]}`, time: timeStamp };
  };

  focusByID(id) {
    let myRef = this.my_refs[id];
    if (myRef) {
      console.log('focusing on ', id, myRef);
      myRef.focus();
    }
  }

  render() {
    const { toggleNotification, switchenvelope } = this.state;
    const { unreadNotifications } = this.props;
    console.log({ unreadNotifications });
    let totalCount = 0;
    const current = new Date();
    const systemdate = `${current.getFullYear()}/${current.getMonth() +
      1}/${current.getDate()}`;
    // console.log(systemdate);
    const loggedinuser = 'ashiq_sultan@iqvia.com';
    let newconst = [];
    let count = -1;
    unreadNotifications.map(item => {
      if (true) {
        count += 1;
        newconst[count] = {
          data: item.data,
          oppnum: item.opportunity_no,
          url: item.action_url,
          date: item.created_at,
          prefid: item.preference_id,
          id: item.id,
          time: item.time
        };
      }
      return newconst;
    });
    totalCount += newconst.length;
    return (
      <div className='toolbar-account-notification'>
        <div
          className={classnames(
            'notification',
            toggleNotification && 'expanded'
          )}
          style={{ position: 'relative', cursor: 'pointer' }}
          onClick={() => this.toggleNotification()}
        >
          <div className='iconSection'>
            <div ref={this.wrapperRef} className='toolbar-account-wrapper'>
              <div className='toolbar-account-info' style={{ flex: '0' }}>
                <span className='iconBadge'>{totalCount}</span>
                <Bell style={{ color: 'white', cursor: 'pointer' }} />
              </div>
            </div>
          </div>
        </div>
        {this.state.toggleNotification && (
          <ClickAwayListener onClickAway={() => this.handleOutsideClick()}>
            <div
              style={{
                position: 'absolute',
                width: '410px',
                border: '0.5px solid #8080803d',
                minHeight: '100px',
                overflowY: 'auto',
                top: '57px'
              }}
              tabIndex={-1}
              id='notificationBar'
              className='notificationBar'
            >
              <div style={{ display: 'flex' }}>
                <p
                  style={{
                    fontSize: '14px',
                    textAlign: 'left',
                    width: '93%',
                    padding: '14px'
                  }}
                >
                  <b>Notifications</b>
                </p>
                <Cog
                  style={{
                    color: 'gray',
                    marginLeft: 'auto',
                    alignSelf: 'center',
                    height: '15px',
                    cursor: 'pointer'
                  }}
                  onClick={() => this.notificationOptions()}
                />
                {this.state.notificationOptions && (
                  <ClickAwayListener
                    onClickAway={() => this.closeNotificationOptions()}
                  >
                    <div
                      tabIndex={-1}
                      style={{
                        position: 'absolute',
                        width: '150px',
                        border: '0.5px solid #8080803d',
                        minHeight: '100px',
                        overflowY: 'auto',
                        backgroundColor: 'white',
                        right: '0px'
                      }}
                      id='notificationOptions'
                      className='notification-settings'
                    >
                      <div style={{ display: 'grid', paddingTop: '10px' }}>
                        <div
                          className='notificationsettingtext'
                          style={{ height: '30px', cursor: 'pointer' }}
                        >
                          <p
                            style={{
                              fontSize: '14px',
                              textAlign: 'left',
                              width: '93%',
                              paddingLeft: '20px',
                              position: 'relative',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              role: 'button',
                              type: 'button'
                            }}
                          >
                            View all
                          </p>
                        </div>
                        <div
                          className='notificationsettingtext'
                          style={{ height: '30px', cursor: 'pointer' }}
                        >
                          <p
                            style={{
                              textAlign: 'left',
                              margin: 0,
                              fontSize: '14px',
                              paddingLeft: '20px',
                              position: 'relative',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              role: 'button',
                              type: 'button'
                            }}
                          >
                            Mark all as read
                          </p>
                        </div>
                      </div>
                    </div>
                  </ClickAwayListener>
                )}
              </div>
              {newconst.map((i, k) => {
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
                              onClick={() =>
                                (window.location.href = `${i.url}`)
                              }
                              className='oppnum'
                            >
                              {totalCount > 0 ? `${i.oppnum}` : null}
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
                            {i.date === systemdate ? `${i.time}` : `${i.date}`}
                          </span>
                          <div className='notificcontent'>{i.data}</div>
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
                              key={i.id}
                              onClick={() => this.switchenvelope()}
                            />
                          </Tooltip>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div>
                <p
                  className='viewallnotific'
                  style={{
                    textAlign: 'center',
                    margin: 0,
                    color: '#2b7efd',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  View All Notifications
                </p>
              </div>
            </div>
          </ClickAwayListener>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: Map) => ({
  unreadNotifications: getUnreadNotifications(state)
});

const mapDispatchToProps = {
  setNotifications: notificationActions.setNotification
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatomoHOC(Notification));
