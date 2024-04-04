import React from 'react';
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import {Outlet} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../components/loader/Loader';

const MainLayout = () => {

    const loader = useSelector(state => state.global.loader)

    return (
        <>
            <Header />
            {loader && <Loader />}
            <Outlet />
            <Footer />
        </>
    );
};

export default MainLayout;