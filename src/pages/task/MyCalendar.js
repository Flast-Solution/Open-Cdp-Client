import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { message } from 'antd';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { InAppEvent } from 'utils/FuseUtils';
import { HASH_POPUP } from 'configs/constant';

const LayoutWrapper = styled.div`
  .fc-toolbar-title {
    text-transform: capitalize;
  }
`

export default function MyCalendar() {
  const [ events, setEvents ] = useState([
    {
      id: '1',
      status: 'In Progress',
      ssoId: 'LongHuu',
      title: 'Họp nhóm phát triển',
      start: '2025-08-15T09:00:00',
      end: '2025-08-15T10:30:00',
      color: '#1890ff',
      progress: 80,
      description: 'Họp tuần để cập nhật tiến độ dự án'
    },
    {
      id: '2',
      ssoId: 'LongHuu',
      status: 'In Progress',
      title: 'Buổi thuyết trình',
      start: '2025-08-14T14:00:00',
      end: '2025-08-15T15:30:00',
      color: '#52c41a',
      progress: 80,
      description: 'Thuyết trình sản phẩm mới cho khách hàng'
    },
    {
      id: '3',
      ssoId: 'LongHuu',
      status: 'In Progress',
      title: 'Deadline báo cáo',
      start: '2025-08-20T17:00:00',
      end: '2025-08-21T17:00:00',
      color: '#ff4d4f',
      progress: 80,
      description: 'Hạn chót nộp báo cáo quý'
    }
  ]);

  const handleDelete = (id) => {
    setEvents(events.filter(event => event.id !== id));
    message.success('Xóa sự kiện thành công!');
  };

  const handleSubmit = async (id, values) => {
    console.log({ id, values });
    try {
      const [ startDate, endDate ] = values.dateRange;
      const newEvent = {
        id: id || Date.now().toString(),
        title: values.title,
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        color: values.color,
        progress: values.progress,
        description: values.description
      };
      if (id) {
        setEvents(events.map(event => event.id === id ? newEvent : event));
      } else {
        setEvents([...events, newEvent]);
      }
      message.success(id ? 'Cập nhật sự kiện thành công!' : 'Thêm sự kiện thành công!');
    } catch (error) {
      console.log('Validate Failed:', error);
    }
  };

  const handleDateClick = (arg) => {
    const event = { start: arg.dateStr, end: arg.dateStr }
    InAppEvent.emit(HASH_POPUP, {
      hash: "task.add",
      title: "Cập nhật công việc dự án",
      data: { record: event, onSave: handleSubmit, onDelete: handleDelete }
    });
  };

  const handleEventClick = ({ event }) => {
    InAppEvent.emit(HASH_POPUP, {
      hash: "task.add",
      title: "Cập nhật công việc dự án",
      data: { record: event, onSave: handleSubmit, onDelete: handleDelete }
    })
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
    </LayoutWrapper>
  )
};
