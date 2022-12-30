import React from "react";
import {
    Switch,
    Text,
    TextInput,
    View,
    StyleSheet,
    Dimensions,
} from "react-native";

type Props = {
    leftThreshold: number;
    rightThreshold: number;
    overshootLeft: boolean;
    overshootRight: boolean;
    actionWidth: number;

    setLeftThreshold: (value: number) => void;
    setRightThreshold: (value: number) => void;
    setOvershootLeft: (value: boolean) => void;
    setOvershootRight: (value: boolean) => void;
    setActionWidth: (value: number) => void;
};

const SwiperSettings: React.FC<Props> = ({
    actionWidth,
    leftThreshold,
    overshootLeft,
    overshootRight,
    rightThreshold,
    setActionWidth,
    setLeftThreshold,
    setOvershootLeft,
    setOvershootRight,
    setRightThreshold,
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Settings:</Text>
            <View style={styles.settings}>
                <View style={styles.setting}>
                    <Text>Left threshold: </Text>
                    <TextInput
                        style={styles.settingInput}
                        value={`${leftThreshold || ""}`}
                        onChangeText={(text) => {
                            if (text) setLeftThreshold(parseInt(text));
                        }}
                        keyboardAppearance="dark"
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.setting}>
                    <Text>Right threshold: </Text>
                    <TextInput
                        style={styles.settingInput}
                        value={`${rightThreshold || ""}`}
                        onChangeText={(text) => {
                            if (text) setRightThreshold(parseInt(text));
                        }}
                        keyboardAppearance="dark"
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.setting}>
                    <Text>Overshoot left: </Text>
                    <Switch
                        value={overshootLeft}
                        onValueChange={setOvershootLeft}
                    />
                </View>

                <View style={styles.setting}>
                    <Text>Overshoot right: </Text>
                    <Switch
                        value={overshootRight}
                        onValueChange={setOvershootRight}
                    />
                </View>

                <View style={styles.setting}>
                    <Text>Action width: </Text>
                    <TextInput
                        style={styles.settingInput}
                        value={`${actionWidth || ""}`}
                        onChangeText={(text) => {
                            if (text) setActionWidth(parseInt(text) ?? "");
                        }}
                        keyboardAppearance="dark"
                        keyboardType="numeric"
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    header: {
        fontFamily: "Roboto",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontSize: 23,
        letterSpacing: 0.6,
        marginBottom: 10,
    },
    settings: {
        flexDirection: "column",
        flexWrap: "wrap",
        gap: 10,
    },
    setting: {
        flexDirection: "row",
        alignItems: "center",
    },
    settingInput: {
        width: 50,
        height: 30,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 5,
        padding: 5,
        flex: 1,
    },
});

export default SwiperSettings;
