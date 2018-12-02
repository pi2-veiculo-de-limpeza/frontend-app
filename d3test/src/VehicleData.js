import React, { Component } from 'react'
import axios from 'axios'

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
			var url = 'http://18.216.157.143/vehicles/' + this.state.vehicle_id + '/faz_map_reduce'
			console.log("URL: " + url)

			fetch(url) 
			.then(res => res.json())
			.then(
				(result) => {
					console.log("Depois setState: " + JSON.stringify(result))
					this.setState({
						isLoaded: true,
						items: result
						//O result não retorna nada quando coloca .item ou .items
				});			
			},
	
			// Note: it's important to handle errors here
			// instead of a catch() block so that we don't swallow
			// exceptions from actual bugs in components.
			(error) => {
				console.log('Authorization failed : ' + error.message);
				this.setState({
					isLoaded: false,
					error
					});
				}
			)
		console.log("VehicleData:" + JSON.stringify(this.state.items))
		}

		render(){
			const{error, isLoaded, items} = this.state;
			if(error){
		      return <div>Error: {error.message}</div>;
		    } else if (!isLoaded) {
		      return <div>Loading...</div>;
		    } else {
		      return <div>Verificar como retornar pois Item é um objeto, e não um array</div>;
		        // <ul>
		        // 	Chegou aqui!
		        //   // {items.map(item => (
		        //   //   <li key={item.vehicle}>
		        //   //     {item.vehicle} {item.lixo_por_missao}
		        //   //   </li>
		        //   // ))}
		        // </ul>
		    }

		return(
		<div>
        	"VehicleData"
      	</div>
      )
	}

}
export default VehicleData;