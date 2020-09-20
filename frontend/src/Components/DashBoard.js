import React,{useEffect,useState} from 'react';
import axios from 'axios';
import api from '../Utils/api';
import {Line, HorizontalBar,Bar} from 'react-chartjs-2';
import _ from  'underscore';

import { connect } from 'react-redux';
const DashBoard = () => {

    let content = <div>No Districts loaded yet</div>
    const [districts,setDistricts] = useState(null);
    useEffect(()=> {

        const getDistricts = async () => {
            const dis = await api.get('/districts');
            setDistricts(dis.data)
        }
        getDistricts()

    },[])
    console.log(districts)
    const seroIndexData = {
        labels: districts ? _.pluck(districts,"name") : [],
        datasets: [
          {
            label: 'Sero Index',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: districts ? _.pluck(districts,"seroIndex") : []
          }
        ]
      };
      const ageData = {
        labels: districts ? _.pluck(districts,"name") : [],
        datasets: [
          {
            label: 'Age greater than 70',
            backgroundColor: 'rgba(179,181,198,0.2)',
            borderColor: 'rgba(179,181,198,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: districts ? _.pluck(_.pluck(districts,'age'),'btwn30_50') : []
          }
        ]
      };

      const professionData  = {
        labels: districts ? _.pluck(districts,"name") : [],
        datasets: [
          {
            label: 'Medical officials and Police Frontline',
            backgroundColor: '#E7E9ED',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: districts ? _.pluck(_.pluck(districts,'profession'),'medical_workers') : []
          }
        ]
      };
    
      content = (
        <div>
            <div style={{width:'800px',display:'inline-block'}}>
                <Line 
                    data = {seroIndexData}
                    options={{ maintainAspectRatio: false }}    
                    width={250}
                    height={450}
                    
                />
            </div>  
            <div style={{width:'800px',display:'inline-block'}}>
                <HorizontalBar 
                    data = {ageData}
                    options={{ maintainAspectRatio: false }}    
                    width={250}
                    height={450}
                    
                />
            </div>
            <div style={{width:'800px',display:'inline-block'}}>
                <Bar
                data={professionData}
                width={100}
                height={300}
                options={{
                    maintainAspectRatio: false
                }}
                />
            </div>
        </div>
    )
    return (
        content
    )
}


export default connect()(DashBoard);