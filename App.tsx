import { StatusBar as StatusBarComponent } from "expo-status-bar";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import {
    StyleSheet,
    Text,
    View,
    ToastAndroid,
    Alert,
    Platform,
    StatusBar,
} from "react-native";
import {
    GestureHandlerRootView,
    Swipeable,
} from "react-native-gesture-handler";
import ImageSwiper from "./components/ImageSwiper";

export default function App() {
    const [imageList, setImageList] = useState<string[]>([]);
    const [favoriteList, setFavoriteList] = useState<Record<string, boolean>>(
        {}
    );

    useEffect(() => {
        fetch("https://picsum.photos/v2/list")
            .then<ImageList>((response) => response.json())
            .then((result) => {
                const urls = result.map((image) => image.download_url);
                setImageList(urls);
            })
            .catch((_) => {
                if (Platform.OS === "android") {
                    ToastAndroid.show(
                        "Failed to fetch images",
                        ToastAndroid.SHORT
                    );
                } else {
                    Alert.alert("Failed to fetch images");
                }
            });
    }, []);

    const handleDelete = (url: string) => {
        setImageList((prev) => prev.filter((image) => image !== url));
    };

    const handleFavorite = (url: string, swipeable: Swipeable) => {
        setFavoriteList((prev) => {
            const newFavoriteList = { ...prev };
            newFavoriteList[url] = !newFavoriteList[url];
            return newFavoriteList;
        });
        swipeable.close();
    };

    return (
        <GestureHandlerRootView
            style={{ flex: 1, marginTop: StatusBar.currentHeight ?? 30 }}
        >
            <StatusBarComponent style="auto" />

            <SafeAreaView style={styles.container}>
                <ImageSwiper
                    imageUrls={imageList}
                    isLiked={(url) => !!favoriteList[url]}
                    onDelete={handleDelete}
                    onLike={handleFavorite}
                ></ImageSwiper>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
