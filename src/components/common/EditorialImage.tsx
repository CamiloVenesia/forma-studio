interface Props {
  src: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  priority?: boolean;
}

export function EditorialImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  priority = false,
}: Props) {
  return (
    <div className={`editorial-image ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
      />
    </div>
  );
}
