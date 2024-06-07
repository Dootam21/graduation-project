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
        marginLeft: 30,
    },

    item1: {
        marginRight: 30,
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
    text4: {
        textAlign: 'center',
        paddingBottom: 10,
        fontSize: 10,
    },
    textGreen: {
        color: "#62b531",
        fontWeight: "600",
        fontSize: 12,
    },
    iconPlus: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: 'flex-end',
    },
    start: {
        alignItems: "center",
        justifyContent: 'center',
    },
    imgCustomer: {
        marginBottom: 6,
        alignItems: "center",
        justifyContent: "center"
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
    thumbnail1: {
        width: 30,
        height: 30,
        alignSelf: "center",
    },
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
        height: 40,
        justifyContent: "center",
        textAlignVertical: "center",
    },
    btnItem1: {
        width: ww / 3 - 10,
    },
    btnItem2: {
        width: ww / 2 - 10,
    },

    btnItem3: {
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
    ///
    chonImage: {
        flexDirection: "row",
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
        paddingHorizontal: 10,
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
    groupInput: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomColor: "#E8E8E8",
        borderBottomWidth: 1,
        paddingHorizontal: 10,
        width: ww,
    },
    inputName: {
        width: ww / 2 - 10,
        fontSize: 13,
        padding: 5,
    },
    groupBtn: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 8,
    },
    groupBtn1: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    txtAdd: {
        color: "blue",
        fontSize: 13,
        marginLeft: 10,
    },
    txtRemove: {
        color: "red",
        fontSize: 13,
        marginLeft: 10,
    },
    textAttr: {
        color: "#000",
        fontSize: 13,
    },
    //groupStart
    groupStart: {
        paddingHorizontal: 10,
    },
    iconStart: {
        marginRight: 15,
        marginVertical: 20,
    },
    //ghichu
    ghichu: {
        fontSize: 13,
        borderTopColor: "#E8E8E8",
        borderTopWidthWidth: 4,
        paddingHorizontal: 10,
        width: ww,
        borderTopColor: "#E8E8E8",
        borderTopWidth: 10,
        borderBottomColor: "#E8E8E8",
        borderBottomWidth: 1,
        marginBottom: 114,

    },
    inputGhichu: {
        textAlignVertical: "top"
    },
    //gender
    Gender: {
        flexDirection: "row",
        margin: 10,
    },
    boxGender: {
        flexDirection: "row",
        marginRight: 30
    },
    checkGender: {
        borderColor: "#494949",
        borderWidth: 2,
        width: 21,
        height: 21,
        marginRight: 10,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
    },
    checkboxText: {
        color: "#494949",
        textAlign: "center",
    },
    checkmark: {
        transform: [{ rotate: '45deg' }],
        borderColor: "#494949",
        borderBottomWidth: 1.5,
        borderRightWidth: 1.5,
        width: 6,
        height: 12,
        marginBottom: 4
    },

    //btnAddCustomer
    btnAddCustomer: {
        textAlign: "center",
        padding: 10,
        fontWeight: "",
        color: "#fff",
        backgroundColor: "#2DCC70",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    txtAddCustomer: {
        textAlign: "center",
        fontWeight: "700",
        color: "#fff",
        marginLeft: 10,
    },
    bgred: {
        backgroundColor: "#B8101F",
    },
    chonAll: {
        color: "#B8101F",
        fontWeight: "700",
        backgroundColor: ""
    },
    checkboxText1: {
        borderWidth: 2,
        borderColor: 'red'
    },
    boxCheckAll: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#E1F1FC",
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    checkboxText3: {
        width: 15,
        height: 15,
        backgroundColor: "green",
        borderRadius: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    checkboxText2: {
        transform: [{ rotate: '45deg' }],
        borderColor: "#fff",
        borderBottomWidth: 1,
        borderRightWidth: 1,
        width: 4,
        height: 8,
        marginBottom: 2
    },
    //bgorange
    bgorange: {
        backgroundColor: "#E84C3D",
        fontSize: 12,
    },
    //
    modalContainer2: {
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
        borderBottomWidth: 1,
        fontWeight: "600",
        color: 'black',
        fontSize: 17
    },
    btnGroupConfirm: {
        flexDirection: "row",
        borderTopColor: "#ddd",
        borderTopWidth: 1,
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
        padding: 10,
    },
    inputSL: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 17,
        textAlignVertical: 'top'
    },
    modalBackdrop: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(000, 0, 0, 0.5)', // Transparent red color (adjust opacity as needed)
    },
    //
    btnAddPhone: {
        paddingVertical: 10,
    },
    //
    btnChosePT: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: "#B8101F",
        borderRadius: 6,
        color: "#fff",
        fontWeight: "600",
        fontSize: 12
    },
    btnEidt: {
        color: "#fff",
        fontSize: 16,
    },
    avatarCustomer: {
        borderRadius: 250,
        width: 85,
        height: 85,
    },

    avatarCustomer1: {
        borderRadius: 250,
        width: 30,
        height: 30,
    },
    startCustomer: {
        marginTop: 4,
        flexDirection: "row",
        justifyContent: "center",
    },

    //
    centeredView: {
        backgroundColor: "#fff",
        width: ww / 12 * 11,
        left: ww / 24,
        bottom: 70,
        borderRadius: 10,
        zIndex: 1,
        position: "absolute"
    },
    centeredView1: {
        bottom: 0,
        backgroundColor: "#fff",
        width: ww / 12 * 11,
        borderRadius: 10,
        zIndex: 1,
        bottom: 10,
        left: ww / 24,
        position: "absolute",
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

    //
    modalThanhtoan: {
        backgroundColor: "#fff",
        width: ww,
        bottom: 0,
        verticalAlign: "middle",
        zIndex: 1,
        position: "absolute",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    txtThanhtoan: {
        textAlign: "center",
        paddingHorizontal: 10,
        paddingVertical: 12,
        color: "#000",
        fontSize: 12,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
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
    //
    flexRowAround: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    groupElement: {
        paddingHorizontal: 5,
    },
    txtElement: {
        fontSize: 11,
        marginVertical: 14,
    },
    column6: {
        width: ww / 2 - 10,
        textAlign: "center",
        padding: 8,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#959595",
        fontSize: 12,
        color: "#000",
    },
    column4: {
        width: ww / 3 - 10,
        textAlign: "center",
        padding: 8,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#959595",
        fontSize: 10,
        color: "#000",
    },
    txtTimKiem: {
        fontSize: 12,
        color: "#000",
        padding: 15,
        marginVertical: 10,
        backgroundColor: "#B8101F",
        width: ww / 10 * 8 - 20,
        textAlign: "center",
        borderRadius: 8,
        color: "#fff",
        fontWeight: "600"
    },
    txtDatLai: {
        fontSize: 12,
        color: "#000",
        padding: 15,
        backgroundColor: "#000",
        textAlign: "center",
        borderRadius: 8,
        color: "#fff",
        fontWeight: "600"
    },
    groupBtn2: {
        borderTopWidth: 1,
        borderTopColor: "#DCDCDC",
        marginTop: 10,
    },
    magTop: {
        // marginTop: -50,
        // zIndex: 0,
    },
    textCenter: {
        textAlign: "center",
        padding: 15,
    },
    borderRight: {
        borderColor: "#000",
        borderRightWidth: 0.5,
    },
    boxgioitinh: {
        flexDirection: "row",
        padding: 10,
    },
    avatarHeader: {
        width: 70,
        height: 70,
        borderRadius: 50,
    },
    boxAvatarHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
    },
    containerFluid: {
        flex: 1
    },
    flexStart: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    },
    textValidate: {
        color: 'red',
        marginLeft: 10,
    },
});


