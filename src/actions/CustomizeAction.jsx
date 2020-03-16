import React from 'react';
import { Button } from 'antd';
import Action from './Action';
import CustomizeColumnsModal from '../components/CustomizeColumnsModal';

export default class CustomizeAction extends Action {
  constructor(config = {}) {
    super({
      ...config,
      global: true,
      multiple: false
    });
  }

  getTitle() {
    return this.config.get('title', '自定义列');
  }

  // eslint-disable-next-line class-methods-use-this
  canHandleGlobal() {
    return false;
  }

  renderInteral({
    selectedCustomizeMap,
    onChangeSelectedCustomizeMap,
    defaultSelectedCustomizeMap,
    buttonProps,
    table
  }) {
    return (
      <CustomizeColumnsModal
        {...this.getModalComponentProps()}
        selectedCustomizeMap={selectedCustomizeMap}
        onChangeSelectedCustomizeMap={onChangeSelectedCustomizeMap}
        defaultSelectedCustomizeMap={defaultSelectedCustomizeMap}
        columns={table.getCustomizeColumns()}
        key={this.getTitle()}
        title={this.getTitle()}
      >
        <Button {...buttonProps} />
      </CustomizeColumnsModal>
    );
  }
}
