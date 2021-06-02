import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { INACTIVE_COLOR, PRIMARY_COLOR } from "../Styles/Colors";
import IconMaterial from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/Fontisto";
import { TouchableOpacity } from "react-native-gesture-handler";

const Post = ({ itme,
    item,
    likeCallBack,
    commenteCallBack,
    deletedCallback,
    userAvatarCliqued }) => {
    let image = "";
    if (item.imageAssocier) {
        if (item.imageAssocier.charAt(0) == 'd') {
            image = item.imageAssocier;
        } else {
            image = 'data:image/jpeg;base64,' + item?.imageAssocier
        }
    }
    return (
        <Card style={styles.card}>
            <View style={styles.body}>
                <Avatar.Image onPress={() => userAvatarCliqued(item.idCreateur)} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1024px-User_icon_2.svg.png' }} size={50} />

                <View style={styles.content}>
                    <Card.Content>

                        <View style={styles.cardHeader}>
                            <TouchableOpacity style={styles.headerTitle} onPress={() => userAvatarCliqued(item.idCreateur)}>
                                <Text style={styles.title} >{item.idCreateur}</Text>
                                <Text style={styles.subtitle}>{item.nomCreateur}</Text>
                            </TouchableOpacity>
                            {itme && <IconMaterial

                                size={20}
                                name="delete"
                                color="#ab000d"
                                onPress={() => deletedCallback(item._id)} />}
                        </View>

                        <Paragraph>{item.contenu}</Paragraph>
                        <Card.Cover style={styles.cover} source={{ uri: image, body: image }} />
                    </Card.Content>

                    <Card.Actions>
                        <View style={styles.post_actions}>
                            <View style={styles.like_commente}>
                                <Icon name="comment" size={19} color={INACTIVE_COLOR} style={{ margin: 5 }} />
                                <Text style={{ color: INACTIVE_COLOR }}>{item.commentaires.length}</Text>
                            </View>
                            <View style={styles.like_commente}>
                                <Icon name="heart-alt" size={19} color={INACTIVE_COLOR} style={{ margin: 5 }} />
                                <Text style={{ color: INACTIVE_COLOR }}>{item.likes.length}</Text>
                            </View>
                        </View>
                    </Card.Actions>

                </View>

            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    card: {
        marginBottom: 5,
        padding: 5
    },
    body: {
        display: "flex",
        flexDirection: "row"
    },
    cardHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"

    },
    headerTitle: {
        marginLeft: 2,
        display: "flex",
        flexDirection: "column",
        alignContent: "stretch",
        justifyContent: "center"
    },
    cover: {
        maxHeight: 700
    },
    title: {
        marginBottom: 1,
        fontWeight: "bold",
        fontSize: 20
    },
    subtitle: {
        color: "#CFCFCF",
        fontSize: 12
    },
    main_container: {
        borderColor: INACTIVE_COLOR,
        borderWidth: 0.5,
        marginTop: 2,
        marginBottom: 2,
        padding: 8
    },
    post_actions: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignContent: "space-between",
        alignItems: "stretch",
        flexDirection: "row",
        padding: 2
    },
    like_commente: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    }
})

export default Post

/*
<View style={styles.main_container}
            key={post._id}
        >
            <View>

            </View>

            <View>

            </View>

            <Text>{post.nomCreateur ? post.nomCreateur : null}</Text>
            <Text>{post.contenu}</Text>

            <View style={styles.post_actions}>
                <Icon name="comment" size={25} />
                <AntIcon name="retweet" size={25} />
                <Icon name="heart-alt" size={25} />
            </View>
        </View>*/