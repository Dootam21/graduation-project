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
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 10,
        justifyContent: "space-between"
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center"
    },
    headerRight: {
    },

    title: {
        color: "#fff",
        fontWeight: "700",
        flex: 1,
        textAlign: 'center',
        width: "20%",
        fontSize: 15,
    },

    //
    btnInfor: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 12,
    },
    avatar: {
        width: 42,
        height: 42,
        borderRadius: 50,
        //
    },
    info: {
        paddingLeft: 10,
    },
    hdText: {
        textAlign: "right"
    },
    hotline: {
        fontWeight: "700",
        color: "#B2101D"
    },
    name: {
        fontWeight: "700",
        color: "#000"
    },
    //box
    headerBox: {
        textAlign: "center",
        fontWeight: "700",
        backgroundColor: "#f2f2f2",
        paddingVertical: 6,
        color: "#000",
        marginBottom: 10,
    },
    bodyBox: {
        paddingHorizontal: 5,
        marginBottom: 10,
    },

    row: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    col: {
        padding: 10,
        backgroundColor: "#B8101F",
        borderRadius: 6,
        margin: 5,
        textAlign: "center",
        height: 82,
        justifyContent: "center",
        alignItems: "center",
    },

    col4: {
        width: (ww - 40) / 3,

    },
    col12: {
        width: ww - 20,
    },
    textBox: {
        textAlign: "center",
        color: "#fff",
        fontWeight: "600",
        marginTop: 4,
        fontSize: 12,
    },
    //notifi
    notifi: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 6,
    },
    boxNotifi: {
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        paddingHorizontal: 12,
    },
    textNotifi: {
        fontSize: 10,
        marginTop: 2,
    },
    quantityNotifi: {
        position: "absolute",
        borderRadius: 50,
        height: 18,
        width: 18,
        backgroundColor: "#EB0B01",
        top: -3,
        right: -18,
        fontSize: 10,
        textAlign: "center",
        textAlignVertical: "center",
        fontWeight: "600",
        color: "#fff"
    },
    //

    coverImageContainer: {
        height: 250,
        width: "100%",
    },
    imgContainer: {
        width: 140,
        height: 140,
        borderRadius: 100,
        overflow: 'hidden',
    },
    coverImage: {
        width: '100%',
        height: '100%',
    },
    boxAvatar: {
        position: "absolute",
        left: ww / 2 - 70,
        top: 140,
    },
    relative: {
        position: "relative"
    },
    username: {
        fontWeight: "700",
        color: "#000",
        textAlign: "center"
    },
    bgGrey: {
        backgroundColor: "#F2F2F2",
        height: 310,
    },
    flexRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    element: {
        justifyContent: "space-between",
        padding: 18,
    },
    titleElement: {
        fontSize: 12,
        color: "#000",
        marginLeft: 16,
    },
    bgGrey1: {
        backgroundColor: "#F2F2F2",
        width: ww,
        height: 10,
    },
    nameAttr: {
        width: "50%",
        color: "#000",
        fontSize: 13,
    },
    val: {
        width: "50%",
        padding: 5,
        fontSize: 13,
        color: "#000",
    },
    addres: {
        textAlignVertical: "top"
    },
    borderBottom: {
        borderBottomColor: "#d2d2d2",
        borderBottomWidth: 0.5,
        paddingHorizontal: 10,
    },
    //
    boxqrImage: {
        width: ww / 2 - 20,
        height: ww / 2 - 20,
    },
    btnUpQr: {
        width: ww / 2,
    },
    qrImage: {
        height: "100%",
        width: "100%",
    },
    elementUp: {
        justifyContent: "space-between",
        paddingHorizontal: 10,
    },
    btnSave: {
        color: "#fff",
        backgroundColor: "#2DCC70",
        padding: 10,
        textAlign: "center",
        fontWeight: "700",
    },
    checkAll: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 14,
    },
    customSwitch: {

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
        fontWeight: "600",
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
    textCenter: {
        textAlign: "center",
    },
    borderRight: {
        borderColor: "#ddd",
        borderRightWidth: 0.5,
        padding: 7,
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
    txtQr: {
        paddingVertical: 5,
        fontSize: 13,
    },
    btnGroup: {
        paddingHorizontal: 10,
        backgroundColor: "#d9d9d9",
        paddingVertical: 5,
    },
    txtMayIn: {
        color: "blue"
    }
    , goBack: {
        position: "absolute",
        top: 30,
        left: 30,

    },



    // role list
    roles: {
        paddingLeft: 13,
        paddingRight: 32,
        paddingVertical: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    titleRole: {
        color: 'black',
        fontWeight: '700'
    },

    borderBottomRole: {
        width: ww,
        height: 1,
        backgroundColor: '#f6f6f6'
    },




    //role detail
    containerInfoRole: {
        paddingHorizontal: 13,
        // marginBottom: 15,
        marginTop: 15,
    },
    coverInfoRole: {
        paddingBottom: 10,
        marginBottom: 15,
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: 1
    },
    roleInfo: {
        fontSize: 16,
        fontWeight: '700',
    },
    redStar: {
        color: 'red'
    },
    lineRole: {
        paddingVertical: 15,
        backgroundColor: '#f2f2f2',
        paddingHorizontal: 13,
    },
    checkBoxRole: {
        paddingHorizontal: 13
    },
    checkBoxRoleTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: 'black',
        paddingTop: 15
    },
    checkBoxRoleItem: {
        flexDirection: 'row',
        paddingVertical: 20,
        borderColor: '#f2f2f2',
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 20,
    },
    colorItem: {
        color: 'black',
    },
    lineRoleList: {
        height: 15,
        backgroundColor: '#f2f2f2',
    }
});