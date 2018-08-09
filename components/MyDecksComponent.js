import React from 'react';
import PropTypes from 'prop-types';
import { filter } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as Actions from '../actions';
import DeckListComponent from './DeckListComponent';
import { getAllDecks, getMyDecksState, getDeckToCampaignMap } from '../reducers';

class MyDecksComponent extends React.Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    deckClicked: PropTypes.func.isRequired,
    onlyDeckIds: PropTypes.array,
    filterDeckIds: PropTypes.array,
    filterInvestigators: PropTypes.array,
    refreshMyDecks: PropTypes.func.isRequired,
    decks: PropTypes.object,
    deckToCampaign: PropTypes.object,
    myDecks: PropTypes.array,
    myDecksUpdated: PropTypes.instanceOf(Date),
    refreshing: PropTypes.bool,
    error: PropTypes.string,
    customHeader: PropTypes.node,
  };

  constructor(props) {
    super(props);

    this._onRefresh = this.onRefresh.bind(this);
  }

  onRefresh() {
    const {
      refreshing,
      refreshMyDecks,
    } = this.props;

    if (!refreshing) {
      refreshMyDecks();
    }
  }

  componentDidMount() {
    const {
      myDecksUpdated,
      myDecks,
    } = this.props;

    const now = new Date();
    if (!myDecks ||
      myDecks.length === 0 ||
      !myDecksUpdated ||
      (myDecksUpdated.getTime() / 1000 + 600) < (now.getTime() / 1000)
    ) {
      this.onRefresh();
    }
  }

  render() {
    const {
      navigator,
      deckClicked,
      filterDeckIds = [],
      filterInvestigators = [],
      myDecks,
      decks,
      refreshing,
      error,
      customHeader,
      onlyDeckIds,
      deckToCampaign,
    } = this.props;

    const filterDeckIdsSet = new Set(filterDeckIds);
    const filterInvestigatorsSet = new Set(filterInvestigators);
    const deckIds = filter(onlyDeckIds || myDecks, deckId => {
      const deck = decks[deckId];
      return !filterDeckIdsSet.has(deckId) && (
        !deck || !filterInvestigatorsSet.has(deck.investigator_code)
      );
    });
    return (
      <DeckListComponent
        navigator={navigator}
        customHeader={customHeader}
        deckIds={deckIds}
        deckClicked={deckClicked}
        deckToCampaign={deckToCampaign}
        onRefresh={this._onRefresh}
        refreshing={refreshing}
        error={error}
        isEmpty={myDecks.length === 0}
      />
    );
  }
}

function mapStateToProps(state) {
  return Object.assign({},
    {
      decks: getAllDecks(state),
      deckToCampaign: getDeckToCampaignMap(state),
    },
    getMyDecksState(state),
  );
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MyDecksComponent);
