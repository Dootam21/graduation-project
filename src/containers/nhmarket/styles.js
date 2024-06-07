import { StyleSheet, Dimensions } from 'react-native';

const wh = Dimensions.get('window').height;
const ww = Dimensions.get('window').width;

const w1 = ww / 100;
// const w5 = w1 * 5;
// const w8 = w1 * 8;
// const w10 = w1 * 10;
const w20 = w1 * 20;
// const w25 = w1 * 25;
// const w37 = w1 * 37;
// const w50 = w1 * 50;
// const w70 = w1 * 70;
// const w76 = w1 * 76;
// const w80 = w1 * 80;
// const w90 = w1 * 90;
// const w95 = w1 * 95;

// const home_btn_height = w37 * 60 / 238;
// const slogan_height = w70 * 155 / 448;
const homeCatImageWidth = (ww - 70) / 4;

const news_list_item_left_width = (ww - 30) / 3;
const news_list_item_right_width = (ww - 40) - news_list_item_left_width;
const news_list_item_image_height = news_list_item_left_width - (news_list_item_left_width / 3);

export default StyleSheet.create({
    img: { resizeMode: 'contain' },
    imgSplash: { resizeMode: 'cover', width: ww, height: wh },
    h3: { fontSize: 16, fontWeight: 'bold', lineHeight: 24, color: '#333' },

    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
    },
    clback: {
        color: "#000"
    },
    //
    header: {
        backgroundColor: '#b8101f',
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 8,
        height: 44,
    },
    headerLeft: {
        width: "20%",
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: "center",
    },
    headerRight: {
        fontWeight: "700",
        width: "20%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'flex-end',
    },

    headerCenter: {
        width: '60%',
        justifyContent: "center",
        alignItems: 'center',
    },
    title: {
        color: "#fff",
        fontWeight: "700",
        textAlign: 'center',
        width: "100%",
        fontSize: 13,
    },
    thoigian: {
        fontSize: 10,
        color: "#FFF"
    },
    btnchon: {
        flexDirection: "row",
        alignItems: "center",
    },
    icondown: {
        marginLeft: 3,
        marginTop: 3
    },
    item: {
        marginLeft: 30,
    },

    btnTextHeader: {
        color: "#fff",
        fontSize: 16,
    },
    btnText: {
        color: "#fff",
        fontSize: 11,
        fontWeight: "700",
    },
    bgGrey: {
        backgroundColor: "#3C3F4E",
        flexDirection: "row",
        paddingVertical: 4,
        alignItems: "flex-end",
        marginBottom: -1,
    },
    btnGroup: {
        width: "50%",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    //
    groupBtn: {
        flexDirection: "row",
        justifyContent: 'space-between',
        padding: 10
    },
    btnSelectAll: {
        color: "#fff",
        backgroundColor: "#3C3F4E",
        padding: 6,
        borderRadius: 4,
        textAlign: "center",
        fontWeight: "600",
        fontSize: 12,
    },
    btnPhanKhach: {
        color: "#fff",
        backgroundColor: "#B8101F",
        width: ww / 2 - 20,
        padding: 6,
        borderRadius: 4,
        textAlign: "center",
        fontWeight: "600",
        fontSize: 12,
    }

});