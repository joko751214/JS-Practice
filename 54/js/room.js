Vue.component('loading', VueLoading);

Vue.component('date-range-picker', {
  props:['id'],
	template: '<input type="text" :id="id" :name="id" />',
	mounted: function(){
  	var self = this;
  	var input = $('input[name="'+ this.id +'"]');
  	input.daterangepicker();
    input.on('apply.daterangepicker', function(ev, picker) {
      self.$emit('daterangechanged',picker);
    });
  } 
});

new Vue({
	el: '#app',
	data: {
    item: {},
    id: '',
    descriptionShort: {},
    amenities: {},
    token: 'DtHjqoiqtNh5HT4lBm7ydoxmXcSrYLFGTxewL2uzuJOP9FC3CdyCrapIzC73',
    status: false,
    isLoading: false,
    user: {
      name: '',
      tel: '',
      date: [],
    },
    bookingName: '',
    bookingDate: [],
    bookingStatus: false,
  },
  methods: {
    backHome() {
      window.location = '/JS-Practice/51-52/';
    },
    reservation() {
      const api = `https://challenge.thef2e.com/api/thef2e2019/stage6/room/${this.id}`
      
      console.log(this.user);
      this.isLoading = true;
      axios.post(api, this.user, {
        headers: {
          'Authorization': `Bearer ${ this.token }`,
        },
      })
        .then((res) => {
          this.isLoading = false;
          this.user = {
            name: '',
            tel: '',
            date: [],
          };
          const { booking } = res.data;
          this.bookingName = booking[0].name;
          booking.forEach(item => {
            this.bookingDate.push(item.date);
          });
          this.bookingStatus = true;
        })
        .catch((err) => {
          this.isLoading = false;
          this.user = {
            name: '',
            tel: '',
            date: [],
          };
        })
    },
    timeTransform(startDate, days) {
      for(var i = 0; i <= days; i++) {
        let result = new Date(startDate.getTime());
        let datetime = new Date(result.setDate(startDate.getDate() + i))
        
        const year = datetime.getFullYear();
        let month = datetime.getMonth();
        if(month < 9) {
          month = `0${month+1}`
        }else {
          month = month+1;
        }
        let date = datetime.getDate();
        if(date < 10) {
          date = `0${date}`
        };
        const dateFormat = `${year}-${month}-${date}`;

        this.user.date.push(dateFormat);
      }

      // return `${year}-${month+1}-${date}`;
    },
    onDateRangeChanged: function(picker){
      let startDate = picker.startDate._d;
      let endDate = picker.endDate._d;
      let days = endDate.getDate() - startDate.getDate();
      
      this.timeTransform(startDate, days);
      // this.user.date.push(this.endDate)
      console.log(this.user.date);
    }, 
  },
	created() {

    this.id = location.search.split('=')[1]
    const api = `https://challenge.thef2e.com/api/thef2e2019/stage6/room/${this.id}`;

    this.isLoading = true;
		axios.get(api, {
			headers: {
				'Authorization': `Bearer ${this.token}`
			}
		})
			.then((res) => {
      console.log(res);
      this.item = res.data.room[0];
      this.descriptionShort = this.item.descriptionShort;
      this.amenities = this.item.amenities;
      console.log(this.item);
      this.isLoading = false;
      this.status = true;
		})
	}
})