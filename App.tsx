import React from 'react';
import Routes from './src/routes';
import { StatusBar, setStatusBarStyle } from 'expo-status-bar';

setStatusBarStyle('light')

export default function App() {
  return (
    <Routes /> 
  );
}