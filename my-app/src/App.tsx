import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import {Todo, ToggleSwitch, FormValidation, DataFetch, 
  Accordion, TabNavigation, ThemeSwitch, Search, Form, 
  ParentComponent, Chess, DynamicForm, DebouncedSearch, MyComponent,
  ThemeSwitchwithHook, ParentComponent1,
  Form1,
  GetData,
  DynamicList,
  ProgressBar
  } from './components/Todo'

function App() {
  return (
    <Router>
    <div>
      <nav>
        <ul>
          <li><Link to="/form-validation">Form Validation</Link></li>
          <li><Link to="/progress-bar">Progress Bar</Link></li>
          <li><Link to="/theme-switch-hook">Theme Switch with Hook</Link></li>
          <li><Link to="/accordion">Accordion</Link></li>
          <li><Link to="/tab-navigation">Tab Navigation</Link></li>
          <li><Link to="/theme-switch">Theme Switch</Link></li>
          <li><Link to="/search">Search</Link></li>
          <li><Link to="/form">Form</Link></li>
          <li><Link to="/chess">Chess</Link></li>
          <li><Link to="/dynamic-form">Dynamic Form</Link></li>
          <li><Link to="/debounced-search">Debounced Search</Link></li>
          <li><Link to="/my-component">Auto Counter</Link></li>
          <li><Link to="/parent-component-1">Counter</Link></li>
          <li><Link to="/form1">Form</Link></li>
          <li><Link to="/get-data">Get Data</Link></li>
          <li><Link to="/dynamic-list">Dynamic List</Link></li>
          <li><Link to="/toggle-switch">Toggle Switch</Link></li>
          <li><Link to="/data-fetch">Data Fetch</Link></li>


        </ul>
      </nav>

      <Routes>
        <Route path="/toggle-switch" element={<ToggleSwitch />} />
        <Route path="/form-validation" element={<FormValidation />} />
        <Route path="/data-fetch" element={<DataFetch />} />
        <Route path="/accordion" element={<Accordion />} />
        <Route path="/tab-navigation" element={<TabNavigation />} />
        <Route path="/theme-switch" element={<ThemeSwitch />} />
        <Route path="/search" element={<Search />} />
        <Route path="/form" element={<Form />} />
        <Route path="/chess" element={<Chess />} />
        <Route path="/dynamic-form" element={<DynamicForm />} />
        <Route path="/debounced-search" element={<DebouncedSearch />} />
        <Route path="/my-component" element={<MyComponent />} />
        <Route path="/theme-switch-hook" element={<ThemeSwitchwithHook />} />
        <Route path="/parent-component-1" element={<ParentComponent1 />} />
        <Route path="/form1" element={<Form1 />} />
        <Route path="/get-data" element={<GetData />} />
        <Route path="/dynamic-list" element={<DynamicList />} />
        <Route path="/progress-bar" element={<ProgressBar />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
