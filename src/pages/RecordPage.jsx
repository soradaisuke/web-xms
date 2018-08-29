import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import Page from './Page';

export default class RecordPage extends React.PureComponent {
  static displayName = 'RecordPage';

  static propTypes = {
    fetch: PropTypes.func.isRequired,
    recordId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    children: PropTypes.node,
  };

  static defaultProps = {
    children: null,
  };

  state = {
    isError: false,
    isLoading: true,
  }

  componentDidMount() {
    this.fetch();
  }

  componentDidUpdate(prevProps) {
    const { recordId } = this.props;
    if (prevProps.recordId !== recordId) {
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

  render() {
    const { isLoading, isError } = this.state;
    const { children } = this.props;

    return (
      <Page isLoading={isLoading} isError={isError}>
        <Form horizontal="true" onSubmit={this.okHandler}>
          { children }
        </Form>
      </Page>
    );
  }
}
