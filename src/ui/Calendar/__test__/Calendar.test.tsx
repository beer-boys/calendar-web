import type { CalendarEvent } from '@/modules/calendarEvent/calendarEvent.types';
import { renderWithStore } from '@/test/renderWithStore';
import { Calendar } from '@/ui/Calendar/Calendar';

describe('Calendar', () => {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth(); // текущий месяц (0-11)

  const generateDateInCurrentMonth = (day: number, hour: number, minute: number) => new Date(y, m, day, hour, minute, 0, 0).getTime();

  const events: CalendarEvent[] = [
    {
      title: 'Ежедневный стендап',
      description: 'Короткий созвон команды: статус, блокеры, план на день.',
      date: generateDateInCurrentMonth(3, 10, 0),
      priority: 'standart',
      period: 'daily',
    },
    {
      title: 'Проверка почты и тикетов',
      description: 'Разбор входящих запросов, обновление статусов задач.',
      date: generateDateInCurrentMonth(4, 11, 0),
      priority: 'minor',
      period: 'daily',
    },
    {
      title: 'Еженедельное планирование',
      description: 'План на неделю, приоритизация задач и распределение.',
      date: generateDateInCurrentMonth(5, 12, 30),
      priority: 'critical',
      period: 'weekly',
    },
    {
      title: 'Ревью PR',
      description: 'Просмотр пулл-реквестов и согласование изменений.',
      date: generateDateInCurrentMonth(8, 16, 0),
      priority: 'standart',
      period: 'daily',
    },
    {
      title: 'Проверка мониторинга',
      description: 'Алерты, метрики, логи — фиксация отклонений.',
      date: generateDateInCurrentMonth(10, 9, 30),
      priority: 'standart',
      period: 'daily',
    },
    {
      title: 'Созвон со стейкхолдерами',
      description: 'Синхронизация по статусу, рискам и ожиданиям.',
      date: generateDateInCurrentMonth(12, 15, 0),
      priority: 'critical',
      period: 'weekly',
    },
    {
      title: 'Фокус-сессия',
      description: '60 минут без встреч для закрытия ключевой задачи.',
      date: generateDateInCurrentMonth(15, 14, 0),
      priority: 'standart',
      period: 'daily',
    },
    {
      title: 'Подготовка отчёта',
      description: 'Сводка прогресса и планов на следующую неделю.',
      date: generateDateInCurrentMonth(18, 18, 0),
      priority: 'minor',
      period: 'weekly',
    },
    {
      title: 'Ретроспектива',
      description: 'Обсуждение улучшений процесса и договорённости по действиям.',
      date: generateDateInCurrentMonth(22, 13, 0),
      priority: 'standart',
      period: 'weekly',
    },
    {
      title: 'Резерв под срочные задачи',
      description: 'Окно для критичных правок и незапланированных задач.',
      date: generateDateInCurrentMonth(26, 17, 30),
      priority: 'critical',
      period: 'daily',
    },
  ];

  const calendarEventsState = {
    events,
    isLoading: false,
    error: '',
    currentDates: { start: 0, end: 0 },
    loadedDates: { start: 0, end: 0 },
  };

  it('should render empty calendar', () => {
    const { container } = renderWithStore(<Calendar />);
    expect(container).toMatchSnapshot();
  });

  it('should render calendar with events', () => {
    const { container } = renderWithStore(<Calendar />, {
      preloadedState: {
        calendarEvents: calendarEventsState,
      },
    });

    expect(container).toMatchSnapshot();
  });
});
