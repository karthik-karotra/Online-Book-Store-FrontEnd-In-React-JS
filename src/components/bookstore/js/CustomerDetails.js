import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import './CustomerDetails.css';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';

class CustomerDetails extends React.Component {

    constructor(props){
        super(props);
        this.state={
            customerName:"",
            status1:false,
            helpertext1:' ',
            phoneNumber:"",
            status2:false,
            helpertext2:' ',
            pinCode:"",
            status3:false,
            helpertext3:' ',
            locality:"",
            status4:false,
            helpertext4:' ',
            address:"",
            status5:false,
            helpertext5:' ',
            cityTown:"",
            status6:false,
            helpertext6:' ',
            landmark:"",
            status7:false,
            helpertext7:' ',
            button1:''
        }
    }

    reset=()=>{
        this.setState({
            customerName:"",
            phoneNumber:"",
            pinCode:"",
            locality:"",
            address:"",
            cityTown:"",
            landmark:"",
        })
    }
    handleChange=({target})=>{
        if([target.name]=="customerName"){
            this.setState({[target.name]:target.value},
                ()=>{
                    this.customerName()
                });
        }
        if([target.name]=="phoneNumber"){
            this.setState({[target.name]:target.value},
                ()=>{
                    this.phoneNumber()
                });
        }
        if([target.name]=="pinCode"){
            this.setState({[target.name]:target.value},
                ()=>{
                    this.pinCode()
                });
        }
        if([target.name]=="locality"){
            this.setState({[target.name]:target.value},
                ()=>{
                    this.locality()
                });
        }
        if([target.name]=="address"){
            this.setState({[target.name]:target.value},
                ()=>{
                    this.address()
                });
        }
        if([target.name]=="cityTown"){
            this.setState({[target.name]:target.value},
                ()=>{
                    this.cityTown()
                });
        }
        if([target.name]=="landmark"){
            this.setState({[target.name]:target.value},
                ()=>{
                    this.landmark()
                });
        }

    };

    handleSubmmit=()=>{
        if(this.state.customerName.trim==""){
            this.setState({
                status1:true,
                helpertext1:'Required*'
            });
        }
        if(this.state.phoneNumber.trim==""){
            this.setState({
                status2:true,
                helpertext2:'Required*'
            });
        }
        if(this.state.pinCode.trim==""){
            this.setState({
                status3:true,
                helpertext3:'Required*'
            });
        }
        if(this.state.locality.trim==""){
            this.setState({
                status4:true,
                helpertext4:'Required*'
            });
        }
        if(this.state.address.trim==""){
            this.setState({
                status5:true,
                helpertext5:'Required*'
            });
        }
        if(this.state.cityTown.trim==""){
            this.setState({
                status6:true,
                helpertext6:'Required*'
            });
        }
        if(this.state.landmark.trim==""){
            this.setState({
                status7:true,
                helpertext7:'Required*'
            });
        }
    }

    customerName(){
        this.setState({
            status1:true,
            helpertext1:'Required*'
        })
        var customerNamePattern=/^([a-zA-Z]{3,}[ ]*[a-zA-Z]*[ ]*[a-zA-Z]*[ ]*[a-zA-Z]*[ ]*[a-zA-Z]*[ ]*[a-zA-Z]*[ ]*[a-zA-Z]*)$/;
        this.setState({
            customerName: this.state.customerName.trim()
        })
        if(this.state.customerName.trim()!=""){
            if(customerNamePattern.test(this.state.customerName)==false){
                this.setState({
                    status1:true,
                    helpertext1:'It Contain Minimum 2 Characters',
                })
            } else{
                this.setState({
                    status1:false,
                    helpertext1:' ',
                })
            }
        }
    }

    phoneNumber(){
        this.setState({
            status2:true,
            helpertext2:'Required*'
        })
        var phoneNumberPattern=/^(\+\d{1,3}[- ]?)?\d{10}$/;
        this.setState({
            phoneNumber: this.state.phoneNumber.trim()
        })
        if(this.state.phoneNumber.trim()!=""){
            if(phoneNumberPattern.test(this.state.phoneNumber)==false){
                this.setState({
                    status2:true,
                    helpertext2:'Mobile Number Should Be 10 Digit',
                })
            } else{
                this.setState({
                    status2:false,
                    helpertext2:' ',
                })
            }
        }
    }

    pinCode(){
        this.setState({
            status3:true,
            helpertext3:'Required*'
        })
        var pinCodePattern=/^[1-9][0-9]{5}$/;
        this.setState({
            pinCode: this.state.pinCode.trim()
        })
        if(this.state.pinCode.trim()!=""){
            if(pinCodePattern.test(this.state.pinCode)==false){
                this.setState({
                    status3:true,
                    helpertext3:'Pincode Should Be 6 Digit',
                })
            } else{
                this.setState({
                    status3:false,
                    helpertext3:' ',
                })
            }
        }
    }

