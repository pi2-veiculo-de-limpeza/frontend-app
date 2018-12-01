import React, { Component } from 'react'


class VehicleData extends Component {

	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			items: {},
			token: "eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiSHVnbyIsImVtYWlsIjoiQ0BjIn0.FeX8ptkmw-2CouHLKpnH0VR9-yEFzQpma3lXAKhBHYg",
			vehicle_id: "5c029a2b5b7f73000196f60a"
		};
	}

	componentDidMount() {

			var headers = {'Content-type': 'application/json', 'Authorization': this.state.token}
			console.log("Headers: "+ headers)
			var url = "http://18.216.157.143/vehicles/" + this.state.vehicle_id + "/faz_map_reduce"
			console.log("URL: " + url)
			fetch(url, {
			 	method: 'GET',
			 	headers: new Headers(headers)
			 	})
			.then(res => {
				console.log("res" + res.json())})
			
			.then(
			(result) => {
				console.log("Depois setState: " + JSON.stringify(result))
				this.setState({
					isLoaded: true,
					items: result.items
			});
				
		},
	
	// Note: it's important to handle errors here
	// instead of a catch() block so that we don't swallow
	// exceptions from actual bugs in components.
		(error) => {
			console.log("Errro:" + JSON.stringify(error))
			this.setState({
				isLoaded: true,
				error
				});
			}
		)
			//console.log("VehicleData:" + JSON.stringify(this.state.items))
	}

	render(){
		return(
		<div>
        	"VehicleData"
      	</div>
      )
	}

}
export default VehicleData;