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
    header: {
        backgroundColor: '#b8101f',
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    headerLeft: {
        width: "20%",
    },
    headerRight: {
        color: "#fff",
        fontWeight: '700',
        width: "20%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'flex-end',
    },

    title: {
        color: "#fff",
        fontWeight: '700',
        flex: 1,
        textAlign: 'center',
        width: "60%",
        fontSize: 13,
    },
    thumbnail: {
        width: 24,
        height: 24,
    },
    items: {
        marginLeft: 33,
    },

    //
    navtab: {
        flexDirection: "row",
        marginBottom: 3,
    },
    tab: {
        width: ww / 3,
        textAlign: "center",
        fontWeight: '600',
        color: "#fff",
        backgroundColor: "#b8101f",
        borderRadius: 6,
        height: 34,
        textAlignVertical: 'center',
    },
    tabActive: {
        backgroundColor: "#fff",
        color: "#000"
    },
    //
    inputGroup: {
        flexDirection: "row",
        marginBottom: 8,
    },
    item: {
        width: (ww - 12) / 2,
        borderWidth: 1,
        borderColor: "#EEF0EF",
        borderRadius: 6,
        textAlignVertical: 'center',
        height: 32,
        padding: 0,
        marginHorizontal: 3,
    },
    search: {
        textAlignVertical: 'center',
        paddingLeft: 32,

    },
    iconSearch: {
        position: "absolute",
        left: 10,
        top: 9,
    },
    filter: {
        paddingHorizontal: 12,
        backgroundColor: "#F1F8FF",
        fontWeight: '700',
        color: "#000"
    },
    //

    cardItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        paddingBottom: 2,
        borderBottomColor: "#EEF0EF",
        backgroundColor: "#fff"
    },
    price: {
        color: "#2CCD70",
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'right',
        marginBottom: 6,
    },
    status: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        marginBottom: 4
    },
    complete: {
        backgroundColor: "#2CCD70",
    },
    pending: {
        backgroundColor: "red"
    },
    draft: {
        backgroundColor: "grey",
    },
    //
    cardRight: {
        alignItems: "flex-end",
        flex: 0,
    },
    textStatus: {
        textAlign: "center",
        color: "#fff",
        fontWeight: '700'
    },
    created: {
        textAlign: "center",
        color: "#fff",
        fontSize: 11,
    },
    author: {
        fontSize: 11,
    },
    customer: {
        fontWeight: '700',
    },
    revenue: {
        backgroundColor: "red",
        position: "absolute",
        bottom: 58,
        padding: 6,
        right: 0,
        color: "#fff",
        borderRadius: 6,
        fontSize: 13,
    },

    // fillter
    centeredView: {
        backgroundColor: "#fff",
        width: ww / 12 * 11,
        left: ww / 24,
        top: ww / 4,
        borderRadius: 6,
        zIndex: 1,
        paddingHorizontal: 30,
        height: wh * 0.6,
    },
    modalBackdrop: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(000, 0, 0, 0.3)', // Transparent red color (adjust opacity as needed)
    },
    flexRowBW: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 30,
    },
    flexRowWrap: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    btn: {
        paddingHorizontal: 12,
        paddingVertical: 3,
        borderRadius: 4,
    },
    btnRest: {
        backgroundColor: "#B8101F",
        color: "#fff"
    },
    txtTitle: {
        fontWeight: '700',
        color: "#000"
    },
    btnGrey: {
        backgroundColor: "#EAEAEA",
        marginRight: 10,
        marginTop: 10,
    },
    flexRowDt: {
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#EEF0EF",
    },
    txtDate: {
        width: 60,
        marginRight: 20,
    },
    resetAll: {
        marginBottom: 10,
        padding: 10,
        textAlign: "center",
        borderRadius: 4,
    },
    mb20: {
        marginBottom: 20,
    },
    //
    listHollow: {
        textAlign: "center",
        fontWeight: '700',
        color: "#000",
        padding: 10,
    },
    modalContainer2: {
        backgroundColor: "#fff",
        width: ww / 4 * 3,
        top: '35%',
        verticalAlign: "middle",
        left: ww / 8,
        borderRadius: 8,
        zIndex: 2,
        position: "absolute",
    },
    modalTitle: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderBottomColor: "#ddd",
        borderBottomWidth: 0.5,
        fontWeight: '600',
        color: 'black',
        fontSize: 17
    },
    btnGroupConfirm: {
        flexDirection: "row",
        padding: 0,
        borderTopColor: "#ddd",
        borderTopWidth: 0.5,
        justifyContent: "space-around"
    },
    closeButton: {
        flex: 1,
    },
    confirmButton: {
        flex: 1,
    },
    txtConfirm: {
        textAlign: "center",
        color: "#3598DB",
        fontSize: 17,
        padding: 7,
    },
    inputSL: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 17,
    },
    textCenter: {
        textAlign: "center",
    },
    borderRight: {
        borderColor: "#ddd",
        borderRightWidth: 0.5,
        padding: 7,
    },
    //
    flexRowNT: {
        flexDirection: "row",
        alignItems: "center"
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 10,
    },
    txtNoti: {
        width: ww - 160,
        marginLeft: 10,
    },
    padding10: {
        padding: 10,
        justifyContent: "space-between",
    },
    txtN: {
        fontWeight: '600',
        color: "#000",
    },
    txtCreate: {
        fontSize: 11,
        color: "#000",
        marginLeft: 5,
    },
    bgRead: {
        backgroundColor: "#F1F8FF"
    }
});