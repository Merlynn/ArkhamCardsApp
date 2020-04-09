import React from 'react';
import { t } from 'ttag';

import UpgradeDecksInput from './UpgradeDecksInput';
import InvestigatorChoiceWithSuppliesInputComponent from './InvestigatorChoiceWithSuppliesInputComponent';
import InvestigatorChoiceInputComponent from './InvestigatorChoiceInputComponent';
import InvestigatorCheckListComponent from 'components/campaignguide/prompts/InvestigatorCheckListComponent';
import UseSuppliesPrompt from 'components/campaignguide/prompts/UseSuppliesPrompt';
import CampaignGuideTextComponent from 'components/campaignguide/CampaignGuideTextComponent';
import SetupStepWrapper from 'components/campaignguide/SetupStepWrapper';
import CardChoicePrompt from 'components/campaignguide/prompts/CardChoicePrompt';
import InvestigatorCounterComponent from 'components/campaignguide/prompts/InvestigatorCounterComponent';
import ChooseOnePrompt from 'components/campaignguide/prompts/ChooseOnePrompt';
import BinaryPrompt from 'components/campaignguide/prompts/BinaryPrompt';
import NumberPrompt from 'components/campaignguide/prompts/NumberPrompt';
import SuppliesPrompt from 'components/campaignguide/prompts/SuppliesPrompt';
import { InputStep } from 'data/scenario/types';
import GuidedCampaignLog from 'data/scenario/GuidedCampaignLog';

interface Props {
  step: InputStep;
  componentId: string;
  campaignLog: GuidedCampaignLog;
  fontScale: number;
}

export default class InputStepComponent extends React.Component<Props> {
  render(): React.ReactNode {
    const {
      step,
      campaignLog,
      componentId,
      fontScale,
    } = this.props;
    switch (step.input.type) {
      case 'choose_one':
        if (step.input.choices.length === 1) {
          return (
            <BinaryPrompt
              id={step.id}
              bulletType={step.bullet_type}
              text={step.input.choices[0].text}
              trueResult={step.input.choices[0]}
            />
          );
        }
        return (
          <ChooseOnePrompt
            id={step.id}
            bulletType={step.bullet_type}
            text={step.text}
            input={step.input}
            campaignLog={campaignLog}
          />
        );
      case 'counter':
        return (
          <NumberPrompt
            id={step.id}
            bulletType={step.bullet_type}
            prompt={step.input.text}
            confirmText={step.input.confirm_text}
            effects={step.input.effects}
            min={step.input.min}
            max={step.input.max}
            text={step.text}
          />
        );
      case 'investigator_counter':
        return (
          <>
            <SetupStepWrapper bulletType={step.bullet_type}>
              { !!step.text && <CampaignGuideTextComponent text={step.text} /> }
            </SetupStepWrapper>
            <InvestigatorCounterComponent
              id={step.id}
            />
          </>
        );
      case 'supplies':
        return (
          <SuppliesPrompt
            id={step.id}
            bulletType={step.bullet_type}
            text={step.text}
            input={step.input}
          />
        );
      case 'card_choice':
        return (
          <CardChoicePrompt
            id={step.id}
            text={step.text}
            input={step.input}
          />
        );
      case 'use_supplies':
        return (
          <UseSuppliesPrompt
            id={step.id}
            text={step.text}
            input={step.input}
            campaignLog={campaignLog}
          />
        );
      case 'investigator_choice':
        return (
          <InvestigatorChoiceInputComponent
            step={step}
            input={step.input}
            campaignLog={campaignLog}
          />
        );
      case 'investigator_choice_supplies':
        return (
          <InvestigatorChoiceWithSuppliesInputComponent
            step={step}
            input={step.input}
            campaignLog={campaignLog}
          />
        );
      case 'upgrade_decks':
        return (
          <UpgradeDecksInput
            id={step.id}
            componentId={componentId}
            fontScale={fontScale}
          />
        );
      case 'scenario_investigators':
        return (
          <>
            { !!step.text && (
              <SetupStepWrapper>
                <CampaignGuideTextComponent text={step.text} />
              </SetupStepWrapper>
            ) }
            <InvestigatorCheckListComponent
              id={step.id}
              choiceId="chosen"
              checkText={t`Choose Investigators`}
              defaultState
              min={1}
              max={4}
              allowNewDecks
            />
          </>
        );
    }
  }
}