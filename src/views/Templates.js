import React, { Component } from 'react';
import NavBar from 'components/organisms/Navigation/NavBar';
import Footer from 'components/organisms/Footer/Footer';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import TemplateItem from 'components/molecules/Template';
import { changeTemplate } from 'actions';
import { setNewCurrentCVData } from 'functions';
import ColorButton from 'components/atoms/Buttons/TemplateColorButton';
import ConfirmSidePanel from 'components/atoms/ConfirmSidePanel/ConfirmSidePanel';
import { cvColors } from 'data';
import store from 'store';
import path from '../path';

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  min-height: calc(100vh - 50px);
  padding: 90px 50px 0;
  color: black;

  .colorPicker {
    display: flex;
    width: 200px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 100px;
    justify-content: space-between;

    @media ${({ theme }) => theme.media.small} {
      position: fixed;
      left: 10px;
      flex-direction: column;
      top: 50%;
      transform: translateY(-50%);
    }
    @media ${({ theme }) => theme.media.medium} {
      position: fixed;
      left: 10px;
      flex-direction: column;
      top: 50%;
      height: 200px;
      width: 35px;
      transform: translateY(-50%);
    }
    @media ${({ theme }) => theme.media.tablet} {
      bottom: 200px;
    }
  }

  @media ${({ theme }) => theme.media.small} {
    padding: 20px;
    flex-direction: column;
    align-items: center;
  }
  @media ${({ theme }) => theme.media.medium} {
    padding: 10px;
    flex-direction: column;
    align-items: center;
  }
  @media ${({ theme }) => theme.media.tablet} {
    padding: 10px;
    flex-direction: row;
    align-items: center;
  }

  @media ${({ theme }) => theme.media.desktop} {
    padding: 0;
    padding-bottom: 100px;
    flex-direction: row;
    align-items: center;
  }
  @media ${({ theme }) => theme.media.bigDesktop} {
    padding: 0;
    padding-bottom: 100px;
    align-items: center;
  }
`;

class Template extends Component {
  componentDidUpdate(prevProps) {
    const { isSet, currentCv } = this.props;
    if (isSet !== undefined) {
      if (prevProps.isSet.template === isSet.template && prevProps.isSet.color === isSet.color)
        return;

      const token =
        localStorage.getItem('userID') !== null
          ? localStorage.getItem('userID')
          : sessionStorage.getItem('userID');
      store.dispatch(setNewCurrentCVData('update', token, isSet.id, currentCv));
    }
  }

  handleChangeTemplate = e => {
    const { id } = e.target;
    store.dispatch(changeTemplate(id));
  };

  render() {
    const { currentCv } = this.props;

    if (!Object.entries(currentCv).length) {
      return <Redirect to={path.login} />;
    }
    const { isVisible, error, language } = this.props.appState;
    const { template } = this.props.isSet;
    const { color } = this.props.isSet;
    return (
      <>
        <NavBar language={language} />
        <StyledWrapper>
          <TemplateItem
            active={parseInt(template) === 1}
            id={1}
            changeTemplate={this.handleChangeTemplate}
            language={language}
            color={color}
            ratio="1:1"
          />
          <TemplateItem
            active={parseInt(template) === 2}
            color={color}
            id={2}
            changeTemplate={this.handleChangeTemplate}
            language={language}
            ratio="1:1"
          />
          <TemplateItem
            active={parseInt(template) === 3}
            id={3}
            color={color}
            changeTemplate={this.handleChangeTemplate}
            language={language}
            ratio="3:4"
          />
          <div className={'colorPicker'}>
            {cvColors.map(({ colorValue, index }) => (
              <ColorButton key={index} color={colorValue} active={color === index} id={index} />
            ))}
          </div>
        </StyledWrapper>
        <Footer language={language} />
        <ConfirmSidePanel pose={isVisible ? 'visible' : 'hidden'} error={error} />
      </>
    );
  }
}

const MapStateToProps = ({ appState, currentCv }) => ({
  appState,
  isSet: currentCv.currentItem,
  currentCv,
});
export default connect(MapStateToProps)(Template);
