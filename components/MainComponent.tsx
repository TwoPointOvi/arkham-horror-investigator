import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image, ScrollView } from "react-native";
import { StatusBar } from 'expo-status-bar';
import Animatedbasic from './FlipCardComponent';

export const ARKHAMDB = "https://arkhamdb.com";
export const ARKHAMDB_CARDS =  ARKHAMDB + "/api/public/cards/";

type MyState = { cardData: any, isLoading: boolean };

class Main extends Component<{}, MyState> {

    constructor(props:any) {
        super(props);

        this.state = {
            cardData: [],
            isLoading: true
        };
    }

    componentDidMount() {
        this.getArkhamHorrorCards();
    }

    getArkhamHorrorCards() {
        return fetch(ARKHAMDB_CARDS)
            .then((res) => res.json())
            .then((resJSON) => {
                const investigators = resJSON.filter((cards:any) => cards.type_code === "investigator" 
                                                                    && cards.pack_code !== "promo"
                                                                    && cards.imagesrc);
                this.setState({ cardData: investigators });
            })
            .catch(error => console.error(error))
            .finally(() => { 
                this.setState({ isLoading: false });
            });
    }

    render() {
        const { cardData, isLoading } = this.state;
        return (
            <View style={styles.container}>
                <ScrollView>
                    {isLoading ? <ActivityIndicator></ActivityIndicator> : (
                        cardData.map((item:any, index:number) => {
                            return(
                                <View>
                                    <Text>
                                        {index + ". " + item.name + "\t" + item.url + "\t" + item.imagesrc + "\t" + item.backimagesrc + "\n"}
                                    </Text>
                                    <View style={styles.containerRow}>
                                        {/* {this.getInvestigatorCard(item.imagesrc)}
                                        {this.getInvestigatorCard(item.backimagesrc)} */}
                                    </View>
                                    <Animatedbasic frontImageUrl={item.imagesrc} backImageUrl={item.backimagesrc}></Animatedbasic>
                                </View>
                            );
                        })
                    )}
                    <StatusBar style="auto" />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#A9A9A9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerRow: {
        flex: 1,
        flexDirection: 'row',
    },
    investigatorCard: {
        width: 418,
        height: 300
    }
});

export default Main;