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
            if (prevState.watching !== this.state.watching) {
                const {timeoutID, watching} = this.state;
                if (watching) {
                    console.log("Start watching for IDLE status");
                    const newTimeoutID = this.addWatcher();
                    this.setState({
                        timeoutID: newTimeoutID
                    });
                } else {
                    if (timeoutID) {
                        console.log("Stop watching for IDLE status");
                        clearTimeout(timeoutID);
                        this.setState({
                            timeoutID: null,
                            forceBlur: false
                        });
                    }
                }
            }
        }

        addWatcher() {
            const { questionId } = this.props;
            return setTimeout(() => {
                this.setState({ forceBlur: true });
            }, QUESTION_UNLOCK_TIMEOUT);
        }

        handleToggleWatch(watchStatus) {
            this.setState({ watching: watchStatus });
        };

        handleChange() {
            const { timeoutID } = this.state;
            if (timeoutID) {
                clearTimeout(timeoutID);
                const newTimeoutID = this.addWatcher();
                this.setState({ timeoutID: newTimeoutID }); 
            }
        }

        render() {
            return (
                <Component
                    toggleWatch={this.handleToggleWatch}
                    onCascadeChange={this.handleChange}
                    forceBlur={this.state.forceBlur}
                    {...this.props}
                />
            )
        }
    }

    return WithIdleStateDetection;

}