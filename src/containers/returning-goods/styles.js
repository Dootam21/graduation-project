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
    containerFluid: {
        flex: 1,
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
        marginLeft: 20,
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
    //bat dau
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

    //
    flexRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    w50: {
        width: "50%"
    },
    btnA: {
        fontWeight: "600",
        color: "#000",
        backgroundColor: "#F1F8FF",
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    btnB: {
        fontWeight: "600",
        color: "#000",
        textAlign: "center",
        backgroundColor: "#B8101F",
        paddingHorizontal: 10,
        paddingVertical: 8,
        color: "#fff",
        fontSize: 16,
    },
    borderBottom: {
        borderBottomColor: "#dddddd",
        borderBottomWidth: 1,
    },
    text: {

    },
    text1: {
        color: "#000",
        fontSize: 13,
    },
    text2: {
        fontWeight: "600",
        fontSize: 12,
        color: '#000'
    },
    text3: {
        fontWeight: "600",
        fontSize: 12,
        color: '#000'
    },
    text4: {
        fontWeight: "600",
        fontSize: 12,
        color: '#000'
    },
    placeholderStyle: {
        fontSize: 12,
    },
    input1: {
        padding: 0,
        color: "red",
        fontSize: 10
    },
    input2: {
        padding: 0,
        fontSize: 13,
    },
    item2: {
        fontWeight: "600",
        color: "#000",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderBottomColor: "#dddddd",
        borderBottomWidth: 1,
    },
    item3: {
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    //
    flexRow1: {
        flexDirection: "row",
        marginVertical: 4,
        marginBottom: 1,
        paddingBottom: 4,
        borderBottomColor: "#dddddd",
        borderBottomWidth: 1,
    },
    txtChonNCC: {
        fontSize: 14,
        width: ww / 2,
        padding: 6,
        color: "#000"
    },
    btnChon: {
        backgroundColor: "#B8101F",
        fontSize: 12,
        color: "#fff",
        width: ww / 2 - 10,
        paddingVertical: 8,
        borderRadius: 8,
        paddingHorizontal: 12,
    },
    flexRowDate: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        alignItems: "center",
        borderBottomColor: "#E9E8E8",
        borderBottomWidth: 10,
    },
    datePicker: {
        width: ww / 2,
    },
    textDate: {
        color: "#000",
        fontSize: 13,
    },
    btnConfirm: {
        color: "#fff",
        backgroundColor: "green",
        padding: 10,
        textAlign: "center",
        fontWeight: "700",
        margin: 5,
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
        fontWeight: "700",
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
        maxWidth: "40%",
    },
    cardLeft: {
        maxWidth: "60%",
    },
    textStatus: {
        textAlign: "center",
        color: "#fff",
        fontWeight: "700"
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
        fontWeight: "700",
        color: "#000",
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
    //txt
    txtSP: {
        color: "#000",
    },
    clblack: {
        color: "#000"
    },
    bgYellow: {
        backgroundColor: "#F1C40F"
    },
    //
    centeredView: {
        backgroundColor: "#fff",
        width: ww / 12 * 11,
        left: ww / 24,
        top: ww / 4,
        borderRadius: 6,
        zIndex: 1,
        paddingHorizontal: 30,
        height: wh * 0.6,
        position: "relative"
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
        marginTop: 20,
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
        fontWeight: "700",
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
        marginRight: 80,

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
    padding10: {
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 10,
    },
    pricePT: {
        fontSize: 14,
        color: "#fff",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
        fontWeight: "700",
    },
    posBottom: {
        position: "absolute",
        bottom: 10,
        width: "100%",
        marginBottom: 0,
    },
    height100: {
        height: "100%",
    },
    centeredView1: {
        justifyContent: "space-between"
    },
    addElement: {
        color: "#000",
        paddingVertical: 10,
        borderBottomColor: "#9d9d9d",
        borderBottomWidth: 0.5,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    paddingH0: {
        paddingHorizontal: 0,
    },
    paddingH10: {
        paddingHorizontal: 10,
    },
    modalView1: {
        height: wh * 0.6 - 50,
    },
    textAttr: {
        color: "#000",
        fontSize: 13,
    },
    //
    mr10: {
        marginRight: 15,
    },
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
        paddingVertical: 10,
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
    flexIcon1: {
        width: ww - 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        backgroundColor: "#F1F8FF"
    },
    datePicker: {
        width: ww / 2 - 15,
    },
    txtChose: {
        fontSize: 15,
        color: "#000",
        fontWeight: "700",
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
    centeredViewS: {
        backgroundColor: "#fff",
        width: ww / 12 * 11,
        left: ww / 24,
        borderRadius: 10,
        zIndex: 1,
        position: "absolute",
        bottom: 70,
    },
    centeredView1: {
        bottom: 0,
        backgroundColor: "#fff",
        width: ww / 12 * 11,
        borderRadius: 10,
        zIndex: 1,
        left: ww / 24,
        position: "absolute",
        bottom: 10,
    },
    txtClose: {
        padding: 15,
        color: "#3598DB",
        textAlign: 'center',
        fontWeight: "700",
        fontSize: 16,
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
    //
    flexRowCh: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 5,
        paddingVertical: 3,
    },
    txtMaLK: {
        fontWeight: "700",
        color: "#000",
    },
    txtCode: {
        color: "#B8101F"
    },
    btnLoad: {
        paddingHorizontal: 16,
        paddingVertical: 7,
        backgroundColor: "#2DCC70",
        borderRadius: 4,
    },
    btnLoadLK: {
        width: ww / 3 - 12,
        textAlign: "center",
        fontSize: 16,
        fontWeight: "600",
        color: "#fff",
        backgroundColor: "#B8141C",
        padding: 8,
        borderRadius: 4,
    },
    bgGreen: {
        backgroundColor: "#2DCC70"
    },
    bgCancle: {
        backgroundColor: "#808080"
    },
    listHollow: {
        textAlign: "center",
        fontWeight: "700",
        color: "#000",
        padding: 10,
    },
    flexRowNT: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        backgroundColor: "#EE080A",
        padding: 6,
        borderRadius: 4,
    },
    txtNoti: {
        color: "#fff",
        fontSize: 12,
    },
    flexEnd: {
        alignItems: 'flex-end',
    },
    //
    flexRowPT: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderBottomColor: '#DCDCDC',
        borderBottomWidth: 0.5
    },
    tongTien: {
        fontWeight: "700",
        fontSize: 16,
        color: "#000",
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    ghiChu: {
        padding: 10,
        borderBottomWidth: 10,
        borderTopWidth: 10,
        borderColor: '#EBEBEB',
    },
    textAlignVertical: {
        textAlignVertical: 'top',
    },
    btnConFirmPT: {
        padding: 10,
        margin: 5,
        textAlign: 'center',
        color: "#fff",
        fontWeight: "600",
        backgroundColor: "red",
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
    textCenter: {
        textAlign: "center",
    },
    borderRight: {
        borderColor: "#ddd",
        borderRightWidth: 0.5,
        padding: 7,
    },
    phuThuChi: {
        backgroundColor: "red",
        color: "#fff",
        padding: 4,
        borderRadius: 4,
        fontSize: 13,
    },
    txtRight: {
        alignItems: "flex-end"
    },
    //
    mt0: {
        marginTop: 0,
        paddingHorizontal: 10,
    },
    txtChonNCC1: {
        fontWeight: "500",
        color: "#000"
    },
    textNCC: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        color: "#000",
        fontWeight: "700",
        fontSize: 15,
    },
    textNCC1: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        color: "#000",
        fontWeight: "700",
        fontSize: 15,
    },
    //
    flexDate: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 5,
    },
    inPutDatte: {
        borderWidth: 1,
        borderColor: "#808080",
        width: 120,
        marginRight: 10,
        padding: 8,
        textAlign: "center",
        fontSize: 16,
    },
    flexRowDate: {
        flexDirection: "row",
        alignItems: "center",
    },
    txtDate: {
        width: 80,
    },
    productImage: {
        width: 60,
        height: 60,
        marginRight: 10,
    },
    flexRowProduct: {
        justifyContent: "space-between",
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderBottomColor: "#d9d9d9",
        borderBottomWidth: 1,
        width: ww - 10,
    },
    productTxt: {
        fontSize: 16,
        fontWeight: "500",
        textAlign: "right"
    },
    flexEndE: {
        justifyContent: "flex-end",
        marginBottom: 10,
    },
    productName: {
        fontWeight: '700',
        color: "#333"
    },
    gpTxt: {
        marginRight: 8,
    },
    txtDate1: {
        fontSize: 13,
    },
    txtNguon: {
        maxWidth: ww / 2,
    },

    //
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-start',
        position: 'absolute',
        top: 130,
        bottom: 60,
        left: 0,
        right: 0,
        zIndex: 4
    },
    modalOverlay2: {
        flex: 1,
        justifyContent: 'flex-start',
        position: 'absolute',
        top: 100,
        bottom: 60,
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
    xxxsda: {
        top: 64,
        bottom: 54,
    },
    btnRed: {
        backgroundColor: "#B8101F",
        marginRight: 10,
        marginTop: 10,
        color: "#fff"
    },

    modalOverlay1: {
        flex: 1,
        justifyContent: 'flex-start',
        position: 'absolute',
        top: 90,
        bottom: 54,
        left: 0,
        right: 0,
        zIndex: 4
    },


    //upload images
    chonImage: {
        flexDirection: "row",
        padding: 10,
        backgroundColor: '#E1F1FC',
        alignItems: "center",
    },
    viewImage: {
        backgroundColor: "#E1F1FC",
        flexDirection: "row",
        flexWrap: 'wrap',
    },
    textImage: {
        fontWeight: '700',
        color: "#000",
        paddingVertical: 6,
    },
    iconImage: {
        marginLeft: 14,
    },
    uploadImage: {
        width: ww / 4 - 10,
        height: ww / 4 - 10,
        borderRadius: 6,
    },
    boxUploadImage: {
        margin: 5,
    },
    deleteImage: {
        position: "absolute",
        bottom: 0,
        left: 0,
        paddingHorizontal: 8,
        paddingVertical: 6,
        backgroundColor: "#000000b3",
        borderRadius: 6,
    },
    //
    flexPhone: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 10,
    },
    txtPhone: {
        fontWeight: "700",
        color: "#000000",
        marginBottom: 5,
    },
    thongtinChung: {
        fontWeight: "700",
        color: "#000000",
        padding: 10,
        backgroundColor: "#F5F5F5",
    },
    //
    attrValue: {
        fontWeight: "600",
        color: "#000000",
    },
    ghiChux: {
        padding: 10,
    },
    txtNameAttr: {
        color: "#000000",
    },
    attrValueGhiChu: {
        fontWeight: "700",
        color: "#E95260",
        marginTop: 5,
    },
    //cardItem
    cardItemProduct: {
        flexDirection: "row",
        // width: "100%",
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        paddingBottom: 2,
        borderBottomColor: "#EEF0EF",
        backgroundColor: "#fff",
        alignItems: 'center',

    },
    imgProduct: {
        width: 70,
        height: 70,
        backgroundColor: "#EEF0EF",
        borderRadius: 10,
        marginRight: 10,
    },

    headerCenter: {
        width: '60%',
        justifyContent: "center",
        alignItems: 'center',
    },

    titletao: {
        color: "#fff",
        fontWeight: '700',
        textAlign: 'center',
        width: "100%",
        fontSize: 13,
    },

});