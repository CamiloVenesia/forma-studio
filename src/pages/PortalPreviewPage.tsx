import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, ChevronDown, Clock3, Dumbbell, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Reveal } from '../components/common/Reveal';
import { exercises, workouts } from '../data/workouts';
import type { Discipline } from '../types/domain';

const STORAGE_KEY = 'forma-studio-routines-v1';

function readCompletedWorkouts(): string[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);

    if (!Array.isArray(parsed)) return [];

    const validIds = new Set(workouts.map((workout) => workout.id));

    return parsed.filter(
      (value): value is string => typeof value === 'string' && validIds.has(value),
    );
  } catch {
    return [];
  }
}

function canUseStorage(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const key = 'forma-storage-check';
    window.localStorage.setItem(key, '1');
    window.localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

export function PortalPreviewPage() {
  const [currentWorkout, setCurrentWorkout] = useState(workouts[0]?.id ?? '');

  const [completed, setCompleted] = useState<string[]>(readCompletedWorkouts);

  const [category, setCategory] = useState<Discipline | 'todos'>('todos');

  const [storageEnabled] = useState(canUseStorage);

  useEffect(() => {
    if (!storageEnabled) return;

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
    } catch {
      // El progreso sigue funcionando en esta sesión
      // aunque el navegador bloquee el almacenamiento.
    }
  }, [completed, storageEnabled]);

  const workout = workouts.find((item) => item.id === currentWorkout) ?? workouts[0];

  const currentExercises = workout
    ? workout.exerciseIds
        .map((id) => exercises.find((exercise) => exercise.id === id))
        .filter((item) => item !== undefined)
    : [];

  const totalWorkouts = workouts.length;

  const progress = totalWorkouts > 0 ? Math.round((completed.length / totalWorkouts) * 100) : 0;

  const workoutDone = completed.includes(currentWorkout);

  function toggleCompleted() {
    if (!workout) return;

    setCompleted((previous) =>
      previous.includes(workout.id)
        ? previous.filter((id) => id !== workout.id)
        : [...previous, workout.id],
    );
  }

  function resetProgress() {
    setCompleted([]);
    setCurrentWorkout(workouts[0]?.id ?? '');
    setCategory('todos');
  }

  return (
    <section className="portal-page">
      <div className="container">
        <div className="portal-demo-notice">
          <span>RUTINAS ABIERTAS</span>

          <p>Explorá sesiones de fuerza y pilates a tu ritmo.</p>

          <Link to="/programas">
            Conocer los programas
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>

        <Reveal className="portal-greeting">
          <div>
            <span className="eyebrow">TU ESPACIO / MOVIMIENTO</span>

            <h1 className="display-title">
              Volvamos a
              <br />
              <em>movernos.</em>
            </h1>

            <p>Elegí una sesión, descubrí nuevos ejercicios y registrá tus avances.</p>

            <p
              style={{
                marginTop: '12px',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
              }}
            >
              {storageEnabled
                ? 'Tu progreso se guarda en este navegador.'
                : 'Tu progreso se mantiene mientras permanezcas en esta página.'}
            </p>
          </div>

          <div className="portal-progress">
            <div>
              <span>SESIONES COMPLETADAS</span>

              <strong>
                {completed.length.toString().padStart(2, '0')}

                <small> / {totalWorkouts.toString().padStart(2, '0')}</small>
              </strong>
            </div>

            <div
              className="portal-progress__track"
              role="progressbar"
              aria-label="Progreso de sesiones"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
            >
              <div style={{ width: `${progress}%` }} />
            </div>

            <span>{progress}% COMPLETADO</span>
          </div>
        </Reveal>

        <div className="portal-content">
          <div className="portal-main">
            <Reveal>
              <div className="portal-section-heading">
                <span className="eyebrow">01 / TUS SESIONES</span>

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

                    <span>{completed.includes(item.id) ? 'COMPLETADO' : item.duration}</span>
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

                  {workout && (
                    <div>
                      <Clock3 size={17} aria-hidden="true" />
                      {workout.duration}
                    </div>
                  )}
                </div>

                <div className="exercise-rows">
                  {currentExercises.map((exercise, index) => (
                    <details key={exercise.id} className="exercise-row">
                      <summary>
                        <span className="exercise-row__number">
                          {String(index + 1).padStart(2, '0')}
                        </span>

                        <div>
                          <strong>{exercise.title}</strong>

                          <small>
                            {exercise.sets} series · {exercise.repetitions} rep.
                          </small>
                        </div>

                        <ChevronDown size={22} strokeWidth={1.5} aria-hidden="true" />
                      </summary>

                      <div className="exercise-row__detail">
                        <p>{exercise.cue}</p>

                        <p>Descanso orientativo: {exercise.rest}.</p>
                      </div>
                    </details>
                  ))}
                </div>

                <button
                  type="button"
                  className={`complete-button ${workoutDone ? 'complete-button--done' : ''}`}
                  onClick={toggleCompleted}
                >
                  <Check size={19} aria-hidden="true" />

                  {workoutDone ? 'Sesión completada · Desmarcar' : 'Marcar sesión como completada'}
                </button>
              </section>
            </Reveal>
          </div>

          <aside className="portal-aside">
            <Reveal>
              <div className="library-heading">
                <span className="eyebrow">03 / MOVIMIENTOS</span>

                <h2>Biblioteca</h2>

                <p>Consultá ejercicios de fuerza, movilidad y pilates.</p>
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
                        <Dumbbell size={16} strokeWidth={1.5} aria-hidden="true" />

                        <span>{item.title}</span>

                        <span aria-hidden="true">+</span>
                      </summary>

                      <p>{item.cue}</p>
                    </details>
                  ))}
              </div>

              <button className="reset-demo" type="button" onClick={resetProgress}>
                <RotateCcw size={15} aria-hidden="true" />
                Reiniciar progreso
              </button>
            </Reveal>
          </aside>
        </div>

        <p className="portal-disclaimer">
          Estas sesiones son orientativas y no constituyen una planificación individual. Adaptá los
          movimientos a tus posibilidades y consultá con un profesional ante lesiones, dolor o
          condiciones que requieran supervisión.
        </p>
      </div>
    </section>
  );
}
