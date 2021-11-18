// @flow
import React, { PureComponent } from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import removeSpecialChars from '../../../../utils/pasteUtils';

type Props = {
  id?: string,
  className: string,
  placeholder: string,
  title?: string,
  type?: string,
  value?: string,
  onBlur?: Function,
  onChange?: Function,
  error?: mixed
};

type State = {
  textValue: string,
  numberError: boolean
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
    onChange: undefined,
    error: undefined
  };

  constructor(props: Object) {
    super(props);

    this.textAreaInput = React.createRef();

    this.state = {
      textValue: '',
      numberError: false
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

  handleNumber = ({ target }: SyntheticInputEvent<EventTarget>) => {
    const numberRegex = /^(-?\d+\.\d+)$|^(-?\d+)$/;
    const { onChange } = this.props;
    const { value: textValue } = target;
    const numberError =
      (textValue && !numberRegex.test(textValue)) ||
      Number(textValue) < 0 ||
      String(textValue).match(/-/g);
    if (onChange && !numberError) onChange(textValue);

    this.setState({ textValue, numberError: !!numberError });
  };

  handleOnBlur = ({ target }: SyntheticInputEvent<EventTarget>) => {
    const { onBlur, value: lastAnswer } = this.props;
    const { numberError } = this.state;
    const { value: textValue } = target;

    if (onBlur && !numberError) onBlur(textValue, lastAnswer);
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
    const { id, className, placeholder, title, type, error } = this.props;
    const { textValue, numberError } = this.state;
    return (
      <>
        {title && <p className="text-area-title">{title}</p>}
        {type === 'number' ? (
          <>
            <input
              id={id}
              className={classnames('text-number-wrapper', className, {
                numberError
              })}
              value={textValue}
              onChange={e => {
                this.handleNumber(e);
              }}
              onBlur={this.handleOnBlur}
              placeholder={placeholder}
            />
            {numberError && (
              <p className="number-error-text">Please enter a valid number</p>
            )}
          </>
        ) : (
          <>
            <textarea
              id={id}
              style={{
                border: error && error.length > 0 ? '2px solid #e20000' : null
              }}
              ref={this.textAreaInput}
              className={classnames('text-area-wrapper', className)}
              value={textValue}
              onPaste={e => { 
                const sanitizedValue = removeSpecialChars(e)
                if (this.props.onChange) {
                  this.setState({ textValue: sanitizedValue });
                  this.props.onChange(sanitizedValue);
                }
              }}
              onInput={this.autoResize}
              onChange={e => {
                this.handleText(e);
                if (this.props.onChange) {
                  this.props.onChange(e.target.value);
                }
              }}
              onBlur={this.handleOnBlur}
              placeholder={placeholder}
              required
              type={type}
            />
            {error &&
              error.length > 0 &&
              error.map(v => {
                if (v.questiontext)
                  return (
                    <p
                      key={String(v.questiontext?.message)}
                      className="number-error-text"
                    >
                      {v.questiontext?.message}
                    </p>
                  );
              })}
          </>
        )}
      </>
    );
  }
}

export default TextArea;
