/**************************************************************************/
/*  DrawerRoute.js                                                        */
/**************************************************************************/
/*                       Tệp này là một phần của:                         */
/*                             Open CDP                                   */
/*                        https://flast.vn                                */
/**************************************************************************/
/* Bản quyền (c) 2025 - này thuộc về các cộng tác viên Flast Solution     */
/* (xem AUTHORS.md).                                                      */
/* Bản quyền (c) 2024-2025 Long Huu, Quang Duc, Hung Bui                  */
/*                                                                        */
/* Bạn được quyền sử dụng phần mềm này miễn phí cho bất kỳ mục đích nào,  */
/* bao gồm sao chép, sửa đổi, phân phối, bán lại…                         */
/*                                                                        */
/* Chỉ cần giữ nguyên thông tin bản quyền và nội dung giấy phép này trong */
/* các bản sao.                                                           */
/*                                                                        */
/* Đội ngũ phát triển mong rằng phần mềm được sử dụng đúng mục đích và    */
/* có trách nghiệm                                                        */
/**************************************************************************/

import { DrawerWrapper } from './styles';

const DrawerMaxWidth = (title) => {
  switch (title) {
    case 'Tạo cơ hội':
      return 1450;
    case 'Chi tiết cơ hội# ':
      return 1450;
    case 'Chi tiết đơn hàng #':
      return 1450;
    case 'Tạo mới đơn hàng':
      return 1450;
    case 'Tạo mới kho':
      return 1450;
    case 'Chi tiết kho':
      return 1450;
    case 'Xuất kho #':
      return 1450;
    case 'Chăm sóc cơ hội#':
      return 1450;
    case 'Chăm sóc đơn hàng#':
      return 1450;
    default:
      return 750;
  }
}

const DrawerRoute = ({ width = 600, children, onClose, title, ...props }) => {
  return (
    <DrawerWrapper
      width={DrawerMaxWidth(title)}
      onClose={onClose}
      styles={
        { wrapper: { maxWidth: '100vw' } }
      }
      {...props}
      destroyOnClose
      closable={false}
      footer={null}
    >
      {children}
    </DrawerWrapper>
  )
};

export default DrawerRoute;
