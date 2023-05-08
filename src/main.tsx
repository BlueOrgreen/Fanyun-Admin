import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import zhCN from 'antd/lib/locale/zh_CN';
import 'antd/dist/reset.css';
import './styles/index.css';
import { ConfigProvider } from 'antd';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ConfigProvider locale={zhCN}>
        <App />
    </ConfigProvider>,
);
