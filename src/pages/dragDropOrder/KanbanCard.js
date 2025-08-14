/**************************************************************************/
/*  KanbanCard.js                                                         */
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

import React from 'react';
import { Avatar, Tag, Typography, Tooltip } from 'antd';
import { ClockCircleOutlined, PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { formatMoney, formatTime } from 'utils/dataUtils';
import { ShowSkuDetail } from 'containers/Product/SkuView';

const { Text, Paragraph } = Typography;
const KanbanCardWrapper = styled.div`
  background: #ffffff;
  border-radius: 8px;
  min-width: 280px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin-bottom: 12px;
  transition: all 0.2s ease;
  border: 1px solid #f0f0f0;
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 8px;
`;

const Title = styled(Paragraph)`
  && {
    margin: 0 !important;
    font-weight: 600;
    font-size: 15px;
    color: #1f1f1f;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
  }
`;

const NoteIcon = styled(PlusOutlined)`
  color: #1890ff;
  margin-left: 8px;
  font-size: 14px;
  flex-shrink: 0;
`;

const Description = styled(Paragraph)`
  && {
    margin: 0 0 10px !important;
    font-size: 13px;
    color: #595959;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 1.4;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
`;

const TagsContainer = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

const AssigneeAvatar = styled(Avatar)`
  cursor: pointer;
  background-color: #1890ff;
  font-size: 12px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
`;

const DateText = styled(Text)`
  && {
    font-size: 12px;
    color: #8c8c8c;
  }
`;

const getInitials = (name) => {
  if (!name) return 'NA';
  return name
    .split(' ')
    .map(part => part.trim())
    .filter(part => part.length > 0)
    .slice(0, 2)
    .map(part => part[0])
    .join('')
    .toUpperCase();
};

const KanbanCard = ({
  code,
  skuInfo,
  productName,
  total,
  updatedAt,
  order
}) => {
  return (
    <KanbanCardWrapper>
      <TitleWrapper>
        <Title ellipsis={{ tooltip: 'Ghi chú đơn hàng' }}>
          {String(order?.customerReceiverName).concat(" (").concat(order?.customerMobilePhone).concat(")")}
        </Title>
        <Tooltip title="Ghi chú đơn hàng">
          <NoteIcon />
        </Tooltip>
      </TitleWrapper>
      <Description ellipsis={false}>
        <p>{String(code).concat(" (").concat(productName).concat(")")} </p>
        <ShowSkuDetail skuInfo={skuInfo} width={250} />
      </Description>
      <MetaInfo>
        <TagsContainer>
          <Tag icon={<ClockCircleOutlined />} color="default" style={{ fontSize: '12px', padding: '0 8px' }}>
            {formatMoney(total)}
          </Tag>
          <DateText>📅 {formatTime(updatedAt)}</DateText>
        </TagsContainer>
        <AssigneeAvatar>
          {getInitials(order?.customerReceiverName ?? '')}
        </AssigneeAvatar>
      </MetaInfo>
    </KanbanCardWrapper>
  )
};

export default KanbanCard;