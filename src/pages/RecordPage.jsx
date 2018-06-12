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
    if (prevProps.recordId !== this.props.recordId) {
      this.fetch();
    }
  }

  async fetch() {
    this.setState({
      isLoading: true,
    });
    try {
      await this.props.fetch({ id: this.props.recordId });
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
    return (
      <Page isLoading={this.state.isLoading} isError={this.state.isError}>
        <Form horizontal="true" onSubmit={this.okHandler}>
          { this.props.children }
        </Form>
      </Page>
    );
  }
}
