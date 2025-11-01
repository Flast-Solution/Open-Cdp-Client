import React from 'react';
import { Card, Row, Col, Tag, Flex, Typography, Divider, Space, Popover } from 'antd';
import { StarOutlined, SmileOutlined, FlagOutlined, EditOutlined } from '@ant-design/icons';

const { Text, Paragraph } = Typography;
const customerCareNotes = [
  {
    id: 1,
    rating: 7,
    satisfactionPercent: "85%",
    reason: "chi_phi_cao",
    issues: ["san_pham"],
    newFeatures: "Khách hàng cần tính năng mới / dịch vụ bổ sung",
    supportRequest: "Khách hàng cần hỗ trợ gì?",
    priority: "cao",
    callSummary: "Khách tìm được đơn vị khác giá tốt hơn."
  },
  {
    id: 2,
    rating: 9,
    satisfactionPercent: "92%",
    reason: "chat_luong_san_pham",
    issues: ["dich_vu", "san_pham"],
    newFeatures: "Yêu cầu báo giá nhanh hơn",
    supportRequest: "Hỗ trợ kỹ thuật 24/7",
    priority: "trung_binh",
    callSummary: "Khách hàng hài lòng với chất lượng sản phẩm."
  },
  {
    id: 3,
    rating: 5,
    satisfactionPercent: "60%",
    reason: "thoi_gian_giao_hang",
    issues: ["dich_vu"],
    newFeatures: "Tính năng tra cứu đơn hàng online",
    supportRequest: "Cải thiện thời gian giao hàng",
    priority: "cao",
    callSummary: "Khách hàng phàn nàn về thời gian giao hàng chậm."
  }
];

const getReasonLabel = (value) => {
  const map = {
    chi_phi_cao: "Chi phí cao",
    thoi_gian_giao_hang: "Thời gian giao hàng",
    chat_luong_san_pham: "Chất lượng sản phẩm"
  };
  return map[value] || value;
};

const getIssueLabels = (issues) => {
  const map = {
    san_pham: "Sự cố sản phẩm",
    dich_vu: "Sự cố dịch vụ"
  };
  return issues.map(i => map[i]).join(", ");
};

const getPriorityTag = (priority) => {
  const colorMap = {
    cao: "red",
    trung_binh: "orange",
    thap: "green"
  };
  return <Tag color={colorMap[priority]}>{priority === 'cao' ? 'Cao' : priority === 'trung_binh' ? 'Trung bình' : 'Thấp'}</Tag>;
};

const CustomerCareNoteCard = ({ note }) => {
  return (
    <div style={{ marginBottom: 16, backgroundColor: '#fff' }}>
      <Row gutter={[16, 8]} style={{ marginBottom: 12 }}>
        <Col span={8}>
          <Row align="middle">
            <Col span={2}>
              <StarOutlined style={{ color: '#faad14', fontSize: '16px' }} />
            </Col>
            <Col span={22}>
              <Text strong>Đánh giá:</Text> <Text>{note.rating}/10</Text>
              {note.satisfactionPercent && (
                <Text type="secondary" style={{ display: 'block', fontSize: '12px' }}>
                  {note.satisfactionPercent} hài lòng
                </Text>
              )}
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <Row align="middle">
            <Col span={2}>
              <FlagOutlined style={{ color: '#ff4d4f', fontSize: '16px' }} />
            </Col>
            <Col span={22}>
              <Text strong>Ưu tiên:</Text> {getPriorityTag(note.priority)}
              {note.issues?.length > 0 && (
                <Text type="secondary" style={{ display: 'block', fontSize: '12px' }}>
                  {getIssueLabels(note.issues)}
                </Text>
              )}
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <Flex justify="space-between" align="start">
            <div>
              <Space gap={4}>
                <StarOutlined style={{ color: '#faad14', fontSize: '16px' }} />
                <Text strong>Lý do:</Text>
              </Space>
              <br />
              <Text>{getReasonLabel(note.reason)}</Text>
            </div>
            <Space gap={8} style={{ marginTop: 4 }}>
              <Popover
                content={
                  <div style={{ maxWidth: 300 }}>
                    <Text strong>Tính năng mới:</Text>
                    <Paragraph style={{ marginTop: 4, marginBottom: 0 }} type="secondary">
                      {note.newFeatures}
                    </Paragraph>
                  </div>
                }
                title=""
                trigger="click"
              >
                <span style={{ cursor: 'pointer', color: '#52c41a', marginRight: 8 }}>
                  <SmileOutlined style={{ fontSize: '16px' }} />
                </span>
              </Popover>
              <Popover
                content={
                  <div style={{ maxWidth: 300 }}>
                    <Text strong>Hỗ trợ:</Text>
                    <Paragraph style={{ marginTop: 4, marginBottom: 0 }} type="secondary">
                      {note.supportRequest}
                    </Paragraph>
                  </div>
                }
                title=""
                trigger="click"
              >
                <span style={{ cursor: 'pointer', color: '#722ed1' }}>
                  <EditOutlined style={{ fontSize: '16px' }} />
                </span>
              </Popover>
            </Space>
          </Flex>
        </Col>
      </Row>
      <Row gutter={[12, 8]} align="top" style={{ marginBottom: 12 }}>
        <Col span={24}>
          <Paragraph style={{ marginBottom: 0 }} type="secondary">
            {note.callSummary}
          </Paragraph>
        </Col>
      </Row>
      <Divider dashed style={{ margin: '8px 0' }} />
    </div>
  )
};

const CareNoteList = () => {
  return (
    <Card
      title="Nhật ký chăm sóc khách hàng"
      style={{
        margin: '20px auto',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}
    >
      <div style={{ maxHeight: 600, overflowY: 'auto', overflowX: 'hidden' }}>
        {customerCareNotes.map((note) => (
          <CustomerCareNoteCard key={note.id} note={note} />
        ))}
      </div>
    </Card>
  )
};

export default CareNoteList;
