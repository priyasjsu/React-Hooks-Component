import React, {ReactHTMLElement, useState, useEffect, useReducer, 
    useContext, createContext, useCallback, ChangeEvent, FormEvent} from 'react';

export const Todo :React.FC = () => {
    type Todo = {
        text: string;
        id: number;
        status: boolean
    }
    const [todos, setTodos] = useState<Todo[]>([])
    const [todoText, setTodoText] = useState<string>('')
    const [todo, setTodo] = useState<Todo|null>(null)
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodoText(e.target.value)
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newTodo = {text: todoText, id: todos.length+1, status: true}
        setTodos([...todos, newTodo])
        setTodoText('')
    }
    const handleStatusChange = (e: React.FormEvent, curTodo: Todo) => {
        e.preventDefault();
        const updatedTodos: Todo[] = todos.map((todo) => {
            if(todo.id === curTodo.id){
                todo.status = false
            }
            return todo
        })
        setTodos(updatedTodos)
    }
    const handleRmove = (e: React.FormEvent, curTodo: Todo) => {
        e.preventDefault();
        const updatedTodos: Todo[] = todos.filter((todo) => todo.id !== curTodo.id)
        setTodos(updatedTodos)
    }

    return(
        <div>
            <h1>
            Todo App
            </h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input type="text" value={todoText} onChange={(e) => handleInputChange(e)}/>
                <input type="submit" value="Submit"/>
            </form>
            {
                todos.map((todo) => 
                    <li key={todo.id}>
                        {todo.text}
                        {todo.status&&
                            <input type="checkbox" onClick={(e) => handleStatusChange(e, todo)}/>
                            
                        }
                        
                        <button onClick={(e) => handleRmove(e, todo)}>
                            Remove
                        </button>
                    </li>
                )
            }
        </div>
    )
}

export const ToggleSwitch: React.FC = () => {
    const[status, setStatus] = useState<boolean>(true)

    return(
        <>
        
        <button onClick={(e) => setStatus(!status)}>
        {status ? 'On' : 'Off'}
        </button>
        </>
    )
}

export const FormValidation: React.FC = () => {

    type form = {
        name: string;
        email: string;
        pass: string;
    }
    const [formValue, setformValue] = useState<form>({name: '', email: '', pass: ''})
    const [error, setError] = useState<string[]>([])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        setformValue({...formValue, [e.currentTarget.id]: e.currentTarget.value})
    }
    const isFormValidate = () => {
        if(formValue.name.trim()===''){
            setError(prevError => [...prevError, 'Name value cannot be empty'])
        }
        if(!formValue.email.includes('@')){
            setError(prevError => [...prevError, 'Email value is invalid'])

        }
        if(formValue.pass.length<8){
            setError(prevError => [...prevError,'password value is invalid'])
        }
        if(error.length === 0){
            return true
        }
        else{
            return false
        }
        
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        isFormValidate();
    }

    return(
        <>
        {error.length === 0 ? 'Valid form' : <>{
            error.map((err, i) => 
                <li key={i}> {err}
                </li>
            )}
            
            </>}
        <form onSubmit={(e) => handleSubmit(e)}>
            <label>name:</label>
            <input type= "text" value={formValue.name} id = "name" onChange={(e) => handleChange(e)} required/>
            <label>email:</label>
            <input type= "text" value={formValue.email} id = "email" onChange={(e) => handleChange(e)} required/>
            <label>password:</label>
            <input type= "text" value={formValue.pass} id = "pass" onChange={(e) => handleChange(e)} required/>
            <input type ="submit" value= "Submit"/>
        </form>
        </>
    )
}

export const DataFetch: React.FC = () => {
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        const getData = async() => {
            try{
                const res = await fetch('https://cat-fact.herokuapp.com/facts/', {
                    method: 'get',
                    headers: {'Content-type':
                         'application/json'}
                })
                if(!res.ok){
                    throw new Error('Error received as response');
                }
                const data = await res.json()
                setLoading(false)
            }catch(e){
                setLoading(false)
                console.log(e)
            }
        }
        getData()
    }, [])
    return(
        <>
            {isLoading ? '...Loading' : 'Data has Loaded or get the error from api'}
        </>
    )
}

