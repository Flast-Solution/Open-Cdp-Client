import React from 'react';
import {
  Card,
  Typography,
  Tag,
  Table,
  Button,
  List,
  Avatar,
  Progress,
  Statistic,
  Row,
  Col,
  Divider,
  Checkbox
} from 'antd';

import { 
  DollarCircleOutlined,
  MailOutlined,
  FileDoneOutlined
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;
const customer = {
  name: 'Công ty Cổ Phần Flast Solution',
  contactName: 'Nguyễn Văn A',
  position: 'Giám đốc Kinh doanh',
  email: 'flast.vn@gmail.vn',
  phone: '090x.xxx.xxx',
  address: '35 Lê Văn Lương',
  industry: 'Công nghệ',
  createdAt: '15/03/2025',
  owner: 'Lê H',
  priority: 'Cao',
  leadScore: 85
};

const opportunities = [
  { key: '1', name: 'CRM cho doanh nghiệp', stage: 'Proposal', amount: '300 triệu ₫', closeDate: '30/04', probability: 70 },
  { key: '2', name: 'Dịch vụ bảo trì nâng cao', stage: 'Negotiation', amount: '80 triệu ₫', closeDate: '15/05', probability: 85 },
];

const wonDeals = [
  { amount: '150 triệu ₫', date: '03/2025' },
  { amount: '100 triệu ₫', date: '12/2024' },
];

const interactions = [
  { content: 'Gửi báo giá CRM', date: '28/03', opened: true },
  { content: 'Cuộc gọi 15 phút – Thảo luận tính năng', date: '25/03' },
  { content: 'Truy cập trang gói cao cấp (2 lần)', date: '20/03' },
  { content: 'Tham gia webinar "Tối ưu vận hành"', date: '18/03' },
];

const products = [
  { name: 'CRM Gói Cơ bản', status: 'Đang sử dụng', expiry: 'Còn 3 tháng' },
  { name: 'Hỗ trợ kỹ thuật tiêu chuẩn', status: 'Đang sử dụng' },
];

const upsellSuggestions = ['Gói Nâng cao', 'Bảo trì', 'Tư vấn triển khai'];

const notes = [
  'Khách quan tâm đến tính năng phân tích dữ liệu. – Lê H, 25/03'
];

const tasks = [
  { title: 'Tư vấn lại 3 ngày chưa Cơ Hội', due: '05/04', completed: true },
  { title: 'Gửi Báo giá', due: '05/04', completed: true },
  { title: 'Gọi điện 7 ngày chưa ra đơn', due: '10/04', completed: false }
];

const stats = {
  totalSales: '480 triệu ₫',
  avgOrder: '120 triệu ₫',
  clv: '1.2 tỷ ₫',
};

const alerts = [
  'Đơn hàng gần đây nhất: 20/05/2025', 
  'Chưa tương tác >14 ngày'
];

const CustomerProfile = () => {
  return (
    <div style={{ padding: '24px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Card style={{ marginBottom: '24px', borderRadius: '8px' }}>
        <Row justify="space-between" align="top" gutter={[16, 16]}>
          <Col xs={24} md={16}>
            <Title level={3} style={{ marginBottom: 15 }}>
              {customer.name}
            </Title>
            <p style={{margin: '10px 0px'}}>
              <Text strong>
                {customer.contactName} – {customer.position}
              </Text>
            </p>
            <p style={{margin: '10px 0px'}}>
              <Text type="secondary">
                ✉️ {customer.email} | 📞 {customer.phone} | 📍 {customer.address}
              </Text>
            </p>
            <div style={{ marginTop: '8px' }}>
              <Tag color="red">Điểm chạm (3)</Tag>
              <Tag color="orange">Ưu tiên: {customer.priority}</Tag>
              <Tag>Điểm đánh giá từ CSKH: {customer.leadScore}/100</Tag>
              <Tag>Ngành: {customer.industry}</Tag>
            </div>
          </Col>
          <Col xs={24} md={8} style={{ textAlign: 'right' }}>
            <Button onClick={() => {}} style={{ marginRight: 8 }}>
              Sửa
            </Button>
            <Button disabled type="dashed" onClick={() => {}} style={{ marginRight: 8 }}>
              Gửi email
            </Button>
            <Button disabled type="default" onClick={() => {}} style={{ marginRight: 8 }}>
              Gọi qua CallCenter
            </Button>
            <br />
            <Button type="default" style={{ marginTop: 8 }} onClick={() => {}}>
              Tạo cơ hội
            </Button>
          </Col>
        </Row>
      </Card>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Doanh số & Cơ hội" style={{ marginBottom: 16 }}>
            <Row gutter={16}>
              <Col span={8}>
                <Statistic title="Tổng doanh số" value={stats.totalSales} prefix="₫" />
              </Col>
              <Col span={8}>
                <Statistic title="Đơn hàng trung bình" value={stats.avgOrder} prefix="₫" />
              </Col>
              <Col span={8}>
                <Statistic title="CLV ước tính" value={stats.clv} prefix="₫" />
              </Col>
            </Row>
            <Divider />
            <Title level={5}>Cơ hội đang xử lý</Title>
            <Table
              dataSource={opportunities}
              pagination={false}
              size="small"
              columns={[
                { title: 'Tên', dataIndex: 'name' },
                { title: 'Giai đoạn', dataIndex: 'stage' },
                { title: 'Giá trị', dataIndex: 'amount' },
                { title: 'Dự kiến chốt', dataIndex: 'closeDate' },
                {
                  title: 'Xác suất',
                  dataIndex: 'probability',
                  render: (prob) => <Progress percent={prob} size="small" />,
                },
              ]}
            />
            <div style={{ marginTop: 12 }}>
              <Text type="success">
                ✅ Đã chốt ({wonDeals.length}):{' '}
                {wonDeals.map((d, i) => (
                  <span key={i}>
                    {d.amount} ({d.date}){' '}
                  </span>
                ))}
              </Text>
            </div>
          </Card>

          <Card title="Tương tác & Hành vi" style={{ marginBottom: 16 }}>
            <List
              dataSource={interactions}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar style={{ backgroundColor: '#1890ff' }}>💬</Avatar>}
                    title={
                      <Text>
                        {item.content}{' '}
                        {item.opened && <Tag color="blue" style={{ marginLeft: 8 }}>Đã mở</Tag>}
                      </Text>
                    }
                    description={<Text type="secondary">{item.date}</Text>}
                  />
                </List.Item>
              )}
            />
            <Text strong>Sản phẩm / Dịch vụ (3), CSKH (5)</Text>
          </Card>

          <Card title="Sản phẩm & Dịch vụ" style={{ marginBottom: 16 }}>
            <Title level={5}>Đang sử dụng</Title>
            {products.map((p, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <Text strong>{p.name}</Text> – <Tag color="green">{p.status}</Tag>{' '}
                {p.expiry && <Text type="secondary">({p.expiry})</Text>}
              </div>
            ))}
          </Card>
        </Col>

        {/* Cột phải */}
        <Col xs={24} lg={8}>
          {/* Ghi chú & Nhiệm vụ */}
          <Card title="Ghi chú & Nhiệm vụ" style={{ marginBottom: 16 }}>
            <Title level={5}>Ghi chú</Title>
            {notes.map((note, i) => (
              <Paragraph key={i} style={{ fontSize: 13, color: '#595959', fontStyle: 'italic' }}>
                {note}
              </Paragraph>
            ))}
            <Divider />
            <Title level={5}>Nhiệm vụ</Title>
            <List
              dataSource={tasks}
              renderItem={(task) => (
                <List.Item>
                  <Checkbox checked={task.completed}>{task.title}</Checkbox>{' '}
                  <Text type="secondary" style={{ marginLeft: 8 }}>
                    (Hạn: {task.due || 'chưa đặt'})
                  </Text>
                </List.Item>
              )}
            />
          </Card>

          <Card title="Thống kê nhanh" style={{ marginBottom: 16 }}>
            <Row gutter={[16, 8]} style={{ textAlign: 'center' }}>
              {/* Lead */}
              <Col span={8}>
                <div style={{ fontSize: 20, fontWeight: 'bold', color: '#1890ff' }}>10</div>
                <Tag icon={<MailOutlined />} color="blue" style={{ marginTop: 6 }}>
                  Lead
                </Tag>
              </Col>
              <Col span={8}>
                <div style={{ fontSize: 20, fontWeight: 'bold', color: '#52c41a' }}>5</div>
                <Tag icon={<FileDoneOutlined />} color="green" style={{ marginTop: 6 }}>
                  Cơ hội
                </Tag>
              </Col>
              <Col span={8}>
                <div style={{ fontSize: 20, fontWeight: 'bold', color: '#fa8c16' }}>3</div>
                <Tag icon={<DollarCircleOutlined />} color="orange" style={{ marginTop: 6 }}>
                  Đơn hàng
                </Tag>
              </Col>
            </Row>

            <Divider />
            <Title level={5}>Tương tác gần nhất</Title>
            {alerts.map((alert, i) => (
              <div key={i} style={{ color: 'orange', marginBottom: 8 }}>
                ⚠️ {alert}
              </div>
            ))}
            <Divider />
            <div>
              <Tag>#CRM</Tag>
              <Tag>#Doanh_nghiệp_vừa</Tag>
              <Tag>#Upsell_sắp_tới</Tag>
            </div>

            <Divider />
            <Title level={5}>Gợi ý Upsell</Title>
            {upsellSuggestions.map((s, i) => (
              <Tag key={i} color="#ccc" style={{ marginRight: 8, marginBottom: 8 }}>
                {s}
              </Tag>
            ))}
            <div style={{ marginTop: 8, color: 'orange' }}>
              ⚠️ Dữ liệu chưa đủ để Gợi ý sản phẩm Upsell
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
};

export default CustomerProfile;