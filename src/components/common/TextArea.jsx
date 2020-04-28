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

  render() {
    const { id, className, placeholder, title, type } = this.props;
    const { textValue } = this.state;
    console.log(textValue);

    return (
      <>
        {title ? <p className="text-area-title">{title}</p> : null}
        <input
          id={id}
          className={classnames('text-area-wrapper', className)}
          value={textValue}
          onChange={this.handleText}
          placeholder={placeholder}
          type={type}
        />
      </>
    );
  }
}

export default TextArea;