export const Accordion: React.FC = () => {

    type Section = {
        'home': boolean;
        'about': boolean;
        'contacts': boolean;
    }
    const defaultSection = {'home': false, 'about': false, 'contacts': false}
    const [section, setSection] = useState<Section>(defaultSection);
    const titles:(keyof Section)[] = ['home', 'about', 'contacts'];

    const handleToggle = (key: string, val: boolean) => {
        setSection({...defaultSection, [key]: !val});
    }

    return(
        <>
        
            {titles.map((title, i) => <li style ={{listStyleType:"none", border: "1px solid black", cursor: "pointer"}} key = {i} onClick={() => handleToggle(title, section[title])}> 
                {title}
                {section[title] && 
                <div>
                    children of {title}
                </div>}
            </li> )}
        
        </>
    )
}

export const TabNavigation: React.FC = () => {

    type Tab = {
        title: string;
        status: boolean;
    }

    const defaultTab = [{title: 'Home', status: true},
    {title: 'About', status: false},
    {title: 'Contact', status: false}]

    const [tabs, setTabs] = useState<Tab[]>(defaultTab)

    const handleTabStatus = (cur_tab: Tab) => {
        const updatedTab: Tab[] = tabs.map((tab) => {
            if(tab.title === cur_tab.title){
                 tab.status = true
                 return tab
            }
            tab.status = false
            return tab
        })
        setTabs(updatedTab)
    }
    return (
            <>
            <div>
            {
              tabs.map((tab, i) => 
                <button key= {i} onClick={() => handleTabStatus(tab)}>
                    {tab.title}
                </button>
              )  
            }
            </div>
            {/* home section */}
            { tabs.map((tab, i) => {
                if(tab.status){
                    if(tab.title === 'Home'){
                        return <div key = {i}>
                                this is home screen
                                </div>
                    }
                    {/* about section */}
                    if(tab.title === 'About'){
                        return <div key = {i}>
                                this is about screen
                                </div>
                    }
                    {/* contact section */}
                    if(tab.title === 'Contact'){
                        return <div key = {i}>
                                this is contact screen
                                </div>
                    }
                }
            })}
            </>
    )
}

export const ThemeSwitch : React.FC = () => {

    type Itheme = {
        black : string,
        white : string
    }
    const Themes = {
        black : 'white',
        white : 'black'
    }
    type ThemeKeys = keyof typeof Themes;


    const[theme, setTheme] = useState<ThemeKeys>('white')

    const changeTheme = (theme: ThemeKeys) => {
        if(theme === 'white'){
            setTheme('black')
        }
        else{
            setTheme('white')
        }
    }

return(
    <>
        
        <div style={{backgroundColor: theme, height: '120px', width: '120px'}}>
        <button onClick={() => changeTheme(theme)} style={{color: theme === 'white'? 'black': 'white'}}>
        "Toggle Theme"
        </button>
        </div>
    </>
    
 
)
}

export const Search: React.FC = () => {
    const itemsList = [
        'Apple',
        'Banana',
        'Cherry',
        'Date',
        'Elderberry',
        'Fig',
        'Grape'
      ]
    const [items, setItems] = useState<string[]>(itemsList)

    const handleChange = (searchVal: string) => {
        searchVal = searchVal.toLowerCase()
        const updatedItems = itemsList.filter((item) => item.toLowerCase().includes(searchVal))
        console.log(updatedItems)
        setItems(updatedItems);
    }
    return(
        <>
        <input type="text" onChange={(e) => handleChange(e.target.value)}/>
        {items.map((item, i) => 
                <li key={i} style={{listStyleType:"none"}}>
                       {item}         
                </li>
        )}
        </>
    )
}



// export const FetchComponent: React.FC = () => {

//     const useFetch = async(url: string) => {

//         interface IRes {
//             data: any;
//             err: any;
//         }
    
//         const result: IRes = {data: null , err: null}
//         try{
//             const res = await fetch(url, {
//                 method: 'get',
//                 headers: {
//                     "Content-type": 'application/json'
//                 }
//             })
//             if(!res.ok){
//                 result['err'] = 'Network error occured'
//             }
//             result.data = await res.json()
//             return result 
//         }catch(e){
//             result['err'] = 'Error occured'
//             return result
//         }
//     }


