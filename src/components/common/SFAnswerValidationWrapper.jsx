import React, { Component } from 'react';

export class SFAnswerValidationWrapper extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {hasDifferentSFanswer} = this.props;
        return(
            <div className={`wrap-with-validation ${hasDifferentSFanswer? 'hasDifferentSFanswer' : ''}`}>
                {this.props.children}
                {hasDifferentSFanswer  &&
                 <div className="alert-sf-diff">
                    <ul>
                        <li>Does not match Salesforce value</li>
                        <li>Click here to open on SF</li>
                    </ul>
                </div>
                }
            </div>

        )
    }
}