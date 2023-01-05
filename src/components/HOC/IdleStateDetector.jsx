import React from 'react';
import { QUESTION_UNLOCK_TIMEOUT } from '../../constants/app';
import { SocketContext } from '../../context/SocketContext';

export default function withIdleStateDetection(Component) {
  class WithIdleStateDetection extends React.Component {
    static contextType = SocketContext;

    constructor(props) {
      super(props);
      this.state = {
        watching: false,
        timeoutID: null,
        forceBlur: false
      };
      this.addWatcher = this.addWatcher.bind(this);
      this.handleToggleWatch = this.handleToggleWatch.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
      const { timeoutID, watching } = this.state;
      if (prevState.watching !== watching) {
        if (watching) {
          const newTimeoutID = this.addWatcher();
          this.setState({
            timeoutID: newTimeoutID
          });
        } else if (timeoutID) {
          clearTimeout(timeoutID);
          this.setState({
            timeoutID: null,
            forceBlur: false
          });
        }
      }
    }

    handleToggleWatch(watchStatus) {
      this.setState({ watching: watchStatus });
    }

    handleChange() {
      const { timeoutID } = this.state;
      if (timeoutID) {
        clearTimeout(timeoutID);
        const newTimeoutID = this.addWatcher();
        this.setState({ timeoutID: newTimeoutID });
      }
    }

    addWatcher() {
      return setTimeout(() => {
        this.setState({ forceBlur: true });
      }, QUESTION_UNLOCK_TIMEOUT);
    }

    render() {
      const { forceBlur } = this.state;
      return (
        <Component
          toggleWatch={this.handleToggleWatch}
          onCascadeChange={this.handleChange}
          forceBlur={forceBlur}
          {...this.props}
        />
      );
    }
  }

  return WithIdleStateDetection;
}
