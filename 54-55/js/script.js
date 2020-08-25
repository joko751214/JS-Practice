Vue.component('loading', VueLoading);

new Vue({
	el: '#app',
	data: {
		items: '',
		api: 'https://challenge.thef2e.com/api/thef2e2019/stage6/rooms',
    token: 'DtHjqoiqtNh5HT4lBm7ydoxmXcSrYLFGTxewL2uzuJOP9FC3CdyCrapIzC73',
    isLoading: false,
  },
  methods: {
    transform(id) {
      window.location = `room.html?id=${id}`;
      console.log(window.location);
      console.log(id);

    },
  },
	created() {
    this.isLoading = true;
		axios.get(this.api, {
			headers: {
				'Authorization': `Bearer ${this.token}`
			}
		})
			.then((res) => {
      console.log(res);
      this.items = res.data.items;
      this.isLoading = false;
		})
	}
})