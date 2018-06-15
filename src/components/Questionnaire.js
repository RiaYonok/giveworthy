import React, {PureComponent} from 'react';
import Modal from '@material-ui/core/Modal';

export const mapStateToProps = state => ({
  activeQuestionnaire: state.questionnaires.get('activeQuestionnaire')
});

export class Questionnaire extends PureComponent {
  render() {
    const { activeQuestionnaire, questionnaireName, children } = this.props;

    return (
      <Modal open={activeQuestionnaire == questionnaireName}>
        {children}
      </Modal>
    );
  }
}

export default Questionnaire;