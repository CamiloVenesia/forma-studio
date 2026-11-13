import { describe, expect, it } from 'vitest';
import { createSafeSummary, initialIntake, validateStep } from '../src/features/intake/model';

const valid = {
  ...initialIntake,
  discipline: 'fuerza' as const,
  modality: 'online' as const,
  name: 'Alex Ejemplo',
  age: '27',
  city: 'Rosario',
  phone: '+54 9 341 555 1234',
  goals: ['Ganar fuerza'],
  experience: 'inicio' as const,
  days: '3',
  duration: '45',
  location: 'Gimnasio',
  hasDiscomfort: 'si',
  consent: true,
};

describe('formulario: validación por pasos', () => {
  it('acepta una selección completa de disciplina y modalidad', () => {
    expect(validateStep(0, valid)).toEqual([]);
  });
  it('rechaza ausencia de teléfono y edades no permitidas', () => {
    const errors = validateStep(1, { ...valid, phone: '123', age: '13' });
    expect(errors).toHaveLength(2);
  });
  it('rechaza más de dos objetivos', () => {
    expect(validateStep(2, { ...valid, goals: ['A', 'B', 'C'] })).toHaveLength(1);
  });
  it('requiere ubicación si la modalidad es online', () => {
    expect(validateStep(2, { ...valid, location: '' })).toHaveLength(1);
  });
  it('no requiere ubicación para un servicio presencial', () => {
    expect(validateStep(2, { ...valid, modality: 'presencial', location: '' })).toEqual([]);
  });
  it('requiere consentimiento informado para finalizar', () => {
    expect(validateStep(3, { ...valid, consent: false })).toHaveLength(1);
  });
  it('no incluye información médica en el resumen compartible', () => {
    const text = createSafeSummary(valid);
    expect(text).toContain('Alex Ejemplo');
    expect(text).not.toContain('lesión');
    expect(text).not.toContain('molestia');
    expect(text).not.toContain('hasDiscomfort');
    expect(text).toContain('no se realizó ningún envío');
  });
});
