import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import SearchResult from './components/SearchResult';
import MedicineSearch from './components/MedicineSearch/MedicineSearch';
import PharamcySearch from './components/PharmacySearch/PharmacySearch';

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/medicineSearch' component={MedicineSearch} />
    <Route path='/pharmacySearch' component={PharamcySearch} />
    <Route path='/searchPage' component={SearchResult} />
  </Layout>
);
