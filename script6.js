const apiBaseUrl = 'https://api.coindar.org/v2';
const apiKey = 'YOUR_API_KEY'; // API-key will be inserted here

const app = new Vue({
  el: '#app',
  data: {
    calendar: null,
  },
  mounted() {
    this.initCalendar();
  },
  methods: {
    initCalendar() {
        this.calendar = new FullCalendar.Calendar(document.getElementById('calendar'), {
          initialView: 'dayGridMonth',
          eventSources: [
            {
              events: this.fetchEconomicEvents,
            },
          ],
          datesSet: this.markCurrentDate,
        });
        this.calendar.render();
      },


      markCurrentDate() {
        const calendarApi = this.calendar.getApi();
        const currentDate = calendarApi.getNow();
        
        const existingCurrentDateCells = this.calendar.el.querySelectorAll('.fc-daygrid-day.current-date');
        existingCurrentDateCells.forEach(cell => cell.classList.remove('current-date'));
        
        const todayCell = this.calendar.el.querySelector(`.fc-daygrid-day[data-date="${currentDate.toISOString().slice(0, 10)}"]`);
        if (todayCell) {
          todayCell.classList.add('current-date');
        }
    },
      
      
  
      async fetchEconomicEvents(fetchInfo, successCallback, failureCallback) {
        try {
          const startDate = fetchInfo.startStr;
          const endDate = fetchInfo.endStr;
          const response = await axios.get(`${apiBaseUrl}/events`, {
            headers: {
              'X-Api-Key': apiKey,
            },
            params: {
              start_date: startDate,
              end_date: endDate,
            },
          });
      
          const events = response.data.map(event => ({
            title: event.caption,
            start: event.date_start,
          }));
      
          successCallback(events);
       
      
          this.markCurrentDate();
        } catch (error) {
          console.error('Error fetching events:', error);
          failureCallback(error);
        }
      },
  },
});

