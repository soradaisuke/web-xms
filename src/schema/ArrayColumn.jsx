import React from 'react';
import { map } from 'lodash';

import Column from './Column';

export default class ArrayColumn extends Column {
  constructor(column, config) {
    super(config);

    this.column = column;
  }

  renderInTableValueDefault({ value }) {
    return (
      <React.Fragment>
        {map(value, v => (
          <React.Fragment key={v}>
            {this.column.renderInTable({ value: v })}
            <br />
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  }
}
