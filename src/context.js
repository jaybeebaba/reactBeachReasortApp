import React, { Component } from "react";
import items from "./data";
// import Client from "./Contentful";

const RoomContext = React.createContext();

export default class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    //
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false
  };

  // getData = async () => {
  //   try {
  //     let response = await Client.getEntries({
  //       content_type: "beachResortRoom"
  //     });
  //     let rooms = this.formatData(response.items);

  //     let featuredRooms = rooms.filter(room => room.featured === true);
  //     //
  //     let maxPrice = Math.max(...rooms.map(item => item.price));
  //     let maxSize = Math.max(...rooms.map(item => item.size));
  //     this.setState({
  //       rooms,
  //       featuredRooms,
  //       sortedRooms: rooms,
  //       loading: false,
  //       //
  //       price: maxPrice,
  //       maxPrice,
  //       maxSize
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  componentDidMount() {
    // this.getData();
    let rooms = this.formatData(items);
    let featuredRooms = rooms.filter(room => room.featured === true);
    //
    let maxPrice = Math.max(...rooms.map(item => item.price));
    let maxSize = Math.max(...rooms.map(item => item.size));
    this.setState({
      rooms,
      featuredRooms,
      sortedRooms: rooms,
      loading: false,
      //
      price: maxPrice,
      maxPrice,
      maxSize
    });
  }

  formatData(items) {
    let tempItems = items.map(item => {
      let id = item.sys.id;
      let images = item.fields.images.map(image => image.fields.file.url);

      let room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  }
  getRoom = slug => {
    let tempRooms = [...this.state.rooms];
    const room = tempRooms.find(room => room.slug === slug);
    return room;
  };
  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    console.log(name, value);

    this.setState(
      {
        [name]: value
      },
      this.filterRooms
    );
  };
  filterRooms = () => {
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets
    } = this.state;

    let tempRooms = [...rooms];
    // transform values
    // get capacity
    capacity = parseInt(capacity);
    price = parseInt(price);
    // filter by type
    if (type !== "all") {
      tempRooms = tempRooms.filter(room => room.type === type);
    }
    // filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter(room => room.capacity >= capacity);
    }
    // filter by price
    tempRooms = tempRooms.filter(room => room.price <= price);
    //filter by size
    tempRooms = tempRooms.filter(
      room => room.size >= minSize && room.size <= maxSize
    );
    //filter by breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter(room => room.breakfast === true);
    }
    //filter by pets
    if (pets) {
      tempRooms = tempRooms.filter(room => room.pets === true);
    }
    this.setState({
      sortedRooms: tempRooms
    });
  };
  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}
const RoomConsumer = RoomContext.Consumer;

export { RoomProvider, RoomConsumer, RoomContext };

export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <RoomConsumer>
        {value => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
}
// import React, { Component } from 'react'
// import items from "./data.js"

// const RoomContext = React.createContext()
// class RoomProvider extends Component {
// state={
//     rooms: [],
//     sortedRooms: [],
//     featuredRooms: [],
//     loading: true,
//     type: "all",
//     capacity: 1,
//     price: 0,
//     minPrice: 0,
//     maxPrice: 0,
//     minSize: 0,
//     maxSize: 0,
//     breakfast: false,
//     pets: false
// }

// componentDidMount(){
//     let rooms = this.formatData(items)
//     let featuredRooms = rooms.filter(room=>room.featured===true)
//     let maxPrice = Math.max(...rooms.map(item=>item.price))
//     let maxSize = Math.max(...rooms.map(item=>item.size))

//     this.setState({
//         rooms: rooms,
//         featuredRooms: featuredRooms,
//         sortedRooms: rooms,
//         loading: false,
//         price: maxPrice,
//         maxPrice,
//         maxSize
//     })
// }

// formatData(items){
//     let tempItems = items.map((item)=>{
//         let id = item.sys.id
//         let images = item.fields.images.map((image)=> image.fields.file.url)
//         let room = {...item.fields, images:images, id}
//         return room
//     })
//     return tempItems
// }

// getRoom=(slug)=>{
//     const tempRooms = [...this.state.rooms]
//     let Room = tempRooms.find(room=> room.slug === slug)
//     return Room
// }

// handleChange=(event)=>{
//     const target = event.target
//     const value = event.type === "checkbox"? target.checked:target.value
//     const name = event.target.name
//     this.setState({
//         [name]:value
//     }, this.filterRooms)
// }

// filterRooms = () =>{
//     let{
//         rooms, type, capacity, price, minSize, maxSize, breakfast, pets
//     } = this.state

//     let tempRooms = [...rooms]
//     if(type !=="all"){
//         tempRooms = tempRooms.filter(room=> room.type === type)
//     }
//     this.setState({
//         sortedRooms: tempRooms
//     })
// }
//     render() {
//         return (
//             <RoomContext.Provider value={{...this.state, getRoom:this.getRoom}}>
//                 {this.props.children}
//             </RoomContext.Provider>
//         )
//     }
// }



// // when passing the value of the context into a functional component, we can do it 
// // in three ways
// // i. by using the Room consumer that would be called in the functional component
//     // (in this case, bottom of  RoomsContainer.js commented out)
// // ii. by using a higher order component that will be set up in the context component
// //     and later used in the functional component(RoomsContainer.js)
// // iii. we can also use it using {useContext} as it is used in RoomsFilter.js


// // but when using a class based component we can pass the value to the component
// // by using static context as used in (SingleRooms,js)
// export function withRoomConsumer(Component){
//     return function ConsumerWrapper(props){
//         return <RoomConsumer>
//             {value=> <Component {...props} context={value}/>}
//         </RoomConsumer>
//     }
// }

// const RoomConsumer = RoomContext.Consumer

// export {RoomProvider, RoomConsumer, RoomContext}
