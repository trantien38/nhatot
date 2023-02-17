import React from 'react'
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Search from './Search/Search';

export default function Layout() {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  );
}
