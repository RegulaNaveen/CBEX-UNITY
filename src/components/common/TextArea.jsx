// @flow
import React, { PureComponent } from 'react';
import classnames from 'classnames';

type Props = {
  id?: string,
  className: string,
  placeholder: string,
  title?: string,
  type?: string
};

type State = {
  textValue: string
};

class TextArea extends PureComponent<Props, State> {
  static defaultProps = {
    id: undefined,
    title: undefined,
    type: undefined
  };

  constructor(props: Object) {
    super(props);

    this.state = {
      textValue: ''
    };
  }

  handleText = (event: SyntheticInputEvent<EventTarget>) => {
    this.setState({ textValue: event.target.value });
  };

  handleKeyPress = (event: KeyboardEvent) => {
    const value = event.key;
    const isNumber = /[^0-9]/;
    const { textValue } = this.state;
    const { type } = this.props;
    if (type === 'number') {
      if (!value.match(isNumber)) {
        this.setState({ textValue });
      } else {
        this.setState({ textValue: '' });
      }
    }
  };

  render() {
    const { id, className, placeholder, title } = this.props;
    const { textValue } = this.state;
    return (
      <>
        {title ? <p className="text-area-title">{title}</p> : null}
        <textarea
          id={id}
          className={classnames('text-area-wrapper', className)}
          value={textValue}
          onChange={this.handleText}
          placeholder={placeholder}
          onKeyPress={this.handleKeyPress}
        />
      </>
    );
  }
}

export default TextArea;