    locality(){
        this.setState({
            status4:true,
            helpertext4:'Required*'
        })
        var localityPattern=/^[A-Za-z]{3,}$/;
        this.setState({
            locality: this.state.locality.trim()
        })
        if(this.state.locality.trim()!=""){
            if(localityPattern.test(this.state.locality)==false){
                this.setState({
                    status4:true,
                    helpertext4:'It Contains Minimum 3 Characters',
                })
            } else{
                this.setState({
                    status4:false,
                    helpertext4:' ',
                })
            }
        }
    }

    address(){
        this.setState({
            status5:true,
            helpertext5:'Required*'
        })
        var addressPattern=/^.{1,250}$/;
        this.setState({
            address: this.state.address.trim()
        })
        if(this.state.address.trim()!=""){
            if(addressPattern.test(this.state.address)==false){
                this.setState({
                    status5:true,
                    helpertext5:'It Contains Maximum 250 Characters',
                })
            } else{
                this.setState({
                    status5:false,
                    helpertext5:' ',
                })
            }
        }
    }

    cityTown(){
        this.setState({
            status6:true,
            helpertext6:'Required*'
        })
        var cityTownPattern=/^([a-zA-Z]{3,}[ ]*[a-zA-Z]*[ ]*[a-zA-Z]*[ ]*[a-zA-Z]*[ ]*[a-zA-Z]*[ ]*[a-zA-Z]*[ ]*[a-zA-Z]*)$/;
        this.setState({
            cityTown: this.state.cityTown.trim()
        })
        if(this.state.cityTown.trim()!=""){
            if(cityTownPattern.test(this.state.cityTown)==false){
                this.setState({
                    status6:true,
                    helpertext6:'It Contains Minimum 3 Characters',
                })
            } else{
                this.setState({
                    status6:false,
                    helpertext6:' ',
                })
            }
        }
    }

    landmark(){
        this.setState({
            status7:true,
            helpertext7:'Required*'
        })
        var landmarkPattern=/^([a-zA-Z]{3,}[ ]*[a-zA-Z]*[ ]*[a-zA-Z]*[ ]*[a-zA-Z]*[ ]*[a-zA-Z]*[ ]*[a-zA-Z]*[ ]*[a-zA-Z]*)$/;
        this.setState({
            landmark: this.state.landmark.trim()
        })
        if(this.state.landmark.trim()!=""){
            if(landmarkPattern.test(this.state.landmark)==false){
                this.setState({
                    status7:true,
                    helpertext7:'It Contains Minimum 3 Characters',
                })
            } else{
                this.setState({
                    status7:false,
                    helpertext7:' ',
                })
            }
        }
    }

    render() {
        return (
            <div className="container">
                <div className="content">
                    <div className="data">
                        <TextField error={this.state.status1} className="input" id="outlined-basic" value={this.state.customerName} label="Name" variant="outlined"
                                   helperText={this.state.helpertext1} onClick={this.handleChange} onChange={this.handleChange} name="customerName"/>
                        <TextField error={this.state.status2} className="input" id="outlined-basic" label="Phone Number" variant="outlined"
                                   helperText={this.state.helpertext2} onClick={this.handleChange} onChange={this.handleChange} name="phoneNumber"/>
                    </div>
                    <div className="data">
                        <TextField error={this.state.status3} className="input" id="outlined-basic" label="Pincode" variant="outlined"
                                   helperText={this.state.helpertext3} onChange={this.handleChange} onClick={this.onChange} name="pinCode"/>
                        <TextField error={this.state.status4} className="input" id="outlined-basic" label="Locality" variant="outlined"
                                   helperText={this.state.helpertext4} onChange={this.handleChange} onClick={this.handleChange} name="locality"/>
                    </div>
                    <div className="data2">
                        <TextField error={this.state.status5} className="input"
                                   id="outlined-multiline-flexible" label="Address"
                                   placeholder="Maximum 250 Characters"  multiline rowsMax={3} variant="outlined"
                                   helperText={this.state.helpertext5}
                                   onClick={this.handleChange}
                                   onChange={this.handleChange}
                                   name="address"/>
                    </div>
                    <div className="data">
                        <TextField error={this.state.status6} className="input" id="outlined-basic" label="City Town" variant="outlined"
                                   helperText={this.state.helpertext6} onClick={this.handleChange} onChange={this.handleChange} name="cityTown"/>
                        <TextField error={this.state.status7} className="input" id="outlined-basic" label="Landmark" variant="outlined"
                                   helperText={this.state.helpertext7} onChange={this.handleChange} onClick={this.handleChange}
                                   name="landmark"/>
                    </div>
                    <div className="div1">
                        <div className="form">
                            <FormLabel component="legend" className="formlabel">Type </FormLabel>
                        </div>
                        <RadioGroup aria-label="gender" name="gender1" onChange={this.handleChange}>
                            <div className="radio">
                                <FormControlLabel value="home" control={<Radio />} label="Home" />
                                <FormControlLabel value="work" control={<Radio />} label="Work" />
                                <FormControlLabel value="other" control={<Radio />} label="Other" />
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="data3">
                        <Button className="button" variant="contained"
                                onClick={this.handleSubmmit} style={{backgroundColor: "rgb(145,10,10)"}}>
                            <div className="buttonfont">Continue</div>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}
export default CustomerDetails;