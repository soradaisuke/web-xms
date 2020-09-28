import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'dva';
import { withRouter } from 'react-router-dom';
import { size, remove, map, set, get, unset, forEach } from 'lodash';
import { Icon, Row, Card, Button, Col, Popconfirm } from 'antd';
import './DynamicItem.less';

class DynamicItem extends React.PureComponent {
  static displayName = 'DynamicItem';

  static propTypes = {
    columns: PropTypes.instanceOf(Immutable.List).isRequired,
    matchParams: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    user: PropTypes.instanceOf(Immutable.Map),
    // eslint-disable-next-line react/require-default-props
    onChange: PropTypes.func,
    // eslint-disable-next-line react/require-default-props,react/forbid-prop-types
    value: PropTypes.array,
    max: PropTypes.number,
    disabled: PropTypes.bool
  };

  static defaultProps = {
    max: 99,
    user: null,
    disabled: false
  };

  componentDidMount() {
    this.calculateInitialValue();
  }

  add = () => {
    const { onChange, value } = this.props;
    if (!value) {
      onChange([this.initialValue]);
    } else {
      onChange(value.concat([this.initialValue]));
    }
  };

  remove = index => {
    const { onChange, value } = this.props;
    onChange(remove(value, (_, i) => i !== index));
  };

  onChange = ({ column, value, index }) => {
    const { onChange, value: values } = this.props;

    const newValue = { ...values[index], [column.getFormKey()]: value };
    if (column.childColumn) {
      forEach(column.childColumn, childColumn => {
        unset(newValue, childColumn.getFormKey());
      });
    }
    values[index] = newValue;

    onChange([...values]);
  };

  calculateInitialValue() {
    const { columns } = this.props;
    const initialValue = {};
    if (columns) {
      columns.forEach(column => {
        set(
          initialValue,
          column.getFormKey(),
          column.generateFormInitialValue()
        );
      });
    }
    this.initialValue = initialValue;
  }

  renderFormItems({ value, index }) {
    const { columns, disabled, user, matchParams } = this.props;
    return (
      <Col>
        {columns.map(column => {
          const parentValue = column.parentColumn
            ? get(value, column.parentColumn.getFormKey())
            : null;
          const columnValue = get(value, column.getFormKey());
          const params = {
            user,
            value: columnValue,
            values: value,
            parentValue,
            matchParams,
            formComponentProps: {
              disabled:
                disabled ||
                column.isImmutableInForm({
                  user,
                  value: columnValue,
                  values: value
                }),
              [column.getFormFiledValuePropName()]: get(
                value,
                column.getFormKey()
              ),
              onChange: newValue =>
                this.onChange({
                  column,
                  index,
                  value:
                    newValue && newValue.target
                      ? newValue.target.value
                      : newValue
                })
            }
          };
          let children;
          if (column.shouldRenderCommonFormItem(parentValue)) {
            children = column.renderCommonFormItem(params);
          } else if (column.getFormRenderInFormItem) {
            children = column.getFormRenderInFormItem(params);
          }
          return (
            <Row
              key={column.getFormKey()}
              type="flex"
              align="middle"
              className="dynamic-item"
            >
              <span className="dynamic-item-title">{column.getTitle()}</span>
              <div className="dynamic-item-form-item">
                {children || column.renderInFormItem(params)}
              </div>
            </Row>
          );
        })}
      </Col>
    );
  }

  render() {
    const { value, max, disabled } = this.props;
    return (
      <Col>
        {size(value) > 0 &&
          map(value, (v, i) => (
            /* eslint-disable-next-line react/no-array-index-key */
            <Card key={i} className="dynamic-item-card">
              <Popconfirm
                title="确认删除该项?"
                placement="left"
                disabled={disabled}
                onConfirm={() => this.remove(i)}
                getPopupContainer={triggerNode => triggerNode.parentNode}
              >
                <Button
                  icon="close"
                  shape="circle"
                  className="dynamic-delete-button"
                  disabled={disabled}
                />
              </Popconfirm>
              {this.renderFormItems({ value: v, index: i })}
            </Card>
          ))}
        <Button
          type="dashed"
          className="dynamic-add-button"
          onClick={this.add}
          disabled={disabled || size(value) > max}
        >
          <Icon type="plus" />
          添加
        </Button>
      </Col>
    );
  }
}

const mapStateToProps = (_, props) => ({
  matchParams: props.match.params
});

export default withRouter(connect(mapStateToProps)(DynamicItem));
