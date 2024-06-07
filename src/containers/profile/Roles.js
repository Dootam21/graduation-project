export const roleList = [
    {
        key: 'product',
        text: 'Hàng hóa',
        roles: [
            {
                key: 'product_list',
                text: 'Danh sách sản phẩm',
            },
            {
                key: 'product_add',
                text: 'Tạo sản phẩm',
            },
            {
                key: 'product_edit',
                text: 'Chỉnh sửa sản phẩm',
            },
            {
                key: 'product_detail',
                text: 'Chi tiết sản phẩm',
            },
            {
                key: 'product_delete',
                text: 'Xóa sản phẩm',
            },
            // {
            //     key: 'product_hide_real_quantity',
            //     text: 'Ẩn số lượng thực tế của sản phẩm',
            // },
            // {
            //     key: 'product_display_on_Market',
            //     text: 'Hiển thị sản phẩm lên Market',
            // },
            {
                key: 'product_them_ma_con',
                text: 'Thêm mã con',
            },
            {
                key: 'product_tk_ton',
                text: 'Thống kê tồn kho',
            },
            {
                key: 'product_tk_chi_tiet',
                text: 'Thống kê chi tiết',
            },
            {
                key: 'product_change_status_temporary_sale',
                text: 'Thay đổi trạng thái đóng bán tạm thời',
            },
            // {
            //     key: 'product_change_link',
            //     text: 'Thay đổi cho phép liên kết',
            // },
            // {
            //     key: 'product_change_display_on_Market',
            //     text: 'Thay đổi hiển thị trên Market',
            // },
            {
                key: 'product_change_dut_mau',
                text: 'Thay dổi dứt mẫu',
            },
            {
                key: 'product_change_status',
                text: 'Thay đổi tình trạng hàng',
            },
        ],
    },
    {
        key: 'color',
        text: 'Hàng hóa - màu sắc',
        roles: [
            {
                key: 'color_add',
                text: 'Tạo màu sắc cho sản phẩm',
            },
            // {
            //     key: 'color_edit',
            //     text: 'Chỉnh sửa màu sắc cho sản phẩm',
            // },
            // {
            //     key: 'color_delete',
            //     text: 'Xóa màu sắc cho sản phẩm',
            // },
        ],
    },
    {
        key: 'size',
        text: 'Hàng hóa-size',
        roles: [
            {
                key: 'size_add',
                text: 'Tạo size cho sản phẩm',
            },
            // {
            //     key: 'size_edit',
            //     text: 'Chỉnh sửa size cho sản phẩm',
            // },
            // {
            //     key: 'size_delete',
            //     text: 'Xóa size cho sản phẩm',
            // },
        ],
    },
    {
        key: 'category',
        text: 'Danh mục',
        roles: [
            // {
            //     key: 'category_save',
            //     text: 'Lưu danh mục sản phẩm',
            // },
            {
                key: 'category_change_pos',
                text: 'Sắp xếp danh mục',
            },
            {
                key: 'category_setting',
                text: 'Cài đặt danh mục',
            },
            {
                key: 'category_turn_on_off',
                text: 'Bật/tắt danh mục',
            },
            {
                key: 'category_add',
                text: 'Thêm danh mục',
            },
            {
                key: 'category_edit',
                text: 'Chỉnh sửa danh mục',
            },
            {
                key: 'category_delete',
                text: 'Xóa danh mục',
            },
        ],
    },
    {
        key: 'cart',
        text: 'Bán hàng',
        roles: [
            {
                key: 'cart_home',
                text: 'Trang chủ bán hàng',
            },
            {
                key: 'cart_list',
                text: 'Xem giỏ hàng',
            },
            {
                key: 'cart_add',
                text: 'Thêm sản phẩm vào giỏ hàng',
            },
            {
                key: 'cart_edit_quantity',
                text: 'Thay đổi số lượng',
            },
            {
                key: 'cart_change_price',
                text: 'Thay đổi giá',
            },
            {
                key: 'cart_delete',
                text: 'Xóa sản phẩm trong giỏ hàng',
            },
            {
                key: 'cart_change_status',
                text: 'Thay đổi khách hàng',
            }
        ],
    },
    {
        key: 'trahang_khach',
        text: 'Phiếu khách hàng đổi trả',
        roles: [
            {
                key: 'trahang_khach_list',
                text: 'Xem danh sách phiếu đổi trả',
            },
            {
                key: 'trahang_khach_add',
                text: 'Tạo phiếu đổi trả',
            },
            {
                key: 'trahang_khach_detail',
                text: 'Xem chi tiết phiếu đổi trả',
            },
            {
                key: 'trahang_khach_confirm_success',
                text: 'Xác nhận phiếu đổi trả',
            },
            {
                key: 'trahang_khach_delete',
                text: 'Xóa toa trả hàng',
            },
            {
                key: 'trahang_khach_confirm',
                text: 'Xác nhận kiểm hàng về kho',
            },
        ],
    },

    {
        key: 'trahang_xuong',
        text: 'Phiếu trả xưởng',
        roles: [
            {
                key: 'trahang_xuong_list',
                text: 'Xem danh sách phiếu đổi trả',
            },
            {
                key: 'trahang_xuong_add',
                text: 'Tạo phiếu đổi trả',
            },
            {
                key: 'trahang_xuong_detail',
                text: 'Xem chi tiết phiếu đổi trả',
            },
            {
                key: 'trahang_xuong_confirm_success',
                text: 'Xác nhận phiếu đổi trả',
            },
            {
                key: 'trahang_xuong_delete',
                text: 'Xóa toa trả hàng',
            },
            {
                key: 'trahang_xuong_confirm',
                text: 'Xác nhận kiểm hàng về kho',
            },
        ],
    },
    {
        key: 'customer',
        text: 'Khách hàng',
        roles: [
            {
                key: 'customer_list',
                text: 'Danh sách khách hàng',
            },
            {
                key: 'customer_add',
                text: 'Tạo khách hàng',
            },
            {
                key: 'customer_edit',
                text: 'Chỉnh sửa khách hàng',
            },
            {
                key: 'customer_delete',
                text: 'Xóa khách hàng',
            },
            // {
            //     key: '',
            //     text: 'Import danh bạ khách hàng',
            // },
            {
                key: 'customer_detail',
                text: 'Xem chi tiết khách hàng',
            },
            {
                key: 'customer_payment_detail',
                text: 'Xem lịch sử thanh toán',
            },
            {
                key: 'customer_payment',
                text: 'Thanh toán',
            },
        ],
    },
    // {
    //     key: '',
    //     text: 'Nhóm khách hàng',
    //     roles: [
    //         {
    //             key: '',
    //             text: 'Tạo nhóm khách hàng',
    //         },
    //         {
    //             key: '',
    //             text: 'Chỉnh sửa nhớm khách hàng',
    //         },
    //         {
    //             key: '',
    //             text: 'Xóa nhóm khách hàng',
    //         },
    //     ],
    // },
    {
        key: 'supplier',
        text: 'Nhà cung cấp',
        roles: [
            {
                key: 'supplier_add',
                text: 'Tạo nhà cung cấp',
            },
            {
                key: 'supplier_edit',
                text: 'Chỉnh sửa nhà cung cấp',
            },
            {
                key: 'supplier_delete',
                text: 'Xóa nhà cung cấp',
            },
            {
                key: 'supplier_list',
                text: 'Danh sách nhà cung cấp',
            },
            {
                key: 'supplier_detail',
                text: 'Chi tiết nhà cung cấp',
            },
            {
                key: 'supplier_payment_detail',
                text: 'Xem lịch sử thanh toán',
            },
            {
                key: 'supplier_payment',
                text: 'Thanh toán',
            },
        ],
    },
    {
        key: 'order',
        text: 'Đơn hàng',
        roles: [
            {
                key: 'order_list',
                text: 'Danh sách đơn hàng',
            },
            {
                key: 'order_add',
                text: 'Tạo đơn hàng',
            },
            {
                key: 'order_edit',
                text: 'Chỉnh sửa đơn hàng',
            },
            {
                key: 'order_delete',
                text: 'Xóa đơn hàng',
            },
            {
                key: 'order_copy',
                text: 'Sáo chép đơn hàng',
            },
            {
                key: 'order_change_quantity',
                text: 'Thay đổi số lượng mặt hàng',
            },
            {
                key: 'order_change_price',
                text: 'Thay đổi giá mặt hàng',
            },
            {
                key: 'order_delete_product',
                text: 'Xóa mặt hàng',
            },
            {
                key: 'order_change_customer',
                text: 'Chỉnh sửa khách hàng',
            },
            // {
            //     key: '',
            //     text: 'Xem đơn hàng của người khác',
            // },
            {
                key: 'order_confirm_status_1',
                text: 'Xác nhận gửi đơn hàng tới kho',
            },
            {
                key: 'order_confirm_status_3',
                text: 'Xác nhận hoàn tất toa hàng',
            },
            {
                key: 'order_confirm_status_2',
                text: 'Nhặt hàng',
            },
            {
                key: 'order_consolidation',
                text: 'Gộp toa nhặt tại cửa hàng',
            },
            {
                key: 'order_create_quick',
                text: 'Tạo đơn hàng nhanh',
            },
            {
                key: 'order_detail',
                text: 'Xem chi tiết đơn hàng',
            },
            {
                key: 'order_confirm_copy',
                text: 'Xác nhận toa nháp',
            },
            // {
            //     key: '',
            //     text: 'Xác nhận & báo giá',
            // },
        ],
    },
    {
        key: 'nhap',
        text: 'Phiếu nhập',
        roles: [
            {
                key: 'nhap_add',
                text: 'Tạo đơn nhập hàng',
            },
            {
                key: 'nhap_edit',
                text: 'Chỉnh sửa đơn nhập hàng',
            },
            {
                key: 'nhap_delete',
                text: 'Xóa đơn nhập hàng',
            },
            {
                key: 'nhap_list',
                text: 'Danh sách phiếu nhập',
            },
            {
                key: 'nhap_edit_note',
                text: 'Sửa ghi chú cả khi đã hoàn tất',
            },
            {
                key: 'nhap_add_image',
                text: 'Thêm ảnh cả khi đã hoàn tất',
            },
            {
                key: 'nhap_detail',
                text: 'Xem chi tiết phiếu nhập',
            },
            {
                key: 'nhap_confirm',
                text: 'Xác nhận phiếu nhập',
            },
        ],
    },
    // {
    //     key: '',
    //     text: 'Người dùng',
    //     roles: [
    //         {
    //             key: '',
    //             text: 'Danh sách người dùng',
    //         },
    //         {
    //             key: '',
    //             text: 'Lưu thông tin người dùng',
    //         },
    //         {
    //             key: '',
    //             text: 'Lưu thông tin quản trị viên',
    //         },
    //         {
    //             key: '',
    //             text: 'Lưu thông tin nhóm quản lý cửa hàng',
    //         },
    //         {
    //             key: '',
    //             text: 'Lưu thông tin nhóm nhân viên kho',
    //         },
    //         {
    //             key: '',
    //             text: 'Lưu thông tin nhóm nhân viên bán hàng',
    //         },
    //         {
    //             key: '',
    //             text: 'Sửa người dùng',
    //         },
    //         {
    //             key: '',
    //             text: 'Xóa người dùng',
    //         },
    //         {
    //             key: '',
    //             text: 'Xem chi tiết người dùng',
    //         },
    //     ],
    // },
    // {
    //     key: '',
    //     text: 'Quản lý ứng dụng',
    //     roles: [
    //         {
    //             key: '',
    //             text: 'Xem danh sách log',
    //         },
    //         {
    //             key: '',
    //             text: 'Xóa dữ liệu log',
    //         }
    //     ]
    // },
    {
        key: 'kiemkho',
        text: 'Phiếu kiểm kho',
        roles: [
            {
                key: 'kiemkho_add',
                text: 'Tạo phiếu kiểm kho',
            },
            {
                key: 'kiemkho_detail',
                text: 'Xem phiếu kiểm kho',
            },
            {
                key: 'kiemkho_delete',
                text: 'Xóa phiếu kiểm kho',
            },
            {
                key: 'kiemkho_list',
                text: 'Xem danh sách phiếu kiểm kho',
            },
        ],
    },
    {
        key: 'thuchi',
        text: 'Phiếu thu chi',
        roles: [
            {
                key: 'thuchi_list',
                text: 'Xem danh sách phiếu thu chi',
            },
            {
                key: 'thuchi_add',
                text: 'Tạo phiếu thu chi',
            },
        ],
    },
    {
        key: 'thongke',
        text: 'Thống kê',
        roles: [
            {
                key: 'thongke_ban',
                text: 'Xem thống kê bán',
            },
            {
                key: 'thongke_chung',
                text: 'Xem thông kê chung',
            },
        ],
    },
    // {
    //     key: '',
    //     text: 'Quản lý gian hàng',
    //     roles: [
    //         {
    //             key: '',
    //             text: 'Xem danh sách cửa hàng',
    //         },
    //         {
    //             key: '',
    //             text: 'Thêm mới cửa hàng',
    //         },
    //         {
    //             key: '',
    //             text: 'Chỉnh sửa cửa hàng',
    //         },
    //         {
    //             key: '',
    //             text: 'Xóa cửa hàng',
    //         },
    //     ],
    // },
    // {
    //     key: '',
    //     text: 'Liên kết cửa hàng',
    //     roles:[
    //         {
    //             key: '',
    //             text: 'Xem danh sách cửa hàng liên kết',
    //         },
    //         {
    //             key: '',
    //             text: 'Tạo mã OTP liên kết',
    //         },
    //         {
    //             key: '',
    //             text: 'Xóa cửa hàng liên kết',
    //         },
    //     ],
    // },
    {
        key: 'role',
        text: 'Vai trò',
        roles: [
            {
                key: 'role_list',
                text: 'Danh sách vai trò',
            },
            {
                key: 'role_detail',
                text: 'Xem chi tiết vai trò',
            },
            // {
            //     key: '',
            //     text: 'Thêm/sửa vai trò',
            // },
            // {
            //     key: '',
            //     text: 'Xóa vai trò',
            // },
        ],
    },
    {
        key: 'store',
        text: 'Cài đặt cửa hàng',
        roles: [
            {
                key: 'store_info_setting',
                text: 'Cài đặt thông tin cửa hàng',
            },
            {
                key: 'store_config_setting',
                text: 'Cài đặt cấu hình cửa hàng',
            },
        ]
    },
    {
        key: 'hang',
        text: 'Thương hiệu',
        roles: [
            {
                key: 'hang_add',
                text: 'Tạo thương hiệu',
            },
            // {
            //     key: '',
            //     text: 'Chỉnh sửa thương hiệu',
            // },
            // {
            //     key: '',
            //     text: 'Xóa thương hiệu',
            // },
        ]
    },
];



