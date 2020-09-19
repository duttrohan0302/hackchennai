import React,{useEffect,useState} from 'react';
import { Table } from 'reactstrap';
import { api } from '../Utils/api';
import {history} from '../Helpers'


const Districts = () => {

    let content = <div>No districts loaded yet</div>

    const [districts,setDistricts] = useState(null);
    useEffect(()=> {

        const getDistricts = async () => {
            const dis = await api.get('/districts');
            setDistricts(dis.data)
        }
        getDistricts()
    },[])
    const redirect = (name)=> {
        history.push(`/district/${name}`)
    }
    if(districts){
        content = (
            <div className="m-10">
                <h3 className="section-title text-center">District Data</h3>
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
                                <tr key={index} onClick={()=>redirect(district.name)}>
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
                                    <td>{district.seroIndex}</td>

                                </tr>
                            ))
                        }
                        
                    </tbody>
                </Table>
            </div>
        )
    }
    
    return (
        content
    )
}


export default Districts;