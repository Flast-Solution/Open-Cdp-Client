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
import RequestUtils from 'utils/RequestUtils';
import { useParams } from 'react-router-dom';
import { useEffectAsync } from 'hooks/MyHooks';

const LayoutWrapper = styled.div`
  .fc-toolbar-title {
    text-transform: capitalize;
  }
`

export default function MyCalendar() {
  
  const { id: projectId } = useParams();
  const [ events, setEvents ] = useState([]);

  useEffectAsync(async () => {
    const { data, errorCode } = await RequestUtils.Get("/works/find/" + projectId);
    if(errorCode !== 200) {
      return;
    }
    const { tasks } = data;
    setEvents(tasks.map(i => ({...i, id: String(i.id)})))
  }, [projectId]);

  const handleDelete = (id) => {
    setEvents(events.filter(event => event.id !== id));
    message.success('Xóa sự kiện thành công!');
  };

  const handleSubmit = async (id, values) => {
    try {
      const { dateRange, ...params } = values;
      const [ startDate, endDate ] = values.dateRange;
      const newEvent = {
        id: id || Date.now().toString(),
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        ...params
      };
      if (id) {
        setEvents(events.map(event => event.id === id ? newEvent : event));
      } else {
        setEvents([...events, newEvent]);
      }
      let { id: mId, ...dataPost } = newEvent;
      let { message: MSG } = await RequestUtils.Post("/works/save/task", {
        ...dataPost,
        projectId,
        ...(id ? { id } : {})
      });
      message.success(MSG);
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
