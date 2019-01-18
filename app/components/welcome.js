import React, {PureComponent} from 'react';
import { StyleSheet,Dimensions,
    Text, View, Button,TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

const FirstRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
);
const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);
export default class Welcome extends PureComponent {

    constructor(props){
        super(props);
        this.state={
            index: 0,
            routes: [
                { key: 'first', title: 'First' },
                { key: 'second', title: 'Second' },
            ],
        }
    }
    render() {

       return (
           <TabView
               navigationState={this.state}
               renderScene={SceneMap({
                   first: FirstRoute,
                   second: SecondRoute,
               })}
               onIndexChange={index => this.setState({ index })}
               initialLayout={{ width: Dimensions.get('window').width }}
           />
       );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
    }
});
