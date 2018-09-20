import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import formatImageUrl from '../utils/formatImageUrl';
import classNames from 'classnames';
import './Img.less';

export default class Img extends React.PureComponent {
  static displayName = 'Img';

  static propTypes = {
    src: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
    children: PropTypes.node,
    format: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
    lazyLoad: PropTypes.bool,
    useImg: PropTypes.bool,
    className: PropTypes.string,
  };

  static defaultProps = {
    children: null,
    format: '',
    lazyLoad: true,
    useImg: false,
    className: '',
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const src = formatImageUrl(nextProps.format, nextProps.src);

    return src !== prevState.src ? { src, loaded: false } : null;
  }

  state = {
    loaded: false,
    src: '',
  }

  onLoaded = () => {
    this.setState({ loaded: true });
  }

  render() {
    const { src, loaded } = this.state;
    const { children, useImg, lazyLoad, className } = this.props;

    if (useImg) {
      return (
        <img
          src={src}
          className={classNames("record-image", className)}
          alt=""
        />
      );
    }

    let imgNode;
    const style = {};

    if (loaded || !lazyLoad) {
      style.backgroundImage = `url("${src}")`;
    } else if (lazyLoad) {
      imgNode = (
        <LazyLoad once overflow offset={100} height={1}>
          <img
            src={src}
            className="record-image"
            alt=""
            style={{ display: 'none' }}
            onLoad={this.onLoaded}
          />
        </LazyLoad>
      );
    }

    return (
      <div
        key={src}
        style={style}
        className={className}
      >
        { imgNode }
        { children }
      </div>
    );
  }
}
