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

    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#cccccc',
        backgroundColor: '#ffffff',
        justifyContent: "space-between",
        paddingBottom: 6,
        height: 54,
    },
    footer_item: {
        width: w20,
        alignItems: 'center',
        paddingTop: 10,
        paddingHorizontalL: 10,
    },
    nav_link: {
        color: '#000',
        fontSize: 11,
        marginTop: 6,
    },
    header: {
        backgroundColor: '#b8101f',
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 8,
        height: 44,
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

    headerCenter: {
        width: '60%',
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
    //chon nha cung cap thuong hieu
    listItem: {
        backgroundColor: "#B8101F",
        borderRadius: 8,
        marginVertical: 2,
        paddingHorizontal: 10,
        paddingVertical: 6,
        color: "#fff",
        width: ww / 2 - 10,
    },
    modalContainer2: {
        position: 'absolute',
        backgroundColor: "#000",
        zIndex: 2,
        // width: ww,
        height: wh,
    },
    titleChose: {
        fontWeight: '700',
        color: "#000",
        backgroundColor: "#F1F8FF",
        padding: 10,
    },
    attrName: {
        color: "#000",
        fontSize: 13,
    },
    flexRowItem: {
        justifyContent: 'space-between',
        flexDirection: "row",
        paddingVertical: 12,
        paddingLeft: 10,
        paddingRight: 15,
        borderBottomColor: "#EDEEF0",
        borderBottomWidth: 0.5,
    },
    flexRowVMore: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
    },
    viewMore: {
        marginLeft: 10,
        fontSize: 13,
    },
    xxt: {
        height: wh - 44 - 16,
        backgroundColor: "#fff",
        borderBottomRightRadius: 4,
        borderBottomLeftRadius: 4,
        width: ww,
        position: "relative",
    },
    xxtForIOS: {
        height: wh - 44 - 16,
        backgroundColor: "#fff",
        borderBottomRightRadius: 4,
        borderBottomLeftRadius: 4,
        width: ww,
        position: "relative",
    },
    btnAddItem: {
        padding: 16,
        flexDirection: "row",
        justifyContent: "center",
        borderTopColor: "#EDEEF0",
        borderTopWidth: 0.5,
    },
    //
    thumbnail: {
        width: 40,
        height: 40,
        margin: 10,
    },
    txtBold: {
        fontWeight: '700',
        color: "#000"
    },
    flexRowNCC: {
        flexDirection: "row",
        alignItems: 'center',
        padding: 10,
        borderBottomColor: "#EDEEF0",
        borderBottomWidth: 0.5,
    },
    textRight: {
        marginLeft: 10,
        color: "#000",

    },
    clBlack: {
        color: "#000"
    },
    //
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
    modalContainer1: {
        backgroundColor: "#fff",
        width: "75%",
        top: '35%',
        verticalAlign: "middle",
        left: "15%",
        borderRadius: 8,
        zIndex: 2,
        position: "absolute",
    },
    modalContainerMau: {
        backgroundColor: "#fff",
        width: "94%",
        top: '20%',
        verticalAlign: "middle",
        left: "3%",
        borderRadius: 4,
        zIndex: 2,
        position: "absolute",
        paddingHorizontal: 15,
        paddingBottom: 15,
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
    modalBackdrop: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(000, 0, 0, 0.5)', // Transparent red color (adjust opacity as needed)
    },
    //
    settingCategory: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        alignItems: "flex-end",
        backgroundColor: "#",
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        backgroundColor: "#fff"
    },

    category: {
        flexDirection: "row",
    },
    GroupCategory1: {
        flexDirection: "row",
        
        backgroundColor: "#F1F8FF",
        borderTopColor: "#ededed",
        borderTopWidth: 1,
        width: ww,
    },
    GroupCategory: {
        flexDirection: "row",
    },
    listCategory: {
        backgroundColor: "#fff",
        width: ww / 3,
    },
    listChildCategory: {
        backgroundColor: "#F1F8FF",
        width: ww / 3 * 2,
    },
    //
    txtCategoryName: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        color: "#000",
        borderBottomColor: "#ededed",
        borderBottomWidth: 1,
    },
    txtChildCategoryName: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        color: "#fff",
        borderBottomColor: "#ededed",
        borderBottomWidth: 1,
        fontWeight: '700',
        backgroundColor: "#B8101F",
    },
    tabActive: {
        backgroundColor: "#F1F8FF",
    },
    //
    groupBtn1: {
        borderTopColor: "#ededed",
        borderTopWidth: 1,
    },
    groupBtn: {
        flexDirection: "row",
    },
    btnEdit: {
        width: "50%",
        alignItems: "center",
        padding: 10,
    },
    txtChuY: {
        color: "red",
        padding: 5,
    },
    //
    inputNameColor: {
        borderBottomColor: "#ededed",
        borderBottomWidth: 1,
    },
    colorPicker: {
        width: "100%",
        height: 200,
        marginBottom: 5,
    },
    itemCenter: {
        justifyContent: "center",
        flexDirection: 'row',
    },
    btnAdd: {
        width: "100%",
        padding: 8,
        marginTop: 5,
        color: "#fff",
        fontWeight: '700',
        textAlign: "center",
        borderRadius: 5,
    },
    bgRed: {
        backgroundColor: "#B8101F",
    },
    bgGrey1: {
        backgroundColor: "#808080"
    },
    //
    flexRow: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: "#ededed",
        borderBottomWidth: 1,
    },
    settingCategoryBottom: {
        backgroundColor: "#",
        backgroundColor: "#fff",
        borderBottomRightRadius: 4,
        borderBottomLeftRadius: 4,
        position: 'absolute',
        bottom: 0,
    },
    addColor: {
        width: ww / 3,
        textAlign: "center",
        padding: 15,
        justifyContent: "center",
        alignItems: "center",
        borderBottomLeftRadius: 4,
        borderTopColor: "#ededed",
        borderTopWidth: 1,
    },
    addColor1: {
        width: ww / 3 * 2,
        textAlign: "center",
        backgroundColor: "#F1F8FF",
        padding: 15,
        justifyContent: "center",
        alignItems: "center",
        borderBottomRightRadius: 4,
        borderTopColor: "#ededed",
        borderTopWidth: 1,

    },
    flexRowCl: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: "#ededed",
        borderBottomWidth: 1,
        justifyContent: "center",
        textAlignVertical: "center",
    },
    bgColor: {
        marginBottom: 0,
        borderRadius: 4,
    },
    border0: {
        borderBottomWidth: 0,
    },
    spaceBetween: {
        justifyContent: "space-between",
        paddingRight: 10,
    },
    checkMarkGreed: {
        backgroundColor: "green",
        borderWidth: 0,
        paddingTop: 2,
    },
    clWhite: {
        borderColor: "white"
    },
    boxColor: {
        width: 20,
        height: 20,
        backgroundColor: "#000",
        marginBottom: 10,
    },
    //
    txtTitle: {
        padding: 10,
        backgroundColor: '#F2F2F2',
        fontWeight: "700",
        color: "#000",
        fontSize: 15,
    },
    txtAddr: {
        padding: 10,
        borderBottomColor: "#ededed",
        borderBottomWidth: 1,
        color: "#000",
    },
    btnChonR: {
        color: "#fff",
        fontWeight: '600',
    },

    groupBtn6: {
        backgroundColor: "#F1C40F",
        borderBottomColor: "#fff",
        borderBottomWidth: 1,
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
});