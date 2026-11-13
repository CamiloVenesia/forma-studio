import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, ClipboardCopy, LockKeyhole } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { createSafeSummary, goals, initialIntake, validateStep } from './model';
import type { IntakeData } from './model';
import { formatDiscipline, formatModality } from '../../utils/text';
import { Link } from 'react-router-dom';

const stepNames = ['Tu elección', 'Sobre vos', 'Tu entrenamiento', 'Revisar'];
const experienceOptions = [
  ['inicio', 'Nunca entrené'],
  ['retomo', 'Entrené, pero hace tiempo'],
  ['intermedio', 'Entreno hace menos de un año'],
  ['avanzado', 'Entreno hace más de un año'],
] as const;

interface ChoiceGroupProps {
  label: string;
  options: readonly { label: string; value: string; description?: string }[];
  selected: string;
  onSelect: (value: string) => void;
}

function ChoiceGroup({ label, options, selected, onSelect }: ChoiceGroupProps) {
  return (
    <fieldset className="choice-fieldset">
      <legend>{label}</legend>
      <div className="choice-grid">
        {options.map((option) => (
          <label
            key={option.value}
            className={`choice ${selected === option.value ? 'choice--selected' : ''}`}
          >
            <input
              type="radio"
              name={label}
              checked={selected === option.value}
              onChange={() => onSelect(option.value)}
            />
            <span>
              <b>{option.label}</b>
              {option.description && <small>{option.description}</small>}
            </span>
            <span className="choice__indicator" aria-hidden="true">
              {selected === option.value && <Check size={15} />}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function IntakeWizard() {
  const [params] = useSearchParams();
  const preselectedDiscipline = params.get('disciplina');
  const preselectedModality = params.get('modalidad');
  const [data, setData] = useState<IntakeData>({
    ...initialIntake,
    discipline:
      preselectedDiscipline === 'fuerza' || preselectedDiscipline === 'pilates'
        ? preselectedDiscipline
        : '',
    modality:
      preselectedModality === 'online' || preselectedModality === 'presencial'
        ? preselectedModality
        : '',
  });
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
  const [complete, setComplete] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState('');
  const heading = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();

  function update<K extends keyof IntakeData>(key: K, value: IntakeData[K]) {
    setData((previous) => ({ ...previous, [key]: value }));
    setErrors([]);
  }

  function toggleGoal(goal: string) {
    const exists = data.goals.includes(goal);
    if (exists)
      update(
        'goals',
        data.goals.filter((item) => item !== goal),
      );
    else if (data.goals.length < 2) update('goals', [...data.goals, goal]);
  }

  function next() {
    const currentErrors = validateStep(step, data);
    if (currentErrors.length) {
      setErrors(currentErrors);
      return;
    }
    setErrors([]);
    if (step === 3) setComplete(true);
    else setStep((previous) => previous + 1);
    window.setTimeout(() => heading.current?.focus(), 0);
  }

  function back() {
    setStep((previous) => Math.max(0, previous - 1));
    setErrors([]);
    window.setTimeout(() => heading.current?.focus(), 0);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(createSafeSummary(data));
      setCopyFeedback('Resumen copiado. Podés compartirlo cuando lo desees.');
    } catch {
      setCopyFeedback('Tu navegador no permitió copiar. Seleccioná el texto que aparece debajo.');
    }
  }

  if (complete)
    return (
      <div className="wizard-done" role="status">
        <div className="wizard-done__icon">
          <Check size={32} />
        </div>
        <span className="eyebrow">RECORRIDO COMPLETADO</span>
        <h2>
          Tu primer paso,
          <br />
          <em>listo.</em>
        </h2>
        <p>
          Terminaste el recorrido de ejemplo.{' '}
          <strong>No enviamos ni almacenamos tu información.</strong> En una implementación real,
          aquí conectaríamos el formulario con el sistema del profesional.
        </p>
        <button type="button" className="arrow-link arrow-link--dark" onClick={copy}>
          <span>Copiar resumen</span>
          <ClipboardCopy size={18} />
        </button>
        {copyFeedback && (
          <p className="copy-feedback" role="status">
            {copyFeedback}
          </p>
        )}
        <details className="wizard-summary">
          <summary>Ver resumen para copiar manualmente</summary>
          <textarea
            aria-label="Resumen de solicitud"
            readOnly
            value={createSafeSummary(data)}
            rows={12}
          />
        </details>
        <Link className="underlined-link" to="/">
          Volver al inicio <ArrowRight size={17} />
        </Link>
      </div>
    );

  return (
    <div className="wizard">
      <div className="wizard__top">
        <span>INSCRIPCIÓN / MODO DEMO</span>
        <strong>0{step + 1} / 04</strong>
      </div>
      <div className="wizard__progress" aria-label={`Paso ${step + 1} de 4`}>
        <div style={{ width: `${((step + 1) / 4) * 100}%` }} />
      </div>
      <div className="wizard__steps" aria-label="Progreso del formulario">
        {stepNames.map((name, index) => (
          <span
            key={name}
            className={index === step ? 'is-current' : index < step ? 'is-done' : ''}
          >
            {name}
          </span>
        ))}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          className="wizard__body"
          initial={reduced ? false : { opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduced ? { opacity: 1 } : { opacity: 0, x: -18 }}
          transition={{ duration: reduced ? 0 : 0.24 }}
        >
          <h2 tabIndex={-1} ref={heading} className="wizard__heading">
            {step === 0 && (
              <>
                ¿Cómo te gustaría <em>moverte?</em>
              </>
            )}
            {step === 1 && (
              <>
                Queremos saber <em>de vos.</em>
              </>
            )}
            {step === 2 && (
              <>
                Diseñemos tu <em>punto de partida.</em>
              </>
            )}
            {step === 3 && (
              <>
                Un último <em>vistazo.</em>
              </>
            )}
          </h2>
          <p className="wizard__description">
            {
              [
                'Elegí la disciplina y la modalidad que mejor encajan con vos.',
                'Estos datos se mantienen únicamente en esta pantalla de demostración.',
                'Respondé de acuerdo a tu disponibilidad real; no existe la respuesta perfecta.',
                'Confirmá tus elecciones. Esta demo no conecta con un servidor.',
              ][step]
            }
          </p>
          {step === 0 && (
            <>
              <ChoiceGroup
                label="¿Qué querés practicar?"
                selected={data.discipline}
                onSelect={(value) => update('discipline', value as IntakeData['discipline'])}
                options={[
                  {
                    label: 'Entrenamiento de fuerza',
                    value: 'fuerza',
                    description: 'Gimnasio, fuerza y acondicionamiento',
                  },
                  {
                    label: 'Pilates',
                    value: 'pilates',
                    description: 'Movilidad, fuerza y control',
                  },
                ]}
              />
              <ChoiceGroup
                label="¿Cómo preferís entrenar?"
                selected={data.modality}
                onSelect={(value) => update('modality', value as IntakeData['modality'])}
                options={[
                  { label: 'Online', value: 'online', description: 'Desde donde estés' },
                  {
                    label: 'Presencial',
                    value: 'presencial',
                    description: 'En un espacio de entrenamiento',
                  },
                ]}
              />
            </>
          )}
          {step === 1 && (
            <div className="form-grid">
              <label className="text-field text-field--full">
                Nombre y apellido{' '}
                <input
                  autoComplete="name"
                  value={data.name}
                  maxLength={100}
                  onChange={(e) => update('name', e.target.value)}
                  placeholder="¿Cómo te llamás?"
                />
              </label>
              <label className="text-field">
                Edad (18+){' '}
                <input
                  type="number"
                  inputMode="numeric"
                  min="18"
                  max="100"
                  value={data.age}
                  onChange={(e) => update('age', e.target.value)}
                  placeholder="Ej. 26"
                />
              </label>
              <label className="text-field">
                Ciudad{' '}
                <input
                  autoComplete="address-level2"
                  maxLength={80}
                  value={data.city}
                  onChange={(e) => update('city', e.target.value)}
                  placeholder="Ej. Rosario"
                />
              </label>
              <label className="text-field text-field--full">
                WhatsApp con código de área{' '}
                <input
                  autoComplete="tel"
                  type="tel"
                  inputMode="tel"
                  maxLength={25}
                  value={data.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  placeholder="Ej. +54 9 ..."
                />
              </label>
            </div>
          )}
          {step === 2 && (
            <>
              <fieldset className="choice-fieldset">
                <legend>
                  ¿Cuáles son tus objetivos? <span>(Elegí hasta 2)</span>
                </legend>
                <div className="goal-grid">
                  {goals.map((goal) => (
                    <label
                      className={`goal-chip ${data.goals.includes(goal) ? 'goal-chip--selected' : ''}`}
                      key={goal}
                    >
                      <input
                        type="checkbox"
                        checked={data.goals.includes(goal)}
                        disabled={!data.goals.includes(goal) && data.goals.length >= 2}
                        onChange={() => toggleGoal(goal)}
                      />
                      {goal}
                      <span aria-hidden="true">{data.goals.includes(goal) ? '✓' : '+'}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <ChoiceGroup
                label="¿Qué experiencia tenés?"
                selected={data.experience}
                onSelect={(value) => update('experience', value as IntakeData['experience'])}
                options={experienceOptions.map(([value, label]) => ({ value, label }))}
              />
              <div className="form-grid">
                <label className="text-field">
                  Días por semana{' '}
                  <select value={data.days} onChange={(e) => update('days', e.target.value)}>
                    <option value="">Elegí una opción</option>
                    {['2', '3', '4', '5'].map((day) => (
                      <option key={day} value={day}>
                        {day} días
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-field">
                  Tiempo por sesión{' '}
                  <select
                    value={data.duration}
                    onChange={(e) => update('duration', e.target.value)}
                  >
                    <option value="">Elegí una opción</option>
                    {['30', '45', '60', '90+'].map((time) => (
                      <option key={time} value={time}>
                        {time} minutos
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              {data.modality === 'online' && (
                <>
                  <ChoiceGroup
                    label="¿Dónde vas a entrenar?"
                    selected={data.location}
                    onSelect={(value) => update('location', value)}
                    options={[
                      { value: 'Gimnasio', label: 'Gimnasio' },
                      { value: 'Casa con equipamiento', label: 'Casa con equipamiento' },
                      { value: 'Casa sin equipamiento', label: 'Casa sin equipamiento' },
                    ]}
                  />
                  {data.location === 'Casa con equipamiento' && (
                    <fieldset className="choice-fieldset">
                      <legend>
                        ¿Qué elementos tenés? <span>(Opcional)</span>
                      </legend>
                      <div className="goal-grid">
                        {['Mancuernas', 'Bandas', 'Colchoneta', 'Banco o step'].map((option) => (
                          <label
                            key={option}
                            className={`goal-chip ${data.equipment.includes(option) ? 'goal-chip--selected' : ''}`}
                          >
                            <input
                              type="checkbox"
                              checked={data.equipment.includes(option)}
                              onChange={(e) =>
                                update(
                                  'equipment',
                                  e.target.checked
                                    ? [...data.equipment, option]
                                    : data.equipment.filter((item) => item !== option),
                                )
                              }
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  )}
                </>
              )}
              <ChoiceGroup
                label="¿Tenés alguna lesión o molestia que debamos considerar?"
                selected={data.hasDiscomfort}
                onSelect={(value) => update('hasDiscomfort', value)}
                options={[
                  { value: 'si', label: 'Sí' },
                  { value: 'no', label: 'No' },
                ]}
              />
              {data.hasDiscomfort === 'si' && (
                <p className="wizard__notice">
                  No ingreses información médica en esta demo. Si contratás un servicio real,
                  comentá estos detalles en un canal privado con la persona responsable y buscá
                  orientación profesional cuando corresponda.
                </p>
              )}
            </>
          )}
          {step === 3 && (
            <div className="review">
              <div>
                <span>ACTIVIDAD</span>
                <strong>{data.discipline ? formatDiscipline(data.discipline) : '—'}</strong>
              </div>
              <div>
                <span>MODALIDAD</span>
                <strong>{data.modality ? formatModality(data.modality) : '—'}</strong>
              </div>
              <div>
                <span>NOMBRE</span>
                <strong>{data.name}</strong>
              </div>
              <div>
                <span>CIUDAD</span>
                <strong>{data.city}</strong>
              </div>
              <div>
                <span>OBJETIVOS</span>
                <strong>{data.goals.join(' · ')}</strong>
              </div>
              <div>
                <span>DISPONIBILIDAD</span>
                <strong>
                  {data.days} días / {data.duration} min
                </strong>
              </div>
              <label className="consent">
                <input
                  type="checkbox"
                  checked={data.consent}
                  onChange={(e) => update('consent', e.target.checked)}
                />
                <span>
                  Comprendo que esta página es una <strong>demostración interactiva</strong>. Los
                  datos no se envían ni se guardan en un servidor, y no se realiza una inscripción
                  real.{' '}
                  <Link to="/privacidad" target="_blank" rel="noopener noreferrer">
                    Leer privacidad.
                  </Link>
                </span>
              </label>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      {errors.length > 0 && (
        <div className="wizard__errors" role="alert">
          <strong>Revisá lo siguiente:</strong>
          <ul>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="wizard__actions">
        {step > 0 ? (
          <button className="wizard__back" type="button" onClick={back}>
            <ArrowLeft size={18} /> Volver
          </button>
        ) : (
          <span />
        )}
        <button className="arrow-link arrow-link--dark" type="button" onClick={next}>
          <span>{step === 3 ? 'Finalizar demo' : 'Continuar'}</span>
          {step === 3 ? <Check size={18} /> : <ArrowRight size={18} />}
        </button>
      </div>
      <div className="wizard__privacy">
        <LockKeyhole size={14} aria-hidden="true" /> Datos sólo en memoria durante esta sesión. No
        hay envío ni almacenamiento.
      </div>
    </div>
  );
}
