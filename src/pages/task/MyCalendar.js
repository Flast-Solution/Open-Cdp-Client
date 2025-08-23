import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { Modal, Form, Input, DatePicker, Select, Button, message } from 'antd';
import dayjs from 'dayjs';
import styled from 'styled-components';

const { RangePicker } = DatePicker;
const { Option } = Select;
const LayoutWrapper = styled.div`
  .fc-toolbar-title {
    text-transform: capitalize;
  }
`

export default function MyCalendar() {
  const [ events, setEvents ] = useState([
    {
      id: '1',
      title: 'Họp nhóm phát triển',
      start: '2025-08-15T09:00:00',
      end: '2025-08-15T10:30:00',
      color: '#1890ff',
      description: 'Họp tuần để cập nhật tiến độ dự án'
    },
    {
      id: '2',
      title: 'Buổi thuyết trình',
      start: '2025-08-14T14:00:00',
      end: '2025-08-15T15:30:00',
      color: '#52c41a',
      description: 'Thuyết trình sản phẩm mới cho khách hàng'
    },
    {
      id: '3',
      title: 'Deadline báo cáo',
      start: '2025-08-20T17:00:00',
      end: '2025-08-21T17:00:00',
      color: '#ff4d4f',
      description: 'Hạn chót nộp báo cáo quý'
    }
  ]);

  const [ isModalVisible, setIsModalVisible ] = useState(false);
  const [ selectedEvent, setSelectedEvent ] = useState(null);
  const [ form ] = Form.useForm();

  const handleDateClick = (arg) => {
    setSelectedEvent({ start: arg.dateStr, end: arg.dateStr });
    setIsModalVisible(true);
  };

  const handleEventClick = (clickInfo) => {
    const event = clickInfo.event;
    setSelectedEvent({
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,
      color: event.backgroundColor,
      description: event.extendedProps.description
    });
    form.setFieldsValue({
      title: event.title,
      description: event.extendedProps.description,
      color: event.backgroundColor,
      dateRange: [dayjs(event.start), dayjs(event.end)]
    });
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const [ startDate, endDate ] = values.dateRange;
      const newEvent = {
        id: selectedEvent.id || Date.now().toString(),
        title: values.title,
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        color: values.color,
        description: values.description
      };
      if (selectedEvent.id) {
        setEvents(events.map(event => event.id === selectedEvent.id ? newEvent : event));
      } else {
        setEvents([...events, newEvent]);
      }
      message.success(selectedEvent.id ? 'Cập nhật sự kiện thành công!' : 'Thêm sự kiện thành công!');
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.log('Validate Failed:', error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleDelete = () => {
    if (selectedEvent.id) {
      setEvents(events.filter(event => event.id !== selectedEvent.id));
      message.success('Xóa sự kiện thành công!');
    }
    setIsModalVisible(false);
    form.resetFields();
  };

  const eventContent = (eventInfo) => (
    <div className="p-1 h-full">
      <div className="font-medium text-sm truncate" title={eventInfo.event.title}>
        {eventInfo.event.title}
      </div>
      <div className="text-xs opacity-75">
        {dayjs(eventInfo.event.start).format('HH:mm')} - {dayjs(eventInfo.event.end).format('HH:mm')}
      </div>
    </div>
  );

  return (
    <LayoutWrapper className="min-h-screen bg-gray-50 p-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        }}
        initialView="dayGridMonth"
        events={events.map(event => ({
          ...event,
          backgroundColor: event.color,
          borderColor: event.color
        }))}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        eventContent={eventContent}
        locale="vi"
        buttonText={{
          today: 'Hôm nay',
          month: 'Tháng',
          week: 'Tuần',
          day: 'Ngày',
          list: 'Danh sách'
        }}
        allDayText="Cả ngày"
        moreLinkText={(num) => `+ ${num} sự kiện`}
        noEventsText="Không có sự kiện nào để hiển thị"
      />
      <Modal
        title={selectedEvent?.id ? "Chỉnh sửa sự kiện" : "Thêm sự kiện mới"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          selectedEvent?.id && (
            <Button key="delete" danger onClick={handleDelete}>
              Xóa
            </Button>
          ),
          <Button key="cancel" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            {selectedEvent?.id ? "Cập nhật" : "Thêm"}
          </Button>
        ]}
        width={500}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            color: '#1890ff'
          }}
        >
          <Form.Item
            name="title"
            label="Tiêu đề"
            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
          >
            <Input placeholder="Nhập tiêu đề sự kiện" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả"
          >
            <Input.TextArea placeholder="Nhập mô tả sự kiện" rows={3} />
          </Form.Item>

          <Form.Item
            name="dateRange"
            label="Thời gian"
            rules={[{ required: true, message: 'Vui lòng chọn thời gian!' }]}
          >
            <RangePicker 
              showTime 
              format="DD/MM/YYYY HH:mm"
              className="w-full"
            />
          </Form.Item>

          <Form.Item
            name="color"
            label="Màu sắc"
          >
            <Select>
              <Option value="#1890ff">Xanh dương</Option>
              <Option value="#52c41a">Xanh lá</Option>
              <Option value="#ff4d4f">Đỏ</Option>
              <Option value="#faad14">Vàng</Option>
              <Option value="#722ed1">Tím</Option>
              <Option value="#13c2c2">Xanh ngọc</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </LayoutWrapper>
  )
};
