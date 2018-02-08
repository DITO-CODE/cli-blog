import React,{Component} from 'react';
import { Carousel } from 'react-bootstrap';

import Slider from 'react-slick';


  const imagesThumb = [
    "https://www.gnp.com.mx/wps/wcm/connect/912b71da-0683-4edd-9718-1f923f412bf2/CATEGORIASLYG.png?MOD=AJPERES&CACHEID=912b71da-0683-4edd-9718-1f923f412bf2",
    "https://www.gnp.com.mx/wps/wcm/connect/912b71da-0683-4edd-9718-1f923f412bf2/CATEGORIASLYG.png?MOD=AJPERES&CACHEID=912b71da-0683-4edd-9718-1f923f412bf2",
    "https://www.gnp.com.mx/wps/wcm/connect/912b71da-0683-4edd-9718-1f923f412bf2/CATEGORIASLYG.png?MOD=AJPERES&CACHEID=912b71da-0683-4edd-9718-1f923f412bf2"
  ]

class Inicio extends Component{
    constructor(props){
        super(props);
        this.state = {
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
                      infinite: true,
                      dots: true
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
        }
    }
    render(){
        return (

            <div className="contenedor">
                <div className="col-md-12">
                    <Carousel>
                    {
                        this.props.contenidos.map((value,index)=>{
                        return (
                            <Carousel.Item key={index}>
                            <img width={893} height={365} alt="893x365" src={value.data.contenido.imgUrl} />
                            </Carousel.Item>
                        )
                        })
                    }
                    </Carousel>
                </div>
    
                {
                    this.props.banners.map((value,index)=>{
                        return (
                        <div className="col-xs-12 col-md-4 contendorThumb" key={index}>
                            <div className="thumbnail">
                            <img className="imageThumbail" alt="893x365" src={value.data.img} />
                            <div className="caption text-right">
                            <button className="btn btn-primary"
                            onClick={this.seleccion.bind(this,value.data.contenido)}
                            >CONSULTAR</button>
                            </div>
                            </div>
                        </div>
                        )
                    })
                }

                <div className="col-md-12 recomendados">
                    <label className="tituloRecomendado"><div className="imgTitleAR"></div>
                    <span className="textoTituloR">Articulos Recomendados</span></label>
                </div>

                <div className="col-md-12">
                <Slider {...this.state.settings}>
                    {
                        this.props.preferidos.map((value,index)=>{
        
                        return (
                            <div key={index}>
                           <div className="thumSlider"> 
                                <img width={190} height={85} alt="893x365" className="imagenesSelect"
                                onClick={this.seleccion.bind(this,value.id)}
                                src={value.data.contenido.imgUrl} />
                                <label className="tituloSlider">{value.data.titulo}</label>
                                <div className="contenidoSlider" 
                                    dangerouslySetInnerHTML={{__html:value.data.contenido.texto}} />
                           </div>
                           </div>
                           
                        )
                        })
                    }
                </Slider>
                </div>
                
                
                
            
          </div>
        )
    }

    seleccion(id,event){
        this.props.selectArticulo(id)
    }

   
}

export default Inicio