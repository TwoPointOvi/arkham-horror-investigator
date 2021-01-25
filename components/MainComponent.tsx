import React, { Component } from "react";
import { View, StyleSheet, ActivityIndicator, Image, ScrollView, FlatList, ListRenderItem, Text, ImageBackground } from "react-native";
import { StatusBar } from 'expo-status-bar';
import FlipCard from './FlipCardComponent';
import { ARKHAMDB_CARDS } from '../shared/urls';
import { Avatar, ListItem } from "react-native-elements";
import { INVESTIGATORS_INFO } from "../shared/filepaths";

type MyState = { cardData: any, isLoading: boolean };

const CARDBACK = require("../assets/card_back.png");

class Main extends Component<{ navigation:any }, MyState> {

    constructor(props:any) {
        super(props);

        this.state = {
            cardData: [],
            isLoading: true
        };
    }

    componentDidMount() {
        // this.getArkhamHorrorCards();
        this.getArkhamHorrorInvestigatorCardData();
    }

    getArkhamHorrorCards() {
        return fetch(ARKHAMDB_CARDS)
            .then((res) => res.json())
            .then((resJSON) => {
                const investigators = resJSON.filter((cards:any) => cards.type_code === "investigator" 
                                                                    && cards.pack_code !== "promo"
                                                                    && cards.imagesrc);
                let seenNames:any = {};                                                    
                const investigatorNoDup = investigators.filter((card: any) => {
                    if (!(card.name in seenNames)) {
                        seenNames[card.name] = true;
                        return true;
                    }
                });
                // this.saveData(investigatorNoDup);
                this.setState({ cardData: investigatorNoDup });
            })
            .catch(error => console.error(error))
            .finally(() => { 
                this.setState({ isLoading: false });
            });
    }

    getArkhamHorrorInvestigatorCardData() {
        this.setState({ cardData: INVESTIGATORS_INFO });
        this.setState({ isLoading: false });
    }

    render() {
        const { cardData, isLoading } = this.state;
        const { navigate } = this.props.navigation;

        const renderInvestigatorListItem: ListRenderItem<any> = ({item, index}) => {
            // console.log(item);
            return (
                <ListItem
                    key={index}
                    topDivider
                    bottomDivider
                    onPress={() => navigate('InvestigatorDetails', { investigatorData: item })}
                    containerStyle={{backgroundColor: "transparent", borderColor: "white"}}
                    >
                    <Avatar rounded
                        avatarStyle={{position: 'absolute', height: 110}}
                        size="large" 
                        source={item.src} 
                        ></Avatar>
                    <ListItem.Content>
                        <ListItem.Title style={styles.text}>{item.name}</ListItem.Title>
                        <ListItem.Subtitle style={styles.text}>{item.subname}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron color="white"></ListItem.Chevron>
                </ListItem>

                // <View style={styles.itemContainer}>
                //     <Text>
                //         {index+1 + ". " + item.name + "\n"}
                //     </Text>
                //     {/* <FlipCard frontImageUrl={item.imagesrc} backImageUrl={item.backimagesrc}></FlipCard> */}
                // </View>
            );
        }


        if (isLoading) {
            return (
                <View style={styles.container}>
                    <ScrollView>
                        <ActivityIndicator></ActivityIndicator>
                        <StatusBar style="auto" />
                    </ScrollView>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <ImageBackground source={CARDBACK} style={styles.backgroundImage}>
                        <ScrollView>
                            <FlatList
                                data={cardData}
                                renderItem={renderInvestigatorListItem}
                                keyExtractor={item => item.name}>
                            </FlatList>
                            <StatusBar style="auto" />
                        </ScrollView>
                    </ImageBackground>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#A9A9A9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundImage: {
        position: "absolute",
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    itemContainer: {
        flex: 1,
        padding: 5,
        flexDirection: 'column',
        alignItems: 'center',
    },
    text: {
        color: "white",
        fontWeight: "bold",
        textShadowColor:'blue',
        textShadowOffset:{width: 5, height: 5},
        textShadowRadius: 20,
    }
});

export default Main;