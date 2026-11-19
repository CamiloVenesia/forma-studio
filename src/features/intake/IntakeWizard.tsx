
import '../../styles/intake.css';

import { useRef, useState } from 'react';

import {
  ArrowLeft,
  ArrowRight,
  Check,
  ClipboardCopy,
  LockKeyhole,
  Mail,
} from 'lucide-react';

import { Link, useSearchParams } from 'react-router-dom';

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'motion/react';

import {
  activities,
  createSubmissionSummary,
  difficulties,
  equipmentOptions,
  experiences,
  formatExperience,
  goals,
  intakeLimits,
  initialIntake,
  trainingLocations,
  validateStep,
} from './model';

import type { IntakeData } from './model';

import {
  formatDiscipline,
  formatModality,
} from '../../utils/text';

import { site } from '../../config/site';

const stepNames = [
  'Tu elección',
  'Sobre vos',
  'Tus objetivos',
  'Tu entrenamiento',
  'Bienestar y revisión',
];

type SubmissionStatus = 'idle' | 'sending' | 'success';

interface SubmissionResponse {
  ok?: boolean;
  message?: string;
}

interface Option {
  label: string;
  value: string;
  description?: string;
}

interface RadioGroupProps {
  name: string;
  label: string;
  options: readonly Option[];
  selected: string;
  onSelect: (value: string) => void;
  columns?: 1 | 2;
}