// }

export const Form: React.FC =  () => {
    type FormData =  {
        name: string;
        email: string;
        password: string;

    }
    const defaultValue = {
        name: "",
        email: "",
        password: ""
    }
    const [formData, setFormData] = useState<FormData>(defaultValue);
    const [error, setError] = useState<boolean>(false);
    const [errMessage, setErrorMessage] = useState<string[]>([])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prevFormData => ({
            ...prevFormData, [e.target.name]: e.target.value
        }))
    }
    const isValidate = () => {
        const errorMessage = [];
        if(formData.name.trim() === ''){
            errorMessage.push('Name cannot be empty')
        }
        if(formData.email.trim() && !formData.email.includes('@')){
            errorMessage.push('Email is not valid')
        }
        if(formData.password.trim() && formData.password.length<6){
            errorMessage.push('Password is not valid')
        }
        if(errorMessage.length>0){
            setError(true)
            setErrorMessage(errorMessage)
            return false
        }else{
            return true
        }
    }

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        setError(false)
        if(isValidate()){
            console.log("form is valid");
        }else{
            console.log(errMessage)
        }
    }

    return(
        <>
        {error && <p> {errMessage.join('')}
        </p>}
        <form onSubmit = {(e) => handleSubmit(e)}>
            <label>
                Name:
            </label>
            <input type="text" name = "name" value= {formData.name} onChange={(e) => handleChange(e)}/>
            <label>
                Email:
            </label>
            <input type="text" name = "email" value= {formData.email} onChange={(e) => handleChange(e)}/>
            <label>
                Password:
            </label>
            <input type="text" name = "password" value= {formData.password} onChange={(e) => handleChange(e)}/>
            <input type="submit"/>
        </form>
        </>
    )
}

// export const Toggle: React.FC = () => {
//     interface State {
//         status: boolean
//     }

//     type Action = | {type: true} | {type: false}
//     const toggleReducer = (state: State, action: Action) => {
//         switch(action.type){
//             case true: {
//                 return {status: true}
//             }
//             case false: {
//                 return {status: false}
//             }
//             default: console.log('error')
//         }
//     }

//     const [state, dispatch] = useReducer(toggleReducer, {status: false})
//     return(
//         <button style={{backgroundColor: state.status ? 'green': 'grey'}} onClick={() => dispatch({status: !state.status})}>
//             {state.status}
//         </button>
//     )
// }

export const Counter: React.FC = () => {
    const [count, setCount] = useState<number>(0)

    useEffect(() => {
        const getCountValue = () => {
          const storedCount = localStorage.getItem('count');
          setCount(storedCount !== null ? JSON.parse(storedCount) : 0);
        };
        getCountValue();
      }, []); // This runs only once, on mount
    
      useEffect(() => {
        localStorage.setItem('count', JSON.stringify(count));
      }, [count]); // This runs every time `count` changes

    return (
        <>
          <h1>{count}</h1>
          <button onClick={() => setCount((prevCount) => prevCount + 1)}>
                Increment
            </button>
            <button onClick={() => setCount((prevCount) => prevCount - 1)}>
                Decrement
            </button>
        </>
      );
}

export const ParentComponent: React.FC = () => {
    const [showChild, setShowChild] = useState(true);
  
    return (
      <div>
        <button onClick={() => setShowChild(!showChild)}>
          {showChild ? 'Unmount Child' : 'Mount Child'}
        </button>
        {showChild && <Counter />}
      </div>
    );
  };

