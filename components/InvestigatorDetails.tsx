import React, { Component } from "react";
import { Text, View } from "react-native";

type MyState = { investigatorData: any };

class InvestigatorDetails extends Component<{ navigation:any, route:any }, MyState> {
    constructor(props:any) {
        super(props);

        this.state = {
            investigatorData: []
        };
    }

    componentDidMount() {
        const investigatorData = this.props.route.params?.investigatorData;
        // console.log(investigatorData);
        this.setState({ investigatorData: investigatorData });
    }

    render() {
        
        return (
            <View>
                <Text>{this.state.investigatorData.name}</Text>
            </View>
        );
    }
}

export default InvestigatorDetails;