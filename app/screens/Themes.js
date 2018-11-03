import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StatusBar } from 'react-native';
//ScrollView is for scrollable list
import EStyleSheet from 'react-native-extended-stylesheet';
// import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import { ListItem, Separator } from '../components/List';

import { changePrimaryColor } from '../actions/themes';

const styles = EStyleSheet.create({
    $blue: '$primaryBlue',
    $orange: '$primaryOrange',
    $green: '$primaryGreen',
    $purple: '$primaryPurple',
  });

  class Themes extends Component {
    static propTypes = {
      navigation: PropTypes.object,
      dispatch: PropTypes.func
    };

    handlePressTheme = (color) => {
      console.log('press theme');
      this.props.dispatch(changePrimaryColor(color));
      this.props.navigation.goBack(null);
    };
  
    render() {
      return (
        <ScrollView>
          <StatusBar translucent={false} barStyle="light-content" />
          <ListItem
            text="Blue"
            onPress={() => this.handlePressTheme(styles.$blue)}
            selected
            checkmark={false}
            iconBackground={styles.$blue}
          />
          <Separator />
          <ListItem
            text="Orange"
            onPress={() => this.handlePressTheme(styles.$orange)}
            selected
            checkmark={false}
            iconBackground={styles.$orange}
          />
          <Separator />
          <ListItem
            text="Green"
            onPress={() => this.handlePressTheme(styles.$green)}
            selected
            checkmark={false}
            iconBackground={styles.$green}
          />
          <Separator />
          <ListItem
            text="Purple"
            onPress={() => this.handlePressTheme(styles.$purple)}
            selected
            checkmark={false}
            iconBackground={styles.$purple}
          />
          <Separator />
        </ScrollView>
      );
    }
  }
  export default connect()(Themes);