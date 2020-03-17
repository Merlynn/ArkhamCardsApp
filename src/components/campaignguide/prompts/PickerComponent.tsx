import React from 'react';
import { map } from 'lodash';
import { SettingsPicker } from 'react-native-settings-components';
// @ts-ignore
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';

import { EffectsChoice } from 'data/scenario/types';
import { COLORS } from 'styles/colors';

interface Props {
  choices: EffectsChoice[];
  choice: number;
  onChoiceChange: (index: number) => void;
  title: string;
  optional?: boolean;
  editable: boolean;
  colors?: {
    backgroundColor: string;
    textColor: string;
  },
}

export default class PickerComponent extends React.Component<Props> {
  pickerRef?: SettingsPicker<number>;

  _capturePickerRef = (ref: SettingsPicker<number>) => {
    this.pickerRef = ref;
  }

  _onChoiceChange = (idx: number) => {
    this.pickerRef && this.pickerRef.closeModal();
    this.props.onChoiceChange(idx);
  };

  _choiceToLabel = (idx: number): string => {
    if (idx === -1) {
      return '';
    }
    const { choices } = this.props;
    const choice = choices[idx];
    if (choice) {
      return choice.text;
    }
    return '';
  };

  render() {
    const {
      choices,
      choice,
      optional,
      editable,
      title,
      colors = {
        backgroundColor: COLORS.lightBlue,
        textColor: COLORS.white,
      },
    } = this.props;
    const passedOptions = [
      ...map(choices, (choice, idx) => {
        return {
          label: choice.text,
          value: idx,
        };
      }),
    ];
    const options = optional ? [
      { value: -1, label: '' },
      ...passedOptions,
    ] : passedOptions;
    return (
      <SettingsPicker
        ref={this._capturePickerRef}
        title={title}
        value={choice}
        valuePlaceholder={''}
        formatVal={this._choiceToLabel}
        onValueChange={this._onChoiceChange}
        disabled={!editable}
        modalStyle={{
          header: {
            wrapper: {
              backgroundColor: colors.backgroundColor,
            },
            description: {
              paddingTop: 8,
            },
          },
          list: {
            itemColor: colors.backgroundColor,
          },
        }}
        options={options}
        disabledOverlayStyle={{
          backgroundColor: 'rgba(255,255,255,0.0)',
        }}
        titleStyle={{
          color: colors.textColor,
          fontWeight: '700',
        }}
        valueStyle={{
          color: colors.textColor,
          fontWeight: '400',
        }}
        containerStyle={{
          backgroundColor: colors.backgroundColor,
        }}
        widget={
          editable ? (
            <MaterialIcons
              name="keyboard-arrow-right"
              size={30}
              color={colors.textColor}
            />
          ): undefined
        }
      />
    );
  }
}