export const rolesListAdmin = [
    'product_list',
    'product_add',
    'product_edit',
    'product_detail',
    'product_delete',
    'product_them_ma_con',
    'product_tk_ton',
    'product_tk_chi_tiet',
    'product_change_status_temporary_sale',
    'product_change_dut_mau',
    'product_change_status',
    'color_add',
    'size_add',
    'category_change_pos',
    'category_setting',
    'category_turn_on_off',
    'category_add',
    'category_edit',
    'category_delete',
    'cart_home',
    'cart_list',
    'cart_add',
    'cart_edit_quantity',
    'cart_change_price',
    'cart_delete',
    'cart_change_status',
    'trahang_khach_list',
    'trahang_khach_add',
    'trahang_khach_detail',
    'trahang_khach_confirm',
    'trahang_khach_delete',
    'trahang_khach_confirm_success',
    'trahang_xuong_list',
    'trahang_xuong_add',
    'trahang_xuong_detail',
    'trahang_xuong_confirm',
    'trahang_xuong_delete',
    'trahang_xuong_confirm_success',
    'customer_list',
    'customer_add',
    'customer_edit',
    'customer_delete',
    'customer_detail',
    'customer_payment_detail',
    'customer_payment',
    'supplier_add',
    'supplier_edit',
    'supplier_delete',
    'supplier_list',
    'supplier_detail',
    'supplier_payment_detail',
    'supplier_payment',
    'order_list',
    'order_add',
    'order_edit',
    'order_delete',
    'order_copy',
    'order_change_quantity',
    'order_change_price',
    'order_delete_product',
    'order_change_customer',
    'order_confirm_status_1',
    'order_confirm_status_3',
    'order_confirm_status_2',
    'order_consolidation',
    'order_create_quick',
    'order_detail',
    'order_confirm_copy',
    'nhap_add',
    'nhap_edit',
    'nhap_delete',
    'nhap_list',
    'nhap_edit_note',
    'nhap_add_image',
    'nhap_detail',
    'nhap_confirm',
    'kiemkho_add',
    'kiemkho_detail',
    'kiemkho_delete',
    'kiemkho_list',
    'thuchi_list',
    'thuchi_add',
    'thongke_ban',
    'thongke_chung',
    'role_list',
    'role_detail',
    'store_info_setting',
    'store_config_setting',
    'hang_add',
]
