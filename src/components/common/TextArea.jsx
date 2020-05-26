// @flow
import React, { PureComponent } from 'react';
import classnames from 'classnames';
import _ from 'lodash';

type Props = {
  id?: string,
  className: string,
  placeholder: string,
  title?: string,
  type?: string,
  value?: string,
  onBlur?: Function,
  onChange?: Function
};

type State = {
  textValue: string
};

class TextArea extends PureComponent<Props, State> {
  static defaultProps = {
    id: undefined,
    title: undefined,
    type: undefined,
    value: undefined,
    onBlur: undefined,
    onChange: undefined
  };

  constructor(props: Object) {
    super(props);

    this.state = {
      textValue: ''
    };
  }

  componentDidMount() {
    const { value } = this.props;
    if (!_.isEmpty(value)) this.setState({ textValue: value });
  }

  handleText = (event: SyntheticInputEvent<EventTarget>) => {
    const { onChange } = this.props;
    const textValue = event.target.value;
    if (onChange && textValue) {
      onChange(textValue);
    }

    this.setState({ textValue: event.target.value });
  };

  handleOnBlur = (event: SyntheticInputEvent<EventTarget>) => {
    const { onBlur } = this.props;
    const textValue = event.target.value;
    if (onBlur && textValue) {
      onBlur(textValue);
    }
  };

  render() {
    const { id, className, placeholder, title, type } = this.props;
    const { textValue } = this.state;

    return (
      <>
        {title && <p className="text-area-title">{title}</p>}
        {type === 'number' ? (
          <input
            id={id}
            className={classnames('text-number-wrapper', className)}
            value={textValue}
            onChange={this.handleText}
            onBlur={this.handleOnBlur}
            placeholder={placeholder}
            type={type}
          />
        ) : (
          <textarea
            id={id}
            className={classnames('text-area-wrapper', className)}
            value={textValue}
            onChange={this.handleText}
            onBlur={this.handleOnBlur}
            placeholder={placeholder}
            type={type}
          />
        )}
      </>
    );
  }
}

export default TextArea;
