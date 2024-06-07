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

    headerCenter: {
        width: '50%',
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
    tienno: {
        backgroundColor: "#f5f5f5",
        position: "absolute",
        bottom: 54,
        right: 0,
    },
    tongno: {
        alignSelf: "flex-end",
        backgroundColor: "#B8101F",
        padding: 7,
        borderTopLeftRadius: 8,
        fontWeight: "600",
        fontSize: 12,
        color: "#fff",
    },
    //
    boxNCC: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10
    },
    thongtin: {
        paddingLeft: 10,
    },
    text1: {
        fontWeight: "600",
        fontSize: 12,
        color: "#000",
    },
    text2: {
        fontSize: 12,

    },
    text3: {
        color: "#B8101F",
        fontWeight: "600",
        fontSize: 12,
    },
    textGreen: {
        color: "#62b531",
        fontWeight: "600",
        fontSize: 12,
    },
    text4: {
        textAlign: 'center',
        paddingBottom: 10,
        fontSize: 10,
    },
    //
    avatar: {
        padding: 20,
        alignContent: "center",
    },
    thumbnail: {
        width: 60,
        height: 60,
        alignSelf: "center",
    },
    //
    attr: {
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#ededed",
        alignItems: "center",
    },
    attrName: {
        color: "#000",
        fontSize: 13,
    },
    value: {
        color: "#000",
        fontWeight: "700",
        fontSize: 13,
    },
    sectionHeader: {
        fontWeight: "700",
        paddingHorizontal: 10,
        color: "#000",
        paddingVertical: 6,
        backgroundColor: "#E8E8E8",
    },
    //
    col4: {
        flexDirection: "row",
    },
    col6: {
        flexDirection: "row",
    },
    col12: {
        flexDirection: "row",
    },
    btnGroup1: {
        backgroundColor: "#f3f3f3",
        borderTopColor: "#E8E8E8",
        borderTopWidth: 10,
    },
    btnItem: {
        textAlign: "center",
        paddingHorizontal: 10,
        paddingVertical: 2,
        backgroundColor: "#2DCB70",
        fontWeight: "600",
        fontSize: 14,
        justifyContent: "center",
        color: "#fff",
        margin: 5,
        justifyContent: "center",
        textAlignVertical: "center",
        flex: 1,
        minHeight: 40,
    },
    btnItem1: {
        width: ww / 3 - 10,
    },
    btnItem2: {
        width: ww / 2 - 10,
    },
    col12: {
        width: ww - 10,
    },

    //
    btnEditRate: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderBottomColor: "#E8E8E8",
        borderBottomWidth: 1,
    },
    currency: {
        fontWeight: "700",
        color: "#000",
        fontSize: 16,
    },
    exchangeRate: {
        color: "#000",
        fontSize: 14,
    },
    /// upload img
    chonImage: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: '#E1F1FC',
    },
    viewImage: {
        backgroundColor: "#E1F1FC",
        flexDirection: "row",
        flexWrap: 'wrap',
    },
    textImage: {
        fontWeight: "700",
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
    inputAdd: {
        paddingHorizontal: 10,
        borderBottomColor: "#E8E8E8",
        borderBottomWidth: 1,
        color: "#000",
        fontSize: 13,
    },
    address: {
        width: ww / 2 - 5,
        backgroundColor: "#B8101F",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        color: "white",
        fontSize: 12,
    },
    address1: {
        width: ww / 2 - 5,
        paddingVertical: 0,
        fontSize: 12,
        color: "#000",
    },
    btnGroupCurrency: {
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    checkbox1: {
        paddingHorizontal: 6,
        paddingVertical: 4,
        backgroundColor: "#E8E8E8",
        marginRight: 5,
        width: ww / 6 - 10,
        textAlign: "center",
        borderRadius: 4,
    },
    selectedCheckbox: {
        backgroundColor: 'red',
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
        bottom: 0,
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
        padding: 10,
    },
    inputSL: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 17,
    },
    btnAdd: {
        backgroundColor: "#2DCC70",
        textAlign: "center",
        fontWeight: "700",
        padding: 8,
        fontSize: 15,
        color: "#fff",
        borderRadius: 4,
    },
    pd3: {
        padding: 2,
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
    textCenter: {
        textAlign: "center",
    },
    cancel: {
        borderColor: "#ddd",
        borderRightWidth: 0.5,
        fontWeight: "600",
    },
    //
    modalThanhtoan: {
        backgroundColor: "#fff",
        width: ww,
        bottom: 0,
        verticalAlign: "middle",
        zIndex: 1,
        position: "absolute",
        borderTopLeftRadius:8,
        borderTopRightRadius:8,
    },
    txtThanhtoan: {
        textAlign: "center",
        paddingHorizontal: 10,
        paddingVertical: 12,
        color: "#000",
        fontSize: 12,
        borderTopLeftRadius:8,
        borderTopRightRadius:8,
        fontWeight: "700",
        backgroundColor: "#E8E8E8",
    },
    flexRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    btnThanhtoan: {
        padding: 10,
        justifyContent: "space-between",
    },
    txtT: {
        fontSize: 12,
    },
    colorBl: {
        color: "#000"
    },
    marginLeft10: {
        marginLeft: 10,
    },
    bgGrey: {
        backgroundColor: "#E8E8E8",
        height: 10,
    },
    btnEidt: {
        color: "#fff",
        fontSize: 16,
    },
    //
    boxAvatar: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
    },
    avatarImage: {
        borderRadius: 50,
    },
    textValidate: {
        color: 'red',
        marginLeft: 10,
    },
});