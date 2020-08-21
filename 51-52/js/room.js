Vue.component('loading', VueLoading);

new Vue({
	el: '#app',
	data: {
    item: {},
    descriptionShort: {},
    amenities: {},
    token: 'DtHjqoiqtNh5HT4lBm7ydoxmXcSrYLFGTxewL2uzuJOP9FC3CdyCrapIzC73',
    status: false,
    isLoading: false,
  },
  methods: {
    backHome() {
      window.location = '/JS-Practice/51-52/';
    }
  },
	created() {
    const id = location.search.split('=')[1]
    const api = `https://challenge.thef2e.com/api/thef2e2019/stage6/room/${id}`;

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