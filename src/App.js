import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import Articulo from './articulo';
import Slider from 'react-slick';
import Inicio from './inicio';
import axios from 'axios';

var sliderTwoRows = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  }

const path="https://us-central1-proyectosgtec-8de9b.cloudfunctions.net";

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      settings : {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ]
      },
      mes: new Date().getMonth()+1 > 10 ?  "0" + new Date().getMonth()+1 : new Date().getMonth()+1
    }
  }

  componentDidMount(){
    this.getUltimosContenidos();
    this.getUltimosContenidosPreferidos();
    this.getAnios();
    this.getBanners();
  }

  render() {


    return (
      <div className="container">

        {
          this.state.articulo ? 
            <Articulo articulo={this.state.articulo} 
            regresar={this.regresar.bind(this)}
            contenidos={this.state.contenidos}
            selectArticulo={this.selectArticulo.bind(this)}
            />

          :

          this.state.contenidos && this.state.contenidosPreferidos && this.state.banners ? 
            <Inicio contenidos={this.state.contenidos} preferidos={this.state.contenidosPreferidos} 
              selectArticulo={this.selectArticulo.bind(this)} banners={this.state.banners}
            /> 
            : "Cargando..."
        }

{this.state.contenidos && this.state.contenidosPreferidos && this.state.banners ? 
        <div className="col-md-12 newsletter">
          <div className="col-md-6">
            <label className="tituloNewslettersuscribete">Suscríbete a nuestro Newsletter</label>
            <label className="aplicar">Deseas recibir nuestras últimas noticias del portal. Recibe en tu correo electrónico todas nuestras notas.</label>
            <input className="from-control" placeholder="Nombre" />
            <input className="from-control" placeholder="Correo electrónico" />
            <p className="leyendaSuscripcion">El tratamiento de sus datos personales se realiza conforme a nuestro aviso de privacidad. ¡Consúltalo!</p>
            <button className="btn btn-success">SUSCRIBIRME</button>
          </div>

          <div className="col-md-6">
            <label className="tituloNewsletterpublicaciones">Publicaciones Anteriores </label>
           
            <select className="anios" onChange={this.setAnio.bind(this)}>
              {
                this.state.anios ?
                  this.state.anios.map((value,index)=>{
                    return (
                      <option value={value} key={index}>{value}</option>
                    )
                  }) : null
              }
            </select>
            <Slider {...this.state.settings} className="meses">
                    <div><label className="selectMes" onClick={this.setMes.bind(this,"01")}>Enero</label></div>
                    <div><label className="selectMes" onClick={this.setMes.bind(this,"02")}>Febrero</label></div>
                    <div><label className="selectMes" onClick={this.setMes.bind(this,"03")}>Marzo</label></div>
                    <div><label className="selectMes" onClick={this.setMes.bind(this,"04")}>Abril</label></div>
                    <div><label className="selectMes" onClick={this.setMes.bind(this,"05")}>Mayo</label></div>
                    <div><label className="selectMes" onClick={this.setMes.bind(this,"06")}>Junio</label></div>
                    <div><label className="selectMes" onClick={this.setMes.bind(this,"07")}>Julio</label></div>
                    <div><label className="selectMes" onClick={this.setMes.bind(this,"08")}>Agosto</label></div>
                    <div><label className="selectMes" onClick={this.setMes.bind(this,"09")}>Septiembre</label></div>
                    <div><label className="selectMes" onClick={this.setMes.bind(this,"10")}>Octubre</label></div>
                    <div><label className="selectMes" onClick={this.setMes.bind(this,"11")}>Noviembre</label></div>
                    <div><label className="selectMes" onClick={this.setMes.bind(this,"12")}>Diciembre</label></div>
                </Slider>

                <div className="col-md-12">
                {
                  this.state.contenidosFecha ? 
                  <Slider {...sliderTwoRows}>
                    {
                    
                      this.state.contenidosFecha.map((element,index) => {
                        console.log( element + ": " + index );
                        element = 1;
                        console.log (element+1);
                        return (
                      <div>  
                          <img width={190} height={85} alt="893x365" className="imagenesSelect"
                                onClick={this.selectArticulo.bind(this,element.id)}
                                src={element.data.contenido.imgUrl} />
                          <div className="col-md-6">
                            {element.data.titulo}
                          </div>
                          <br/>
                        <img width={190} height={85} alt="893x365" className="imagenesSelect"
                                onClick={this.selectArticulo.bind(this,element.id)}
                                src={element.data.contenido.imgUrl} />
                        <div className="col-md-6">
                          {element.data.titulo}
                        </div>
                      </div>
                      )
                      })
                    }
                  </Slider>
                  : null
                }

                </div>


          </div>
          
        </div>
          
      : null
              }

</div>
    );
  }

 

  setMes(mes,event){
    this.setState({mes},()=>{
      this.getContenidosFecha();
    })
  }

  setAnio(event){
    this.setState({anio:event.target.value},()=>{
      this.getContenidosFecha();
    })
  }

  getContenidosFecha(event){
    axios.post(`${path}/contenidos/getContenidosFecha`,{
      fch:`${this.state.anio}-${this.state.mes}`
    })
    .then((response)=>{
      this.setState({contenidosFecha:response.data});

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getAnios(){
    axios.post(`${path}/contenidos/getAnios`)
    .then((response)=>{
      this.setState({anios:response.data,anio:response.data[0]});
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getBanners(){
    axios.post(`${path}/contenidos/getBanners`,{
      limite:5
    })
    .then((response)=>{
      this.setState({banners:response.data});
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  getUltimosContenidos(){
    axios.post(`${path}/contenidos/getLastsContenidos`,{
      limite:5
    })
    .then((response)=>{
      this.setState({contenidos:response.data});
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getUltimosContenidosPreferidos(){
    axios.post(`${path}/contenidos/getLastFavoritos`,{
      limite:5
    })
    .then((response)=>{
      this.setState({contenidosPreferidos:response.data});
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  selectArticulo(idArticulo,event){
   
    axios.post(`${path}/contenidos/getContenido`,{
      id:idArticulo
    })
    .then((response)=>{
      this.setState({articulo:response.data});
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  regresar(event){
    this.setState({articulo:null})
  }
}

export default App;
