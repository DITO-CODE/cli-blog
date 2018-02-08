import React,{Component} from 'react';

class Articulo extends Component {

    render(){
        return  (
            <div className="container">
                <div className="contenedor">
                <div className="col-md-8 col-sm-12 col-xs-12">
                    <button className="btn btn-primary" onClick={this.props.regresar}>VOLVER</button>
                </div>

                <div className="col-md-8 col-sm-12 col-xs-12">
                    <div className="col-md-12">
                        <img width={610} height={469} alt="893x365" src={this.props.articulo.contenido.imgUrl} />
                    </div>
                    <div className="col-md-12 contenidos">
                        <label className="tituloArticulo">{this.props.articulo.titulo}</label>
                        <br/>
                        <label className="publicado">{this.props.articulo.creacion.fecha}</label>
                        <div className="contenidoArticulo" 
                                             dangerouslySetInnerHTML={{__html:this.props.articulo.contenido.texto}} />
                    </div>
                </div> 
                <div className="col-md-4 col-sm-12 col-xs-12">
                    {
                        this.props.contenidos ? 

                            this.props.contenidos.map((value,index)=>{
                                return (
                                    <div className="col-md-12 articulosAnteriores">
                                        <img width={255} height={180} alt="893x365"  className="imagenesSelect" src={value.data.contenido.imgUrl}
                                         onClick={this.seleccion.bind(this,value.id)}
                                        />
                                        <label className="tituloSliderArticulo"  onClick={this.seleccion.bind(this,value.id)}>{value.data.titulo}</label>
                                        <div className="contenidoSlider" 
                                             dangerouslySetInnerHTML={{__html:value.data.contenido.texto}} />
                                    </div>
                                )
                            }) : null
                    }
                </div>  

                </div>
                
                
            </div>
        )
    }

    seleccion(id,event){
        this.props.selectArticulo(id)
    }
}

export default Articulo;