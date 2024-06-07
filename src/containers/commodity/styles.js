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
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    headerLeft: {
        width: "40%",
        flex: 1,
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: "center",
    },
    headerRight: {
        fontWeight: '700',
        width: "40%",
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'flex-end',
    },

    title: {
        color: "#fff",
        fontWeight: '700',
        flex: 1,
        textAlign: 'center',
        width: "20%",
        fontSize: 15,
    },

    item: {
        marginLeft: 33,
    },
    //
    cardItem: {
        flexDirection: "row",
        backgroundColor: "#fff",
        padding: 6,
        borderBottomColor: "#EEF0EF",
        borderBottomWidth: 1,
    },
    cardContent: {
        flexDirection: "row",
        justifyContent: 'space-between',
        flex: 1,
        paddingLeft: 6,
    },
    thumbnail: {
        width: 64,
        height: 64,
        borderRadius: 6,
    },
    date: {
        justifyContent: 'flex-end',
    },
    itemInfo: {
        justifyContent: "center"
    },
    name: {
        fontWeight: '700'
    },

    // filter
    dropdown: {
        backgroundColor: '#EEF0EF',
        textAlign: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingVertical: 8,
        // borderBottomWidth: 1,
        // borderBottomColor: "#EEF0EF",
    },
    inputSearchStyle: {
        display: "none"
    },

    selectedDropdown: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 14,
    },
    txtSelect: {
        fontSize: 13,
        marginRight: 5,
    },
    slActive: {
        color: "#008001"
    },
    txtCheckmark: {
        marginRight: 4,
        width: 7,
        height: 12,
        borderColor: "#008001",
        borderBottomWidth: 1,
        borderRightWidth: 1,
        transform: [{ rotate: '45deg' }],
    },
    xx: {
        position: "relative",
    },
    selectedDropdown1: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    option: {
        backgroundColor: "#fff",
        width: "100%",
        paddingHorizontal: 10,
    },
    flexRowCB: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
        borderBottomColor: "#C0C0C0",
        borderBottomWidth: 0.5,
        width: "100%"
    },
    rotate: {
        transform: [{ rotate: '180deg' }],
    },
    //
    inputGroup: {
        width: ww - 10,
        paddingHorizontal: 15,
        margin: 5,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 6,
        borderColor: "#dddddd",
        borderWidth: 1,
    },
    inputsearch1: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        height: 32,
        flex: 1,
    },
    // modal
    centeredView: {
        backgroundColor: "#fff",
        width: ww / 12 * 10,
        left: ww / 12 * 2,
        top: 0,
        bottom: 0,
        height: wh,
        zIndex: 1,
    },

    modalBackdrop: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(000, 0, 0, 0.3)', // Transparent red color (adjust opacity as needed)
    },

    //
    flexRow: {
        flexDirection: "row"
    },
    headerFilter: {
        flexDirection: "row",
        paddingHorizontal: 8,
        paddingVertical: 16,
        justifyContent: "space-between",
        borderBottomColor: "#C0C0C0",
        borderBottomWidth: 0.5,
    },
    txtHeaderFilter: {
        fontWeight: '700',
        color: "#000",
    },
    bntCancle: {
        marginRight: 10,
        marginLeft: 20,
        color: "#000",
    },
    //
    bodyFilter: {
        marginHorizontal: 8,
        paddingVertical: 8,
    },
    titleFilter: {
        fontSize: 12,
        color: "#000"
    },
    //
    inputNumber: {
        borderColor: "#EEF0EF",
        borderWidth: 1,
        width: "100%",
        padding: 0
    },
    flexRow1: {
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 12
    },
    flexRow2: {
        width: "45%",
        alignContent: 'center',
        justifyContent: "center",
    },
    flexRow3: {
        width: "10%",
        textAlign: "center",
        justifyContent: "center"
    },
    line: {
        width: 10,
        height: 1,
        backgroundColor: "#000"
    },
    //
    btnCheck1: {
        color: "#fff",
        fontSize: 12,
        backgroundColor: "red",
        textAlign: "center",
        padding: 6,
        borderRadius: 4,
        marginTop: 10,
    },
    btnCheckFilter: {
        paddingHorizontal: 15,
        paddingVertical: 4,
        backgroundColor: "#D9D9D9",
        color: "#000",
        marginHorizontal: 4,
        marginVertical: 4,
        borderRadius: 4,
        fontSize: 13,
    },
    btnRed: {
        backgroundColor: "#B8101F",
        // marginRight: 10,
        // marginTop: 10,
        color: "#fff"
    },
    flexRowCheckFilter: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 8,
    },
    boderBottom: {
        borderBottomColor: "#D9D9D9",
        borderBottomWidth: 1,
    },
    btnReset: {
        borderColor: "#B8101F",
        borderWidth: 1,
        padding: 7,
        textAlign: "center",
        marginBottom: 10,
        borderRadius: 4,
        fontWeight: '700',
        color: "#B8101F",
        width: (ww / 12 * 10) / 3,
    },

    btnFilter: {
        backgroundColor: "#B8101F",
        borderWidth: 1,
        padding: 7,
        textAlign: "center",
        marginBottom: 30,
        borderRadius: 4,
        fontWeight: '700',
        color: "white",
        width: ((ww / 12 * 10) - 10) / 3 * 2,
    },

    containerBtn: {
        flexDirection: "row",
        justifyContent: 'space-between'
    },

    listCategory: {
        marginHorizontal: 10,
        paddingVertical: 10,
    },

    listCategory1: {
        marginLeft: 10,
    },
    txtCategory: {
        color: "#000",
        fontSize: 13,
    },
    txtQuantity: {
        color: "#9F9F9F"
    },
    childListCategory: {
        paddingHorizontal: 15,
    },
    groupItem: {
        paddingVertical: 8
    },
    //
    attr: {
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: "#ededed",
        alignItems: "center",
    },
    attrName: {
        color: "#000"
    },
    value: {
        color: "#000",
        fontWeight: '700',
    },
    address1: {
        width: ww / 2 - 5,
        paddingHorizontal: 10,
        paddingVertical: 0,
        fontSize: 13,
        color: "#000",
    },
    btnSave: {
        textAlign: "center",
        padding: 10,
        fontWeight: "700",
        color: "#fff",
        backgroundColor: "#B8101F",
        borderRadius: 4,
        margin: 10,
    },
    category: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});