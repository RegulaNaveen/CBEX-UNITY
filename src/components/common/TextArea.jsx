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
  onChange: Function,
  value?: string
};

type State = {
  textValue: string
};

class TextArea extends PureComponent<Props, State> {
  static defaultProps = {
    id: undefined,
    title: undefined,
    type: undefined,
    value: undefined
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
    onChange(event.target.value);
    this.setState({ textValue: event.target.value });
  };

  render() {
    const { id, className, placeholder, title, type } = this.props;
    const { textValue } = this.state;

    return (
      <>
        {title && <p className="text-area-title">{title}</p>}
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
