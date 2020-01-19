import React, { Component } from 'react';
import { connect } from 'react-redux';
import WebApiPanel from 'components/molecules/SectionInputs/WebApiPanel';
import NewItemButton from 'components/atoms/Buttons/newItemButton';
import store from 'store';
import { setNewCurrentCVData } from 'functions';
import { addNewItemToCurrentCv } from 'actions';

class WebApi extends Component {
  componentDidUpdate(prevProps) {
    const { language } = prevProps;
    if (language === this.props.language) {
      const { cvId, currentCv } = this.props;
      const token = sessionStorage.getItem('userID');
      store.dispatch(setNewCurrentCVData('update', token, cvId, currentCv));
    }
  }

  handleNewItem = () => {
    const { current } = this.props;
    const { currentView } = current;

    store.dispatch(
      addNewItemToCurrentCv(currentView, {
        name: '',
        technology: '',
        link: '',
        endYear: 2000,
        description: '',
        inProgress: false,
      }),
    );
  };

  render() {
    const { cvId, currentCv, current, language } = this.props;
    const { webApi } = currentCv;
    const { currentView } = current;
    return (
      <>
        {webApi.length ? (
          webApi.map((item, idx) => {
            const { id } = item;
            return (
              <WebApiPanel
                key={id}
                index={idx}
                item={item}
                cvId={cvId}
                current={currentView}
                newItem={this.handleNewItem}
                language={language}
              />
            );
          })
        ) : (
          <NewItemButton view={currentView} handleClick={this.handleNewItem} />
        )}
      </>
    );
  }
}
const mapStateToProps = ({ currentCv, editComponentView }) => ({
  currentCv,
  cvId: currentCv.currentItem.id,
  current: editComponentView,
});
export default connect(mapStateToProps)(WebApi);