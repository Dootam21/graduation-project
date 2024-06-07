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
        width: 244,
        height: 32,
    },
    iconSearch: {
        width: 18,
        height: 18,
        marginLeft: 18,
    }
    ,
    btnCart: {
        height: 20,
        width: 20,
    }
    ,
    headerRight: {
        width: '15%',
        justifyContent: 'center',
    },
    btnText: {
        textAlignVertical: 'center',
        color: '#fff',
        fontWeight: "600",
        textAlign: 'right',
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
        fontWeight: "700",
        fontSize: 17,
        color: '#000',
        borderLeftWidth: 3,
        paddingLeft: 10,
        marginBottom: 10,
    },
    btnViewMore: {
        color: 'red',
        fontWeight: "700",
    },
    swiperContainer: {
        height: news_list_item_left_width * 1.31,
    },
    columnContainer: {
        flexDirection: 'row',
    },
    cardItem: {
        marginHorizontal: 5,
        width: news_list_item_left_width,
    },
    thumbnail: {
        width: "100%",
        height: " 100%",
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
        fontWeight: "700"
    },
    pricesp: {
        color: "#fff",
        textAlign: 'center'
    }


    // icon_footer: {
    //     marginBottom: 10,

    // },
    // footer_item_mic: {
    //     width: '28%',
    // },
    // bodyWrap: {
    //     flex: 1,
    //     justifyContent: 'flex-start',
    //     alignItems: 'center',
    // },

    // , homeBanner: {
    //     width: ww,
    //     height: ww * 0.458
    // },
    // mainHome: {
    //     backgroundColor: '#fff'
    // },
    // listCatsBG: {
    //     backgroundColor: '#3B5998'
    // },
    // listCats: {
    //     flexDirection: 'row',
    //     backgroundColor: '#3B5998',
    //     justifyContent: 'center',
    //     paddingTop: 14,
    // },
    // listCats2: {
    //     paddingBottom: 14,
    // },
    // listCats3: {
    //     paddingTop: 0,
    //     paddingBottom: 14,
    // },
    // homeCatImage: {
    //     width: homeCatImageWidth,
    //     marginLeft: 7,
    //     marginRight: 7,
    // },

    // newsItem: {
    //     flex: 1,
    //     flexDirection: 'row',
    //     borderColor: '#ddd',
    //     borderWidth: 1,
    //     borderRadius: 6,
    //     width: ww - 20,
    //     marginLeft: 10,
    //     marginTop: 15,
    //     paddingTop: 15,
    //     paddingBottom: 15,
    // },
    // newsItemLeft: {
    //     width: news_list_item_left_width,
    //     alignItems: 'flex-start',
    //     justifyContent: 'flex-start'
    // },
    // newsItemRight: {
    //     width: news_list_item_right_width - 15,
    //     marginLeft: 15,
    // },

    // newsItemImage: {
    //     width: news_list_item_left_width - 15,
    //     height: news_list_item_image_height,
    //     marginLeft: 15,
    //     alignItems: 'flex-start',
    // },

    // breadcrumb: {
    //     // height: 40,
    //     flexDirection: 'row',
    //     justifyContent: 'flex-start',
    //     alignItems: 'center',
    //     width: ww - 20,
    //     marginLeft: 10,
    //     borderBottomWidth: 1,
    //     borderBottomColor: '#ccc',
    //     // marginTop: 15,
    //     // marginBottom: 15
    //     flex: 0.06,
    // },
    // breadcrumb_arrow: {
    //     width: 20,
    // },
    // breadcrumb_home: {
    //     width: 13,
    //     height: 15
    // },
    // breadtxt: {
    //     color: '#888',
    //     fontSize: 14
    // },
    // single: {
    //     paddingRight: 10,
    //     paddingLeft: 10,
    // },
    // h1: {
    //     fontSize: 18,
    //     lineHeight: 30,
    //     fontWeight: "'bo"ld',
    //     marginBottom: 20,
    //     marginTop: 15,
    //     color: '#333'
    // },
    // singleP: {
    //     marginBottom: 12,
    //     fontSize: 15,
    //     lineHeight: 24,
    //     color: '#333'
    // },
    // searchKey: {
    //     height: 48,
    //     borderBottomColor: '#cccccc',
    //     borderBottomWidth: 1,
    //     width: ww - 30,
    //     marginLeft: 15,
    //     fontSize: 15,
    // },
    // searchBtn: {
    //     marginTop: 15,
    //     textAlign: 'center',
    //     width: "40%",
    //     height: 40,
    //     lineHeight: 40,
    //     fontSize: 16,
    //     marginLeft: "30%",
    //     backgroundColor: '#cccccc',
    //     color: '#000',
    //     height: 40,
    //     borderRadius: 3,
    // },
});