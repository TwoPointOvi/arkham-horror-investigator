import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Image, View, TouchableOpacity, Animated } from 'react-native';
import { ARKHAMDB } from '../shared/urls';

export default class FlipCard extends Component {

    UNSAFE_componentWillMount() {
        this.animatedValue = new Animated.Value(0);
        this.value = 0;
        this.animatedValue.addListener(({ value }) => {
            this.value = value;
        })
        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg'],
        })
        this.backInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        })
        this.frontOpacity = this.animatedValue.interpolate({
            inputRange: [89, 90],
            outputRange: [1, 0]
        })
        this.backOpacity = this.animatedValue.interpolate({
            inputRange: [89, 90],
            outputRange: [0, 1]
        })
    }

    flipCard() {
        if (this.value >= 90) {
            Animated.spring(this.animatedValue,{
                toValue: 0,
                friction: 8,
                tension: 10
            }).start();
        } else {
            Animated.spring(this.animatedValue,{
                toValue: 180,
                friction: 8,
                tension: 10
            }).start();
        }
    }

    getInvestigatorCard(url, safetyUrl) {
        if (url) {
            return (
                <Image source={{uri: `${ARKHAMDB + url}`}} style={styles.investigatorCard} />
            ); 
        } else {
            return (
                <Image source={{uri: `${ARKHAMDB + safetyUrl}`}} style={styles.investigatorCard} />
            ); 
        }
    }

    render() {
        const frontAnimatedStyle = {
            transform: [
            { rotateX: this.frontInterpolate }
            ]
        };
        const backAnimatedStyle = {
            transform: [
            { rotateX: this.backInterpolate }
            ]
        };

        return (
            <View style={styles.container}>
                <View>
                    <Animated.View style={[styles.flipCard, frontAnimatedStyle, {opacity: this.frontOpacity}]}>
                        <TouchableOpacity onPress={() => this.flipCard()}>
                            {this.getInvestigatorCard(this.props.frontImageUrl)}
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle, {opacity: this.backOpacity}]}>
                        <TouchableOpacity onPress={() => this.flipCard()}>
                            {this.getInvestigatorCard(this.props.backImageUrl, this.props.frontImageUrl)}
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    flipCard: {
        width: 418,
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
        backfaceVisibility: 'hidden',
    },
    flipCardBack: {
        position: "absolute",
        top: 0,
    },
    flipText: {
        width: 90,
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    investigatorCard: {
        width: 418,
        height: 300
    }
});

AppRegistry.registerComponent('flipcard', () => FlipCard);