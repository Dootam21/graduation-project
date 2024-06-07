/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */ 
// import 'react-native-gesture-handler';

import React, { useState, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from './containers/home/home.js';

import Commodity from './containers/commodity/commodity.js';
import StoreSettings from './containers/commodity/store-settings.js';
import Filter from './containers/commodity/filter.js';

import Message from './containers/message/message.js';

import FreightWagons from './containers/freightwagons/freightwagons.js';
import ToaHangLienKet from './containers/freightwagons/tao-goi-hang-lien-ket.js';
import LienKetCuaHang from './containers/freightwagons/lien-ket-cua-hang.js';
import OrderConsolidation from './containers/freightwagons/order-consolidation.js';
import PrescriptionDtail from './containers/cart/chi-tiet-toa-nhap.js';

import Profile from './containers/profile/profile.js';
import Setting from './containers/profile/setting.js';
import QuanLyMayIn from './containers/profile/quan-li-may-in.js';
import ThongTinShop from './containers/profile/thong-tin-shop.js';
import ThongTinCaNhan from './containers/profile/thong-tin-ca-nhan.js';
import DoiMatKhau from './containers/profile/doi-mat-khau.js';

import ProductDetail from './containers/products/detail.js';
import ChonSoLuongMa from './containers/products/chon-so-luong-ma.js';
import EditQuantityCode from './containers/products/edit-quantity-code.js';
import Quantity from './containers/products/quantity.js';
import EditDetail from './containers/products/edit-detail.js';
import AddColor from './containers/products/add-color.js';
import AddProduct from './containers/products/add-product.js';
import ListProduct from './containers/products/list-product.js';
import NhapSoLuongMa from './containers/products/nhap-so-luong-ma.js';
import SuaTon from './containers/products/sua-ton.js';
import ChiTIetSuaTon from './containers/products/chi-tiet-sua-ton.js';
import SuaAnhSanPham from './containers/products/sua-anh-va-san-pham.js';

import Cart from './containers/cart/cart.js';
import OrderDetail from './containers/cart/order-details.js';
import OrderCupture from './containers/cart/order-cupture.js';
import OrderConfirm from './containers/cart/order-confirm.js';
import QuickCreate from './containers/cart/quick-create.js';
import Printer from './containers/cart/printer.js';

import ReturnForm from './containers/returning-goods/return-form.js';
import BackToFactory from './containers/returning-goods/ds-phieu-tra-xuong.js';
import CreateForm from './containers/returning-goods/create-form.js';
import CreateFormFactory from './containers/returning-goods/tao-phieu-tra-xuong.js';
import DSPhieuNhap from './containers/returning-goods/ds-phieu-nhap.js';
import DSPhieuThu from './containers/returning-goods/ds-phieu-thu.js';
import PhieuThu from './containers/returning-goods/phieu-thu.js';
import DSPhieuChi from './containers/returning-goods/ds-phieu-chi.js';
import DSPhieuKiemKho from './containers/returning-goods/ds-phieu-kiem-kho.js';
import HNBaoTra from './containers/returning-goods/hen-ngay-bao-tra.js';

import Supplier from './containers/supplier/supplier.js';
import SupplierDetail from './containers/supplier/supplier-detail.js';
import CurrenlyList from './containers/supplier/currency-list.js';
import AddSupplier from './containers/supplier/add-supplier.js';
import EditSupplier from './containers/supplier/edit-supplier.js';

import Customer from './containers/customer/customers.js';
import CustomerDetail from './containers/customer/customers-detail.js';
import AddCustomer from './containers/customer/add-customer.js';
import EditCustomer from './containers/customer/edit-customer.js';
import TelephoneDirectory from './containers/customer/telephone-directory.js';

import SelectNumber from './containers/statistical/select-number.js';
import Receipt from './containers/statistical/receipt.js';
import StatisticsInventory from './containers/statistical/statistics-inventory.js';
import DetailedStatistics from './containers/statistical/detailed-statistics.js';
import SaleStatistics from './containers/statistical/statistics-sales.js';
import StatisticsOverview from './containers/statistical/statistical-overview.js';

import Category from './containers/categories/category.js';
import SettingCategory from './containers/categories/setting-category.js';
import SwitchCategories from './containers/categories/switch-categories.js';
import FilterCategory from './containers/categories/fillter-category.js';
import SapXepDanhMuc from './containers/categories/sap-xep-danh-muc.js';
import ChonMau from './containers/categories/chon-mau.js';

import ListEmployee from './containers/employee/list-employee.js';
import AddEmployee from './containers/employee/add-employee.js';
import EmployeeDetail from './containers/employee/employee-detail.js';
import EditChucVu from './containers/employee/sua-chuc-vu.js';
import EditHoTen from './containers/employee/sua-ho-ten.js';
import EditMatKhau from './containers/employee/doi-mat-khau.js';
import EditQuanLy from './containers/employee/sua-quan-ly.js';
import StaffArrang from './containers/employee/staff-arrang.js';

import PaymentHistory from './containers/transaction/payment-history.js';
import Payment from './containers/transaction/payment.js';
import TransactionDetail from './containers/transaction/transaction-detail.js';

import BrowseCustomers from './containers/nhmarket/browse-customers.js';
import CustomerDepartment from './containers/nhmarket/customer-department.js';

import ListNews from './containers/news/list-news.js';
import AddNews from './containers/news/add-news.js';

import Notification from './containers/notification/notification.js';
import TestDetail from './containers/home/testDetail.js';

import Login from './containers/account/login.js';
import Logout from './containers/account/logout.js';


// import Detail from './containers/home/detail.js';
const Stack = createNativeStackNavigator();
// const Stack = createDrawerNavigator();

function Screens() {
  // const [showSplash, setshowSplash] = useState(true);
  // const [appID, setAppID] = useState('-');

  // const storeAppID = async (value) => {
  //     try {
  //     await AsyncStorage.setItem('appID', value);

  //     } catch (e) {
  //     // saving error
  //     }
  // }

  // const getAppID = async () => {
  //     try {
  //         var value = await AsyncStorage.getItem('appID');

  //         if(value !== null) {
  //             // value previously stored
  //             setAppID(value);
  //         }
  //         else
  //         {
  //             var resp = await fetch(Config.get_app_id_api_url, {
  //                 method: 'POST',
  //                 headers: {
  //                     'Accept': 'application/json',
  //                     'Content-Type': 'application/json',
  //                 },
  //             });

  //             const appdata = await resp.json();
  //             storeAppID(appdata.appid);
  //             setAppId(appdata.appid);
  //         }
  //     } catch(e) {
  //     // error reading value
  //     }
  // }

  // getAppID();

  // useEffect(() => {
  //   setTimeout(() => {
  //     setshowSplash(false);
  //   }, 3000);
  // }, []);


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false, drawerLabel: "Đăng nhập" }} />
        <Stack.Screen name="ListProduct" component={ListProduct} options={{ headerShown: false, drawerLabel: "Danh sách sản phẩm" }} />
        <Stack.Screen name="DSPhieuChi" component={DSPhieuChi} options={{ headerShown: false, drawerLabel: "Danh sách phiếu chi" }} />
        <Stack.Screen name="ThongTinShop" component={ThongTinShop} options={{ headerShown: false, drawerLabel: "Setting trang cá nhân" }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false, drawerLabel: "Trang chính" }} />
        <Stack.Screen name="TestDetail" component={TestDetail} options={{ headerShown: false, drawerLabel: "Test" }} />

        <Stack.Screen name="Commodity" component={Commodity} options={{ headerShown: false, drawerLabel: "Hàng hóa" }} />
        <Stack.Screen name="StoreSettings" component={StoreSettings} options={{ headerShown: false, drawerLabel: "Cài đặt cửa hàng" }} />
        <Stack.Screen name="Filter" component={Filter} options={{ headerShown: false, drawerLabel: "Tìm kiếm" }} />

        <Stack.Screen name="FreightWagons" component={FreightWagons} options={{ headerShown: false, drawerLabel: "Toa hàng" }} />
        <Stack.Screen name="ToaHangLienKet" component={ToaHangLienKet} options={{ headerShown: false, drawerLabel: "Toa gọi hàng liên kết" }} />
        <Stack.Screen name="LienKetCuaHang" component={LienKetCuaHang} options={{ headerShown: false, drawerLabel: "Liên kết cửa hàng" }} />
        <Stack.Screen name="OrderConsolidation" component={OrderConsolidation} options={{ headerShown: false, drawerLabel: "Tổng hợp đơn tại của hàng" }} />
        <Stack.Screen name="PrescriptionDtail" component={PrescriptionDtail} options={{ headerShown: false, drawerLabel: "Chi tiết toa nhập" }} />

        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false, drawerLabel: "Cá nhân" }} />
        <Stack.Screen name="Setting" component={Setting} options={{ headerShown: false, drawerLabel: "Setting trang cá nhân" }} />
        <Stack.Screen name="QuanLyMayIn" component={QuanLyMayIn} options={{ headerShown: false, drawerLabel: "Quản lý máy in" }} />
        <Stack.Screen name="ThongTinCaNhan" component={ThongTinCaNhan} options={{ headerShown: false, drawerLabel: "Thông tin cá nhân" }} />
        <Stack.Screen name="DoiMatKhau" component={DoiMatKhau} options={{ headerShown: false, drawerLabel: "Đổi mật khẩu" }} />

        <Stack.Screen name="Message" component={Message} options={{ headerShown: false, drawerLabel: "Tin nhắn" }} />


        <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ headerShown: false, drawerLabel: "Chi tiết sản phẩm" }} />
        <Stack.Screen name="ChonSoLuongMa" component={ChonSoLuongMa} options={{ headerShown: false, drawerLabel: "Chọn số lượng mã" }} />
        {/* <Stack.Screen name="EditQuantity" component={EditQuantity} options={{ headerShown: false, drawerLabel: "Chỉnh sửa số lượng sản phẩm" }} /> */}
        <Stack.Screen name="EditQuantityCode" component={EditQuantityCode} options={{ headerShown: false, drawerLabel: "Sửa số lượng mã hàng của sản phẩm" }} />
        <Stack.Screen name="Quantity" component={Quantity} options={{ headerShown: false, drawerLabel: "Sửa số lượng" }} />
        <Stack.Screen name="EditDetail" component={EditDetail} options={{ headerShown: false, drawerLabel: "Sửa chi tiết sản phẩm" }} />
        <Stack.Screen name="AddColor" component={AddColor} options={{ headerShown: false, drawerLabel: "Chọn/Thêm màu" }} />
        <Stack.Screen name="AddProduct" component={AddProduct} options={{ headerShown: false, drawerLabel: "Thêm sản phẩm" }} />
        <Stack.Screen name="NhapSoLuongMa" component={NhapSoLuongMa} options={{ headerShown: false, drawerLabel: "Nhập số lượng mã" }} />
        <Stack.Screen name="SuaTon" component={SuaTon} options={{ headerShown: false, drawerLabel: "Sửa tồn" }} />
        <Stack.Screen name="ChiTIetSuaTon" component={ChiTIetSuaTon} options={{ headerShown: false, drawerLabel: "Chi tiết sửa tồn" }} />
        <Stack.Screen name="SuaAnhSanPham" component={SuaAnhSanPham} options={{ headerShown: false, drawerLabel: "Sửa ảnh và sản phẩm" }} />

        <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false, drawerLabel: "Giỏ hàng" }} />
        <Stack.Screen name="OrderDetail" component={OrderDetail} options={{ headerShown: false, drawerLabel: "Chi tiết đơn hàng" }} />
        <Stack.Screen name="OrderCupture" component={OrderCupture} options={{ headerShown: false, drawerLabel: "Chụp ảnh đơn hàng" }} />
        <Stack.Screen name="OrderConfirm" component={OrderConfirm} options={{ headerShown: false, drawerLabel: "Xác nhận đơn hàng" }} />
        <Stack.Screen name="QuickCreate" component={QuickCreate} options={{ headerShown: false, drawerLabel: "Tạo đơn hàng nhanh" }} />
        <Stack.Screen name="Printer" component={Printer} options={{ headerShown: false, drawerLabel: "In" }} />

        <Stack.Screen name="ReturnForm" component={ReturnForm} options={{ headerShown: false, drawerLabel: "Danh sách phiếu trả của khách hàng" }} />
        <Stack.Screen name="BackToFactory" component={BackToFactory} options={{ headerShown: false, drawerLabel: "Lịch sử trả xưởng" }} />
        <Stack.Screen name="CreateForm" component={CreateForm} options={{ headerShown: false, drawerLabel: "Tạo phiếu trả cho khách hàng" }} />
        <Stack.Screen name="CreateFormFactory" component={CreateFormFactory} options={{ headerShown: false, drawerLabel: "Tạo phiếu trả xuỏng" }} />
        <Stack.Screen name="DSPhieuNhap" component={DSPhieuNhap} options={{ headerShown: false, drawerLabel: "Danh sách phiếu nhập" }} />
        
        <Stack.Screen name="PhieuThu" component={PhieuThu} options={{ headerShown: false, drawerLabel: "Phiếu thu" }} />
        <Stack.Screen name="DSPhieuThu" component={DSPhieuThu} options={{ headerShown: false, drawerLabel: "Danh sách phiếu thu" }} />
        
        <Stack.Screen name="DSPhieuKiemKho" component={DSPhieuKiemKho} options={{ headerShown: false, drawerLabel: "Danh sách kiểm kho" }} />
        <Stack.Screen name="HNBaoTra" component={HNBaoTra} options={{ headerShown: false, drawerLabel: "Hẹn ngày báo trả" }} />

        <Stack.Screen name="Supplier" component={Supplier} options={{ headerShown: false, drawerLabel: "Nhà cung cấp" }} />
        <Stack.Screen name="SupplierDetail" component={SupplierDetail} options={{ headerShown: false, drawerLabel: "Chi tiết nhà cung cấp" }} />
        <Stack.Screen name="CurrenlyList" component={CurrenlyList} options={{ headerShown: false, drawerLabel: "Danh sách tiền tệ" }} />
        <Stack.Screen name="AddSupplier" component={AddSupplier} options={{ headerShown: false, drawerLabel: "Thêm nhà cung cấp" }} />
        <Stack.Screen name="EditSupplier" component={EditSupplier} options={{ headerShown: false, drawerLabel: "Sửa nhà cung cấp" }} />

        <Stack.Screen name="Customer" component={Customer} options={{ headerShown: false, drawerLabel: "Khách hàng" }} />
        <Stack.Screen name="CustomerDetail" component={CustomerDetail} options={{ headerShown: false, drawerLabel: "Chi tiết khách hàng" }} />
        <Stack.Screen name="AddCustomer" component={AddCustomer} options={{ headerShown: false, drawerLabel: "Thêm khách hàng" }} />
        <Stack.Screen name="EditCustomer" component={EditCustomer} options={{ headerShown: false, drawerLabel: "Sửa thông tin khách hàng" }} />
        <Stack.Screen name="TelephoneDirectory" component={TelephoneDirectory} options={{ headerShown: false, drawerLabel: "Danh bạ điện thoại" }} />

        <Stack.Screen name="SelectNumber" component={SelectNumber} options={{ headerShown: false, drawerLabel: "Chọn số lượng mã con" }} />
        <Stack.Screen name="Receipt" component={Receipt} options={{ headerShown: false, drawerLabel: "Phiếu nhập hàng" }} />
        <Stack.Screen name="StatisticsInventory" component={StatisticsInventory} options={{ headerShown: false, drawerLabel: "Thống kê hàng tồn kho" }} />
        <Stack.Screen name="DetailedStatistics" component={DetailedStatistics} options={{ headerShown: false, drawerLabel: "Thống kê chi tiết" }} />
        <Stack.Screen name="SaleStatistics" component={SaleStatistics} options={{ headerShown: false, drawerLabel: "Thống kê bán hàng" }} />
        <Stack.Screen name="StatisticsOverview" component={StatisticsOverview} options={{ headerShown: false, drawerLabel: "Tổng quan" }} />

        <Stack.Screen name="Category" component={Category} options={{ headerShown: false, drawerLabel: "Chọn danh mục" }} />
        <Stack.Screen name="SettingCategory" component={SettingCategory} options={{ headerShown: false, drawerLabel: "Cài đặt danh mục" }} />
        <Stack.Screen name="SwitchCategories" component={SwitchCategories} options={{ headerShown: false, drawerLabel: "Bật tắt danh mục" }} />
        <Stack.Screen name="SapXepDanhMuc" component={SapXepDanhMuc} options={{ headerShown: false, drawerLabel: "Sắp xếp danh mục bán hàng" }} />
        <Stack.Screen name="FilterCategory" component={FilterCategory} options={{ headerShown: false, drawerLabel: "Lọc theo danh mục" }} />
        <Stack.Screen name="ChonMau" component={ChonMau} options={{ headerShown: false, drawerLabel: "Chọn màu" }} />

        <Stack.Screen name="ListEmployee" component={ListEmployee} options={{ headerShown: false, drawerLabel: "Danh sách nhân viên" }} />
        <Stack.Screen name="AddEmployee" component={AddEmployee} options={{ headerShown: false, drawerLabel: "Thêm nhân viên mới" }} />
        <Stack.Screen name="EmployeeDetail" component={EmployeeDetail} options={{ headerShown: false, drawerLabel: "Chi tiết nhân viên" }} />
        <Stack.Screen name="EditHoTen" component={EditHoTen} options={{ headerShown: false, drawerLabel: "Sửa họ tên" }} />
        <Stack.Screen name="EditMatKhau" component={EditMatKhau} options={{ headerShown: false, drawerLabel: "Đổi mật khẩu" }} />
        <Stack.Screen name="EditChucVu" component={EditChucVu} options={{ headerShown: false, drawerLabel: "Sửa chức vú" }} />
        <Stack.Screen name="EditQuanLy" component={EditQuanLy} options={{ headerShown: false, drawerLabel: "Sửa quản lý" }} />
        <Stack.Screen name="StaffArrang" component={StaffArrang} options={{ headerShown: false, drawerLabel: "Sắp xếp nhân viên" }} />

        <Stack.Screen name="PaymentHistory" component={PaymentHistory} options={{ headerShown: false, drawerLabel: "Lịch sử thanh toán" }} />
        <Stack.Screen name="Payment" component={Payment} options={{ headerShown: false, drawerLabel: "Thanh toán" }} />
        <Stack.Screen name="TransactionDetail" component={TransactionDetail} options={{ headerShown: false, drawerLabel: "Chi tiết giao dịch" }} />

        <Stack.Screen name="BrowseCustomers" component={BrowseCustomers} options={{ headerShown: false, drawerLabel: "Duyệt khách" }} />
        <Stack.Screen name="CustomerDepartment" component={CustomerDepartment} options={{ headerShown: false, drawerLabel: "Phân chia khách hành cho nhân viên" }} />

        <Stack.Screen name="ListNews" component={ListNews} options={{ headerShown: false, drawerLabel: "Danh sách tin" }} />
        <Stack.Screen name="AddNews" component={AddNews} options={{ headerShown: false, drawerLabel: "Bài đăng mới" }} />

        <Stack.Screen name="Logout" component={Logout} options={{ headerShown: false, drawerLabel: "Logout" }} />
        <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false, drawerLabel: "Thông báo" }} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Screens;


{/* 
          <Stack.Screen name="Detail" component={Detail} options={{headerShown: false, drawerLabel:"Trang Detail"}} />
          initialRouteName="Splash"
          drawerContent={(props) => <CustomSidebarMenu {...props} />}>
  
          {
            showSplash ?
              <Stack.Screen
                name="Splash"
                options={{animationEnabled: false, headerShown: false}}
                component={SplashScreen} />
            : null 
          }*/}




{/* <Stack.Screen name="NewsList" component={NewsList} options={{headerShown: false, drawerItemStyle: { display: 'none' }}} />
          <Stack.Screen name="NewsDetail" component={NewsDetail} options={{headerShown: false, drawerItemStyle: { display: 'none' }}} />
          <Stack.Screen name="Datlich" component={Datlich} options={{headerShown: false, drawerItemStyle: { display: 'none' }}} />
          <Stack.Screen name="Search" component={Search} options={{headerShown: false, drawerItemStyle: { display: 'none' }}} />
          <Stack.Screen name="SearchResults" component={SearchResults} options={{headerShown: false, drawerItemStyle: { display: 'none' }}} />
          <Stack.Screen name="Favourites" component={Favourites} options={{headerShown: false, drawerLabel:"Danh sách yêu thích"}} /> */}