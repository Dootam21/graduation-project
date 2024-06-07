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
        paddingVertical: 15,
    },
    headerLeft: {
        width: "25%",
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: "center",
    },
    headerRight: {
        fontWeight: "700",
        width: "25%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'flex-end',
    },

    title: {
        color: "#fff",
        fontWeight: "700",
        textAlign: 'center',
        width: "50%",
        fontSize: 13,
    },

    item: {
        marginLeft: 12,
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
    swiperContainer: {
        height: ww * (160 / 375),
        backgroundColor: "#757575",
    },

    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    editPictures: {
        position: "absolute",
        right: 0,
        bottom: 0,
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#17130aa6",
    },
    attr: {
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#ededed",
        alignItems: "center",
    },
    attrName: {
        color: "#000",
    },
    value: {
        color: "#000",
        fontWeight: "700",
    },
    txtTitle: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        backgroundColor: "#E9E9E9"
    },
    clRed: {
        color: "#FE0A09"
    },

    txtAddSubcode: {
        backgroundColor: "#2DCC6F",
        margin: 10,
        padding: 10,
        textAlign: "center",
        color: '#fff',
        fontWeight: "700",
    },

    ///modal
    modalContainer: {
        backgroundColor: "#fff",
        width: "75%",
        top: '35%',
        verticalAlign: "middle",
        left: "15%",
        borderRadius: 8,
        zIndex: 2,
        position: "absolute",
    },
    modalTitle: {
        paddingHorizontal: 16,
        paddingVertical: 15,
        borderBottomColor: "#ddd",
        borderBottomWidth: 0.5,
        fontWeight: "600",
        color: 'black',
        fontSize: 17
    },
    btnGroupConfirm: {
        flexDirection: "row",
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
        color: "blue",
        fontSize: 17,
        padding: 8,
    },
    inputSL: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 17,
    },
    //
    emptyList: {
        fontWeight: "700",
        textAlign: "center",
        color: "black",
        padding: 10,
    },
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
    inputsearch: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        height: 32,
        flex: 1,
    },
    iconSearch: {
        width: 16,
        height: 16,
    },
    textNCC: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        color: "#000",
        fontWeight: "700",
        fontSize: 15,
    }
    , btnCreate: {
        padding: 10,
        backgroundColor: "#B8101F",
        color: "#fff",
        fontWeight: "700",
        fontSize: 15,
        textAlign: "center",
    },

    //table
    headTable: {
        backgroundColor: '#6674B5',
        textAlign: "center",
    },
    textTable: {
        padding: 10,
        textAlign: "center",
    },
    //
    inventory: {
        fontWeight: "700",
        paddingHorizontal: 10,
        color: "#000",
        paddingVertical: 6,
        backgroundColor: "#EAEAEA",
    },
    flexBox: {
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 6,
        alignItems: "center",
    },
    boxTitle: {
        fontWeight: "500",
        color: "#000",
        marginRight: 16,
    },
    //
    totalOrder: {
        padding: 8,
    },
    txt1: {
        fontWeight: "700",
        fontSize: 13,
        color: "#000"
    },
    boxInfo1: {
        flexDirection: "row",
        marginHorizontal: 5,
    },
    boxInfo: {
        width: ww / 3 - 20,
        marginHorizontal: 5
    },
    txtBox: {
        textAlign: "center",
        backgroundColor: "#EAEAEA",
        borderRadius: 6,
        paddingHorizontal: 4,
        paddingVertical: 10,
        fontWeight: "700",
        fontSize: 13,
        color: "#000"
    },
    txtBoxHeader: {
        padding: 12,
        backgroundColor: "#B8101F",
        color: "#fff"
    },
    txtTile: {

    },
    //
    btnGroupFt: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    btnFilter: {
        padding: 10,
        width: ww / 2 - 15,
        fontWeight: "700",
        color: "#000",
    },
    //
    centeredView: {
        backgroundColor: "#fff",
        width: ww / 12 * 11,
        left: ww / 24,
        borderRadius: 10,
        zIndex: 1,
        position: "absolute",
        bottom: 70,
    },
    centeredView1: {
        backgroundColor: "#fff",
        width: ww / 12 * 11,
        borderRadius: 10,
        zIndex: 1,
        left: ww / 24,
        position: "absolute",
        bottom: 10,
    },
    centeredView2: {
        backgroundColor: "#fff",
        width: ww / 12 * 11,
        borderRadius: 10,
        zIndex: 1,
        left: ww / 24,
        position: "absolute",
        bottom: 10,
    },
    modalBackdrop: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(000, 0, 0, 0.3)', // Transparent red color (adjust opacity as needed)
    },
    txtClose: {
        padding: 15,
        color: "#3598DB",
        textAlign: 'center',
        fontWeight: "700",
        fontSize: 16,
    },
    txtFilter: {
        textAlign: 'center',
        fontSize: 16,
        borderTopColor: "#DCDCDC",
        borderTopWidth: 0.5,
        paddingVertical: 15,
        color: "#3598DB",
    },
    modalText: {
        textAlign: 'center',
        fontSize: 12,
        paddingVertical: 10,
    },
    activeCL: {
        color: "#B8101F"
    },
    flexIcon: {
        flexDirection: "row",
        alignItems: "center",
    },
    datePicker: {
        width: ww / 2 - 15,
    },
    txtChose: {
        fontSize: 15,
        color: "#000",
        fontWeight: "700",
    },
    flexIcon1: {
        width: ww - 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        backgroundColor: "#F1F8FF"
    },
    groupElement: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    element: {
        justifyContent: "center",
        alignItems: "center",
        width: ww / 2 - 1,
        padding: 10,
        borderBottomWidth: 0.5,
        borderColor: "#E9E9E9",
    },
    bdRight: {
        borderRightWidth: 0.5,
        borderColor: "#E9E9E9",

    },
    bdBottom: {
        borderBottomWidth: 0.5,
        borderColor: "#E9E9E9",
    },
    txtElemet: {
        color: "#000",
        fontSize: 12,
    },
    bold: {
        fontWeight: "600",
    },
    mt4: {
        marginTop: 4,
    },
    borderTop: {
        backgroundColor: "#E9E9E9",
        padding: 1,
        height: 10,
    },
    padding10: {
        padding: 10,
    },
    paddingT: {
        paddingTop: 10,
    },
    //
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
    //
    textCenter: {
        textAlign: "center",
    },
    groupContent: {
        padding: 15,
    },
    modalTitleTQ: {
        color: "#000",
        fontWeight: "700",
        marginBottom: 3,
    },
    modalAttr: {
        color: "#000",
        fontSize: 12,
    },
    borderRight: {
        borderRightWidth: 0.5,
        borderRightColor: "#E9E9E9"
    },
    flexRow: {
        flexDirection: "row",
        alignItems: "center"
    },
    mr6: {
        marginRight: 6,
    },
    //
    name: {
        fontWeight: "700",
        color: "#000",
        fontSize: 13,
        marginRight: 6,
    },
    flexRowBW: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    txtChonNCC: {
        fontWeight: "500",
        color: "#000"
    },
    //
    cancel: {
        borderColor: "#ddd",
        borderRightWidth: 0.5,
        fontWeight: "600",
    },
    cancelModal: {
        padding: 10,
        textAlign: "center",
        color: "#0172B1",
        fontWeight: "600"
    },
    listItem: {
        zIndex: 2,
        backgroundColor: "#fff",
        width: ww,
        right: 0,
        height: wh * 6 / 10,
    },
    Modal: {
        height: wh,
        zIndex: 10,
    },
    thumbnail: {
        height: 70,
        width: 70,
        borderRadius: 4,
    },
    flexRowitem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderBottomColor: "#dddddd",
        borderBottomWidth: 1,
    },
    txtProduct: {
        color: "#000",
        paddingLeft: 5,
    },
    txtProductName: {
        fontWeight: '700',
    },
    //
    quantity: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 5,
        paddingVertical: 8,
        backgroundColor: "#2DCC70",
        marginTop: 1,
    },
    color: {
        width: 18,
        height: 18,
        borderRadius: 4,
        marginRight: 5,
    },
    groupSize: {
        flexDirection: "row",
        marginRight: 15,
    },
    textColor: {
        color: "#000",
    },
    size: {
        fontWeight: '700',
        color: "#000"
    },
    soluong: {
        fontWeight: '700',
        color: "red",
    },
    cardItem: {
        flexDirection: "row",
        backgroundColor: "#fff",
        padding: 6,
        borderBottomColor: "#EEF0EF",
        alignItems: "center",
        // borderBottomWidth: 10,
    },
    cardContent: {
        flexDirection: "row",
        justifyContent: 'space-between',
        flex: 1,
        paddingLeft: 6,
    },
    iconList: {
        marginTop: 10,
        paddingRight: 10,
    },
    itemInfo: {
    },
    name1: {
        fontWeight: '700'
    },
    textGroup: {
        flexDirection: "row",
    },
    bgGrey1: {
        height: 10,
        backgroundColor: "#f2f2f2",
    },
    flexColumn1: {
        flexDirection: "row",
        alignItems: "center"
    },
    // centeredView1: {
    //     backgroundColor: "#fff",
    //     width: ww / 12 * 11,
    //     left: ww / 24,
    //     top: ww / 1.5,
    //     borderRadius: 10,
    //     zIndex: 1,
    //     paddingHorizontal: 40,

    // },
    txtVal: {
        fontSize: 13,
        marginLeft: 12,
        borderBottomColor: "#DCDCDC",
        borderBottomWidth: 0.5,
        flex: 1,
        paddingVertical: 14,
    },
    //
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-start',
        position: 'absolute',
        top: 130,
        bottom: 54,
        left: 0,
        right: 0,
        zIndex: 4
    },
    modal: {
        width: ww,
        backgroundColor: 'white',
        zIndex: 5,
    },
    modalBackdropFI: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền mờ
    },

    //
    cardItemS: {
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
    thumbnailS: {
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
    xxxsda: {
        top: 64,
        bottom: 54,
    },
    //
    tbFlexRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBlockColor: "#E9E9E9",
    },
    tbCell: {
        width: ww / 3,
        textAlign: 'center',
        paddingVertical: 6,

    },
    tbCellHead: {
        color: "#000",
        fontWeight: 500,
    },
    tbFlexRowHead: {
        backgroundColor: "#F1F8FF",
    },
    //
    tbFlexRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBlockColor: "#E9E9E9",
    },
    tbCell4: {
        width: ww / 4 - 5,
        textAlign: 'center',
        paddingVertical: 6,
        alignItems: 'center',
        textAlignVertical: "center",
        fontSize: 13,
        paddingHorizontal: 5,

    },
    tbCellHead: {
        color: "#000",
        fontWeight: 500,
    },
    tbFlexRowHead: {
        backgroundColor: "#F1F8FF",
    },
    imgProduct: {
        width: 30,
        height: 30,
        maxWidth: ww / 4,
    },
    // tbFlexColumn:{
    //     flexDirection: "column",
    // },
    //
    item1: {
        width: (ww - 12) / 2,
        borderWidth: 1,
        borderColor: "#EEF0EF",
        borderRadius: 6,
        textAlignVertical: 'center',
        height: 32,
        padding: 0,
        marginHorizontal: 3,
    },

    filter: {
        paddingHorizontal: 12,
        backgroundColor: "#F1F8FF",
        fontWeight: "700",
        color: "#000"
    },

    displayNameCustomer: {
        width: (ww - 12) / 2,
        borderWidth: 1,
        borderColor: "#EEF0EF",
        borderRadius: 6,
        textAlignVertical: 'center',
        height: 32,
        padding: 0,
        marginHorizontal: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontWeight: "700",
        backgroundColor: "#F1F8FF",
        color: "#000",
        alignItems: 'center',
    },
    btnLoc: {
        width: ww / 2 - 20,
        margin: 10,
        backgroundColor: '#B8141C',
        textAlign: 'center',
        padding: 8,
        color: "#fff",
        fontWeight: "700",
        borderRadius: 5,
    },
    FlexRowLoc: {
        flexDirection: 'row',
        marginTop: 10,
        // justifyContent: 'space-between',
    },


    // header: {
    //     backgroundColor: '#b8101f',
    //     flexDirection: 'row',
    //     paddingHorizontal: 15,
    //     paddingVertical: 8,
    //     height: 44,
    // },
    // headerLeft: {
    //     width: "20%",
    //     flexDirection: "row",
    //     justifyContent: 'flex-start',
    //     alignItems: "center",
    // },
    // headerRight: {
    //     fontWeight: '700',
    //     width: "20%",
    //     flexDirection: "row",
    //     alignItems: "center",
    //     justifyContent: 'flex-end',
    // },

    headerCenter: {
        width: '50%',
        justifyContent: "center",
        alignItems: 'center',
    },
    title: {
        color: "#fff",
        fontWeight: '700',
        textAlign: 'center',
        width: "100%",
        fontSize: 13,
    },
});