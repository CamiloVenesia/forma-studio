export function formatModality(value: 'online' | 'presencial'): string {
  return value === 'online' ? 'Online' : 'Presencial';
}

export function formatDiscipline(value: 'fuerza' | 'pilates'): string {
  return value === 'fuerza' ? 'Entrenamiento de fuerza' : 'Pilates';
}
