import React from "react";
import "./modal.css";

class Modal extends React.Component {
    
    saveNote=()=>{
        this.props.saveNote(this.refs.newTxt.value);
    }
    render() {
            return (               
            this.props.isShown &&(
                <div className ="modalOverAll">
                    <div className="modalWindow">
                        <div className="modalHeader">
                            <div className="modalName">{this.props.head}</div>
                            <button className="btn modalClose" onClick={this.props.closeWindow}>X</button>
                        </div>
                        <textarea className="modalText" ref = "newTxt" defaultValue ={this.props.text}></textarea>
                        <div className="modalFooter">
                            <button className="modalSave" onClick={this.saveNote}>Save</button>
                            <button className="btn modalCancel" onClick={this.props.closeWindow}>Cancel</button>
                        </div>
                    </div>
                </div>)
            );
        }
    }


export default Modal;