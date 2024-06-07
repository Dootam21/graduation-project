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
    flexRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    //
    flexBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        borderBottomColor: "#B2B2B2",
        borderBottomWidth: 0.7,
    },
    txtPrice: {
        color: "#2DCC70",
        fontWeight: "600",
        marginBottom: 4,
    },
    textGreen: {
        color: "#5fb92e",
        fontWeight: "600",
        marginBottom: 4,
    },
    textRed: {
        color: "#ff4c5c",
        fontWeight: "600",
        marginBottom: 4,
    },
    textNote: {
        fontSize: 12,
    },
    txtWagon: {
        color: "#000",
        fontSize: 12,
        textAlign: "right",
    },
    txtTime: {
        fontSize: 12,
        textAlign: "right",
        marginBottom: 4,
    },
    txtAuthor: {
        color: "#000",
        fontSize: 12,
        fontWeight: "600",
        textAlign: "right",
    },
    //
    topInfo: {
        padding: 10,
    },
    boxNoti: {
        backgroundColor: "#3C3F4E",
        padding: 10,
        borderRadius: 7
    },
    paddingV10: {
        marginBottom: 14,
    },
    boxPrice: {
        marginLeft: 12,
    },
    txtToahang: {
        fontSize: 11,
    },
    txtPrice1: {
        fontWeight: "700",
        color: "#000"
    },
    statusNoti: {
        paddingLeft: 10,
        color: "#fff",
        fontSize: 12,
    },
    headTitle: {
        padding: 10,
        backgroundColor: "#E4E4E4",
        fontSize: 12,
    },
    txtName: {
        color: "#000",
        fontSize: 11,
    },
    btnXemNguon: {
        backgroundColor: "#B8101F",
        padding: 10,
        margin: 10,
        textAlign: "center",
        color: "#fff",
        fontWeight: "600",
        borderRadius: 6,
    },
    paddingH10: {
        paddingHorizontal: 10,
    },
    flexBoxP0: {
        paddingHorizontal: 0,
    },
    //
    input: {
        width: ww / 2 - 10,
        padding: 0,
        color: "#000",
    },
    flexItem: {
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBlockColor: "#EEEEEE",
        minHeight: 40,
    },
    txtAttr: {
        color: "#000",
    },
    headingTi: {
        fontWeight: "700",
        padding: 10,
    },
    ghichu: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    input1: {
        textAlignVertical: "top"
    },
    txtThanhtoantien: {
        backgroundColor: "#B8101F",
        color: "#fff",
        fontWeight: "700",
        padding: 10,
        textAlign: "center",
        margin: 5,
    },



    //
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

    //modal
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
    textCenter: {
        textAlign: "center",
    },

    modalBackdrop: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(000, 0, 0, 0.5)', // Transparent red color (adjust opacity as needed)
    },


    ///
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






    modalOverlay: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainerQRCode: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16, 
        maxWidth: '80%',
        maxHeight: '80%',
        zIndex: 2,
    },
    modalContent1: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    thumbnail: {
        width: 250,
        height: 250,
    },
});