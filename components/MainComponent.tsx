import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image, ScrollView, FlatList, ListRenderItem } from "react-native";
import { StatusBar } from 'expo-status-bar';
import FlipCard from './FlipCardComponent';
import { ARKHAMDB_CARDS } from '../shared/urls';
import { ListItem } from "react-native-elements";

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
                let seenNames:any = {};                                                    
                const investigatorNoDup = investigators.filter((card: any) => {
                    if (!(card.name in seenNames)) {
                        seenNames[card.name] = true;
                        return true;
                    }
                });
                this.setState({ cardData: investigatorNoDup });
            })
            .catch(error => console.error(error))
            .finally(() => { 
                this.setState({ isLoading: false });
            });
    }

    render() {
        const { cardData, isLoading } = this.state;


        const renderInvestigatorListItem: ListRenderItem<any> = ({item, index}) => {
            return (

                <ListItem
                    key={index}
                    topDivider
                    bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>{item.name}</ListItem.Title>
                        <ListItem.Subtitle>{item.subname}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron color="purple"></ListItem.Chevron>
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
                    <ScrollView>
                        <FlatList
                            data={cardData}
                            renderItem={renderInvestigatorListItem}
                            keyExtractor={item => item.name}>
                        </FlatList>
                        <StatusBar style="auto" />
                    </ScrollView>
                </View>
            );
        }
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
    itemContainer: {
        flex: 1,
        padding: 5,
        flexDirection: 'column',
        alignItems: 'center',
    }
});

export default Main;