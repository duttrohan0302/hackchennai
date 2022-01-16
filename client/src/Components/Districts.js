import React,{useEffect,useState} from 'react';
import { Form, FormGroup, Input, Label, Table } from 'reactstrap';
import api from '../Utils/api';
import {history} from '../Helpers'
import { connect } from "react-redux";

import { connect } from 'react-redux';

const Districts = () => {

    const [districts,setDistricts] = useState(null);
    const [sortVal,setSortVal] = useState(null)
    useEffect(()=> {

        const getDistricts = async () => {
            const dis = await api.get('/districts');
            setDistricts(dis.data.map((district,index)=>({...district,id:index})))
        }
        getDistricts()
    },[])
    const redirect = (name)=> {
        history.push(`/district/${name}`)
    }

    const onChange = e => {
        console.log(e.target.value)
        const val = e.target.value;
        // setSortVal(val)

        if(val==='profession'){
            const tempDistricts = districts.sort(function(a,b){return b.profession.medical_workers - a.profession.medical_workers})
            setDistricts(tempDistricts.map((district,index)=>({...district,id:index})))
        }else if(val==='age'){
            const tempDistricts = districts.sort(function(a,b){return (b.age.gt70 + b.age.lt12 - a.age.gt70 -a.age.lt12)})
            setDistricts(tempDistricts.map((district,index)=>({...district,id:index})))
            
        }else if(val==='seroIndex'){
            const tempDistricts = districts.sort(function(a,b){return a.seroIndex - b.seroIndex})
            setDistricts(tempDistricts.map((district,index)=>({...district,id:index})))
        }
    }
    console.log(districts) 
    
    return (
        <>
        {
            districts ?
            <>
            <div className="m-10">
                <h3 className="section-title text-center">District Data</h3>
                <Form>
                    <FormGroup tag="fieldset" >
                        <legend>Priority</legend>
                        <FormGroup check >
                        <Label check >
                            <Input type="radio" name="radio1" value="age" onChange={onChange}/>{' '}
                            Age {"(Priority to < 12 and > 70 years)"}
                        </Label>
                        </FormGroup>
                        <FormGroup check >
                        <Label check >
                            <Input type="radio" name="radio1" value="profession" onChange={onChange}/>{' '}
                            Profession
                        </Label>
                        </FormGroup>
                        <FormGroup check>
                        <Label check>
                            <Input type="radio" name="radio1" value="seroIndex" onChange={onChange} />{' '}
                            Sero Index
                        </Label>
                        </FormGroup>
                    </FormGroup>
                </Form>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th><small><b>#</b></small></th>
                            <th><small><b>District</b></small></th>
                            <th><small><b>State</b></small></th>
                            <th><small><b>{'Age <= 12'}</b></small></th>
                            <th><small><b>{'12 < Age <= 30'}</b></small></th>
                            <th><small><b>{'30 < Age <= 50'}</b></small></th>
                            <th><small><b>{'50 < Age <= 70'}</b></small></th>
                            <th><small><b>{'Age > 70'}</b></small></th>
                            <th><small><b>Medical Workers</b></small></th>
                            <th><small><b>Police Frontline</b></small></th>
                            <th><small><b>Armed Forces</b></small></th>
                            <th><small><b>Non Workers</b></small></th>
                            <th><small><b>Others</b></small></th>
                            <th><small><b>Population</b></small></th>
                            <th><small><b>Sero Index</b></small></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            districts.map((district,index) => (
                                <tr key={index} onClick={()=>redirect(district.name)} className={index===0 ? 'bg-danger text-white' : ''}>
                                    <th scope="row">{index+1}</th>
                                    <td>{district.name}</td>
                                    <td>{district.state}</td>
                                    <td>{district.age.lt12}</td>
                                    <td>{district.age.btwn12_30}</td>
                                    <td>{district.age.btwn30_50}</td>
                                    <td>{district.age.bwtn50_70}</td>
                                    <td>{district.age.gt70}</td>
                                    <td>{district.profession.medical_workers}</td>
                                    <td>{district.profession.police_frontline}</td>
                                    <td>{district.profession.armed_forces}</td>
                                    <td>{district.profession.non_worker}</td>
                                    <td>{district.profession.others}</td>
                                    <td>{district.population}</td>
                                    <td className={district.seroIndex<=0.35 ? 'bg-warning text-danger' : ''}>{district.seroIndex}</td>

                                </tr>
                            ))
                        }
                        
                    </tbody>
                </Table>
            </div>
            </>
            :
            <div>No districts loaded yet</div>
        }
        </>
    )
}

export default Districts;
// const mapStateToProps = (state) => ({
//     auth: state.auth,
//     isAuthenticated: state.auth.isAuthenticated,
//   });
  
//   export default connect(mapStateToProps)(Districts);
  
