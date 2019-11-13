import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import SearchResult from './components/SearchResult';
import MedicineSearch from './components/MedicineSearch/MedicineSearch';
import PharamcySearch from './components/PharmacySearch/PharmacySearch';
import MedicineResult from './components/MedicineSearch/MedicineResult';
import PharmacyResult from './components/PharmacySearch/PharmacyResult';

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/medicineSearch' component={MedicineSearch} />
    <Route path='/medicineResult' component={MedicineResult} />
    <Route path='/pharmacySearch' component={PharamcySearch} />
    <Route path='/pharmacyResult' component={PharmacyResult} />
    <Route path='/searchPage' component={SearchResult} />
  </Layout>
);
