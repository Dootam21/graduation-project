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
    //
    settingCategory: {
        padding: 20,
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
        height: ww,
        backgroundColor: "#F1F8FF",
        borderTopColor: "#ededed",
        borderTopWidth: 1,
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
    containCategoryName: {
        paddingHorizontal: 12,
        paddingVertical: 10,

        borderBottomColor: "#ededed",
        borderBottomWidth: 1,
        fontWeight: "700",
        backgroundColor: "#B8101F",
        flexDirection: "row",
        alignItems: "center",
    },
    txtCategoryTitle: {
        color: "#fff",
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
    checkBoxAll: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems: "center",
        borderBottomColor: "#ededed",
        borderBottomWidth: 1,
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
        color: "#000",
        fontSize: 13
    },
    btnComplete: {
        fontSize: 16,
        fontWeight: "600",
        padding: 10,
        textAlign: "center",
        backgroundColor: "#2BCD70",
        color: "#fff",
    },
    //
    groupBtn2: {
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#F1C40F",
    },
    groupBtn3: {
        borderBottomColor: "#fff",
        borderBottomWidth: 1,
        paddingHorizontal: 10,
    },
    groupBtn6: {
        backgroundColor: "#F1C40F",
        borderBottomColor: "#fff",
        borderBottomWidth: 1,
        padding: 10,
    },
    txtCateName: {
        fontSize: 13,
        fontWeight: '600',
        color: "#000"
    },
    editcate: {
        padding: 10,
    },
    editcate1: {
        borderColor: "#fff",
        borderTopWidth: 1,
    },
    listCategory1: {
        width: ww / 6
    },
    txtCategoryName1: {
        paddingHorizontal: 8,
        textAlign: "center",
        fontSize: 12,
        color: "#000"
    },
    boxColor: {
        width: 20,
        height: 20,
        backgroundColor: "#000",
        marginBottom: 10,
    },
    xxxx: {
        justifyContent: 'center',
        alignItems: "center",
        paddingVertical: 10,
    },
    //
    txtChildCategoryName1: {
        backgroundColor: "#fff",
        color: "#000",
        fontSize: 12,
        fontWeight: "400",
        paddingVertical: 14,

    },
    groupBtn5: {
        marginLeft: 35,

    },
    groupBtn4: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomColor: "#ededed",
        borderBottomWidth: 1,
        marginHorizontal: 15,
    },
    categoryName: {
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginHorizontal: 10,
        marginVertical: 5,
        color: "#000",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    btnSave: {
        color: '#fff',

    },
    textCate: {
        fontSize: 15,
        fontWeight: '700'
    },
    //
    settingCategoryBottom: {
        backgroundColor: "#",
        backgroundColor: "#fff",
        borderBottomRightRadius: 4,
        borderBottomLeftRadius: 4,

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
    flexRow: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: "#ededed",
        borderBottomWidth: 1,
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
    flexRowC: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
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
    modalBackdrop: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(000, 0, 0, 0.3)', // Transparent red color (adjust opacity as needed)
    },
    active: {
        backgroundColor: "#F1F8FF",
    },
    modalCate: {
        position: 'absolute',
        top: 0,
        height: wh,
        flex: 1,
    },
    thumbnail: {
        width: 25,
        height: 25,
        alignSelf: "center",
        borderColor: 'red',
        marginLeft: 20
    },
    textAdd: {
        fontSize: 15,
        paddingHorizontal: 10,
        color: '#000000',
    },
    textChooseIcon: {
        fontSize: 15,
        color: '#000000',
    },
    chooseIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
    },
    
});