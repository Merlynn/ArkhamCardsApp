import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ChooseOneListComponent from '../ChooseOneListComponent';
import PickerComponent from '../PickerComponent';
import { DisplayChoice } from 'data/scenario';
import { BulletType } from 'data/scenario/types';
import typography from 'styles/typography';

interface Props {
  code: string;
  name: string;
  color?: {
    primary: string;
    tint: string;
  };
  bulletType?: BulletType;
  choices: DisplayChoice[];
  choice?: number;
  optional: boolean;
  onChoiceChange: (code: string, index: number) => void;
  editable: boolean;
  detailed?: boolean;
  firstItem: boolean;
}

export default class ChoiceListItemComponent extends React.Component<Props> {
  _onChoiceChange = (idx: number) => {
    const {
      onChoiceChange,
      code,
    } = this.props;
    onChoiceChange(code, idx);
  };

  render() {
    const {
      name,
      color,
      detailed,
      choices,
      choice,
      editable,
      optional,
      firstItem,
    } = this.props;
    if (detailed) {
      return (
        <>
          <View style={[
            styles.headerRow,
            color ? { backgroundColor: color.tint } : {},
          ]}>
            <View>
              <Text style={[
                typography.text,
                styles.nameText,
              ]}>
                { name }
              </Text>
            </View>
            <View />
          </View>
          <ChooseOneListComponent
            choices={choices}
            selectedIndex={choice}
            editable={editable}
            onSelect={this._onChoiceChange}
            color={color}
            noBullet
          />
        </>
      );
    }
    return (
      <PickerComponent
        choices={choices}
        selectedIndex={choice === undefined ? -1 : choice}
        editable={editable}
        optional={optional}
        title={name}
        onChoiceChange={this._onChoiceChange}
        colors={color ? {
          backgroundColor: color.tint,
          textColor: '#000',
          modalColor: color.primary,
          modalTextColor: '#FFF',
        } : undefined}
        topBorder={firstItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  nameText: {
    fontWeight: '600',
    color: '#000',
  },
  headerRow: {
    padding: 8,
    paddingLeft: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});