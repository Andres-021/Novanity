import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery, useLazyQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import NavBar from '../../components/shared/navbar'
import {
  Container,
  Row,
  Col,
  Spinner,
  Button
} from 'react-bootstrap'

import '../../styles/home.css';
import Cards from '../../components/home/card';
import queries from '../../utils/queryProjects';


const Home = () => {

  // Obtenemos los datos del localStorage, luego los parseamos en un json
  // y guardamos en una const para reutilizar en el codigo.
  const userJson = localStorage.getItem("user");
  const user = JSON.parse(userJson);
  
  const {loading, data} = useQuery(queries.query.viewProjectsStudents, {variables: { id_estudiante: user._id }});

  

  if(user.rol === 'Lider'){

  }

  // useEffect(() =>{
  //   if(user.rol === 'Estudiante'){
  //     // Hacemos la consulta de los estudiantes.
  //     students({variables: { id_estudiante: user._id }});
  //   }
  // },[!loading]);

  if(!loading){
    console.log(data);
  }
  // if(!loading){

    // Mapeamos los datos de projects para que solo me entregue las inscripciones
    // const inscripciones = projects.map( ({ inscripciones_estudiantes}) => ({ inscripciones_estudiantes }) );
    // console.log('inscripcions: ', inscripciones);
    // const last_project_registered = inscripciones.filter(item => item.id_estudiante === user._id);
    // console.log("filtrado: ",last_project_registered); 
  //}

  return(
    <>
      <NavBar/>
      <Container className='first-home-container'>
        {
          loading
          ? <Spinner animation="border" />
          : <Row className='justify-content-center'>
              <Col>
                <Row>
                  <Col xs={12} md={8}>
                    {
                      user.rol === 'Lider'
                      ? <h2>Proyectos creados</h2> 
                      : user.rol === 'Estudiante' 
                      ? <h2>Proyectos inscritos</h2> 
                      : null
                    }
                    <br/>
                  </Col>
                  <Col xs={6} md={4}>
                    {
                      user.rol === 'Lider'
                      ? <Button href='/leaderProjects'>Ver</Button>
                      : user.rol === 'Estudiante' 
                      ? <Button href='/studentProjects'>Ver</Button>
                      : null
                    }
                  </Col>
                </Row>
                  {
                    user.rol === 'Estudiante'
                    ? <Cards list={data.proyectosEstudiante}/>
                    : null
                  }
              </Col>
              <Col>
              </Col>
            </Row> 
        }
      </Container>
      <a href="https://icons8.com/icon">Icons by Icons8</a>
    </>
  );
}

export default Home;