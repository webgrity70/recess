import React, { useState, useEffect } from "react";
import "./style.css";
import Total from "./Total";


const parseTimes = () =>{
	if (localStorage.getItem('localTime')) {
		return JSON.parse(localStorage.getItem('localTime'));
	}
	else{
		return [];
	}
}

const getLocalStartId = () =>{
	if (localStorage.getItem('lstartId')) {
		return localStorage.getItem('lstartId');
	}
	else{
		return '';
	}
}



const Bookmark = () =>{
	const [times,setTimes] = useState(parseTimes);
	const [startTimeId,setStartTimeId] = useState(getLocalStartId);
	const [delWarningMsg,setDelWarningMsg] = useState(false);
    const [ minutes, setMinutes ] = useState(-1);
    const [seconds, setSeconds ] =  useState(-1);
	const [isDuplicate, setIsDuplicate] = useState(false);
	const [delTimeSlot,setdelTimeSlot] = useState(false);
	const [hitId,setHitId] = useState(null);
	const [editTime,setEditTime] = useState(false);







	const startRecess = () =>{
		setMinutes(0);
		setSeconds(0);
		const newTimeArray = {
			id: new Date().getTime(),
			start:[
				{hr: new Date().getHours()},
				{min: new Date().getMinutes()}
			],
			end:[
				{hr: ''},
				{min: ''}
			],
			total: ''
		}

	
		
		setTimes([...times,newTimeArray]);

		setStartTimeId(newTimeArray.id);
	
			
	}

	

	const stopRecess = () =>{
		let recessMin;
		
		
		const update = times.map((time)=>{
			
			if (parseInt(time.id) == parseInt(startTimeId)) {
				let ehr = new Date().getHours().toString();
				let emin = new Date().getMinutes().toString();
			


				times.map((time)=>{
					let minDiff = (emin - time.start[1].min);
					let hoursDiff = 0;

					if (minDiff<59){
						hoursDiff = (ehr - time.start[0].hr)*60
					}

					recessMin =  hoursDiff  + (emin - time.start[1].min);
				})

				if(recessMin === 0){
					setIsDuplicate(true);
					setTimeout(function(){ setIsDuplicate(false); }, 1500);
				}
				
				return {...time, end: [{hr:ehr},{min:emin}], total:recessMin}



				
			}
			else{
				return time;
			}
			
		});
		if(recessMin !== 0){
			setTimes(update);
			setStartTimeId('');
			setMinutes(-1);
			setSeconds(-1);
		}
			
	}

	useEffect(()=>{
		localStorage.setItem('localTime',JSON.stringify(times));
		localStorage.setItem('lstartId',startTimeId);
	},[times])





	const handleDelAll = () =>{
		setDelWarningMsg(true);
	}

	const confirmYes  = () =>{
		setTimes([]);
		setDelWarningMsg(false);
		setStartTimeId('');
		setMinutes(-1);
		setSeconds(-1);
	}
	const confirmNo = () =>{
		setDelWarningMsg(false);
	}

	/* delete single time slot */
	const delTime = (id) =>{
		setdelTimeSlot(true);
		setHitId(id);
	}

	function delSelectedTimeSLot(){
		let newTime = times.filter((time)=>{
			return time.id!==hitId;
		})
		setTimes(newTime);
		setHitId(null);
	}

	const confirmDelTimeSlotYes = () =>{
		delSelectedTimeSLot();
		setdelTimeSlot(false);
	}
	const confirmDelTimeSlotNo = () =>{
		setdelTimeSlot(false);
	}

	const DelTimeSlotMsg = () =>{
		return(
			<div className="alert">
			<br />
			<br />
				Are you sure want to delete current records?<br />once deleted , you will not able to restore.<br /><br />
				<button className="btn" onClick={confirmDelTimeSlotYes}>Yes</button>
				<button className="btn" onClick={confirmDelTimeSlotNo}>No</button>
			</div>
		)
		
	}

	/* ending delete time slot */


	/* edit time slot */
	const editTimeSlot = ()=>{
		setEditTime(true)
	}

	const closeEditScreen = () =>{
		setEditTime(false)
	}

	/* ending editing screen */
	const EditScreen = () =>{
		return(
			<div className="editScreen">
				<div className="timeColumn">
					<div className="timeTitle">Start Time</div>
					<div className="timesWrpr">
						<label>Hr</label>
						<select className="formControl">
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
							<option value="6">6</option>
							<option value="7">7</option>
							<option value="8">8</option>
							<option value="9">9</option>
							<option value="10">10</option>
							<option value="11">11</option>
							<option value="12">12</option>
							<option value="13">13</option>
							<option value="14">14</option>
							<option value="15">15</option>
							<option value="16">16</option>
							<option value="17">17</option>
							<option value="18">18</option>
							<option value="19">19</option>
							<option value="20">20</option>
							<option value="21">21</option>
							<option value="22">22</option>
							<option value="23">23</option>
							<option value="24">24</option>
						</select>
					</div>
					<div className="timesWrpr">
						<label>Min</label>
						<select className="formControl">
							<option value="0">0</option>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
							<option value="6">6</option>
							<option value="7">7</option>
							<option value="8">8</option>
							<option value="9">9</option>
							<option value="10">10</option>
							<option value="11">11</option>
							<option value="12">12</option>
							<option value="13">13</option>
							<option value="14">14</option>
							<option value="15">15</option>
							<option value="16">16</option>
							<option value="17">17</option>
							<option value="18">18</option>
							<option value="19">19</option>
							<option value="20">20</option>
							<option value="21">21</option>
							<option value="22">22</option>
							<option value="23">23</option>
							<option value="24">24</option>
							<option value="25">25</option>
							<option value="26">26</option>
							<option value="27">27</option>
							<option value="28">28</option>
							<option value="29">29</option>
							<option value="30">30</option>
							<option value="31">31</option>
							<option value="32">32</option>
							<option value="33">33</option>
							<option value="37">34</option>
							<option value="35">35</option>
							<option value="36">36</option>
							<option value="37">37</option>
							<option value="38">38</option>
							<option value="39">39</option>
							<option value="40">40</option>
							<option value="41">41</option>
							<option value="42">42</option>
							<option value="43">43</option>
							<option value="44">44</option>
							<option value="45">45</option>
							<option value="46">46</option>
							<option value="47">47</option>
							<option value="48">48</option>
							<option value="49">49</option>
							<option value="50">50</option>
							<option value="51">51</option>
							<option value="52">52</option>
							<option value="53">53</option>
							<option value="54">54</option>
							<option value="55">55</option>
							<option value="56">56</option>
							<option value="57">57</option>
							<option value="58">58</option>
							<option value="59">59</option>
							<option value="60">60</option>
						</select>
					</div>
				</div>
				<div className="timeColumn">
					<div className="timeTitle">End Time</div>
					<div className="timesWrpr">
						<label>Hr</label>
						<select className="formControl">
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
							<option value="6">6</option>
							<option value="7">7</option>
							<option value="8">8</option>
							<option value="9">9</option>
							<option value="10">10</option>
							<option value="11">11</option>
							<option value="12">12</option>
							<option value="13">13</option>
							<option value="14">14</option>
							<option value="15">15</option>
							<option value="16">16</option>
							<option value="17">17</option>
							<option value="18">18</option>
							<option value="19">19</option>
							<option value="20">20</option>
							<option value="21">21</option>
							<option value="22">22</option>
							<option value="23">23</option>
							<option value="24">24</option>
						</select>
					</div>
					<div className="timesWrpr">
						<label>Min</label>
						<select className="formControl">
							<option value="0">0</option>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
							<option value="6">6</option>
							<option value="7">7</option>
							<option value="8">8</option>
							<option value="9">9</option>
							<option value="10">10</option>
							<option value="11">11</option>
							<option value="12">12</option>
							<option value="13">13</option>
							<option value="14">14</option>
							<option value="15">15</option>
							<option value="16">16</option>
							<option value="17">17</option>
							<option value="18">18</option>
							<option value="19">19</option>
							<option value="20">20</option>
							<option value="21">21</option>
							<option value="22">22</option>
							<option value="23">23</option>
							<option value="24">24</option>
							<option value="25">25</option>
							<option value="26">26</option>
							<option value="27">27</option>
							<option value="28">28</option>
							<option value="29">29</option>
							<option value="30">30</option>
							<option value="31">31</option>
							<option value="32">32</option>
							<option value="33">33</option>
							<option value="37">34</option>
							<option value="35">35</option>
							<option value="36">36</option>
							<option value="37">37</option>
							<option value="38">38</option>
							<option value="39">39</option>
							<option value="40">40</option>
							<option value="41">41</option>
							<option value="42">42</option>
							<option value="43">43</option>
							<option value="44">44</option>
							<option value="45">45</option>
							<option value="46">46</option>
							<option value="47">47</option>
							<option value="48">48</option>
							<option value="49">49</option>
							<option value="50">50</option>
							<option value="51">51</option>
							<option value="52">52</option>
							<option value="53">53</option>
							<option value="54">54</option>
							<option value="55">55</option>
							<option value="56">56</option>
							<option value="57">57</option>
							<option value="58">58</option>
							<option value="59">59</option>
							<option value="60">60</option>
						</select>
					</div>
				</div>

				<button className="btn" onClick={closeEditScreen}>Save</button>
				<button className="btn" onClick={closeEditScreen}>Close</button>
			</div>
		)
	}
	/* ending edit time slot */


	const TimeList = () =>{
		return(
			<ul className="timeList">
				{
					times.map((time)=>{
						let minDiff = (time.end[1].min - time.start[1].min);
						let hoursDiff = 0;

						if (minDiff<59){
							hoursDiff = (time.end[0].hr - time.start[0].hr)*60
						}

						let recessMin =  hoursDiff  + (time.end[1].min - time.start[1].min);

						return (
							<React.Fragment	key={time.id}>
							<li className="totalRecMin">
								{recessMin < 0 ? 'Counting total Min' : recessMin+' min'}
								{recessMin>0 && <button className="btn del" onClick={()=>{delTime(time.id)}}>D</button>}
								{recessMin>0 && <button className="btn del" onClick={()=>{editTimeSlot(time.id)}}>E</button>}
							</li>
							
							<li	key={time.id} className="timeBreak">
							Start: {time.start[0].hr+'hr '}  
							{ time.start[1].min+'min'} :: 

							End: {time.end[0].hr}{time.end[0].hr && 'hr '}
							{time.end[1].min}{time.end[0].hr && 'min'}
							
								
							</li>
							{delTimeSlot && <DelTimeSlotMsg />}
							
							</React.Fragment>
							)
					})
					
				}
			</ul>
		)
	}


	return (
		<div className="container">
			<h2 className="title">Record Your Recess</h2>
			
			<Total time={times} counter={minutes} />

			<p style={{color: 'white'}}>
			</p>
			<div className="btn-group">
				
				{ startTimeId=='' ? <button className="btn add" onClick={startRecess}>Start</button> : <button className="btn stop" onClick={stopRecess}>Stop</button>}
			</div>


			<TimeList />
			{
				delWarningMsg &&
				<div className="alert">
				<br />
				<br />
					Are you sure want to delete all records?<br />once deleted , you will not able to restore.<br /><br />
					<button className="btn" onClick={confirmYes}>Yes</button>
					<button className="btn" onClick={confirmNo}>No</button>
				</div>
			}
			{times.length>0 && <button className="deleteAll" onClick={handleDelAll}>Delete All</button>}	
			{ isDuplicate &&
				<div className="popup">
					<h4>Dulicate Time</h4>
				</div>
			}
			{editTime && <EditScreen/>}
		</div>
	);
}


export default Bookmark;