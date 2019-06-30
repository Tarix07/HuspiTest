import React from "react";
import "./modal.css";

class Modal extends React.Component {   
    saveNote=()=>{
        this.props.saveNote(this.refs.newTxt.value);
    }

    render() {
            return (               
            this.props.isShown &&(
                <div className ="OverAll">
                    <div className="mWindow">
                        <div className="mHeader">
                            <div>{this.props.head}</div>
                        </div>
                        <div className ="mBody">
                            <textarea className="Area" ref = "newTxt" defaultValue ={this.props.text}></textarea>
                                <div className = "mSide">
                                <button className="button btnSave" onClick={this.saveNote}>Save</button>
                                <button className="button btnCancel" onClick={this.props.closeWindow}>Cancel</button>
                            </div>
                            </div> 
                        </div>                  
                    </div>
                )
            );
        }
    }


export default Modal;