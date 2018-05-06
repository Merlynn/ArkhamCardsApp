import React from 'react';
import PropTypes from 'prop-types';
import { keys, map } from 'lodash';
import {
  ScrollView,
} from 'react-native';

import { CHAOS_BAG_TOKEN_COUNTS } from '../../constants';
import ChaosTokenRow from './ChaosTokenRow';

export default class EditChaosBagDialog extends React.Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    chaosBag: PropTypes.object.isRequired,
    updateChaosBag: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      chaosBag: Object.assign({}, props.chaosBag),
    };

    props.navigator.setButtons({
      rightButtons: [
        {
          title: 'Done',
          id: 'save',
          showAsAction: 'ifRoom',
        },
      ],
    });
    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    this._onCountChange = this.onCountChange.bind(this);
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'save') {
        this.props.updateChaosBag(this.state.chaosBag);
        this.props.navigator.pop();
      }
    }
  }

  onCountChange(id, count) {
    this.setState({
      chaosBag: Object.assign({}, this.state.chaosBag, { [id]: count }),
    });
  }

  render() {
    const {
      chaosBag,
    } = this.state;
    return (
      <ScrollView>
        { map(keys(CHAOS_BAG_TOKEN_COUNTS), id => (
          <ChaosTokenRow
            key={id}
            id={id}
            originalCount={this.props.chaosBag[id] || 0}
            count={chaosBag[id] || 0}
            limit={CHAOS_BAG_TOKEN_COUNTS[id]}
            onCountChange={this._onCountChange}
          />
        )) }
      </ScrollView>
    );
  }
}
