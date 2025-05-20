import React, { memo } from "react";
import { View, StyleSheet, FlatList, ImageSourcePropType, Image } from "react-native";
import { Dimensions } from "react-native";

const images = Array(11).fill(require("../assets/logo.png"));

const { width } = Dimensions.get("window");
const imageSize = width / 2 - 15;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 20,
        paddingHorizontal: 10,
    },
    listContainer: {
        paddingBottom: 20,
    },
    imageContainer: {
        flex: 1,
        marginBottom: 15,
        marginHorizontal: 5,
    },
    image: {
        width: "100%",
        height: imageSize,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ccc",
    },
});

const ImageItem = memo(({ item }: { item: ImageSourcePropType }) => (
    <View style={styles.imageContainer}>
        <Image source={item} style={styles.image} resizeMode="contain" />
    </View>
));

export default function GalleryScreen() {
    const renderItem = ({ item }: { item: ImageSourcePropType }) => <ImageItem item={item} />;

    const keyExtractor = (item: ImageSourcePropType, index: number) => index.toString();

    return (
        <View style={styles.container}>
            <FlatList
                data={images}
                keyExtractor={keyExtractor}
                numColumns={2}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
                removeClippedSubviews={true}
                initialNumToRender={6}
                maxToRenderPerBatch={6}
                windowSize={11}
            />
        </View>
    );
}
