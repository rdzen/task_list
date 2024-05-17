import React, {useState} from 'react';
import {nanoid} from 'nanoid';

function App() {
	//это стейт для появляющейся/исчезающей textarea
	const[IsTextArea, setIsTextArea] = useState(false);
	
    //это стейт для значения textArea 
    const[textAreaValue, setValue] = useState('');
	
	//здесь создается стейт с массивом объектов задач 				
	const[taskBase, setTaskBase] = useState([]);

	//здесь стейт С ЗАДАЧАМИ копируется - чтоб можно было изменять массив объектов
	let copys = Object.assign([], taskBase);

	//это функция добавления новой задачи в массив объектов 
	function addTask(event) {
		//создаем новый элемент - объект с задачей
		let newTask = {
			id:  nanoid(), //ID задачи
			value: textAreaValue,  //текст задачи	
            status: false, //статус задачи
			isEdit: false //статус ПОЛЯ задачи, редактируемо ли оно
				};
			
		//вставляем новый элемент в массив объектов С ЗАДАЧАМИ
		copys.push(newTask);

		//обновляем стейт с массивом объектов ЗАДАЧ	
		setTaskBase(copys);	

		//прячем текстовое поле
		setIsTextArea(false);
		setValue('');		
	}		

	//функция изменения стейта СОДЕРЖИМОЕ TEXTAREA
    function handleChange(event) {
		setValue(event.target.value);
	}
	
    //функция удаления задачи
	function delTask(id) {
		let resArr = taskBase.filter(elem => elem.id !== id);
		setTaskBase(resArr);
	}

	//функция на чекбоксе - статус задачи
    function changeTaskStatus(id, status) {		

        for (let elem of copys) {
            if (elem.id === id){
                elem.status = !status;
                console.log(elem.status);                
            }
			setTaskBase(copys);
        }
    }

	//функция ПЕРЕКЛЮЧЕНИЯ СТАТУСА редактируемости задачи
    function editTask(item) {

		for (let elem of copys) {
            if (elem.id === item.id){
                elem.isEdit = !item.isEdit; 
				console.log('редактируемость ВКЛ.' + elem.isEdit);                          
            }
			setTaskBase(copys);
        }
    }

	//сохранение отредактированной задачи по потере фокуса
	function blur(item) {
		for (let elem of copys) {
            if (elem.id === item.id){
                elem.isEdit = !item.isEdit;                           
            }
			setTaskBase(copys);
        }
	}
	
	//редактирование текста задачи 
	function changeField(id, event) {
		
		for (let elem of copys) {
			console.log('это пришло Value ' + event.target.value);
			
            if (elem.id === id){
                console.log('это текст задачи ' + event.target.value);
				elem.value = event.target.value;
				setTaskBase(copys);
			}	
						                       
        }		
		
	}
	

	let result;
	function func(item) {
		
		if (item.status) {
			result = <span><s>{item.value}</s></span>
			console.log(item.value);
		} else {
			if (item.isEdit) {
				result = <input defaultValue={item.value}  
				onChange={(event)=>{changeField(item.id, event)}} onBlur={()=>{blur(item)}}
				/>
			} else {
				result = <span onClick={() => editTask(item)}>{item.value}</span>
			}
				}

		return result;
	};


	const res = copys.map(
		function(item, index) {
			return <p key={item.id}>
				<input type="checkbox" checked={taskBase[index].status}
				onChange={() => changeTaskStatus(item.id, item.status)} 
				/>
				{func(item)}&nbsp;&nbsp;&nbsp;			
				<button onClick={() => {delTask(item.id)}}>
				DelTask
				</button>
				</p>;
								}
						);
	
	return <div>
		<button onClick={() => {setIsTextArea(true)}}>	NewTask</button>
		<br/>
		{IsTextArea ? <textarea value={textAreaValue} onChange={handleChange} /> : null}
		<br/>
		{IsTextArea ? <button onClick={() => addTask()}>SaveTask</button> : null}
					
		{res}
		</div>;
}

export default App;