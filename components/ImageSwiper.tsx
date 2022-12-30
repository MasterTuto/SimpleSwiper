import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Image,
    FlatList,
    Text,
    Dimensions,
    TouchableOpacity,
    TextInput,
    Switch,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { useSwiperSettings } from "../hooks/useSwiperSettings";
import SwiperSettings from "./SwiperSettings";

type Props = {
    imageUrls: string[];
    onDelete: (url: string) => unknown;
    isLiked: (url: string) => boolean;
    onLike: (url: string, swipeable: Swipeable) => unknown;
};

type ActionProps = {
    type: "like" | "delete";
    url: string;
    onAction: (url: string) => unknown;
    actionWidth: number;
    isLiked?: boolean;
};

const ActionButton: React.FC<ActionProps> = ({
    type,
    url,
    onAction,
    actionWidth,
    isLiked,
}) => {
    let label: string;
    if (type === "delete") {
        label = "Delete";
    } else {
        label = isLiked ? "Liked" : "Like";
    }

    return (
        <TouchableOpacity
            onPress={() => onAction(url)}
            style={[
                [
                    styles.actionContainer,
                    { width: actionWidth || Dimensions.get("window").width },
                ],
                type === "delete" ? styles.deleteAction : styles.likeAction,
            ]}
        >
            <View
                style={{
                    maxWidth: actionWidth,
                }}
            >
                <Text style={styles.actionText}>{label}</Text>
            </View>
        </TouchableOpacity>
    );
};

const ImageSwiper: React.FC<Props> = ({
    imageUrls,
    onDelete,
    onLike,
    isLiked,
}) => {
    const swiperSettings = useSwiperSettings();
    const {
        actionWidth,
        leftThreshold,
        overshootLeft,
        overshootRight,
        rightThreshold,
    } = swiperSettings;

    const renderSwipable = ({ item }: { item: string }) => {
        return (
            <Swipeable
                leftThreshold={leftThreshold}
                rightThreshold={rightThreshold}
                overshootLeft={overshootLeft}
                overshootRight={overshootRight}
                renderRightActions={(p, _, swipeable) => (
                    <ActionButton
                        actionWidth={actionWidth}
                        onAction={(url) => onLike(url, swipeable)}
                        type="like"
                        url={item}
                        isLiked={isLiked(item)}
                    />
                )}
                renderLeftActions={(p) => (
                    <ActionButton
                        actionWidth={actionWidth}
                        onAction={onDelete}
                        type="delete"
                        url={item}
                        isLiked={isLiked(item)}
                    />
                )}
                onSwipeableOpen={(direction, swipeable) => {
                    if (direction === "right") {
                        if (!overshootRight) return;

                        onDelete(item);
                        swipeable.close();
                    } else {
                        if (!overshootLeft) return;

                        onLike(item, swipeable);
                        swipeable.close();
                    }
                }}
            >
                <Image source={{ uri: item, height: 100 }} />
            </Swipeable>
        );
    };

    return (
        <View style={styles.container}>
            <SwiperSettings {...swiperSettings} />
            <FlatList
                renderItem={renderSwipable}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                keyExtractor={(item) => item}
                data={imageUrls}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        height: 100,
        resizeMode: "strech",
    },
    separator: {
        height: 10,
    },
    actionContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 10,
    },
    deleteAction: {
        backgroundColor: "red",
    },
    actionText: {
        fontFamily: "Roboto",
        fontWeight: "bold",
        color: "white",
        fontSize: 20,
        letterSpacing: 0.6,
    },
    likeAction: {
        backgroundColor: "green",
    },
});

export default ImageSwiper;
