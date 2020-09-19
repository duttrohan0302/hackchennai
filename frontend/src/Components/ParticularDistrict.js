import React,{useEffect,useState} from 'react';
import { api } from '../Utils/api';
import {history} from '../Helpers'
import {Doughnut,Pie} from 'react-chartjs-2';

const ParticularDistrict = (props) => {

    const {pathname} = props.location;
    const [district,setDistrict] = useState('');
    useEffect(()=> {
        const getDistrictData = async () => {
            const city = pathname.split('/')[pathname.split('/').length-1];
            console.log(city)
            try{
                const res = await api.get(`/district/${city}`)
                console.log(res.data)
                if(!res.data.length){
                    history.push('/dashboard')
                }
                setDistrict(res.data[0])
            }catch(e){
                console.log(e)
            }
        }
        getDistrictData();
    },[pathname])


    const ageData = {
        labels: [
            'Less than 12','Between 12 to 30','Between 30 to 50','Between 50 to 70','Greater than 70'
        ],
        datasets: [{
            data: district ? [district.age.lt12,district.age.btwn12_30,district.age.btwn30_50,district.age.btwn150_70,district.age.gt70] :[],
            backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#E59866'
            ],
            hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#D35400'
            ]
        }]
    };

    const professionData = {
        labels: [
            'Medical Workers','Police/Frontline','Armed Forces','Non Workers','Others'
        ],
        datasets: [{
            data: district ? [district.profession.medical_workers,district.profession.police_frontline,district.profession.armed_forces,district.profession.non_worker,district.profession.others] :[],
            backgroundColor: [
            '#F1948A',
            '#52BE80',
            '#85C1E9',
            '#E59866',
            '#5499C7'
            ],
            hoverBackgroundColor: [
            '#E74C3C',
            '#1E8449',
            '#2E86C1',
            '#D35400',
            '#2471A3'
            ]
        }]
    };
    return(
        <div>
            <button className="btn" disabled><b>Sero Index: {district.seroIndex}</b></button>
            <span  className="float float-right">
                <button className="btn" disabled><b>State: {district.state}</b></button>
            </span>
            <h3 className="display-4 text-center">{district.name}</h3>
            {/* <span className="float float-right">{district.population}</span> */}
            <div style={{width:'800px',display:'inline-block'}}>
                <h4 className="text-center">Age Distribution</h4>
                <Doughnut 
                    data = {ageData}
                />
            </div>  
            <div style={{width:'800px',display:'inline-block'}}>
                <h4 className="text-center">Profession</h4>
                <Pie 
                    data = {professionData}
                />
            </div>  

        </div>
    )


}

export default ParticularDistrict;