import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import 'antd/dist/antd.min.css';
import GlobalStyles from './components/GlobalStyles';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCLoYdxkL09HcfFPpVJYbiqUIRGRCYJZ08',
    authDomain: 'manager-student-52a76.firebaseapp.com',
    projectId: 'manager-student-52a76',
    storageBucket: 'manager-student-52a76.appspot.com',
    messagingSenderId: '807398037767',
    appId: '1:807398037767:web:80f29cc1af1e01b0e84da2',
    measurementId: 'G-S007JHMJ2Z',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>

    // </React.StrictMode>,
    <Provider store={store}>
        <GlobalStyles>
            <App />
        </GlobalStyles>
    </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
