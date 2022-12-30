import { useState } from "react";
import { Dimensions } from "react-native";

export const useSwiperSettings = () => {
    const [leftThreshold, setLeftThreshold] = useState(50);
    const [rightThreshold, setRightThreshold] = useState(50);
    const [overshootLeft, setOvershootLeft] = useState(false);
    const [overshootRight, setOvershootRight] = useState(false);
    const [actionWidth, setActionWidth] = useState(
        Math.floor(Dimensions.get("window").width / 2)
    );

    return {
        leftThreshold,
        rightThreshold,
        overshootLeft,
        overshootRight,
        actionWidth,
        setLeftThreshold,
        setRightThreshold,
        setOvershootLeft,
        setOvershootRight,
        setActionWidth,
    };
};
