import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Checkbox, Button } from 'antd';
import { map } from 'lodash';
import Immutable from 'immutable';
import ActivatorModal from './ActivatorModal';
import Column from '../schema/Column';

class CustomizeColumnsModal extends React.PureComponent {
  static displayName = 'CustomizeColumnsModal';

  static propTypes = {
    children: PropTypes.node.isRequired,
    selectedCustomizeMap: PropTypes.instanceOf(Immutable.Map).isRequired,
    onChangeSelectedCustomizeMap: PropTypes.func.isRequired,
    defaultSelectedCustomizeMap: PropTypes.instanceOf(Immutable.Map).isRequired,
    columns: PropTypes.arrayOf(PropTypes.instanceOf(Column)).isRequired,
    title: PropTypes.string
  };

  static defaultProps = {
    title: '自定义列'
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedCustomizeMap: props.selectedCustomizeMap
    };
  }

  onOk = () => {
    const { onChangeSelectedCustomizeMap } = this.props;
    const { selectedCustomizeMap } = this.state;
    onChangeSelectedCustomizeMap(selectedCustomizeMap);
  };

  onVisibleChange = visibility => {
    const { selectedCustomizeMap } = this.props;
    if (visibility) {
      this.setState({
        selectedCustomizeMap
      });
    }
  };

  onChange = selected => {
    this.setState({
      selectedCustomizeMap: selected
    });
  };

  resetSelectedColumns = () => {
    const { defaultSelectedCustomizeMap } = this.props;
    this.onChange(defaultSelectedCustomizeMap);
  };

  renderCheckbox = () => {
    const { selectedCustomizeMap } = this.state;
    const { columns } = this.props;
    return (
      <Row style={{ marginBottom: 10 }}>
        {map(columns, column => (
          <Col span={6} key={column.getKey()}>
            <Checkbox
              checked={selectedCustomizeMap.get(column.getKey())}
              onChange={({ target: { checked } }) =>
                this.onChange(
                  selectedCustomizeMap.set(column.getKey(), checked)
                )
              }
            >
              {column.getTitle()}
            </Checkbox>
          </Col>
        ))}
      </Row>
    );
  };

  render() {
    const { children, title } = this.props;

    return (
      <ActivatorModal
        {...this.props}
        activator={children}
        title={title}
        onOk={this.onOk}
        onVisibleChange={this.onVisibleChange}
      >
        {this.renderCheckbox()}
        <Row>
          <Button type="primary" onClick={this.resetSelectedColumns}>
            重置
          </Button>
        </Row>
      </ActivatorModal>
    );
  }
}

export default CustomizeColumnsModal;
