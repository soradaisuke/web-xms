import React from 'react';
import PropTypes from 'prop-types';
import Page from './Page';

export default class RecordPage extends React.PureComponent {
  static displayName = 'RecordPage';

  static propTypes = {
    fetch: PropTypes.func.isRequired,
    recordId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    routes: PropTypes.arrayOf(PropTypes.shape({
      component: PropTypes.bode,
    })),
  };

  static defaultProps = {
    component: null,
    routes: [],
  };

  constructor(props) {
    super(props);

    const { component } = props;

    this.state = {
      isError: false,
      isLoading: !component,
    };
  }

  componentDidMount() {
    const { component } = this.props;

    if (!component) {
      this.fetch();
    }
  }

  componentDidUpdate(prevProps) {
    const { recordId, component } = this.props;
    if (!component && prevProps.recordId !== recordId) {
      this.fetch();
    }
  }

  async fetch() {
    const { recordId, fetch } = this.props;

    this.setState({
      isLoading: true,
    });
    try {
      await fetch({ id: recordId });
      this.setState({
        isError: false,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        isError: true,
        isLoading: false,
      });
    }
  }

  renderRoutes() {
    const { routes } = this.props;
    if (routes && routes.length === 1) {
      const Component = routes[0].component;
      return <Component />;
    }

    return null;
  }

  render() {
    const { component: Component } = this.props;
    const { isLoading, isError } = this.state;

    return (
      <Page isLoading={isLoading} isError={isError}>
        {Component ? <Component /> : null}
        {this.renderRoutes()}
      </Page>
    );
  }
}