export  const Chess = () => {
    const boardSize = 8; // 8x8 chessboard
    const squares = Array.from({ length: boardSize });
  
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {squares.map((_, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex' }}>
            {squares.map((_, colIndex) => {
              const isBlack = (rowIndex + colIndex) % 2 === 1;
              return (
                <div
                  key={colIndex}
                  style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: isBlack ? 'black' : 'white',
                    border: '1px solid black'
                  }}
                ></div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

export const DynamicForm:React.FC = () => {
    type inputVal = {
        id: number;
        text: string;
    }
    const [inputArr, setInputArr] = useState<inputVal[]>([{id: 1, text: ""}]);
    // const [textArr, setTextArr] = useState<string[]>(['']);

    const handleInputFieldValue = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedArr = [...inputArr];
        inputArr[i]['text'] = e.target.value;
        setInputArr(updatedArr);
    }

    const handleCountofInput = (i:number = -1, type: string) => {
        const updatedArr = [...inputArr];
        if(type === 'add'){
            updatedArr.push({id: updatedArr.length+1, text: ""});
            setInputArr(updatedArr);
        }else{
            updatedArr.splice(i, 1);
            setInputArr(updatedArr);
        }
    }
    return(
        <>
        {
          inputArr.map((val, i) => 
            <div key = {i}>
            {i}: <input type="text" value={val.text} onChange={(e) => handleInputFieldValue(i, e)}/>
            <button onClick={() => handleCountofInput(i, '')}> delete
            </button>
            </div>
          )
        }
        <button onClick = {() => handleCountofInput(-1, 'add')}>
            Add more input fields
        </button>
        <>
        {inputArr.map((obj, i) => 
        <p key={i}>
            Text will render here:
            {obj.text}
        </p>
        )}
        </>
        </>
    )
}

export const DebouncedSearch: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [debouncedQuery, setDebouncedQuery] = useState<string>(query);
    const [results, setResults] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
  
    // Debounce the query input
    useEffect(() => {
        console.log('call');
      const handler = setTimeout(() => {
        console.log('setTimeout called');
        setDebouncedQuery(query);
      }, 500); // 500ms debounce time
      console.log('after setTimeout call');
      return () => {
        console.log('clear interval', handler);
        clearTimeout(handler);
      };
    }, [query]);
  
    // Fetch data from the API when the debouncedQuery changes
    useEffect(() => {
      if (debouncedQuery) {
        const fetchData = async () => {
          try {
            setError(null);
            const response = await fetch(`https://api.github.com/search/users?q=${debouncedQuery}`);
            if (!response.ok) {
              throw new Error('Failed to fetch');
            }
            const data = await response.json();
            setResults(data.items || []);
          } catch (err) {
            setError('error occured');
          }
        };
        fetchData();
      } else {
        setResults([]);
      }
    }, [debouncedQuery]);
  
    return (
      <div>
        <h3>Debounced Search Component</h3>
        <input
          type="text"
          placeholder="Search for GitHub users..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <ul>
          {results.map((user) => (
            <li key={user.id}>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                {user.login}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };


export const MyComponent: React.FC = () => {
  const [count, setCount] = useState(0);
  const [newCount, setnewCount] = useState(0);


  useEffect(() => {
    console.log('Effect ran');

    // Example of a side effect (e.g., setting up a timer)
    const timer = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    // Cleanup function
    return () => {
      console.log('Cleanup function triggered');
      clearInterval(timer);
      setCount(0);
    };
  }, [newCount]); // Empty dependency array means this runs only on mount/unmount

  return <div>Count: {count}
  <button  onClick = {() => setnewCount((prevCount) => prevCount + 1)}>
    Add New Count
    </button>

  </div>;
};


// type Action = {type: 'black'} | {type: 'white'} | {type: 'green'} 
// interface State {
//     theme: string;
// }
// const getLocalTheme = (): State => {
//     const storageTheme: any = localStorage.getItem('theme');
//     if(storageTheme){
//         return JSON.parse(storageTheme)
//     }
//     else {
//         return {theme: 'default'}
//     }
// }
// let initialState: State;

// if(getLocalTheme()['theme'] !== 'default'){
//      initialState = getLocalTheme();
// }else{
//      initialState = {theme: 'black'}
// }


// const reducer = (state: State, action: Action): State => {
//     console.log('reducer', action)
//     switch(action.type){
//         case 'white':
//             localStorage.setItem('theme', JSON.stringify({theme: 'white'}))
//             return {theme: 'white'}
//         case 'black': 
//             localStorage.setItem('theme', JSON.stringify({theme: 'black'}))
//             return {theme: 'black'}
//         case 'green': 
//             localStorage.setItem('theme', JSON.stringify({theme: 'green'}))
//             return {theme: 'green'}
//         default: {
//             return state;
//         }
//     }
// }

// const ThemeContext =  createContext({state: initialState, dispatch});

// export const useThemeContext = () => useContext(ThemeContext);

// export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     const [state, dispatch] = useReducer(reducer, initialState);

//     return (
//         <ThemeContext.Provider value={{ state, dispatch }}>
//             {children}
//         </ThemeContext.Provider>
//     );
// };

// export const ParentTheme: React.FC = () => {
//     return (
//     <ThemeProvider>
//         <ThemeSwitchHooks/>
//     </ThemeProvider>
//     )
// }

// export const ThemeSwitchHooks: React.FC = () => {
//     const { state, dispatch } = useThemeContext();

//     return(
//         <div style={{backgroundColor : state.theme, 
//         height: '200px',
//         width: '200px',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         border: '1px solid',
//         transition: 'all 0.3s ease',
//     }}>
//             <button type='button' onClick={() => dispatch({ type: 'black' })}>
//                 Switch theme to black
//             </button>
//             <button type='button' onClick={() => dispatch({ type: 'white' })}>
//                 Switch theme to white
//             </button>
//             <button type='button' onClick={() => dispatch({ type: 'green' })}>
//                 Switch theme to green
//             </button>
//         </div>
//     )
// }

type Action = { type: 'TOGGLE_THEME' };

interface State {
    theme: 'light' | 'dark';
}

const getLocalTheme = (): State => {
    const storageTheme = localStorage.getItem('theme');
    return storageTheme ? JSON.parse(storageTheme) : { theme: 'light' };
};

const initialState: State = getLocalTheme();

const ThemeContext = createContext<{
    state: State;
    dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

const themeReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'TOGGLE_THEME':
            const newTheme = state.theme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', JSON.stringify({ theme: newTheme }));
            return { theme: newTheme };
        default:
            return state;
    }
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(themeReducer, initialState);

    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(state));
    }, [state]);

    return (
        <ThemeContext.Provider value={{ state, dispatch }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeSwitcher: React.FC = () => {
    const { state, dispatch } = useThemeContext();

    return (
        <div style={{
            backgroundColor: state.theme === 'light' ? '#fff' : '#333',
            color: state.theme === 'light' ? '#000' : '#fff',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'all 0.3s ease'
        }}>
            <button 
                onClick={() => dispatch({ type: 'TOGGLE_THEME' })} 
                style={{
                    padding: '10px 20px',
                    cursor: 'pointer',
                    borderRadius: '5px',
                    border: 'none',
                    background: state.theme === 'light' ? '#333' : '#fff',
                    color: state.theme === 'light' ? '#fff' : '#333'
                }}
            >
                Toggle Theme
            </button>
        </div>
    );
};

export const ThemeSwitchwithHook: React.FC = () => {
    return (
        <ThemeProvider>
            <ThemeSwitcher />
        </ThemeProvider>
    );
};

const ChildComponent = ({ onButtonClick }: { onButtonClick: () => void }) => {
    console.log('ChildComponent rendered');
    return (
        <button onClick={onButtonClick}>Click me!</button>
    );
};

export const ParentComponent1: React.FC = () => {
    const [count, setCount] = useState<number>(0);

    // Without useCallback, this function would be recreated on every render
    const incrementCounter = useCallback(() => {
        setCount(prevCount => prevCount + 1);
    }, []);

    return (
        <div>
            <h1>Counter: {count}</h1>
            <ChildComponent onButtonClick={incrementCounter} />
        </div>
    );
};

export const Form1: React.FC = () => {
    interface formVal {
        name: string;
        email: string;
        password: string;
        [key: string]: string;
    }

    const defaultVal = {
        name: '',
        email: '',
        password: ''
    }
    const [formData, setFormData] = useState<formVal>(defaultVal);
    const [error, setError] = useState<formVal>(defaultVal);
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value // Dynamically update the corresponding field
        }));
    }
    const isValidFormData = () => {
        const updatedError:formVal  = defaultVal;
        if(formData.name.trim() === ''){
            updatedError['name'] = 'Name is required';
        }
        if(formData.email.trim() === ''){
            updatedError['email'] = 'Email is required';
        }
        if(formData.password.trim() === ''){
            updatedError['password'] = 'Password is required';
        }
        // if(updatedError.length > 0){
        //     setError(updatedError);
        //     return;
        // }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(formData.email.trim() !== '' && !emailRegex.test(formData.email)){
            updatedError['email'] = 'Email is not valid';
        }
        setError(updatedError)
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        isValidFormData();
    }

    return(
        <>
        <form onSubmit={handleSubmit}>
            Name: <input type = "text" value={formData.name} name = "name" onChange={handleFormChange}/>
            <p>
                {error.name}
            </p>
            Email: <input type = "text" value={formData.email} name="email" onChange={handleFormChange}/>
            <p>
                {error.email}
            </p>
            Password: <input type = "text" value={formData.password} name="password" onChange={handleFormChange}/>
            <p>
                {error.password}
            </p>
            <input type="submit"/>
        </form>

        <li>Name: {formData.name}</li>
        <li>Email: {formData.email}</li>
        <li>Password: {formData.password}</li>
        </>
    )
}

export const GetData: React.FC = () => {

    interface DataItem {
        _id: string;
        text: string;
    }

const [error, setError] = useState<string>();
const [loading, setLoading] = useState<boolean>();
const [data, setData] = useState<DataItem[]>([]);

    useEffect(() => {
        setLoading(true);
        const res = fetch('https://cat-fact.herokuapp.com/facs/', {
            method: 'get',
            headers: {
                'Content-type': 'application/json'
            }
        })
        res.then((response) => {
            if(!response.ok){
                setError('Network error occured');
            }
            return response.json();
        })
        .then((data) => {
            if(data && data.length>0){
                setData(data);
            }
            setLoading(false);
        })
        .catch((e) => {
            setError('Network error occured');
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }
    return(
        <>
        Fetched Data: 
        {data.map((obj) =>
        <li key = {obj._id}>
            {obj.text}
        </li>
        )}
        </>
    )
}

export const DynamicList: React.FC = () => {

const [listData, setListData] = useState<string[]>([])
const [currVal, setCurrVal] = useState<string>('');

const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrVal(e.target.value);
}

const handleAddList = (e: FormEvent) => {
    setCurrVal('');
    setListData((prevState) => [...prevState, currVal]);
}

const handleRemove = (index: number) => {
    const updatedListData = [...listData];
    updatedListData.splice(index, 1);
    setListData(updatedListData);
}

    return(
        <>
        <input type="text" value = {currVal} onChange={handleChange}/>
        <button onClick={handleAddList}>
            Add
        </button>
        <div>
            <ul>
            {listData.map((val, i) =><li key={i}>
                {val}
                <button onClick={() => handleRemove(i)}>
                Remove
            </button>
            </li>
            
            )}
            </ul>
            </div>
        </>
    )
}


export function ProgressBar() {
    const styles = {
        container: {
        //   textAlign: 'center',
          marginTop: '50px',
        },
        progressBar: {
          width: '80%',
          height: '30px',
          backgroundColor: '#e0e0e0',
          borderRadius: '5px',
          margin: '0 auto',
          overflow: 'hidden',
        },
        progress: {
          height: '100%',
          backgroundColor: '#76c7c0',
          transition: 'width 0.5s ease-in-out',
        },
        button: {
          marginTop: '20px',
          marginRight: '10px',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
        },
      };
  const [progress, setProgress] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<any>(null);

  const startTask = () => {
    if (intervalId) return; // Prevent multiple intervals from starting

    const id = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= 100) {
          clearInterval(id);
          setIntervalId(null);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 500); // Update progress every 500ms

    setIntervalId(id);
  };

  const resetProgress = () => {
    clearInterval(intervalId);
    setProgress(0);
    setIntervalId(null);
  };

  return (
    <div style={styles.container}>
      <h1>Progress Bar Example</h1>
      <div style={styles.progressBar}>
        <div style={{ ...styles.progress, width: `${progress}%` }} />
      </div>
      <button onClick={startTask} style={styles.button}>
        Start Task
      </button>
      <button onClick={resetProgress} style={styles.button}>
        Reset
      </button>
      <p>{progress}%</p>
    </div>
  );
}




