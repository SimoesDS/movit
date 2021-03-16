import { AppProps } from 'next/app';
import React from 'react';
import '../styles/global.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => (
    <Component {...pageProps} />
);

export default MyApp;
