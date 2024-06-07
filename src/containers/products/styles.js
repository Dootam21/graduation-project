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
    containerFluid: {
        flex: 1,
    },
    //
    header: {
        backgroundColor: '#b8101f',
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    headerLeft: {
        width: "20%",
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: "center",
    },
    headerRight: {
        fontWeight: '700',
        width: "20%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'flex-end',
    },

    title: {
        color: "#fff",
        fontWeight: '700',
        textAlign: 'center',
        width: "60%",
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
        fontWeight: '700',
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
    swiperContainer: {
        height: ww * (275 / 375),
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
        paddingVertical: 4,
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
    sectionHeader: {
        fontWeight: '700',
        paddingHorizontal: 10,
        color: "#000",
        paddingVertical: 6,
        backgroundColor: "#E8E8E8",
    },

    sectionHeader1: {
        fontWeight: '700',
        paddingHorizontal: 10,
        color: "#000",
        paddingVertical: 6,
    },

    attrPrice: {
        justifyContent: "space-between",
        flexDirection: "row",
        borderBottomColor: "#ededed",
        alignItems: "center",
        width: ((ww - 20) / 2),

    },
    attr1: {
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderBottomWidth: 1,
        borderBottomColor: "#ededed",
        alignItems: "center",
    },

    paddingLeftPrice: {
        paddingLeft: 5,
    },
    
    paddingRightPrice: {
        paddingRight: 5,
    },
    //
    status: {
        color: "#fff",
        fontSize: 13,
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 6,
    },
    classify: {
        color: "#000"
    },
    secondhand: {
        backgroundColor: "#B8101F",
        width: "100%",
        borderRadius: 6,
        padding: 8,
    },
    textSecondhand: {
        color: "#fff",
        textAlign: "center",
        fontWeight: '500',
    },
    //
    inventory: {
        fontWeight: '700',
        paddingHorizontal: 10,
        color: "#000",
        paddingVertical: 6,
        backgroundColor: "#f2f2f2",
    },
    flexBox: {
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 6,
        alignItems: "center",
    },
    boxTitle: {
        fontWeight: '500',
        color: "#000",
        marginRight: 16,
    },
    //
    flexColum: {
        flexDirection: "column",

    },
    flexRow: {
        flexDirection: "row",
    },
    quantity: {
        backgroundColor: "#F1C40F",
        color: "#000",
        textAlign: "center",
        minWidth: 88,
        padding: 6,
        borderRadius: 50,
        marginBottom: 4,
        marginRight: 4,
    },
    size: {
        backgroundColor: "#B8101F",
        color: "#fff",
        textAlign: "center",
        minWidth: 88,
        padding: 6,
        borderRadius: 50,
        marginRight: 4,
    },
    bgGrey1: {
        backgroundColor: "#f2f2f2"
    },
    btnItem: {
        textAlign: "center",
        color: "#fff",
        fontWeight: '600',
        marginTop: 6,
        padding: 9,
        fontSize: 13,
    },
    bgRed: {
        backgroundColor: "#E84C3D"
    },
    bgRed1: {
        backgroundColor: "#B8101F"
    },
    bgBlue: {
        backgroundColor: "#3598DB",
        flex: 1,
    },
    bgBlue1: {
        backgroundColor: "#2D3E50"
    },
    bgGreen: {
        backgroundColor: "#2DCC70"
    }
    ,
    groupBtn: {
        flexDirection: "row",
    }
    ,
    flexWidth: {
        flex: 0.5,
    },
    btnAddItem: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E84C3D",
        padding: 9,
    },
    text: {
        color: "#fff",
        fontWeight: '700',
    },
    productInfo: {
        padding: 6,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    name: {
        fontWeight: '700',
        color: "#000",
        fontSize: 13,
        marginRight: 6,
    },
    productAttr: {
        borderBottomWidth: 1,
        borderBottomColor: "#ededed",
        justifyContent: "center",
        paddingHorizontal: 15,
    },
    attrName1: {
        color: "#000",
        textAlignVertical: "center",
        fontSize: 13,
    },
    inputValue: {
        padding: 4,
    },
    listItem: {
        backgroundColor: "#B8101F",
        borderRadius: 8,
        marginVertical: 2,
        paddingHorizontal: 10,
        paddingVertical: 6,
        color: "#fff"
    },
    //
    txtAddSubcode: {
        backgroundColor: "#2DCC6F",
        margin: 10,
        padding: 10,
        textAlign: "center",
        color: '#fff',
        fontWeight: '700',
    },

    ///modal
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
        paddingVertical: 16,
        borderBottomColor: "#ddd",
        borderBottomWidth: 0.5,
        fontWeight: '600',
        color: 'black',
        fontSize: 17
    },
    borderRight: {
        borderRightWidth: 0.5,
        borderRightColor: "#ddd",
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
    //upload img
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
        fontSize: 13,
        color: "#000",
    },
    txtmoney: {
        fontSize: 10,
        paddingHorizontal: 10,
        textAlign: "right",
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
    nhapSl: {
        fontSize: 14,
        fontWeight: '600',
        padding: 14,
        textAlign: "center",
        backgroundColor: "#E84C3D",
        color: "#fff",
        margin: 2,
    },
    btnLink: {
        borderTopColor: "#E8E8E8",
        borderTopWidth: 12,
    },
    btnComplete: {
        fontSize: 14,
        fontWeight: '600',
        padding: 14,
        textAlign: "center",
        backgroundColor: "#2BCD70",
        color: "#fff",
        margin: 2,
    },
    //
    checkBoxAll: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginHorizontal: 10,
        marginVertical: 6,
        alignItems: "center",
    },
    checkMark: {
        width: 20,
        height: 20,
        borderColor: "#2DCC70",
        borderRadius: 4,
        borderWidth: 1,
        marginLeft: 10,
    },
    checkMark1: {
        transform: [{ rotate: '45deg' }],
        borderColor: "#2DCC70",
        borderBottomWidth: 1.5,
        borderRightWidth: 1.5,
        width: 6,
        height: 13,
        marginLeft: 7,
    },
    checkboxText: {
        fontWeight: '700',
        color: "#000"
    },
    //
    columnContainer: {
        flexDirection: 'row',
        flexWrap: "wrap",
    },
    cardItem1: {
        width: ww / 3,
        paddingHorizontal: 5,
        marginBottom: 10,
    },
    thumbnail1: {
        width: news_list_item_left_width,
        height: news_list_item_left_width * 1.31,
    },
    card_content: {
        backgroundColor: "#141007",
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        color: '#fff',
        padding: 4,
    },
    namesp: {
        color: "#fff",
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 12,
    },
    pricesp: {
        color: "#fff",
        textAlign: 'center',
        fontSize: 12,
    },
    //
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
    selectedDropdown1: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    option: {
        zIndex: 1111,
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
    modalContainer: {
        backgroundColor: '#F0F0F0', // Replace with your desired background color
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    //modal
    centeredView: {
        backgroundColor: "#fff",
        width: ww / 12 * 10,
        paddingHorizontal: 30,
        paddingVertical: 30,
        top: ww / 2,
        left: ww / 12,
        borderRadius: 10,
        zIndex: 2,
    },
    inputNumber: {
        borderColor: "#EEF0EF",
        borderWidth: 1,
        width: "90%",
        padding: 0
    },
    flexRow1: {
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12
    },
    flexRow2: {
        width: "40%",
        alignContent: 'center',
        justifyContent: "center",
    },
    flexRow3: {
        width: "20%",
        textAlign: "center",
        justifyContent: "center"
    },
    line: {
        width: 14,
        height: 1,
        backgroundColor: "#000"
    },
    modalText: {
        color: "#000",
        fontSize: 13,
        fontWeight: '700',
        textAlign: "center",
        marginBottom: 12,
    },
    //
    flexRow4: {
        justifyContent: "center",
        alignItems: "center",
    },
    txtFilter: {
        padding: 4,
        borderBottomColor: "#000",
        borderBottomWidth: 1,
        color: "#000",
    },
    txtReset: {
        padding: 5,
        backgroundColor: "#B8101F",
        color: "#fff",
        borderRadius: 10,
        textAlign: "center",
        marginTop: 20,
    },
    colorRed: {
        color: "#B8101F",
    },
    //
    centeredView1: {
        backgroundColor: "#fff",
        top: ww / 1.5,
        left: ww / 12,
        paddingVertical: 15,
        paddingHorizontal: 0,
        zIndex: 1,
    },
    txtWarning: {
        textAlign: 'center',
        paddingBottom: 15,
        borderBottomColor: "#DCDCDC",
        borderBottomWidth: 0.5,
        marginBottom: 12,
        color: "#000"
    },
    btnOk: {
        textAlign: "center",
        color: "#3598DB",
        fontWeight: '700',
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
    flexBox1: {
        // borderBottomColor: "#DCDCDC",
        // borderBottomWidth: 1,
        paddingVertical: 20,
    },
    flexBox2: {
        marginTop: 15,
        justifyContent: "space-between",
    },
    mt15: {
        marginTop: 15,
    },
    btnSave: {
        margin: 2,
        textAlign: "center",
        padding: 12,
        backgroundColor: "#E84C3D",
        color: "#FFF",
        fontWeight: '700',
    },
    //
    swiperContainer1: {
        height: ww / 2,
    },
    swiperContainer2: {
        height: ww / 1.4,
    },
    //
    btnSaveGreen: {
        backgroundColor: "#2DCC70",
        margin: 0,
    },
    //txtChonSL
    txtChonSL: {
        color: "#000",
        fontWeight: '700',
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: "#F2F2F2",
        fontSize: 13,
    },
    txtName: {
        fontSize: 13,
        color: "#000",
        fontWeight: '700',
        textAlign: "center",
        paddingVertical: 5,
    },
    flexColumnColor: {
        flexDirection: "column",
    },
    txtTotal: {
        fontSize: 14,
        fontWeight: '700',
        padding: 8,
        color: "#000"
    },
    btnLuu: {
        fontWeight: '700',
        color: "#fff",
        backgroundColor: "#2DCC70",
        textAlign: "center",
        padding: 10,
        fontSize: 14,
    },
    suaGhiChu: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        fontSize: 13,
        color: "red"
    },
    textCenter: {
        textAlign: "center",
    },

    height10: {
        height: 10,
        backgroundColor: "#F2F2F2"
    },
    //
    txtChuThich: {
        padding: 5,
    },
    btnGroup1: {
        flexDirection: "row",
    },
    btnW: {
        width: ww / 2 - 4,
        textAlign: "center",
        padding: 8,
        fontWeight: '600',
        color: "#fff",
        margin: 2,
    },
    //
    centeredView3: {
        backgroundColor: "#fff",
        width: ww / 12 * 11,
        left: ww / 24,
        borderRadius: 10,
        zIndex: 1,
        position: "absolute",
        bottom: 70,
    },
    centeredView2: {
        bottom: 0,
        backgroundColor: "#fff",
        width: ww / 12 * 11,
        borderRadius: 10,
        zIndex: 1,
        left: ww / 24,
        position: "absolute",
        bottom: 10,
    },
    txtFilter1: {
        textAlign: 'center',
        fontSize: 16,
        borderTopColor: "#DCDCDC",
        borderTopWidth: 0.5,
        paddingVertical: 15,
        color: "#3598DB",
    },
    txtClose: {
        padding: 15,
        color: "#3598DB",
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 16,
    },
    modalText1: {
        textAlign: 'center',
        fontSize: 12,
        paddingVertical: 10,
    },
    modalText1: {
        textAlign: 'center',
        fontSize: 12,
        paddingVertical: 10,
    },
    //
    titleChiTiet: {
        fontWeight: "600",
        color: "#333",
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: "#f2f2f2",
    },
    productImage: {
        height: 70,
        width: 70,
        marginRight: 10,
    },
    productElement: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignItems: "center",
    },
    productName: {
        fontSize: 16,
        fontWeight: '700',
        color: "#333",
    },
    itemToggle: {
        backgroundColor: "#2DCC70",
        paddingHorizontal: 5,
    },
    nameColor: {
        fontWeight: "500",
        color: "#000",
    },
    sizeBox: {
        marginTop: 8,
        flexDirection: "row",
        alignItems: "center",
    },
    txtSize: {
        fontWeight: "500",
        color: "#000",
        marginRight: 5,
    },
    txtSizeX: {
        color: "#B8101F",
        fontWeight: "500",
        marginRight: 5,
    },
    txtSoluong: {
        fontSize: 12,
        fontWeight: "500",
        backgroundColor: "#B8101F",
        marginLeft: 5,
        width: 18,
        height: 18,
        color: "#FFFFFF",
        textAlign: "center",
        textAlignVertical: "center",
        borderRadius: 50,
    },
    boxItem: {
        borderBottomWidth: 2,
        borderBottomColor: "#FFFFFF",
        paddingBottom: 10,
        paddingTop: 10,
    },
    textValidate: {
        color: 'red',
        marginLeft: 10,
    },
    info: {
        flexDirection: 'row',
        textAlign: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    headerCenter: {
        width: '60%',
        justifyContent: "center",
        alignItems: 'center',
    },
    rowItem: {
        flexDirection: 'row'
    }
});
