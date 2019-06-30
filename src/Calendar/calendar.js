import React from "react";
import "./calendar.css";
import Modal from "../Modal/modal";


class Day extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            toShow: false,
            toEdit: false,
            note: "",                
        }
    };

    show = () => {
        this.setState({toShow:true})
    }

    close = () => {
        this.setState({toShow:false})
    }

    save = (text) => {
        this.setState({note: text});
        this.setState({toShow: false});
        if (text ===""){
          this.setState({toEdit:false});
        } 
        else this.setState({toEdit:true}); 
    }


    render(){
           let edited  = this.state.toEdit ? "edited" : "";
           return(
            <td className={`calendar-day fill ${this.props.currentDay}`}> 
              <div className ={`calendar-day ${edited}`} onClick = {()=>this.show()}>
                <div>{this.props.num}</div> 
                 <div className ="showNote" >
                   <p>                
                    Note: {this.state.note}
                    </p>
                </div>
              </div>   
            <Modal head  = {"Note for " + this.props.num + "th " + this.props.month + " " + this.props.year}  
                   text = {this.state.note}
                   isShown ={this.state.toShow}   
                   closeWindow = {()=>{this.close()}} 
                   saveNote = {this.save}/>          
            </td>
        );
    }
}


class Calendar extends React.Component {
    constructor(props){
        super (props);
        this.state = {
             date: new Date(),
        };
    }

  weekdayshort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  monthes = [
    "January",
    "Fabruary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  daysInMonth = () => {
    let date = new Date(this.year(), this.month() + 1, 0);
    let days = date.getDate();
    return days;
  };
  year = () => {
    return this.state.date.getFullYear();
  };
  currentDay = () => {
    return this.state.date.getDate();
  };

  firstDay = () => {
    let firstDay = new Date(this.year(), this.month()).getDay();

    return (firstDay +6 )%7;
  };

  month = () => {
    return this.state.date.getMonth();
  };

  onPrev = () => {
    let prev = new Date(this.year(), this.month() - 1, this.currentDay());
    this.setState({ date: prev });
  };
  onNext = () => {
    let prev = new Date(this.year(), this.month() + 1, this.currentDay());
    this.setState({ date: prev });
  };

  onToday = () => {
    this.setState({ date: new Date() });
  };

  render() {
    let weekdays = this.weekdayshort.map(day => {
      return <th key={day}>{day}</th>;
    });

    let firstDay = this.firstDay();
    let daysInMonth = this.daysInMonth();

    let table = [],
      tr,
      k = 1 - firstDay;

    const Rows = (firstDay + daysInMonth) / 7;
    const Cols = 7;

    for (let i = 0; i < Rows; i++) {
      tr = [];
      for (let j = 0; j < Cols; j++) {
        let currentDay = "";
        if (this.month() === new Date().getMonth() && k === this.currentDay()) {
          currentDay = "today";
        }
        k > 0 && k <= daysInMonth
          ? tr.push(
               <Day key={k+""+this.month()+""+this.year()} 
                num={k} month = {this.monthes[this.month()]} 
                year = {this.year()} currentDay={currentDay}/>
            )
          : tr.push(<td key = {"em"+k} className="calendar-day empty">{""}</td>);
        k++;
      }
      table.push(<tr key ={i}>{tr}</tr>);
    }

    return (
      <div className="calendar-container">
        <div className="calendar-header">
            <div className="calendar-month">
                 <span>{this.monthes[this.month()]}</span>
                 <span>{this.year()}</span> 
            </div>
          <div className = "calendar-buttons"> 
          <span
            onClick={e => {
              this.onPrev();
            }}   
            className="calendar-button"        
          > ◄ </span>
           <span
            onClick={e => {
              this.onToday();
            }}   
            className="calendar-button"        
          > today </span>
          <span
            onClick={e => {
              this.onNext();
            }}
            className="calendar-button"
          > ► </span>
          </div>
        </div>
        <div className="calendar-date">
          <table className="calendar-day">
            <thead>
              <tr>{weekdays}</tr>
            </thead>
            <tbody>{table}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Calendar