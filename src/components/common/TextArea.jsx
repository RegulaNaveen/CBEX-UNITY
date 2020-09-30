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

type ReactRefT = { current: any };

class TextArea extends PureComponent<Props, State> {
  textAreaInput: ReactRefT;

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

    this.textAreaInput = React.createRef();

    this.state = {
      textValue: ''
    };
  }

  componentDidMount() {
    const { value } = this.props;
    if (!_.isEmpty(value)) this.setState({ textValue: value });
  }

  componentDidUpdate() {
    const { textValue: value } = this.state;

    if (
      this.textAreaInput.current !== null &&
      this.textAreaInput.current.id !== 'question-text-area'
    ) {
      if (value.length < 120) this.textAreaInput.current.style.height = `40px`;
      else {
        this.textAreaInput.current.style.height = '5px';
        this.textAreaInput.current.style.height = `${this.textAreaInput.current.scrollHeight}px`;
      }
    }
  }

  handleText = ({ target }: SyntheticInputEvent<EventTarget>) => {
    const { onChange } = this.props;
    const { value: textValue } = target;

    if (onChange && textValue) onChange(textValue);

    this.setState({ textValue });
  };

  handleOnBlur = ({ target }: SyntheticInputEvent<EventTarget>) => {
    const { onBlur, value: lastAnswer } = this.props;
    const { value: textValue } = target;

    if (onBlur) onBlur(textValue, lastAnswer);
  };

  autoResize = (event: SyntheticInputEvent<EventTarget>) => {
    /* eslint-disable no-param-reassign */
    if (event.target.id !== 'question-text-area') {
      if (event.target.scrollHeight >= 75) event.target.style.overflow = 'auto';
      else event.target.style.overflow = 'hidden';
    }
    /* eslint-enable no-param-reassign */
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
            ref={this.textAreaInput}
            className={classnames('text-area-wrapper', className)}
            value={textValue}
            onInput={this.autoResize}
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
