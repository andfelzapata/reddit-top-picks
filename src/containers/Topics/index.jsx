import React, { Component, Fragment } from 'react'
import Spinner from 'react-spinkit'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as selectors from 'store/topics/selectors'
import { fetchTopics, selectTopic, finalizeTopicSelection } from 'store/actions'
import ListView from 'components/ListView'
import ListRow from 'components/ListRow'
import './TopicsScreen.css'

class TopicsScreen extends Component {
  componentDidMount() {
    this.props.fetchTopics()
  }

  onRowClick = (rowId) => {
    this.props.selectTopic(rowId)
  }

  onNextScreenClick = () => {
    this.props.finalizeTopicSelection();
  }

  renderRow = (rowId, row) => {
    const selected = this.props.selectedIdsMap[rowId];
    return (
      <ListRow
        rowId={rowId}
        onClick={this.onRowClick}
        selected={selected}
      >
        <h3>{row.title}</h3>
        <p>{row.description}</p>
      </ListRow>
    )
  }

  render() {
    const {
      rowsById,
      rowsIdArray,
      selectedIdsMap,
      canFinalizeSelection,
    } = this.props;

    return (
      <div className="TopicsScreen">
        {
          rowsIdArray.length === 0 &&
          <Spinner name="circle" className="Topics__Spinner" />
        }
        {
          rowsIdArray.length > 0 &&
          <Fragment>
            <ListView
              rowsById={rowsById}
              rowsIdArray={rowsIdArray}
              renderRow={this.renderRow}
              onClick={this.onRowClick}
              selectedIdsMap={selectedIdsMap}
            />
            {
              !canFinalizeSelection ? null :
              <button className="NextScreen" onClick={this.onNextScreenClick} />

            }
          </Fragment>
        }
      </div>
    )
  }
}

TopicsScreen.propTypes = {
  fetchTopics: PropTypes.func.isRequired,
  selectTopic: PropTypes.func.isRequired,
  rowsById: PropTypes.shape({}).isRequired,
  selectedIdsMap: PropTypes.shape({}).isRequired,
  canFinalizeSelection: PropTypes.bool.isRequired,
  finalizeTopicSelection: PropTypes.func.isRequired,
  rowsIdArray: PropTypes.arrayOf(PropTypes.string).isRequired,
}

const mapSateToProps = state => ({
  rowsById: selectors.getTopicsByUrl(state),
  rowsIdArray: selectors.getTopicsUrlArray(state),
  selectedIdsMap: selectors.getSelectedTopicUrlsMap(state),
  canFinalizeSelection: selectors.isTopicSelectionValid(state),
})

const mapDispatchToProps = {
  fetchTopics,
  selectTopic,
  finalizeTopicSelection,
}

export default connect(mapSateToProps, mapDispatchToProps)(TopicsScreen)
