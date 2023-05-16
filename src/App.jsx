import preguntas from "./preguntas"
import './global.css'
import { useState, useEffect } from "react"

function App() {
    const [preguntaActual, setPreguntaActual] = useState(0);
    const [puntuacion, setPuntuacion] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [tiempoRestante, setTiempoRestante] = useState(10); //10 segundos ahre
    const [areDisabled, setAreDisabled] = useState(false) //nos quedamos sin tiempo y nos desactive los botones
    const [answersShown, setAnswersShown] = useState(false)



      function handleAnswerSubmit(isCorrect, event){
        //anañadir puntuación
        if (isCorrect) setPuntuacion(puntuacion +1)
        //añadir estilos de preguntas
        event.target.classList.add(isCorrect ? "correct" : "incorrect")
        //cambiar a la siguiente pregunta
        setTimeout(() => {
          if (preguntaActual === preguntas.length - 1){
            setIsFinished(true);
          } else {
            setPreguntaActual(preguntaActual + 1);
          }
        }, 1000);
      }

      useEffect(() => {

        const intervalo = setInterval (() => {
          if(tiempoRestante > 0) setTiempoRestante ((prev) => prev - 1)
          if (tiempoRestante === 0) setAreDisabled(true)
        }, 1000 ) 
          return () => clearInterval(intervalo) //cancelar la función, o sea limpialo
      },[tiempoRestante] )

       if(isFinished) return (
        <main className="app">
          <div className="juego-terminado">
          <span>Obtuviste {puntuacion} de {preguntas.length}{" "}</span>
          <button onClick={() => (window.location.href="/")}> Volver a jugar c:</button>
          <button onClick={() => {
          setIsFinished(false)
          setAnswersShown(true)
          setPreguntaActual(0)
          }
          }> Ver respuestas</button>
          </div>
        </main>
       )

       if (answersShown)
       return <main className="app"> 
                  <span>Respuestas:</span> 
                <div className="lado-izquierdo">
                    <div className="numero-pregunta">
                      <span> Pregunta {preguntaActual + 1} de</span> {preguntas.length}
                    </div>
                    <div className="titulo-pregunta">
                      {preguntas[preguntaActual].titulo}
                    </div>
                    <div>
                      {
                        preguntas[preguntaActual].opciones.filter((opcion) => 
                      opcion.isCorrect)[0].textoRespuesta
                      }
                    </div>
                    <button
                        onClick={() => {
                          if (preguntaActual === preguntas.length - 1) {
                            window.location.href = "/";
                          } else {
                            setPreguntaActual(preguntaActual + 1);
                          }
                        }}
                      >
                          {preguntaActual === preguntas.length - 1
                             ? "Volver a jugar" : "Siguiente"}
                      </button>
                    
                </div>
             </main>


  return (
    <main className="app">
      <div className="lado-izquierdo">
          <div className="numero-pregunta">
            <span> Pregunta {preguntaActual + 1} de</span> {preguntas.length}
          </div>
          <div className="titulo-pregunta">
            {preguntas[preguntaActual].titulo}
          </div>
          <div> {!areDisabled ? (  
            <span className="tiempo-restante">Tiempo restante: {tiempoRestante}{" "}</span>
           ) : (
            <button onClick={() => {
              setTiempoRestante(10)
              setAreDisabled(false)
              setPreguntaActual(preguntaActual + 1)
            }}>Continuar</button>
           )} </div>
      </div>
        <div className="lado-derecho">
            {preguntas[preguntaActual].opciones.map((respuesta) => (
              <button
                disabled={areDisabled}              
               key={respuesta.textoRespuesta} 
              onClick={(event) => handleAnswerSubmit(respuesta.isCorrect, event)}>
              {respuesta.textoRespuesta}</button>
              ))} 
      </div>
    </main>
  )
}

export default App
