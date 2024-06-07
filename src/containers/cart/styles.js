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
        color: "#000",
        lineHeight: 16,
        fontSize: 13
    },

    clback1: {
        color: "red",
        // lineHeight: 16,
        fontSize: 13,
        marginLeft: 5,
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        textDecorationColor: "red",
        textAlignVertical: "center",

    },
    bold: {
        fontWeight: '700',
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
        fontWeight: '700',
        width: "25%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'flex-end',
    },

    title: {
        color: "#fff",
        fontWeight: '700',
        textAlign: 'center',
        width: "50%",
        fontSize: 13,
    },
    //
    bodyTop: {
        padding: 5,
        flexDirection: "row",
        alignItems: 'center',
    },
    btnMyCart: {
        padding: 8,
        backgroundColor: "red",
        borderRadius: 4,
        color: "#fff",
        fontSize: 13,
    },
    customer: {
        backgroundColor: "#E1F1FC",
        paddingHorizontal: 10,
        paddingVertical: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    hText: {
        fontWeight: '700',
        color: "#000",
        fontSize: 13,
    },

    hText1: {
        color: "#000",
        fontSize: 13,
    },
    listItem: {
        fontWeight: '700',
        paddingHorizontal: 10,
        color: "#000",
        paddingVertical: 6,
        backgroundColor: "#f2f2f2",
        fontSize: 13,
    },
    //
    cardItem: {
        flexDirection: "row",
        backgroundColor: "#fff",
        padding: 6,
        borderBottomColor: "#EEF0EF",
        // borderBottomWidth: 10,
    },
    cardContent: {
        flexDirection: "row",
        justifyContent: 'space-between',
        flex: 1,
        paddingLeft: 6,
        alignItems: 'center',
    },
    thumbnail: {
        width: 64,
        height: 64,
        borderRadius: 3,
    },
    iconList: {
        flexDirection: "row",
        marginTop: 10,
        paddingRight: 10,
        alignItems: 'center',
    },
    warningIcon: {
        marginRight: 10,
    },
    itemInfo: {
    },
    name: {
        fontWeight: '700'
    },
    textGroup: {
        flexDirection: "row",
    },
    bgGrey1: {
        height: 10,
        backgroundColor: "#f2f2f2",
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
        color: "#000",
    },
    soluong: {
        fontWeight: '700',
        color: "red",
    },

    soluongcu: {
        // position: "absolute",
        borderRadius: 50,
        height: 14,
        width: 14,
        backgroundColor: "#EB0B01",
        fontSize: 10,
        textAlign: "center",
        textAlignVertical: "center",
        fontWeight: '600',
        color: "#fff",
        textAlign: "center",
        marginLeft: 5
    },

    //color status
    red: {
        backgroundColor: "red"
    },
    // sub footer
    groupItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    flexRow: {
        flexDirection: "row",
        paddingVertical: 6,
        paddingHorizontal: 8,
        justifyContent: 'space-between',
    },
    flexRow2: {
        flexDirection: "row",
        paddingVertical: 6,
        paddingHorizontal: 8,
    },
    flexColumn: {
        flexDirection: "column",
        width: (ww / 2) - 1,
    },

    flexColumnStatus2: {
        flexDirection: "column",
        width: ww,
    },
    btnConfirm: {
        textAlign: "center",
        backgroundColor: "#B8101F",
        padding: 8,
        justifyContent: "center",
        color: "#fff",
        fontWeight: '700',
        fontSize: 13,
    },

    btnReturn: {
        textAlign: "center",
        backgroundColor: "grey",
        justifyContent: "center",
        color: "#fff",
        fontWeight: '700',
        fontSize: 13,
        padding: 8,
    },
    textSubf: {
        color: "#000",
        fontSize: 12,
    },
    textSubf1: {
        color: "#000",
        fontSize: 20,
    },
    textNote: {
        color: "#9d9d9d",
    },
    //// order detail
    txtNote: {
        fontSize: 12,
        color: "red",
        padding: 10,
    },
    groupIcon: {
        flexDirection: "row",
    },
    inputGroup: {
        flexDirection: "row",
        alignItems: 'center',
        width: "85%",
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#d9d9d9",
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    input: {
        padding: 0,
        marginLeft: 6,
        width: '100%'
    },
    bntGiabuon1: {
        width: "15%"
    },
    bntGiabuon: {
        textAlignVertical: 'center',
        color: '#000',
        fontWeight: '600',
        textAlign: 'right',
        fontSize: 12,
    },

    btnConfirm1: {
        flex: 1,
        verticalAlign: "middle"
    },
    flexRow1: {
        paddingVertical: 2,
        backgroundColor: "#F5F5F5",
    },
    statusColor: {
        height: 5,
    },
    //modal
    centeredView: {
        // backgroundColor: "#fff",
        // width: ww / 12 * 11,
        // left: ww / 24,
        // top: ww / 1.5,
        // borderRadius: 10,
        // zIndex: 1,
        // paddingHorizontal: 40,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 3,
        backgroundColor: 'rgba(000, 0, 0, 0.3)',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 40,
        width: ww / 12 * 11,
    },
    modalBackdrop: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(000, 0, 0, 0.3)',
    },
    flexColumn1: {
        flexDirection: "row",
        alignItems: "center"
    },
    txtVal: {
        fontSize: 13,
        marginLeft: 12,
        borderBottomColor: "#DCDCDC",
        borderBottomWidth: 0.5,
        flex: 1,
        paddingVertical: 14,
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
    inputSL1: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 17,
        textAlignVertical: "top",
    },

    textCenter: {
        textAlign: "center",
    },
    borderRight: {
        borderColor: "#ddd",
        borderRightWidth: 0.5,
        padding: 7,
    },
    //chon gia buon
    centeredViewCL: {
        backgroundColor: "#fff",
        width: ww / 12 * 11,
        left: ww / 24,
        top: wh - 260,
        borderRadius: 10,
        zIndex: 1,
    },
    centeredView1CL: {
        bottom: 0,
        backgroundColor: "#fff",
        width: ww / 12 * 11,
        borderRadius: 10,
        zIndex: 1,
        top: wh - 250,
        left: ww / 24,
    },
    txtClose: {
        padding: 15,
        color: "#3598DB",
        textAlign: 'center',
        fontWeight: '700',
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
    modalTextCL: {
        textAlign: 'center',
        fontSize: 12,
        paddingVertical: 10,
    },
    activeCL: {
        color: "#B8101F"
    },
    borderBottom: {
        borderBottomColor: "#DCDCDC",
        borderBottomWidth: 0.5,
    },
    // flexRowCF
    flexRowCF: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderBottomColor: "#DCDCDC",
        borderBottomWidth: 0.5,
    },
    attrName: {
        color: "#000",
        fontSize: 13,
    },
    value: {
        width: ww / 2 - 5,
        paddingHorizontal: 10,
        paddingVertical: 0,
        fontSize: 12,
        color: "#000",
    },
    //
    Gender: {
        flexDirection: "row",
        margin: 5,
    },
    boxGender: {
        flexDirection: "row",
        width: ww / 2,
    },
    boxGender1: {
        flexDirection: "row",
        width: ww / 3,
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
    //
    flexRowDate: {
        flexDirection: "row",
        alignItems: "center",
    },
    txtDate: {
        width: ww / 2 - 30,
        color: '#000',
        textAlignVertical: "center",
        marginBottom: 20,
    },
    groupItemX: {
        borderTopColor: "#ddd",
        borderTopWidth: 10,
        borderBottomColor: "#ddd",
        borderBottomWidth: 10,
    },
    txt1: {
        color: '#000',
        marginHorizontal: 10,
        paddingVertical: 10,
    },
    ///
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
    attrName1: {
        fontSize: 13,
        color: "#000",
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    value1: {
        fontSize: 13,
        color: "#000",
        paddingHorizontal: 10,
        paddingTop: 0,
        textAlignVertical: "top"
    },
    padding10: {
        paddingVertical: 12,
    },
    //
    txtPhone: {
        color: "#000",
    },
    txtPhoneNumber: {
        fontWeight: '700',
    },
    ipGroup: {
        padding: 5,
    },
    //chup man hinh
    btnShare: {
        backgroundColor: "#E84C3D",
        color: "#fff",
        fontWeight: '700',
        textAlign: "center",
        padding: 10,
    },
    flexRowBtn: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    btnShareW50: {
        width: ww / 2 - 3,
        marginTop: 6,
    },
    //
    txtPrinter: {
        color: "#000",
        fontSize: 13,
    },
    txtPrinterStatus: {
        color: "#B8101F"
    },
    btnPrinter: {
        color: "#3598DB",
        fontWeight: '700',
        fontSize: 13,
    },
    flexRowPrin: {
        flexDirection: 'row',
        flexWrap: "wrap"
    },
    btnPrin: {
        padding: 10,
        color: "#fff",
        fontWeight: '700',
        textAlign: "center",
        backgroundColor: "#fff",
        width: ww / 2,
        fontSize: 13,
    },
    btnPrin1: {
        backgroundColor: "#2DCC70",
    },
    btnPrin2: {
        backgroundColor: "#2D3E50",
    },
    btnPrin3: {
        backgroundColor: "#E84C3D",
    },
    //
    felxRowOder: {
        alignItems: "center",
        backgroundColor: "grey",
        height: "100%",
    }
    ,
    viewOrder: {
        width: ww,
        backgroundColor: "#fff",
        height: '100%',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    flexRowConF: {
        flexDirection: "row",
    },
    nameCustomer: {
        textAlign: "center",
        fontWeight: '700',
        color: "#000",
        fontSize: 16,
    },
    txtOrder: {
        fontSize: 12,
        color: "#000",
        marginVertical: 2,
    },

    txtMinus: {
        fontSize: 25,
        color: "#000",
        marginVertical: 2,
        fontWeight: '600',
        textAlign: "center",
    },


    nameCustomer1: {
        textAlign: "center",
        fontWeight: '700',
        color: "#000",
        fontSize: 20,
    },
    txtOrder2: {
        fontSize: 20,
        color: "#000",
        marginVertical: 2,
    },
    txtOrder1: {
        fontSize: 16,
        color: "#000",
        marginVertical: 2,
    },
    txtOrderTitle: {
        textAlign: "center",
        fontWeight: '700',
    },
    flexRowPrint: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 2,
    },

    flexRowPrint1: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 2,
    },

    flexRowPrint1: {
        flexDirection: "row",
        // justifyContent: "space-between",
        marginVertical: 2,
    },
    txtCenter: {
        textAlign: "center"
    },
    boxQrCode: {
    },
    qrCode: {
        width: ww * 0.3,
        height: ww * 0.3,
    },
    //
    txtThanhToan: {
        textAlign: "center",
        color: "#fff",
        padding: 10,
        margin: 5,
        backgroundColor: "#2DCC70",
        fontWeight: '600',
    },
    btnEditNote: {
        fontWeight: '700',
        color: "#fff",
        marginLeft: 12,
    },
    flexEdit: {
        width: ww / 2 - 10,
        textAlign: "center",
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#B8101F",
        padding: 10,
        borderRadius: 6,
    },
    //
    paddingH10: {
        paddingHorizontal: 10
    },
    bgWhite: {
        backgroundColor: "#fff"
    },

    textRed: {
        color: "red"
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




    ///
    emptyCart: {
        paddingTop: 20,
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 15,
    },
    containCart: {
        flex: 1,
    },




    /// ghi chu
    txtGhiChu: {
        color: 'red',
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: "#d9d9d9",
        fontSize: 13,
    },

    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-start',
        position: 'absolute',
        top: 100,
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

    btnFindBluetooth: {
        backgroundColor: '#b8101f',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textBtnFindBluetooth: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
    bluetoothDevices: {
        fontWeight: '500',
        color: '#000',
        fontSize: 14,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderColor: '#d9d9d9',
    },
    titleBluetoothDevice: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontSize: 16,
    }
});