function RadioGroup({
  name,
  label,
  options,
  selected,
  onSelect,
  columns = 2,
}: RadioGroupProps) {
  return (
    <fieldset className="intake-question">
      <legend>{label}</legend>

      <div className={`intake-options intake-options--${columns}`}>
        {options.map((option) => (
          <label
            key={option.value}
            className={`intake-option ${
              selected === option.value
                ? 'intake-option--selected'
                : ''
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={selected === option.value}
              onChange={() => onSelect(option.value)}
            />

            <span
              className="intake-option__mark"
              aria-hidden="true"
            />

            <span className="intake-option__copy">
              <strong>{option.label}</strong>
              {option.description && (
                <small>{option.description}</small>
              )}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

interface CheckboxGroupProps {
  label: string;
  options: readonly string[];
  selected: string[];
  onToggle: (value: string) => void;
  helper?: string;
  columns?: 1 | 2;
  maxSelected?: number;
}

function CheckboxGroup({
  label,
  options,
  selected,
  onToggle,
  helper,
  columns = 1,
  maxSelected,
}: CheckboxGroupProps) {
  return (
    <fieldset className="intake-question">
      <legend>{label}</legend>

      {helper && (
        <p className="intake-question__helper">{helper}</p>
      )}

      <div className={`intake-options intake-options--${columns}`}>
        {options.map((option) => (
          <label
            key={option}
            className={`intake-option intake-option--checkbox ${
              selected.includes(option)
                ? 'intake-option--selected'
                : ''
            }`}
          >
            <input
              type="checkbox"
              checked={selected.includes(option)}
              disabled={Boolean(
                maxSelected &&
                  selected.length >= maxSelected &&
                  !selected.includes(option),
              )}
              onChange={() => onToggle(option)}
            />

            <span
              className="intake-option__mark"
              aria-hidden="true"
            >
              {selected.includes(option) && (
                <Check size={13} />
              )}
            </span>

            <span className="intake-option__copy">
              <strong>{option}</strong>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  inputMode?: 'text' | 'numeric' | 'tel';
  autoComplete?: string;
  helper?: string;
  maxLength?: number;
  full?: boolean;
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  inputMode,
  autoComplete,
  helper,
  maxLength,
  full = false,
}: TextFieldProps) {
  return (
    <label
      className={`intake-field ${
        full ? 'intake-field--full' : ''
      }`}
    >
      <span>
        {label}
        <i aria-hidden="true">*</i>
      </span>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete={autoComplete}
        maxLength={maxLength}
        aria-required="true"
      />

      {helper && (
        <small className="intake-field__helper">
          {helper}
        </small>
      )}
    </label>
  );
}

interface TextAreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  helper?: string;
  maxLength?: number;
  required?: boolean;
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
  helper,
  maxLength,
  required = true,
}: TextAreaProps) {
  return (
    <label className="intake-field intake-field--full">
      <span>
        {label}
        {required && (
          <i aria-hidden="true">*</i>
        )}
      </span>

      {helper && (
        <small className="intake-field__helper">
          {helper}
        </small>
      )}

      <textarea
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        rows={3}
        maxLength={maxLength}
        aria-required={required}
      />
    </label>
  );
}

function getInitialData(
  discipline: string | null,
  modality: string | null,
): IntakeData {
  return {
    ...initialIntake,
    discipline:
      discipline === 'fuerza' ||
      discipline === 'pilates'
        ? discipline
        : '',
    modality:
      modality === 'online' ||
      modality === 'presencial'
        ? modality
        : '',
  };
}

export function IntakeWizard() {
  const [params] = useSearchParams();

  const [data, setData] = useState<IntakeData>(() =>
    getInitialData(
      params.get('disciplina'),
      params.get('modalidad'),
    ),
  );

  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);

  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus>('idle');

  const [submissionError, setSubmissionError] =
    useState('');

  const [copyFeedback, setCopyFeedback] =
    useState('');

  const [honeypotValue, setHoneypotValue] = useState('');

  const heading = useRef<HTMLHeadingElement>(null);
  const sendingRef = useRef(false);
  const reduced = useReducedMotion();

  const isSending = submissionStatus === 'sending';

  function update<K extends keyof IntakeData>(
    key: K,
    value: IntakeData[K],
  ) {
    setData((previous) => ({
      ...previous,
      [key]: value,
    }));

    setErrors([]);
    setSubmissionError('');
  }

  function setDiscomfortAnswer(value: string) {
    setData((previous) => ({
      ...previous,
      hasDiscomfort: value,
      discomfortDetails:
        previous.hasDiscomfort === value
          ? previous.discomfortDetails
          : '',
    }));

    setErrors([]);
    setSubmissionError('');
  }

  function toggleGoal(value: string) {
    const exists = data.goals.includes(value);

    if (exists) {
      update(
        'goals',
        data.goals.filter(
          (item) => item !== value,
        ),
      );
    } else if (data.goals.length < 2) {
      update('goals', [
        ...data.goals,
        value,
      ]);
    }
  }

  function toggleEquipment(value: string) {
    const exclusiveOptions = [
      'No tengo nada y prefiero arrancar así',
      'No tengo nada pero me compraría algo',
    ];

    const isExclusive =
      exclusiveOptions.includes(value);

    const selected =
      data.equipment.includes(value);

    if (selected) {
      update(
        'equipment',
        data.equipment.filter(
          (item) => item !== value,
        ),
      );
      return;
    }

    if (isExclusive) {
      update('equipment', [value]);
      return;
    }

    update('equipment', [
      ...data.equipment.filter(
        (item) =>
          !exclusiveOptions.includes(item),
      ),
      value,
    ]);
  }

  function toggleDifficulty(value: string) {
    const selected =
      data.difficulties.includes(value);

    update(
      'difficulties',
      selected
        ? data.difficulties.filter(
            (item) => item !== value,
          )
        : [
            ...data.difficulties,
            value,
          ],
    );
  }

  function focusHeading() {
    window.setTimeout(
      () => heading.current?.focus(),
      0,
    );
  }

  function back() {
    if (sendingRef.current) {
      return;
    }

    setStep((previous) =>
      Math.max(0, previous - 1),
    );

    setErrors([]);
    setSubmissionError('');
    focusHeading();
  }

  async function sendRequest() {
    if (sendingRef.current) {
      return;
    }

    sendingRef.current = true;
    setSubmissionStatus('sending');
    setSubmissionError('');
    setCopyFeedback('');

    const submissionData: IntakeData =
      data.hasDiscomfort === 'no' &&
      !data.discomfortDetails.trim()
        ? {
            ...data,
            discomfortDetails: 'No aplica',
          }
        : data;

    try {
      const response = await fetch(
        '/api/send-intake',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'same-origin',
          body: JSON.stringify({
            data: submissionData,
            website: honeypotValue,
          }),
        },
      );

      const contentType =
        response.headers.get('content-type') ?? '';

      if (
        !contentType.includes('application/json')
      ) {
        throw new Error(
          'El servidor no respondió con el formato esperado. Verificá que la API de Vercel esté funcionando.',
        );
      }

      const result =
        (await response.json()) as SubmissionResponse;

      if (!response.ok || result.ok !== true) {
        throw new Error(
          result.message ||
            'No pudimos enviar tu solicitud. Intentá nuevamente.',
        );
      }

      setSubmissionStatus('success');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Ocurrió un error al enviar la solicitud.';

      setSubmissionError(message);
      setSubmissionStatus('idle');
    } finally {
      sendingRef.current = false;
    }
  }

  function next() {
    if (sendingRef.current) {
      return;
    }

    const currentErrors =
      validateStep(step, data);

    if (currentErrors.length > 0) {
      setErrors(currentErrors);
      return;
    }

    setErrors([]);
    setSubmissionError('');

    if (step === 4) {
      void sendRequest();
      return;
    }

    setStep((previous) => previous + 1);
    focusHeading();
  }

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(
        createSubmissionSummary(data),
      );

      setCopyFeedback(
        'Respuestas copiadas. Ya podés pegarlas en un mensaje.',
      );
    } catch {
      setCopyFeedback(
        'No se pudo copiar automáticamente. Abrí el resumen para copiarlo manualmente.',
      );
    }
  }

  const reviewRows: [string, string][] = [
    [
      'Disciplina',
      data.discipline
        ? formatDiscipline(data.discipline)
        : '—',
    ],
    [
      'Modalidad',
      data.modality
        ? formatModality(data.modality)
        : '—',
    ],
    ['Nombre y apellido', data.name],
    ['Edad', data.age],
    ['Ciudad', data.city],
    ['WhatsApp', data.phone],
    ['Objetivos', data.goals.join(', ')],
    [
      'Otro objetivo',
      data.goals.includes('Otros')
        ? data.otherGoal
        : '—',
    ],
    ['Actividad física', data.activity],
    [
      'Otra actividad',
      data.activity === 'Otros'
        ? data.otherActivity
        : '—',
    ],
    [
      'Experiencia',
      formatExperience(data.experience),
    ],
    ['Días por semana', data.days],
    [
      'Tiempo por entrenamiento',
      data.duration,
    ],
    ['Lugar', data.location],
    [
      'Equipamiento',
      data.location === 'Gimnasio'
        ? 'No corresponde'
        : data.equipment.join(', ') || '—',
    ],
    [
      'Otro equipamiento',
      data.location !== 'Gimnasio' &&
      data.equipment.includes('Otro')
        ? data.otherEquipment
        : '—',
    ],
    [
      'Lesiones o molestias',
      data.hasDiscomfort === 'si'
        ? 'Sí'
        : 'No',
    ],
    [
      'Detalle',
      data.discomfortDetails.trim() ||
        (data.hasDiscomfort === 'no'
          ? 'No aplica'
          : '—'),
    ],
    [
      'Dificultades',
      data.difficulties.join(', '),
    ],
    [
      'Otra dificultad',
      data.difficulties.includes('Otros')
        ? data.otherDifficulty
        : '—',
    ],
    [
      'Comentarios',
      data.comments.trim() ||
        'Sin comentarios',
    ],
  ];

  if (submissionStatus === 'success') {
    return (
      <div className="wizard-done" role="status">
        <div className="wizard-done__icon">
          <Check size={30} />
        </div>

        <span className="eyebrow">
          SOLICITUD ENVIADA
        </span>

        <h2>
          Un paso más,
          <br />
          <em>y empezamos.</em>
        </h2>

        <p>
          Nuestro servidor de correo aceptó
          tu solicitud dirigida a{' '}
          <strong>{site.brand.email}</strong>.
          Gracias por confiar en FORMA Studio.
        </p>

        <p>
          Revisaremos tus respuestas para
          conocer tus objetivos y preparar
          una propuesta acorde a vos.
        </p>

        <details className="wizard-summary">
          <summary>
            Ver todas mis respuestas
          </summary>

          <textarea
            readOnly
            value={createSubmissionSummary(data)}
            rows={18}
            aria-label="Resumen de solicitud enviada"
          />
        </details>

        <Link
          className="underlined-link"
          to="/"
        >
          Volver al inicio
          <ArrowRight size={17} />
        </Link>
      </div>
    );
  }

  return (
    <div className="wizard">
      <div className="wizard__top">
        <span>
          SOLICITUD DE ENTRENAMIENTO
        </span>

        <strong>
          0{step + 1} / 05
        </strong>
      </div>

      <div
        className="wizard__progress"
        aria-label={`Paso ${step + 1} de 5`}
      >
        <div
          style={{
            width: `${((step + 1) / 5) * 100}%`,
          }}
        />
      </div>

      <nav
        className="wizard__steps"
        aria-label="Etapas del formulario"
      >
        {stepNames.map((name, index) => (
          <span
            key={name}
            className={
              index === step
                ? 'is-current'
                : index < step
                  ? 'is-done'
                  : ''
            }
            aria-current={
              index === step
                ? 'step'
                : undefined
            }
          >
            <i>0{index + 1}</i>
            {name}
          </span>
        ))}
      </nav>

      {/* Campo antispam: no utilizar nombres que Chrome
          interprete como datos de usuario. */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-9999px',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <label htmlFor="forma-security-check">
          Campo de control
        </label>

        <input
          id="forma-security-check"
          type="text"
          name="forma_security_check"
          autoComplete="off"
          data-lpignore="true"
          data-1p-ignore="true"
          data-form-type="other"
          tabIndex={-1}
          value={honeypotValue}
          onChange={(event) =>
            setHoneypotValue(event.target.value)
          }
        />
      </div>

      <AnimatePresence
        mode="wait"
        initial={false}
      >
        <motion.div
          key={step}
          className="wizard__body"
          initial={
            reduced
              ? false
              : {
                  opacity: 0,
                  x: 16,
                }
          }
          animate={{
            opacity: 1,
            x: 0,
          }}
          exit={
            reduced
              ? { opacity: 1 }
              : {
                  opacity: 0,
                  x: -16,
                }
          }
          transition={{
            duration: reduced
              ? 0
              : 0.22,
          }}
        >
          <h2
            tabIndex={-1}
            ref={heading}
            className="wizard__heading"
          >
            {step === 0 && (
              <>
                ¿Cómo te gustaría{' '}
                <em>moverte?</em>
              </>
            )}

            {step === 1 && (
              <>
                Primero, queremos saber{' '}
                <em>de vos.</em>
              </>
            )}

            {step === 2 && (
              <>
                ¿Qué te gustaría{' '}
                <em>conseguir?</em>
              </>
            )}

            {step === 3 && (
              <>
                Organicemos tu{' '}
                <em>entrenamiento.</em>
              </>
            )}

            {step === 4 && (
              <>
                Conocé tus{' '}
                <em>necesidades.</em>
              </>
            )}
          </h2>

          <p className="wizard__description">
            {
              [
                'Elegí la disciplina y la modalidad que mejor encajan con vos.',
                'Estos datos nos ayudan a conocerte y a poder contactarte.',
                'Contanos qué buscás, qué actividades realizás y qué experiencia tenés.',
                'Elegí una disponibilidad realista y contanos con qué espacio y elementos contás.',
                'Queremos conocer cualquier consideración importante antes de preparar tu propuesta.',
              ][step]
            }
          </p>

          {step === 0 && (
            <>
              <RadioGroup
                name="discipline"
                label="¿Qué querés practicar?"
                selected={data.discipline}
                onSelect={(value) =>
                  update(
                    'discipline',
                    value as IntakeData['discipline'],
                  )
                }
                options={[
                  {
                    label: 'Entrenamiento de fuerza',
                    value: 'fuerza',
                    description:
                      'Gimnasio, fuerza y acondicionamiento',
                  },
                  {
                    label: 'Pilates',
                    value: 'pilates',
                    description:
                      'Movilidad, fuerza y control',
                  },
                ]}
              />

              <RadioGroup
                name="modality"
                label="¿Cómo preferís entrenar?"
                selected={data.modality}
                onSelect={(value) =>
                  update(
                    'modality',
                    value as IntakeData['modality'],
                  )
                }
                options={[
                  {
                    label: 'Online',
                    value: 'online',
                    description:
                      'Desde donde estés',
                  },
                  {
                    label: 'Presencial',
                    value: 'presencial',
                    description:
                      'En un espacio de entrenamiento',
                  },
                ]}
              />
            </>
          )}

          {step === 1 && (
            <div className="intake-fields">
              <TextField
                label="1. Nombre y apellido"
                value={data.name}
                onChange={(value) =>
                  update('name', value)
                }
                placeholder="¿Cómo te llamás?"
                autoComplete="name"
                maxLength={intakeLimits.name}
                full
              />

              <TextField
                label="2. Edad"
                value={data.age}
                onChange={(value) =>
                  update('age', value)
                }
                placeholder="Ej. 26"
                inputMode="numeric"
                maxLength={intakeLimits.age}
                helper={
                  Number(data.age) >= 1 &&
                  Number(data.age) < 18
                    ? 'Si sos menor de 18 años, completá esta solicitud con conocimiento y autorización de tu madre, padre o persona adulta responsable.'
                    : undefined
                }
              />

              <TextField
                label="3. Ciudad"
                value={data.city}
                onChange={(value) =>
                  update('city', value)
                }
                placeholder="Ej. Rosario"
                autoComplete="address-level2"
                maxLength={intakeLimits.city}
              />

              <TextField
                label="4. WhatsApp"
                value={data.phone}
                onChange={(value) =>
                  update('phone', value)
                }
                placeholder="Con código de área"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                maxLength={intakeLimits.phone}
                full
              />
            </div>
          )}

          {step === 2 && (
            <>
              <CheckboxGroup
                label="5. ¿Cuál es tu objetivo?"
                helper="Elegí hasta dos opciones."
                options={goals}
                selected={data.goals}
                onToggle={toggleGoal}
                columns={2}
                maxSelected={2}
              />

              {data.goals.includes('Otros') && (
                <TextField
                  label="¿Cuál es tu otro objetivo?"
                  value={data.otherGoal}
                  onChange={(value) =>
                    update('otherGoal', value)
                  }
                  placeholder="Contanos tu objetivo"
                  maxLength={intakeLimits.other}
                  full
                />
              )}

              <RadioGroup
                name="activity"
                label="6. ¿Realizás algún deporte u otra actividad física?"
                selected={data.activity}
                onSelect={(value) =>
                  update('activity', value)
                }
                options={activities.map(
                  (value) => ({
                    label: value,
                    value,
                  }),
                )}
                columns={2}
              />

              {data.activity === 'Otros' && (
                <TextField
                  label="¿Qué otra actividad realizás?"
                  value={data.otherActivity}
                  onChange={(value) =>
                    update('otherActivity', value)
                  }
                  placeholder="Escribí la actividad"
                  maxLength={intakeLimits.other}
                  full
                />
              )}

              <RadioGroup
                name="experience"
                label="7. ¿Cuánta experiencia tenés entrenando?"
                selected={data.experience}
                onSelect={(value) =>
                  update(
                    'experience',
                    value as IntakeData['experience'],
                  )
                }
                options={experiences}
                columns={1}
              />
            </>
          )}

          {step === 3 && (
            <>
              <RadioGroup
                name="days"
                label="8. ¿Cuántos días por semana podrías entrenar?"
                selected={data.days}
                onSelect={(value) =>
                  update('days', value)
                }
                options={[
                  '2',
                  '3',
                  '4',
                  '5',
                ].map((value) => ({
                  label: `${value} días`,
                  value,
                }))}
                columns={2}
              />

              <RadioGroup
                name="duration"
                label="9. ¿Cuánto tiempo podrías dedicarle a cada entrenamiento?"
                selected={data.duration}
                onSelect={(value) =>
                  update('duration', value)
                }
                options={[
                  '30 minutos',
                  '45 minutos',
                  '60 minutos',
                  'Más de 60 minutos',
                ].map((value) => ({
                  label: value,
                  value,
                }))}
                columns={2}
              />

              <RadioGroup
                name="location"
                label="10. ¿Dónde vas a entrenar?"
                selected={data.location}
                onSelect={(value) =>
                  update('location', value)
                }
                options={trainingLocations.map(
                  (value) => ({
                    label: value,
                    value,
                  }),
                )}
                columns={1}
              />

              {data.location !== '' &&
                data.location !== 'Gimnasio' && (
                  <>
                    <CheckboxGroup
                      label="11. Si entrenás en casa, ¿qué elementos tenés o pensás comprar?"
                      options={equipmentOptions}
                      selected={data.equipment}
                      onToggle={toggleEquipment}
                    />

                    {data.equipment.includes(
                      'Otro',
                    ) && (
                      <TextField
                        label="¿Qué otro elemento?"
                        value={data.otherEquipment}
                        onChange={(value) =>
                          update(
                            'otherEquipment',
                            value,
                          )
                        }
                        placeholder="Escribí el elemento"
                        maxLength={intakeLimits.other}
                        full
                      />
                    )}
                  </>
                )}
            </>
          )}

          {step === 4 && (
            <>
              <RadioGroup
                name="hasDiscomfort"
                label="12. ¿Tenés alguna lesión o molestia?"
                selected={data.hasDiscomfort}
                onSelect={setDiscomfortAnswer}
                options={[
                  {
                    label: 'Sí',
                    value: 'si',
                  },
                  {
                    label: 'No',
                    value: 'no',
                  },
                ]}
                columns={2}
              />

              <TextArea
                label="13. Si respondiste sí, ¿dónde y qué te pasó?"
                value={data.discomfortDetails}
                onChange={(value) =>
                  update(
                    'discomfortDetails',
                    value,
                  )
                }
                placeholder={
                  data.hasDiscomfort === 'si'
                    ? 'Contanos dónde tenés la molestia o lesión y qué ocurrió.'
                    : 'Si querés agregar alguna aclaración, podés escribirla acá.'
                }
                helper={
                  data.hasDiscomfort === 'si'
                    ? 'Obligatorio cuando respondiste Sí.'
                    : 'Opcional cuando respondiste No. Podés dejarlo en blanco.'
                }
                maxLength={
                  intakeLimits.discomfortDetails
                }
                required={
                  data.hasDiscomfort === 'si'
                }
              />

              <CheckboxGroup
                label="14. ¿Qué es lo que más te cuesta?"
                options={difficulties}
                selected={data.difficulties}
                onToggle={toggleDifficulty}
              />

              {data.difficulties.includes(
                'Otros',
              ) && (
                <TextField
                  label="¿Qué otra dificultad encontrás?"
                  value={data.otherDifficulty}
                  onChange={(value) =>
                    update(
                      'otherDifficulty',
                      value,
                    )
                  }
                  placeholder="Contanos qué te cuesta"
                  maxLength={intakeLimits.other}
                  full
                />
              )}

              <TextArea
                label="15. Algo que quieras contarme"
                value={data.comments}
                onChange={(value) =>
                  update('comments', value)
                }
                placeholder="Este espacio es para cualquier otra información que quieras compartir."
                helper="Opcional. Podés dejar este espacio en blanco."
                maxLength={intakeLimits.comments}
                required={false}
              />

              <details className="wizard-review">
                <summary>
                  Revisar todas mis respuestas
                </summary>

                <dl>
                  {reviewRows.map(
                    ([label, value]) => (
                      <div key={label}>
                        <dt>{label}</dt>
                        <dd>
                          {value || '—'}
                        </dd>
                      </div>
                    ),
                  )}
                </dl>
              </details>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {errors.length > 0 && (
        <div
          className="wizard__errors"
          role="alert"
        >
          <strong>
            Revisá lo siguiente:
          </strong>

          <ul>
            {errors.map((error) => (
              <li key={error}>
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}

      {submissionError && (
        <div
          className="wizard__errors"
          role="alert"
        >
          <strong>
            No pudimos confirmar el envío.
          </strong>

          <p>{submissionError}</p>

          <button
            type="button"
            className="wizard__back"
            onClick={() =>
              void copySummary()
            }
          >
            <ClipboardCopy size={17} />
            Copiar respuestas
          </button>

          {copyFeedback && (
            <p role="status">
              {copyFeedback}
            </p>
          )}

          <details className="wizard-summary">
            <summary>
              Ver resumen para copiar
            </summary>

            <textarea
              readOnly
              value={createSubmissionSummary(data)}
              rows={14}
              aria-label="Resumen de respuestas"
            />
          </details>
        </div>
      )}

      <div className="wizard__actions">
        {step > 0 ? (
          <button
            className="wizard__back"
            type="button"
            onClick={back}
            disabled={isSending}
          >
            <ArrowLeft size={18} />
            Volver
          </button>
        ) : (
          <span className="wizard__back-placeholder" />
        )}

        <button
          className="wizard__continue"
          type="button"
          onClick={next}
          disabled={isSending}
          aria-busy={isSending}
        >
          <span>
            {isSending
              ? 'Enviando solicitud...'
              : step === 4
                ? 'Enviar solicitud'
                : 'Continuar'}
          </span>

          {step === 4 ? (
            <Mail size={18} />
          ) : (
            <ArrowRight size={18} />
          )}
        </button>
      </div>

      <div className="wizard__privacy">
        <LockKeyhole
          size={14}
          aria-hidden="true"
        />

        <span>
          Al enviar, tus respuestas se
          transmitirán a FORMA Studio para
          responder a tu solicitud. Evitá
          incluir información médica
          sensible. Consultá nuestra{' '}
          <Link to="/privacidad">
            política de privacidad
          </Link>
          .
        </span>
      </div>
    </div>
  );
}
