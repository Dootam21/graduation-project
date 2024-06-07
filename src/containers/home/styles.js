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

    header: {
        backgroundColor: '#b8101f',
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 8,
    },
    headerLeft: {
        width: '15%',
        justifyContent: 'center',
    },
    headerCenter: {
        width: '70%',
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
    },
    inputsearch: {
        paddingVertical: 4,
        paddingHorizontal: 12,
        flex: 1,
        height: 32,
        color: '#000',
    },
    iconSearch: {
        width: 18,
        height: 18,
    },
    btnCart: {
        height: 20,
        width: 20,
    },
    headerRight: {
        width: '15%',
        justifyContent: 'center',
    },
    btnGia: {
        color: "red",
        flex: 1,
        justifyContent: "center"
    },
    btnText: {
        textAlignVertical: 'center',
        color: '#fff',
        fontWeight: '600',
        textAlign: 'right',
        fontSize: 12,
    },
    btnFilter: {
        position: "absolute",
        bottom: 74,
        backgroundColor: "red",
        width: 36,
        height: 36,
        right: 10,
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
    },

    main: {
        // height: wh - 100,
        // height: wh - 180,
        // paddingBottom: 70,
        flex: 0.76,
    },
    homeBox: {
        flex: 1,
        borderTopWidth: 14,
        borderTopColor: '#f2f2f2',
        borderBottomWidth: 14,
        borderBottomColor: '#f2f2f2',
    },
    homeBoxHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingTop: 8,
    },
    homeTilte: {
        fontWeight: '700',
        fontSize: 16,
        color: '#000',
        borderLeftWidth: 3,
        paddingLeft: 10,
        marginBottom: 10,
    },
    btnViewMore: {
        color: '#B8141C',
        fontWeight: '700',
        fontSize: 13,
    },
    swiperContainer: {
        flexDirection: "row",
        height: news_list_item_left_width * 1.31,
    },
    //
    columnContainer: {
        flexDirection: 'row',
    },
    cardItem: {
        marginHorizontal: 5,
        width: news_list_item_left_width,
        height: 150,
        border: '1px solid red',
    },

    cardItem1: {
        marginHorizontal: 5,
        width: ww / 3.5,
        height: ww / 2.5,
        border: '1px solid red',
    },
    containImg: {
        width: ww / 3.5,
        height: ww / 2.5,
    },
    thumbnail1: {
        width: '100%',
        height: '100%',
        // backgroundColor: 'red'
    },
    thumbnail: {
        width: news_list_item_left_width,
        height: 150,
        // backgroundColor: 'red'
    },

    thumbnail2: {
        width: (ww - 30) / 4,
        height: 100,
    },

    card_content: {
        backgroundColor: "#141007",
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        color: '#fff',
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
    alertContainer: {
        position: 'absolute',
        left: 0,
        backgroundColor: "#fff"
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
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Transparent red color (adjust opacity as needed)
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
    modalText: {
        textAlign: 'center',
        fontSize: 12,
        paddingVertical: 10,
    },
    activeCL: {
        color: "#B8101F"
    },
    soLuong: {
        position: "absolute",
        borderRadius: 50,
        height: 18,
        width: 18,
        backgroundColor: "#EB0B01",
        fontSize: 10,
        textAlign: "center",
        textAlignVertical: "center",
        fontWeight: '600',
        color: "#fff",
        textAlign: "center",
        top: -8,
        left: 8,
    },
    columnContainerxxx: {
        flexDirection: 'row',
    },
    //
    boxSearch: {
        position: 'relative',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    searchModal: {
        backgroundColor: "#fff",
        top: 64,
        zIndex: 100,
        height: 500,
        position: "relative"
    },
    modalBackdrop1: {
        position: 'absolute',
        top: 64,
        bottom: 54,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Transparent red color (adjust opacity as needed)
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
        fontWeight: '700',
        color: '#000'
    },
    xxxsda: {
        top: 64,
        bottom: 54,
    },
    //
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-start',
        position: 'absolute',
        top: 54,
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
    }
});