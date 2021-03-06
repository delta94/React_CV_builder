import React, { Component } from 'react';
import StyledInputSection from 'components/atoms/Inputs/StyledInputSection';
import Input from 'components/atoms/Inputs/Input';
import Select from 'components/atoms/Inputs/Select';
import store from 'store';
import InputHeader from 'components/atoms/Inputs/InputHeader';
import { updatecurrentCVFromState, removeItemfromCurrentCv } from 'actions';

// import PropTypes from 'prop-types';

class CertificatesPanel extends Component {
  state = {
    id: '',
    description: '',
    endYear: 0,
    endMonth: 0,
    statusActive: false,
  };

  componentDidMount() {
    this.mounted = true;
    const { id, description, endYear, endMonth } = this.props.item;

    this.setState({
      id,
      description,
      endYear,
      endMonth,
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleForm = e => {
    const value = parseInt(e.target.value, 10) || e.target.value;
    this.setState({
      [e.target.dataset.id]: value,
      statusActive: true,
    });
    if (!this.state.statusActive) {
      this.handleTimer();
    }
  };

  updateStore = () => {
    const { id } = this.props.item;
    const { current } = this.props;
    const newState = Object.assign({}, this.state);
    delete newState.statusActive;
    store.dispatch(updatecurrentCVFromState(current, id, newState));
  };

  handleTimer = () => {
    if (this.mounted) {
      setTimeout(() => {
        this.updateStore();

        if (this.mounted) {
          this.setState({
            statusActive: false,
          });
        }
      }, 500);
    }
  };

  handleRemoveItem = () => {
    const { id } = this.props.item;
    const { current } = this.props;
    store.dispatch(removeItemfromCurrentCv(current, id));
  };

  render() {
    const { id } = this.props.item;
    const { index, current, newItem, language } = this.props;
    const { description, endYear, endMonth } = this.state;
    const startY = new Date().getFullYear() - 65;
    const endY = new Date().getFullYear();
    const polishLanguage = language === 'PL';
    return (
      <StyledInputSection id={id}>
        <InputHeader
          index={`${index + 1}`}
          current={current}
          newItem={newItem}
          removeItem={this.handleRemoveItem}
          language={language}
        />
        <div className="inputContainer">
          <Input
            placeholder={polishLanguage ? 'certyfikat' : 'certificate'}
            id="description"
            value={description}
            onChange={this.handleForm}
          />
          <div className="selectContainer">
            <Select
              title={polishLanguage ? 'data uzyskania' : 'obtained in'}
              id="endYear"
              value={endYear}
              onChange={this.handleForm}
              start={startY}
              end={endY}
            />
            <Select id="endMonth" value={endMonth} onChange={this.handleForm} start={0} end={12} />
          </div>
        </div>
      </StyledInputSection>
    );
  }
}

// DefaultInputSection.propTypes = {
//  item: propTypes.shape({
//     id: PropTypes.string,
//     name: PropTypes.string,
//     startYear: PropTypes.string,
//     startMonth: PropTypes.string,
//     endYear: PropTypes.string,
//     endMonth: PropTypes.string,
//     description: PropTypes.string,
//   }),
// };

// DefaultInputSection.defaultProps = {
//   id: '1',
//   name: 'Stranger',
//   startYear: 'Stranger',
//   startMonth: 'Stranger',
//   endYear: 'Stranger',
//   endMonth: 'Stranger',
//   description: 'Stranger',
// };

export default CertificatesPanel;

// @TODO: wyniesienie update store i update pliku do wyższych komponentów
