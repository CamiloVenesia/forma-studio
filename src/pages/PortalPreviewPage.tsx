import { useState } from 'react';
import { ArrowUpRight, Check, Clock3, Dumbbell, PlayCircle, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from '../components/common/Reveal';
import { exercises, workouts } from '../data/workouts';
import type { Discipline } from '../types/domain';

export function PortalPreviewPage() {
  const [currentWorkout, setCurrentWorkout] = useState('lunes');
  const [completed, setCompleted] = useState<string[]>([]);
  const [category, setCategory] = useState<Discipline | 'todos'>('todos');
  const workout = workouts.find((item) => item.id === currentWorkout) ?? workouts[0];
  const currentExercises = workout
    ? workout.exerciseIds
        .map((id) => exercises.find((exercise) => exercise.id === id))
        .filter((item) => item !== undefined)
    : [];
  const progress = Math.round((completed.length / workouts.length) * 100);
  const workoutDone = completed.includes(currentWorkout);

  return (
    <section className="portal-page">
      <div className="container">
        <div className="portal-demo-notice">
          <span>VISTA DEMOSTRATIVA</span>
          <p>Alumno ficticio · Sin cuentas, almacenamiento ni datos de usuarios reales</p>
          <Link to="/asesoramiento">
            Sobre esta funcionalidad <ArrowUpRight size={15} />
          </Link>
        </div>
        <Reveal className="portal-greeting">
          <div>
            <span className="eyebrow">TU ESPACIO / PANEL DE EJEMPLO</span>
            <h1 className="display-title">
              Volvamos a<br />
              <em>movernos.</em>
            </h1>
            <p>Hola, Alex. Este es un vistazo de cómo podría funcionar tu semana.</p>
          </div>
          <div className="portal-progress">
            <div>
              <span>SEMANA ACTUAL</span>
              <strong>
                {completed.length.toString().padStart(2, '0')}
                <small> / 03</small>
              </strong>
            </div>
            <div className="portal-progress__track">
              <div style={{ width: `${progress}%` }} />
            </div>
            <span>{progress}% COMPLETADO</span>
          </div>
        </Reveal>
        <div className="portal-content">
          <div className="portal-main">
            <Reveal>
              <div className="portal-section-heading">
                <span className="eyebrow">01 / TU SEMANA</span>
                <h2>Elegí una sesión</h2>
              </div>
              <div className="workout-tabs" role="group" aria-label="Elegir día de entrenamiento">
                {workouts.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={currentWorkout === item.id}
                    onClick={() => setCurrentWorkout(item.id)}
                    className={currentWorkout === item.id ? 'is-active' : ''}
                  >
                    <small>{item.day}</small>
                    <strong>{item.title}</strong>
                    <span>{completed.includes(item.id) ? '✓ COMPLETADO' : item.duration}</span>
                  </button>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <section className="workout-detail">
                <div className="workout-detail__head">
                  <div>
                    <span className="eyebrow">02 / SESIÓN SELECCIONADA</span>
                    <h2>{workout?.title}</h2>
                    <p>{workout?.caption}</p>
                  </div>
                  <div>
                    <Clock3 size={17} />
                    {workout?.duration}
                  </div>
                </div>
                <div className="exercise-rows">
                  {currentExercises.map((exercise, index) => (
                    <details key={exercise.id} className="exercise-row">
                      <summary>
                        <span className="exercise-row__number">0{index + 1}</span>
                        <div>
                          <strong>{exercise.title}</strong>
                          <small>
                            {exercise.sets} series · {exercise.repetitions} rep.
                          </small>
                        </div>
                        <PlayCircle size={22} strokeWidth={1.35} aria-hidden="true" />
                      </summary>
                      <div className="exercise-row__detail">
                        <p>{exercise.cue}</p>
                        <p>
                          Descanso sugerido: {exercise.rest}. Ejemplo didáctico, no prescripción
                          individual.
                        </p>
                      </div>
                    </details>
                  ))}
                </div>
                <button
                  type="button"
                  className={`complete-button ${workoutDone ? 'complete-button--done' : ''}`}
                  onClick={() =>
                    setCompleted((items) =>
                      workoutDone
                        ? items.filter((id) => id !== currentWorkout)
                        : [...items, currentWorkout],
                    )
                  }
                >
                  {workoutDone ? (
                    <>
                      <Check size={19} /> Sesión completada · Desmarcar
                    </>
                  ) : (
                    <>
                      <Check size={19} /> Marcar sesión como completada
                    </>
                  )}
                </button>
              </section>
            </Reveal>
          </div>
          <aside className="portal-aside">
            <Reveal>
              <div className="library-heading">
                <span className="eyebrow">03 / MOVIMIENTOS</span>
                <h2>Biblioteca</h2>
                <p>Ejercicios de ejemplo para explorar la futura experiencia.</p>
              </div>
              <div className="library-filters" role="group" aria-label="Filtrar ejercicios">
                {(
                  [
                    ['todos', 'Todos'],
                    ['fuerza', 'Fuerza'],
                    ['pilates', 'Pilates'],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    type="button"
                    key={value}
                    aria-pressed={category === value}
                    className={category === value ? 'is-active' : ''}
                    onClick={() => setCategory(value)}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="library-list">
                {exercises
                  .filter((item) => category === 'todos' || item.category === category)
                  .map((item) => (
                    <details key={item.id}>
                      <summary>
                        <Dumbbell size={16} strokeWidth={1.5} />
                        <span>{item.title}</span>
                        <span>+</span>
                      </summary>
                      <p>{item.cue}</p>
                    </details>
                  ))}
              </div>
              <button
                className="reset-demo"
                type="button"
                onClick={() => {
                  setCompleted([]);
                  setCurrentWorkout('lunes');
                  setCategory('todos');
                }}
              >
                <RotateCcw size={15} /> Reiniciar demostración
              </button>
            </Reveal>
          </aside>
        </div>
        <p className="portal-disclaimer">
          Aviso: las rutinas y sus indicaciones son muestras genéricas para una interfaz digital.
          Consultá con profesionales calificados antes de iniciar o modificar una rutina,
          especialmente ante lesiones o síntomas.
        </p>
      </div>
    </section>
  );
}
